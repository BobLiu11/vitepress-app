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
2. 在函数内部初始化这 5 个选项的时候它的顺序是有意安排的，不是毫无章法的。如果你在开发中有注意到我们在 data 中可以使用 props，在 watch 中可以观察 data 和 props，之所以可以这样做，就是因为在初始化的时候遵循了这种顺序，先初始化 props，接着初始化 data，最后初始化 watch。只有按照这种顺序初始化我们才能在开发中在 data 中可以使用 props，在 watch 中可以观察 data 和 props。这 5 个选项中的所有属性最终都会被绑定到实例上，这也就是我们为什么可以使用 this.xxx 来访问任意属性。同时正是因为这一点，这 5 个选项中的所有属性名都不应该有所重复，这样会造成属性之间相互覆盖。
3. 会判断 methods 中某个方法名与 props 中某个属性名是否重复，接着判断 methods 中某个方法名如果在实例 vm 中已经存在并且方法名是以\_或$开头的，就抛出异常：提示用户方法名命名不规范。
4. 遍历 data 对象中的每一项，判断 data 对象中是否存在某一项的 key 与 methods 中某个属性名重复，如果存在重复，就抛出警告：提示用户属性名重复。接着再判断是否存在某一项的 key 与 prop 中某个属性名重复，如果存在重复，就抛出警告：提示用户属性名重复。如果都没有重复，则调用 proxy 函数将 data 对象中 key ***不以*或$开头\_** 的属性代理到实例 vm 上，这样，我们就可以通过 this.xxx 来访问 data 选项中的 xxx 数据了。最后，调用 observe 函数将 data 中的数据转化成响应式。
5. computed 只有在非服务端渲染环境下计算属性才应该有缓存。在服务端渲染环境下计算属性不需要缓存。

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

1. vue 基于源码构建的有两个版本，一个是 runtime only(一个只包含运行时的版本)，另一个是 runtime + compiler(一个同时包含编译器和运行时的完整版本)。而两个版本的区别仅在于后者包含了一个编译器。一个完整的 Vue 版本是包含编译器的，我们可以使用 template 选项进行模板编写。编译器会自动将 template 选项中的模板字符串编译成渲染函数的代码,源码中就是 render 函数。如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就需要一个包含编译器的版本。

2. 只包含运行时的版本拥有创建 Vue 实例、渲染并处理 Virtual DOM 等功能，基本上就是除去编译器外的完整代码。该版本的适用场景有两种：

- (1).我们在选项中通过手写 render 函数去定义渲染过程，这个时候并不需要包含编译器的版本便可完整执行。

```js
// 不需要编译器
new Vue({
  render(h) {
    return h("div", this.hi);
  },
});
```

- (2)借助 vue-loader 这样的编译工具进行编译，当我们利用 webpack 进行 Vue 的工程化开发时，常常会利用 vue-loader 对\*.vue 文件进行编译，尽管我们也是利用 template 模板标签去书写代码，但是此时的 Vue 已经不需要利用编译器去负责模板的编译工作了，这个过程交给了插件去实现。

3. 很明显，编译过程对性能会造成一定的损耗，并且由于加入了编译的流程代码，Vue 代码的总体积也更加庞大(运行时版本相比完整版体积要小大约 30%)。因此在实际开发中，我们需要借助像 webpack 的 vue-loader 这类工具进行编译，将 Vue 对模板的编译阶段合并到 webpack 的构建流程中，这样不仅减少了生产环境代码的体积，也大大提高了运行时的性能，一举两得。

4. 完整版本和只包含运行时版本之间的差异主要在于是否有模板编译阶段，只包含运行时版本没有模板编译阶段，初始化阶段完成后直接进入挂载阶段，而完整版本是初始化阶段完成后进入模板编译阶段，然后再进入挂载阶段。也就是说，这两个版本最终都会进入挂载阶段。所以在完整版本的$mount方法中将模板编译完成后需要回头去调只包含运行时版本的$mount 方法以进入挂载阶段。这也就是在完整版本的$mount方法中先把只包含运行时版本的$mount 方法缓存下来，记作变量 mount，然后等模板编译完成，再执行 mount 方法（即只包含运行时版本的$mount 方法）。

5. 首先介绍了 Vue 源码构建的两种版本：完整版本和只包含运行时版本。并且我们知道了模板编译阶段只存在于完整版中，在只包含运行时版本中不存在该阶段，这是因为在只包含运行时版本中，当使用 vue-loader 或 vueify 时，\*.vue 文件内部的模板会在构建时预编译成渲染函数，所以是不需要编译的，从而不存在模板编译阶段。

