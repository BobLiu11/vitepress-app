# Hello VitePress

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

:tada: :100:

[[toc]]

{{ 1 + 1 }}

<span v-for="i in 3">{{ i }} </span>

::: v-pre
`{{ This will be displayed as-is }}`
:::

<test></test>

<script setup>
import test from './../components/test.vue'
</script>

<!-- ---
{ "title": "Hello vue", "editLink": true, "sidebar": true }
--- -->

<!-- # {{ $frontmatter.title }} -->

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger STOP
Danger zone, do not proceed
:::

```js
export default {
  name: "MyComponent",
  // ...
};
```

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id"> {{ todo.text }} </li>
</ul>
```
# vue.md
[vue - index](./vue/index.md) <!-- 跳转到 vue 文件夹的 index.html-->


# 无痕模式
在无痕模式下，浏览器不会保存任何浏览记录、缓存、插件、表单数据等信息，同时也不会将这些信息发送给网站服务器，但个别第三方小众浏览器可能会夹带私货，做出其他危险的改动。
需要注意的是，无痕模式只能保护用户的隐私不被本地记录，但无法保护用户的隐私不被网络追踪。在无痕模式下，用户的IP地址、访问时间、浏览器类型等信息仍然可以被网站服务器记录下来。所以无痕模式仅是从常规手段规避一些个人隐私的上传。
无痕模式的实现方式因浏览器而异，通常会采用以下措施：

1. 禁用浏览器的历史记录功能，不会记录访问过的网页地址。
2. 禁用浏览器的缓存功能，不会保存网页的静态资源（如图片、CSS、JS等）。
3. 禁用浏览器的cookie、storage等功能，不会保存网站设置的本地缓存。
4. 禁用浏览器的表单自动填充功能，不会保存用户输入的表单数据。
5. 禁用绝大部分浏览器插件功能。

