## 58 同城

### 1、axios 是怎么封装的和 fetch、xmlHttpRequest 的区别

axios.get()是如何实现的

```js
function sendRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest(); // // 创建 XMLHttpRequest 对象
    xhr.open(method, url); // 打开请求
    xhr.onload = function () {
      // 请求加载成功时的回调函数
      if (xhr.status === 200) {
        // 当请求状态为 200（OK）时，调用 resolve() 并传递响应数据
        resolve(xhr.response);
      } else {
        // 当请求状态不为 200 时，调用 reject() 并传递错误信息
        reject(Error(xhr.statusText));
      }
    };
    // 请求发生错误时的回调函数
    xhr.onerror = function () {
      // 请求发生错误时，调用 reject() 并传递错误信息
      reject(Error("Network Error"));
    };
    // 发送请求
    xhr.send(data);
  });
}
```

### 2、new 字段发生了什么

实现一个 new

1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

```js
function bind(fn, obj) {
  return function () {
    fn.apply(obj, arguments);
  };
}
function foo(name) {
  this.name = name;
}
function _new(Func, ...args) {
  // 1.创建一个新对象
  const obj = {};
  // 2.新对象原型指向构造函数原型对象
  obj.__proto__ = Func.prototype;
  // 3.将构建函数的this指向新对象
  let result = Func.apply(obj, args);
  // 4.根据返回值判断
  return result instanceof Object ? result : obj;
}
const a = _new(foo);
```

### 3、两个大数相加

```js
// var a = 289987234789127347182937498124
// var b = 982391273471274028349879797980
function add(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0; // 进位
  let result = "";
  while (i >= 0 || j >= 0) {
    let digit1 = i >= 0 ? parseInt(num1[i]) : 0;
    let digit2 = j >= 0 ? parseInt(num2[j]) : 0;
    let sum = digit1 + digit2 + carry;
    carry = Math.floor(sum / 10);
    result = (sum % 10).toString() + result;
    i--;
    j--;
  }
  if (carry > 0) {
    result = carry.toString() + result;
  }
  return result;
}
```

### 4、对 this 的理解

filter 中第二个参数的用法

```js
let a = [1, 2, 3];
a.filter(function () {
  console.log(this); //这个this指的是全局的this
});
let a = [1, 2, 3];
a.filter(() => {
  console.log(this); //这个this指的是
});
```

### 5、数组遍历方法，之间有什么差异，以及哪个性能比较好

## 滴滴

### 1、webpack 和 vite 的区别

```js
Webpack是基于静态分析的打包工具，它通过递归地构建整个项目的依赖关系图来进行打包。在开发模式下使用HMR（热模块替换）来进行实时更新，但性能一般.
Vite则采用了现代的ES Module原生支持，并利用浏览器去按需编译的方式来实现快速的开发启动和热模块更新。
```

### 2、webpack 中的 loader 和 plugin 的区别

```js
在Webpack中，Loader和Plugin都是用于处理模块的工具，但它们在功能和使用方式上有一些区别。
Loader（加载器）：
Loader是Webpack的核心概念之一，用于在打包过程中对模块的源代码进行转换处理。它作为一个转换器，将某种类型的文件（如JavaScript、CSS、图片等）转换为Webpack能够识别和处理的模块。
Loader可以对模块应用各种转换操作，例如编译、压缩、转换文件格式等。每个Loader只负责一种特定的转换任务，多个Loader可以串行或并行工作。
Loader配置在Webpack配置文件中的module.rules字段下，通过正则表达式匹配要处理的文件，然后指定使用哪些Loader进行转换。
Plugin（插件）：
Plugin是Webpack的扩展机制，用于解决除了模块转换之外的其他自动化任务。它可以执行各种功能，例如打包优化、资源管理、注入环境变量等。
Plugin通过在Webpack构建过程的不同阶段注入钩子函数来实现自定义功能。这些钩子函数可以获取Webpack内部的编译信息，允许开发者根据需要进行自定义处理。
Plugin可以单独安装并在Webpack配置文件中引入，然后实例化并添加到plugins字段中。
总结：
Loader是用于对模块源代码进行转换的工具，它主要关注模块的转换处理。
Plugin是用于解决除了模块转换之外的其他自动化任务的工具，它可以执行各种功能并扩展Webpack的能力。
Loader和Plugin都可以在Webpack配置文件中配置和使用，但它们的功能和使用方式不同，各自有着特定的作用和范畴。
```