然后对比了两种版本$mount方法的区别。它们的区别在于在$mount 方法中是否进行了模板编译。在只包含运行时版本的$mount方法中获取到DOM元素后直接进入挂载阶段，而在完整版本的$mount 方法中是先将模板进行编译，然后回过头调只包含运行时版本的$mount 方法进入挂载阶段。

最后，我们知道了分析模板编译阶段其实就是分析完整版的<span style="background-color:yellow">vm.$mount</span> 方法的实现，我们将完整版的vm.$mount 方法源码进行了逐行分析。知道了在该阶段中所做的工作就是：从用户传入的 el 选项和 template 选项中获取到用户传入的内部或外部模板，然后将获取到的模板编译成渲染函数。

### 挂载阶段

在该阶段中所做的主要工作是创建 Vue 实例并用其替换 el 选项对应的 DOM 元素，同时还要开启对模板中数据（状态）的监控，当数据（状态）发生变化时通知其依赖进行视图更新。

我们将挂载阶段所做的工作分成两部分进行了分析，第一部分是将模板渲染到视图上，第二部分是开启对模板中数据（状态）的监控。两部分工作都完成以后挂载阶段才算真正的完成了。

### 销毁阶段

当调用了实例上的 vm.$destory 方法后，实例就进入了销毁阶段，在该阶段所做的主要工作是将当前的 Vue 实例从其父级实例中删除，取消当前实例上的所有依赖追踪并且移除实例上的所有事件监听器。并且对照源码将所做的工作都进行了逐行分析。

## 实例方法篇

### 数据相关的方法

#### watch

1. 注意在带有 immediate 选项时，你不能在第一次回调时取消侦听给定的 property。

```js
// 这会导致报错
var unwatch = vm.$watch(
  "value",
  function () {
    doSomething();
    unwatch();
  },
  { immediate: true }
);
```

2. 如果你仍然希望在回调内部调用一个取消侦听的函数，你应该先检查其函数的可用性：

```js
var unwatch = vm.$watch(
  "value",
  function () {
    doSomething();
    if (unwatch) {
      unwatch();
    }
  },
  { immediate: true }
);
```
#### delete
delete方法是用来解决 Vue 不能检测到属性被删除的限制

### 事件相关的方法
1. $on和$emit这两个方法的内部原理是设计模式中最典型的发布订阅模式，首先定义一个事件中心，通过$on订阅事件，将事件存储在事件中心里面，然后通过$emit触发事件中心里面存储的订阅事件。
2. 在事件中心里面，一个事件名对应的回调函数是一个数组，要想移除所有的回调函数我们只需把它对应的数组设置为null即可。

### 生命周期相关的方法
1. 与生命周期相关的实例方法有4个，分别是vm.$mount、vm.$forceUpdate、vm.$nextTick和vm.$destory。其中，$forceUpdate和$destroy方法是在lifecycleMixin函数中挂载到Vue原型上的，$nextTick方法是在renderMixin函数中挂载到Vue原型上的，而$mount方法是在跨平台的代码中挂载到Vue原型上的。
2. 实例的重新渲染其实就是实例watcher执行了update方法
3. vm.$nextTick 是全局 Vue.nextTick 的别名，其用法相同。将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
这里就涉及到Vue中对DOM的更新策略了，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个事件队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到事件队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新事件队列并执行实际 (已去重的) 工作。

