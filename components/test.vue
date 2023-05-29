<template>
  <div class="title">组件标题</div>
</template>
<script lang="ts" setup>
import {
  reactive,
  ref,
  defineComponent,
  watch,
  computed,
  onMounted,
} from "vue";
const dataCon = ref("组件");
</script>
<style lang="sass">
.title
    font-size: 20px
</style>
