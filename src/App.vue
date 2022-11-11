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
    <router-view />
    <p>哈哈哈</p>
    <ul>
      <li>123</li>
      <li>456</li>
    </ul>
    <div class="box">
    我是 App
  </div>
  </div>
  
</template>



<style lang="less" scoped>
.box {
  width: 300px;
  height: 300px;
  background-color:@xtxColor;
  .hoverShadow()
}
</style>
