<script lang="ts" setup name="XtxCarousel">
// 有个坑：script里面没有写东西，效果显示不出来

import { BannerItem } from '@/types/data'
// js接收数据写法
import { onMounted, onUnmounted, PropType, ref } from 'vue'//一定要导入这个才行
// 🐖以这个写法为主🐖
// 1、js的defineProps （对象的写法） 
const props=defineProps({
  slides:{
    type:Array as PropType<BannerItem[]>,
    required:true
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 3000,
  },
})
// ts写法
// const props=defineProps<{
//   slides: BannerItem[]
//   autoPlay:boolean
//   duration:number
// }>()

// 控制高亮的下标
const active = ref(0)
// 左
const onPrev=()=>{
  active.value--
  // 如果active.value小于下标的最小值，此时应该归到下标额最大值
  if (active.value<0) {
    active.value=props.slides.length-1
  }
}
// 右
const onNext=()=>{
  active.value++
  // 如果active.value溢出了下标的最大值，此时应该归零
  if(active.value > props.slides.length-1){
    active.value=0
  }
}


// 播放
const play=()=>{
  // 在模块环境写代码的时候，定时器延时器，会识别成node中的定时器延时器
  // 但我们要的是浏览器端的，所以需要在 setInterval 加一个 window.
  clearInterval(timer)//开启之前先清理，防止开启多个定时器
  timer=window.setInterval(()=>{
    onNext()
  },props.duration)
}
// 暂停
const stop=()=>{
  clearInterval(timer)
}
// 定时器逻辑，控制轮播
let timer:number=-1
onMounted(()=>{
  if (!props.autoPlay) return
  play()
})
// 清除定时器
// onUnmounted相当于destoryed
onUnmounted(()=>{
  stop()
})
</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <!-- 轮播图主体 -->
    <ul class="carousel-body">
      <li v-for="(item, index) in slides" :key="index" class="carousel-item" :class="{ fade:active===index}">
        <RouterLink :to="item.hrefUrl">
          <img
            :src="item.imgUrl"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <!-- 左箭头 -->
    <a href="javascript:;" class="carousel-btn prev" @click="onPrev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 右箭头 -->
    <a href="javascript:;" class="carousel-btn next" @click="onNext"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 小圆点 -->
    <div class="carousel-indicator">
      <span v-for="(item, index) in slides" :key="item.id" :class="{active:active===index}"></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>