### 3、ts 中的 any 和 unknow 的区别

```js
在TypeScript中，any 和 unknown 是两个特殊的类型，它们有一些区别和不同的用途。
any类型：
any 类型表示任意类型，相当于关闭了类型检查。使用 any 类型后，变量可以接受任何类型的值，无需进行类型检查。
任何类型的值都可以赋给 any 类型的变量，而且可以调用任意方法或属性，不会触发编译时错误。
使用 any 类型可能会导致类型安全性下降，因为它会绕过类型检查，使得代码更容易出现错误。
当无法确定变量的具体类型或需要与动态类型的第三方库进行交互时，可以使用 any 类型。
unknown类型：
unknown 类型表示未知类型，相当于一个安全版本的 any 类型。
与 any 不同，unknown 类型要求进行类型检查或类型断言后才能进行操作。
无法直接对 unknown 类型的变量调用任意方法或属性，否则会触发编译时错误。
使用 unknown 类型可以提高类型安全性，因为它强制开发者进行类型检查和类型转换。
当需要处理未知类型的值，并希望进行类型检查和安全操作时，可以使用 unknown 类型。
总结来说，any 类型是一种完全放宽类型检查的类型，而 unknown 类型是一种要求进行类型检查和类型断言后才能操作的类型。在编写类型安全的代码时，应尽可能避免使用 any 类型，而是使用更严格的类型，如 unknown 类型，以提高代码的可维护性和可读性。
```

### 4、设计和构建一个“最近最少使用”缓存，该缓存会删除最近最少使用的项目。缓存应该从键映射到值(允许你插入和检索特定键对应的值)，并在初始化时指定最大容量。当缓存被填满时，它应该删除最近最少使用的项目。它应该支持以下操作： 获取数据 get 和 写入数据 put 。获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。当缓存容量达到上限时，它应该在写入新数据之前删除最近最少使用的数据值，从而为新的数据值留出空间。

```js
class LRUCache {
  capacity: number;
  cache: Map<number, number>;
  recent: number[];
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.recent = [];
  }
  get(key: number): number {
    if (this.cache.has(key)) {
      this.updateRecent(key);
      return this.cache.get(key)!;
    } else {
      return -1;
    }
  }
  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.updateRecent(key);
    } else {
      if (this.cache.size >= this.capacity) {
        const leastRecent = this.recent.shift()!;
        this.cache.delete(leastRecent);
      }
      this.cache.set(key, value);
      this.recent.push(key);
    }
  }
  private updateRecent(key: number): void {
    const index = this.recent.indexOf(key);
    if (index !== -1) {
      this.recent.splice(index, 1);
      this.recent.push(key);
    }
  }
}
```

## 美团

### 1、有重复项数字的全排列

给出一组可能包含重复项的数字，返回该组数字的所有排列。结果以字典序升序排列。
数据范围： ，数组中的值满足
要求：空间复杂度 ，时间复杂度
示例 1
输入 [1,1,2]
输出 [[1,1,2],[1,2,1],[2,1,1]]

示例 2
输入 [0,1]
输出 [[0,1],[1,0]]

```js
function permuteUnique(nums) {
  const result = [];
  nums.sort((a, b) => a - b); // 先排序，为了方便处理重复元素
  backtrack(result, nums, [], new Array(nums.length).fill(false));
  return result;
}
function backtrack(result, nums, current, used) {
  if (current.length === nums.length) {
    result.push([...current]);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) {
      continue; // 跳过已经使用过的元素和重复元素
    }
    used[i] = true;
    current.push(nums[i]);
    backtrack(result, nums, current, used);
    used[i] = false;
    current.pop();
  }
}
```

### 2、合并区间

给出一组区间，请合并所有重叠的区间。
请保证合并后的区间按区间起点升序排列。
数据范围：区间组数 ，区间内 的值都满足
要求：空间复杂度 ，时间复杂度
进阶：空间复杂度 ，时间复杂度
示例 1
输入 [[10,30],[20,60],[80,100],[150,180]]
输出 [[10,60],[80,100],[150,180]]

示例 2
输入 [[0,10],[10,20]]
输出 [[0,20]]

```js
function mergeIntervals(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastMergedInterval = merged[merged.length - 1];
    if (currentInterval[0] <= lastMergedInterval[1]) {
      lastMergedInterval[1] = Math.max(
        lastMergedInterval[1],
        currentInterval[1]
      );
    } else {
      merged.push(currentInterval);
    }
  }
  return merged;
}
```

