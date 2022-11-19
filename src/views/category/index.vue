<script lang="ts" name="TopCategory" setup>
import { watch } from 'vue';
import {useRoute} from 'vue-router'
const route =useRoute()

// 可以使用 watch 监听route 来控制弹层是否显示
// watch(
//   ()=>route.path,
//   ()=>{
//     console.log(123)
//   }
// )
</script>

<template>
  <div class="category">一级分类组件-{{route.params}}</div>
</template>


<style></style>