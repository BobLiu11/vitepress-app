---
{ 
    "title": "Hello vue", 
    "editLink": true, 
    "sidebar": true 
}
---

# {{ $frontmatter.title }}

{{ 1 + 1 }}

<span v-for="i in 3">{{ i }} </span>

::: v-pre
`{{ This will be displayed as-is }}`
:::

<test></test>

<script setup>
import test from '../../components/test.vue'
</script>
