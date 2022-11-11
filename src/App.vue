<script setup lang="ts">
import request from './utils/request'
async function getTest(){
  const data=await request.get('/home/index')
  console.log(data);
  
}
getTest()
</script>

<template>
  <div>
    我是app组件
  </div>
</template>



<style lang="scss" scoped>

</style>
