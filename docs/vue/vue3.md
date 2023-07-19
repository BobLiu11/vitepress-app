## 第 1 章 权衡的艺术

### 1.1 命令式和声明式

1. 命令式 关注过程
2. 声明式 关注结果
3. 原生的性能最好，但是可维护性差
4. 框架的性能稍差，但是可维护性好

## 第 2 章 框架设计的核心要素

### 2.1 提升用户体验

1. 框架设计和开发需要提供友好的告警信息

### 2.2 控制框架代码的体积

1. vue.js 在输出资源时，会输出两个版本，一个用于开发环境，如 vue.global.js，一个用于生产环境，如 vue.global.prod.js。
2. 不会执行的代码称为 dead code，不会出现在最终的产物中，在构建资源时会被移除，所以 dead code 不会出现在 vue.global.prod.js 中，这样可以在开发环境中为用户提供友好告警信息的同时，不会增加生产环境的代码。

### 2.3 框架要做到良好的 Tree-Shaking

1. Tree-Shaking 就是消除那些永远不会被执行的代码，也就是排除 dead code。
2. 实现 Tree-Shaking 必须满足一个条件，模块必须是 ESM(ES Module)，因为 Tree-Shaking 依赖 ESM 的静态结构。
3. 如果一个函数调用会产生副作用，那就不能将其移除。副作用就是当调用函数的时候会对外部产生影响。
4. <code>`/*#_PURE_*/`</code>是用来告诉 rollup.js 或 webpack 代码不会产生副作用，可以进行 Tree-Shaking。通常产生副作用的代码都是模块内函数的顶级调用。

```js
foo(); //顶级调用
function bar() {
  foo(); // 函数内调用
}
```

### 2.4 框架应该输出怎样的构建产物

1. vue.js 的构建产物除了有环境上的区别之外，还会根据使用场景的不同而输出其它形式的产物。
2. 如果用户希望可以直接在 HTML 页面中使用`<script>`标签引入框架并使用，需要输出 IIFE 格式的资源，

```js
<body>
  <script src="vue.js"></script>
  <script>
    const {createApp} = Vue 
    // ...
  </script>
</body>
```
3. vue.global.js文件就是IIFE形式的资源
4. 无论是rollup还是webpack，在寻找资源时，package.json中如果存在module字段，那会优先使用module字段指向的资源来代替main字段指向的资源。
5. 带有-bundler字样的ESM资源是给rollup或webpack打包工具使用的，而带有-browser字样的ESM资源是直接给`<script type="module">`使用的。
6. ESM格式的资源有两种：用于浏览器的esm-browser.js和用于打包工具的esm-bundler.js。他们的区别在于对预定义常量_DEV_的处理，前者直接将_DEV_常量替换为字面量true或false，后者将_DEV_常量替换为process.env.NODE_ENV!='production'语句。

### 2.5 特性开关

1. 对于用户关闭的特性开关，可以利用Tree-Shaking机制让其不包含在最终的资源中。