### 3、有效括号序列

给出一个仅包含字符'(',')','{','}','['和']',的字符串，判断给出的字符串是否是合法的括号序列
括号必须以正确的顺序关闭，"()"和"()[]{}"都是合法的括号序列，但"(]"和"([)]"不合法。
数据范围：字符串长度
要求：空间复杂度 ，时间复杂度
示例 1
输入 "["
输出 false

示例 2
输入 "[]"
输出 true

### 4、宏任务和微任务的区别? 执行特点？都有哪些？

#### 分别运行对浏览器有什么影响

##### 例子一

function fn1(){
fn1()
}
fn1()

##### 例子二

function fn2(){
Promise.resolve().then(()=>{
fn2()
})
}
fn2()

##### 例子三

function fn3(){
setTimeout(()=>{
fn3()
},0)
}
fn3()

#### 输出结果是

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});
console.log("script end");
```

### 5、闭包介绍，应用，原理？

### 6、节流和防抖

### 7、Vue 通信方式？

```js
<my-form ref="form">
  <my-form-item>
    <input />
  </my-form-item>
  <div>
    <my-form-item>
      <button />
    </my-form-item>
  </div>
</my-form>
```

事件，通信？
provide

inject

### 8、前端监控？异常处理？

## 如视

### 1、实现 get 函数

```js
function getValueByPath(obj, path) {
  var keys = path.split("."); // 将路径按点分割成数组
  // 递归函数用于深度遍历对象
  function traverse(obj, keys) {
    if (!obj || !keys.length) {
      return obj; // 如果对象为空或者路径已经遍历完，则返回当前值
    }
    var key = keys.shift(); // 取出当前层级的键名
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return traverse(obj[key], keys); // 继续深入下一层级
    } else {
      return undefined; // 路径不存在，返回undefined
    }
  }
  return traverse(obj, keys);
}
```

### 2、登录的逻辑

cookie

## 猿辅导

### 1、实现一个 promise.all()

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedPromises = 0;
    if (promises.length === 0) {
      resolve(results);
    } else {
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((result) => {
            results[index] = result;
            completedPromises++;
            if (completedPromises === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    }
  });
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}
```

### 2、weakMap

### 3、https

### 4、proxy 和 defineProperty 的区别

## 最右

### 1、原型和原型链的关系

```js
在JavaScript中，每个对象都有一个原型（prototype）和一个原型链（prototype chain）。原型是一个对象，它用于共享属性和方法。原型链是一种机制，用于查找对象的属性和方法。
每个JavaScript对象（除了null）都具有一个原型，可以通过__proto__属性来访问。原型是一个对象，它包含了共享的属性和方法。当我们访问一个对象的属性或方法时，如果该对象自身没有这个属性或方法，那么它会去原型中查找。
如果原型本身也有原型，那么就形成了原型链。原型链的顶端是Object的原型，也就是所有对象的最终原型。当我们访问一个对象的属性或方法时，JavaScript引擎会沿着原型链向上查找，直到找到匹配的属性或方法，或者到达原型链的顶端。
这种原型链的机制使得对象之间可以共享属性和方法，提供了一种灵活而高效的方式来实现继承。
例如，假设我们有一个对象obj，它的原型是objPrototype，而objPrototype的原型是objProtoPrototype，以此类推。当我们访问obj的属性或方法时，如果obj自身没有这个属性或方法，它会去objPrototype中查找，然后再去objProtoPrototype中查找，以此类推，直到找到匹配的属性或方法，或者到达原型链的顶端。
这就是JavaScript中原型和原型链的关系。通过原型链，对象可以继承和共享属性和方法，实现了面向对象编程中的继承特性。
```

### 2、vue2 和 vue3 的区别

### 3、vue2 的生命周期

### 4、promise 输出问题

```js
输出 1 3 5 false success 2 6 7 4
const p1 = new Promise((resolve,reject)=>{
    console.log(1)
    resolve('success')
    setTimeout(()=>{
        console.log(2)
        reject('fail')
    })
})
console.log(3)
setTimeout(()=>{
    console.log(4)
},100)
console.log(5)
setTimeout(()=>{
    console.log(6)
})
const p2 = p1.then((res)=>{
    console.log(res)
    setTimeout(()=>{
        console.log(7)
    },0)
    return res
},error=>{
    console.log(error)
    return error
})
console.log(p2 === p1)
```