#### 事件循环大致分为以下几个步骤：

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。
主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 任务队列中存放的是一个个的任务（task）。 规范中规定 task 分为两大类，分别是宏任务(macro task) 和微任务(micro task），并且每执行完一个个宏任务(macro task)后，都要去清空该宏任务所对应的微任务队列中所有的微任务(micro task），他们的执行顺序如下所示：

```js
for (macroTask of macroTaskQueue) {
    // 1. 处理当前的宏任务
    handleMacroTask();

    // 2. 处理对应的所有微任务
    for (microTask of microTaskQueue) {
        handleMicroTask(microTask);
    }
}
```
在浏览器环境中，常见的

宏任务(macro task) 有 setTimeout、MessageChannel、postMessage、setImmediate；
微任务(micro task）有MutationObsever 和 Promise.then。

宏任务耗费的时间是大于微任务的，所以在浏览器支持的情况下，优先使用微任务。如果浏览器不支持微任务，使用宏任务；但是，各种宏任务之间也有效率的不同，需要根据浏览器的支持情况，使用不同的宏任务。

## 全局API篇
1. 实例方法是将方法挂载到Vue的原型上，而全局API是直接在Vue上挂载方法。在Vue中，全局API一共有12个，分别是Vue.extend、Vue.nextTick、Vue.set、Vue.delete、Vue.directive、Vue.filter、Vue.component、Vue.use、Vue.mixin、Vue.observable、Vue.version。
2. Vue为了性能考虑，反复调用Vue.extend其实应该返回同一个结果，只要返回结果是固定的，就可以将结果缓存，再次调用时，只需从缓存中取出结果即可。

## 过滤器篇
过滤器的内部工作原理，就是将用户写在模板中的过滤器通过模板编译，编译成_f函数的调用字符串，之后在执行渲染函数的时候会执行_f函数，从而使过滤器生效。

所谓_f函数其实就是resolveFilter函数的别名，在resolveFilter函数内部是根据过滤器id从当前实例的$options中的filters属性中获取到对应的过滤器函数，在之后执行渲染函数的时候就会执行获取到的过滤器函数。
首先，我们介绍了两种不同写法的过滤器会在不同的地方进行解析，但是解析原理都是相同的，都是调用过滤器解析器parseFilters函数进行解析。

接着，我们分析了parseFilters函数的内部逻辑。该函数接收一个形如'message | capitalize'这样的过滤器字符串作为，最终将其转化成_f("capitalize")(message)输出。在parseFilters函数的内部是通过遍历传入的过滤器字符串每一个字符，根据每一个字符是否是一些特殊的字符从而作出不同的处理，最终，从传入的过滤器字符串中解析出待处理的表达式expression和所有的过滤器filters数组。

最后，将解析得到的expression和filters数组通过调用wrapFilter函数将其构造成_f函数调用字符串。

## 指令篇
| 钩子函数名称 |      触发时机             |  回调参数 |
| -----------|:-----------:             | ----: |
| init       | 已基于VNode创建了DOM元素   | emptyNode和VNode |
| create     |   centered              |   $12                   |
| activate   |   keep-alive组件被创建    |    emptyNode和innerNode |
| insert     | VNode对应的DOM元素被插入到父节点中时被触发   | VNode |
| prepatch   |   一个VNode即将被patch之前触发   |   oldVNode和 VNode     |
| update     |   一个VNode更新时触发    |    oldVNode和VNode |
| postpatch  | 一个VNode被patch完毕时触发   | oldVNode和VNode |
| destory    |   一个VNode对应的DOM元素从DOM中移除时或者它的父元素从DOM中移除时触发   |   VNode              |
| remove     |   一个VNode对应的DOM元素从DOM中移除时触发。与destory不同的是，如果是直接将该VNode的父元素从DOM中移除导致该元素被移除，那么不会触发    |    VNode和removeCallback |

首先，我们知道了如果一个DOM节点上绑定了指令，那么在这个DOM节点所对应虚拟DOM节点进行渲染更新的时候，不但会处理节点渲染更新的逻辑，还会处理节点上指令的相关逻辑。具体处理指令逻辑的时机是在虚拟DOM渲染更新的create、update、destory阶段。

接着，我们介绍了Vue对于自定义指令定义对象提供了几个钩子函数，这几个钩子函数分别对应着指令的几种状态，我们可以根据实际的需求将指令逻辑写在合适的指令状态钩子函数中，比如，我们想让指令所绑定的元素一插入到DOM中就执行指令逻辑，那我们就应该把指令逻辑写在指令的inserted钩子函数中。

接着，我们逐行分析了updateDirectives函数，在该函数中就是对比新旧两份VNode上的指令列表，通过对比的异同点从而执行指令不同的钩子函数，让指令生效。

最后，一句话概括就是：所谓让指令生效，其实就是在合适的时机执行定义指令时所设置的钩子函数。

## 内置组件篇
就是我们可以把一些不常变动的组件或者需要缓存的组件用 <code>&lt;keep-alive&gt;</code>，这样<code>&lt;keep-alive&gt;</code>就会帮我们把组件保存在内存中，而不是直接的销毁，这样做可以保留组件的状态或避免多次重新渲染，以提高页面性能。

1. 将新数据从尾部插入到this.keys中；
2. 每当缓存命中（即缓存数据被访问），则将数据移到this.keys的尾部；
3. 当this.keys满的时候，将头部的数据丢弃；
LRU的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高，所以我们将命中缓存的组件key重新插入到this.keys的尾部，这样一来，this.keys中越往头部的数据即将来被访问几率越低，所以当缓存数量达到最大值时，我们就删除将来被访问几率最低的数据，即this.keys中第一个缓存的组件。这也就之前加粗强调的已缓存组件中最久没有被访问的实例会被销毁掉的原因所在。