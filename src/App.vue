<script setup lang="ts">
import request from './utils/request'
async function getTest(){
  const data=await request.get('/home/index')
  console.log(data);
  
}
getTest()
</script>

<template>
  <router-view></router-view>
</template>



<style lang="less" scoped>
</style>