### 5、用 css 实现如下的多列布局（类似九宫格，右下角为空）效果：父元素宽度自适应所在容器宽度，高度由子元素撑开，有不定数量的直接子元素（可以用 8 个演示），每一行排 3 个子元素，子元素之间的水平、垂直间距为 10px ，子元素的宽度自适应父元素的宽度（(父元素宽度 - 10px \* 2) / 3），子元素的高度与自身的宽度成正比（比如 2:1 ）

```js
<html>
  <body>
    <div class="container">
      <div class="item">子元素1</div>
      <div class="item">子元素2</div>
      <div class="item">子元素3</div>
      <div class="item">子元素4</div>
      <div class="item">子元素5</div>
      <div class="item">子元素6</div>
      <div class="item">子元素7</div>
      <div class="item">子元素8</div>
    </div>
  </body>
  <style>
    .container {
      display: flex;
      flex-wrap: wrap;
    }
    .item {
      flex: 1 1 calc((100% - 20px) / 4); /* 子元素宽度自适应父元素宽度 */
      margin: 10px;
      aspect-ratio: 1/2; /* 子元素的高度与自身的宽度成正比 */
      background-color: pink;
    }
  </style>
</html>
```

## 爱普拉维

### 1、算法

```js
/**
 * 给你一个无重复元素的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的所有不同组合，并以列表形式返回。你可以按任意顺序返回这些组合。
 *
 * candidates 中的同一个数字可以无限制重复被选取。如果至少一个数字的被选数量不同，则两种组合是不同的。
 *
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 *
 * 示例 1：
 * 输入：candidates = [2,3,4,6,7], target = 7
 * 输出：[[2,2,3],[7]]
 * 解释：[2,2,]
 * 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
 * 7 也是一个候选， 7 = 7 。
 * 仅有这两种组合。
 *
 * 示例 2：
 * 输入: candidates = [2,3,5], target = 8
 * 输出: [[2,2,2,2],[2,3,3],[3,5]]
 *
 * 示例 3：
 * 输入: candidates = [2], target = 1
 * 输出: []
 */
```

### 2、浏览器绘制 css 的过程

### 3、BFC 的理解以及应用过程

### 4、dns 的过程

### 5、js 异步

### 6、ajax 的理解

## 华为

### 1、算法题

```js
function countForests(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  function dfs(row, col) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      grid[row][col] === 0
    ) {
      return;
    }
    visited[row][col] = true;
    dfs(row - 1, col); // 上
    dfs(row + 1, col); // 下
    dfs(row, col - 1); // 左
    dfs(row, col + 1); // 右
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        count++;
        dfs(i, j);
      }
    }
  }
  console.log(count);
  return count;
}

const grid = [
  [1, 0, 1, 1, 0],
  [1, 1, 0, 0, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 0, 0],
];

countForests(grid);
```

### 2、算法题

```js
// 某个打印机根据打印队列执行打印任务，打印任务分为九个优先级，分别用数字1~9标识，数字越大优先级越高，打印机每次从队列头部去除第一个任务A，然后检查队列余下任务中有没有比A优先级更高的任务，如果有比A优先级高的任务，则将任务A放到队列尾部，否则就执行任务A的打印
// 请编写一个程序，根据输入的打印任务，输出实际的打印顺序
// 举例：
// 输入{} 输出{}
// 输入{9,9,9} 输出{0,1,2}
// 输入{4,5,8} 输出{2,1,0}
// 输入{3,3,5,3} 输出{2,3,0,1}
function printOrder(tasks) {
  const queue = [];
  const result = [];
  // 将任务按照优先级放入队列中
  for (let i = 0; i < tasks.length; i++) {
    queue.push({
      task: i,
      priority: tasks[i],
    });
  }
  while (queue.length > 0) {
    let highestPriorityIndex = 0;
    let highestPriority = queue[0].priority;
    // 寻找队列中优先级最高的任务
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].priority > highestPriority) {
        highestPriorityIndex = i;
        highestPriority = queue[i].priority;
      }
    }
    const currentTask = queue.splice(highestPriorityIndex, 1)[0];
    result.push(currentTask.task);
    // 如果队列中还有其他优先级更高的任务，则将当前任务放到队列末尾
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].priority > currentTask.priority) {
        queue.push(currentTask);
        break;
      }
    }
  }
  return result;
}
// 测试样例
console.log(printOrder([])); // 输出 []
console.log(printOrder([9, 9, 9])); // 输出 [0, 1, 2]
console.log(printOrder([4, 5, 8])); // 输出 [2, 1, 0]
console.log(printOrder([3, 3, 5, 3])); // 输出 [2, 3, 0, 1]
```

