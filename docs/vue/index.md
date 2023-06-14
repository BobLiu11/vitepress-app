# vue2 源码

## 生命周期篇

### 初始化函数——initEvents
1. 父组件给子组件的注册事件中，把自定义事件传给子组件，在子组件实例化的时候进行初始化；而浏览器原生事件是在父组件中处理。实例初始化阶段调用的初始化事件函数 initEvents 实际上初始化的是父组件在模板中使用 v-on 或@注册的监听子组件内触发的事件。
2. 浏览器原生事件是由父组件处理，而自定义事件是在子组件初始化的时候由父组件传给子组件，再由子组件注册到实例的事件系统中。

### 初始化函数——initInjections
1. 允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
2. provide 和 inject 选项绑定的数据不是响应式的。
3. 这里所说的数据就是我们通常所写 data、props、watch、computed 及 method，所以 inject 选项接收到注入的值有可能被以上这些数据所使用到，所以在初始化完 inject 后需要先初始化这些数据，然后才能再初始化 provide，所以在调用 initInjections 函数对 inject 初始化完之后需要先调用 initState 函数对数据进行初始化，最后再调用 initProvide 函数对 provide 进行初始化。

### 初始化函数——initState
1. 在 Vue 组件中会写一些如 props、data、methods、computed、watch 选项，我们把这些选项称为实例的状态选项。
2. 在函数内部初始化这 5 个选项的时候它的顺序是有意安排的，不是毫无章法的。如果你在开发中有注意到我们在 data 中可以使用 props，在 watch 中可以观察 data 和 props，之所以可以这样做，就是因为在初始化的时候遵循了这种顺序，先初始化 props，接着初始化 data，最后初始化 watch。只有按照这种顺序初始化我们才能在开发中在data中可以使用props，在watch中可以观察data和props。这5个选项中的所有属性最终都会被绑定到实例上，这也就是我们为什么可以使用this.xxx来访问任意属性。同时正是因为这一点，这5个选项中的所有属性名都不应该有所重复，这样会造成属性之间相互覆盖。
3. 会判断methods中某个方法名与props中某个属性名是否重复，接着判断methods中某个方法名如果在实例vm中已经存在并且方法名是以_或$开头的，就抛出异常：提示用户方法名命名不规范。
4. 遍历data对象中的每一项，判断data对象中是否存在某一项的key与methods中某个属性名重复，如果存在重复，就抛出警告：提示用户属性名重复。接着再判断是否存在某一项的key与prop中某个属性名重复，如果存在重复，就抛出警告：提示用户属性名重复。如果都没有重复，则调用proxy函数将data对象中key **_不以_或$开头_** 的属性代理到实例vm上，这样，我们就可以通过this.xxx来访问data选项中的xxx数据了。最后，调用observe函数将data中的数据转化成响应式。
5. computed只有在非服务端渲染环境下计算属性才应该有缓存。在服务端渲染环境下计算属性不需要缓存。

```js
if (opts.props) initProps(vm, opts.props);
if (opts.methods) initMethods(vm, opts.methods);
if (opts.data) {
  initData(vm);
} else {
  observe((vm._data = {}), true /* asRootData */);
}
if (opts.computed) initComputed(vm, opts.computed);
if (opts.watch && opts.watch !== nativeWatch) {
  initWatch(vm, opts.watch);
}
```
### 模版编译阶段
