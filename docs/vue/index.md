---
{ "title": "Hello vue", "editLink": true, "sidebar": true }
---

# {{ $frontmatter.title }}

::: tip
1、父组件给子组件的注册事件中，把自定义事件传给子组件，在子组件实例化的时候进行初始化；而浏览器原生事件是在父组件中处理
:::


<test></test>

<script setup>
import test from '../../components/test.vue'
</script>
