### 1、BFS 广度优先搜索和深度优先遍历 DFS 算法二叉树的层序遍历

BFS 广度优先搜索

```js
function breadthFirstTraversal(tree) {
  if (!tree) return []; // 如果树为空，则返回空数组
  const queue = [tree]; // 创建一个空队列，并将根节点入队
  const result = []; // 创建一个空数组，用于存储遍历结果
  while (queue.length > 0) {
    const node = queue.shift(); // 取出队首节点
    result.push(node.value); // 将节点值存储到结果数组中
    for (const child of node.children) {
      // 遍历节点的子节点
      queue.push(child); // 将子节点入队
    }
  }
  return result; // 返回广度优先遍历结果
}
```

深度优先遍历 DFS

```js
function depthFirstTraversal(node, result = []) {
  if (!node) return []; // 如果节点为空，则返回空数组
  result.push(node.value); // 将节点值存储到结果数组中
  for (const child of node.children) {
    // 遍历节点的子节点
    depthFirstTraversal(child, result); // 递归遍历子节点
  }
  return result; // 返回深度优先遍历结果
}
```

二叉树的前序遍历-根左右

```js
const preOrder = (root) => {
  if (!root) {
    return;
  }
  console.log(root);
  preOrder(root.left);
  preOrder(root.right);
};
```

二叉树的中序遍历-左根右

```js
function inorderTraversal(root) {
  if (root === null) {
    return [];
  }
  const result = [];
  function traverse(node) {
    if (node.left) {
      traverse(node.left);
    }
    result.push(node.val);
    if (node.right) {
      traverse(node.right);
    }
  }
  traverse(root);
  return result;
}
```

二叉树的后序遍历-左右根

```js
const postOrder = (root) => {
  if (!root) {
    return;
  }
  postOrder(root.left);
  postOrder(root.right);
  console.log(n.val);
};
```

二叉树的层序遍历

```js
const levelOrder = (root) => {
  if (!root) {
    return [];
  }
  const queue = [[root, 0]];
  const res = [];
  while (queue.length) {
    const n = queue.shift();
    const [node, leval] = n;
    if (!res[leval]) {
      res[leval] = [node.val];
    } else {
      res[leval].push(node.val);
    }
    if (node.left) {
      queue.push([node.left, leval + 1]);
    }
    if (node.right) {
      queue.push([node.right, leval + 1]);
    }
  }
  return res;
};
```

图的深度优先算法

```js
function dfsRecursive(graph, startNode) {
  const visited = new Set();
  function dfs(node) {
    visited.add(node);
    console.log(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }
  dfs(startNode);
}
```

图的广度优先算法

```js
function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (!visited.has(currentNode)) {
      visited.add(currentNode);
      console.log(currentNode);
      for (const neighbor of graph[currentNode]) {
        queue.push(neighbor);
      }
    }
  }
}
```

快速排序

```js
function quickSort(arr) {
  const rec = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
    const left = [];
    const right = [];
    const mid = arr[0]; // 基准元素
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...rec(left), mid, ...rec(right)];
  };
  return res(arr);
}
```

二分查找

```js
function BinarySearch(arr, target) {
  if (arr.length <= 1) return -1;
  let lowIndex = 0; // 低位下标
  let highIndex = arr.length - 1; // 高位下标
  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // 中间下标
    if (target < arr[midIndex]) {
      highIndex = midIndex - 1;
    } else if (target > arr[midIndex]) {
      lowIndex = midIndex + 1;
    } else {
      return midIndex; // target === arr[midIndex]
    }
  }
  return -1;
}
```

### 2、节流（throttling）防抖（Debouncing）

```js
function throttle(func, delay) {
  let lastCall = 0; // 上一次调用的时间戳
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      func(...args); // 如果距离上次调用的时间超过了指定的延迟时间，则执行函数
      lastCall = now; // 更新上一次调用的时间戳
    }
  };
}
```

```js
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // 每次调用前先清除之前设置的定时器
    timer = setTimeout(() => {
      func(...args); // 延迟一段时间后执行函数
    }, delay);
  };
}
```