## Shopee

### 1、算法题

```js
// input 为string
// input 包含 字母, -,  _
// 连续的字母需要简写,  规则: 如果连续字母长度>2 首字母+中间长度+尾字母,  否则直接输出
// -, _ 需要正常输出
// jane-jack_jeffery -> j2e-j2k_j5y
// - _ 可能连续, 可能出现在input的任何地方
// 返回处理后的string
function simplifyString(input) {
  let simplified = "";
  let consecutiveCount = 0;
  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    if (currentChar === "-" || currentChar === "_") {
      simplified += currentChar;
      consecutiveCount = 0;
    } else {
      if (i === 0 || input[i - 1] === "-" || input[i - 1] === "_") {
        simplified += currentChar;
      } else {
        consecutiveCount++;
        if (
          i === input.length - 1 ||
          input[i + 1] === "-" ||
          input[i + 1] === "_"
        ) {
          simplified +=
            consecutiveCount > 2
              ? `${consecutiveCount}${currentChar}`
              : currentChar;
          consecutiveCount = 0;
        }
      }
    }
  }
  return simplified;
}
```

### 2、flex 布局问题

```html
<!DOCTYPE html>
<html>
  <body>
    <div class="container">
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box3"></div>
    </div>
    <style>
      .container {
        width: 500px;
        height: 500px;
        background-color: aliceblue;
        display: flex;
        justify-content: space-between;
      }
      .box1 {
        width: 100px;
        height: 50px;
        background-color: aqua;
      }
      .box2 {
        align-self: center;
        width: 100px;
        height: 50px;
        background-color: blue;
      }
      .box3 {
        align-self: flex-end;
        width: 100px;
        height: 50px;
        background-color: red;
      }
    </style>
  </body>
</html>
```

## HashData

### 1、promise 和 async await 这部分需要重新看书 以及迭代器相关的

### 2、深浅拷贝 for in

```js
function copy(obj) {
  const objCopy = {};
  for (let item in obj) {
    if (obj.hasOnwProperty(item)) {
      objCopy[item] = obj[item];
    }
  }
  return objCopy;
}
```

```js
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    // 如果不是对象或者为 null，直接返回该值
    return obj;
  }
  let copy = Array.isArray(obj) ? [] : {}; // 创建一个新的空对象 copy，根据传入对象是否为数组类型来初始化 copy
  for (let key in obj) {
    // 遍历传入对象的所有属性
    if (obj.hasOwnProperty(key)) {
      // 判断属性是否为自身属性（而非继承属性）
      copy[key] = deepCopy(obj[key]); // 如果是自身属性，就递归调用 deepCopy 函数，将属性值复制到 copy 对象中
    }
  }
  return copy; // 返回 copy 对象
}
```

### 3、vue3 和 vue2 的区别

### 4、动画相关

### 5、typeOf 和 instanceOf

### 6、箭头函数和闭包相关的

### 7、Iterable 接口

### 8、bind call apply

## 昆仑

1. require 是如何实现的
2. proxy 的实现原理 以及 reflex
3. 双向链表如何查找是否存在环

## 美团

1. 题目：实现一个简单的 Todo List

要求：

使用 HTML，CSS 和 JavaScript 实现一个简单的 Todo List 应用。
用户应该能够添加新的待办事项。
用户应该能够删除已经完成的待办事项。
用户应该能够标记待办事项为已完成。
用户应该能够查看所有的待办事项，无论是已完成还是未完成的。

2. vue 的原理
3. http 和 websocket 的区别

## 字节

1. 乾坤的原理
2. 伪类伪元素的区别
3. instanceOf typeof undefined
4. dom 和 css 的渲染过程以及合成
5. nextTick 的实现以及原理

## 宜信

1. 事件委托
2. any unknow nerve 的区别
3. type 和 interface 的区别
4. 0.1+0.2 === 0.3 的问题
   使用 toPrecision()方法解决
5. 单行隐藏、多行隐藏的问题
