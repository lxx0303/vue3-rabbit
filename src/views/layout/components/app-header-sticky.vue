<script lang="ts" setup name="AppHeaderSticky">
import { onBeforeUnmount, onMounted, ref } from "vue";
import AppHeaderNav from "./app-header-nav.vue";
import { useWindowScroll } from "@vueuse/core";

// hooks =>封装了一些工具函数 =>  称之为hooks

// 吸顶组件
const { y } = useWindowScroll();

// 封装滚动条监听事件
// function useHMScrollY() {
//   //监听滚动条的滚动，获取滚动距离，当滚动距离 >=78 动态的设置show 类名
//   //等dom加载完，再注册事件监听，created(再vue3中直接卸载setup中)，mounted(注册生命周期事件)
//   const y = ref(0);
//   const onScroll = () => {
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     y.value = scrollTop; //存储scrollTop
//     // console.log('scrollTop:',document.documentElement.scrollTop);
//   };

//   onMounted(() => {
//     window.addEventListener("scroll", onScroll);
//   });

//   // 相当于beforeDestory
//   onBeforeUnmount(() => {
//     window.removeEventListener("scroll", onScroll);
//   });

//   // y 以后需要使用，所以要记得return
//   return y
// }
// const y=useHMScrollY()
</script>

<template>
  <!-- v-if 不要加在最外面的盒子，需要有两个状态，才能渐变动画 -->
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <!-- 如果这个容器，没有吸顶，内容不要显示 -->
    <div class="container" v-if="y > 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%); //让当前的app-header-sticky这个盒子看不见
  &.show {
    //显示吸顶盒子的类名
    transition: all 0.3s linear;
    transform: translateY(0%);
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(@/assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
