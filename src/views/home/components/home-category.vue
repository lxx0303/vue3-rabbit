<script lang="ts" setup name="HomeCategory">
import useStore from "@/store";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import XtxSkeleton from "@/components/skeleton/index.vue";

const { category } = useStore();

// 弹窗内容显示
// 实现思路：
// 1、鼠标进入某个id，记录id
// 2、根据记录的id，动态的获取需要展示layer goods数据
const categoryId = ref("");
const handleEnter = (id: string) => {
  if (!id) return;
  categoryId.value = id;
  // console.log(categoryId.value); 可以拿到id
};
const goods = computed(() => {
  const itemObj = category.list.find((item) => item.id === categoryId.value);
  return itemObj?.goods;
});
</script>
<template>
  <div class="home-category" @mouseleave="categoryId = ''">
    <!-- 菜单 -->
    <ul class="menu">
      <li
        v-for="(item, index) in category.list"
        @mouseenter="handleEnter(item.id)"
        :key="index"
        :class="{ active: item.id === categoryId }"
      >
        <!-- `/category/${item.id}` -->
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!-- <RouterLink
          to="/"
          v-for="sub in item.children?.slice(0, 2)"
          :key="sub.id"
          >{{ sub.name }}</RouterLink
        > -->

        <!-- 如果在不会 ?.的情况下，可以使用v-if，但是要注意v-if 要在v-for的上一层，也就是容器盒子中 -->
        <!-- template 是vue 内置的模板标签，不会渲染任何结构，只是用于划分结构块 或 v-if -->
        <template v-if="item.children">
          <RouterLink
            to="/"
            v-for="sub in item.children?.slice(0, 2)"
            :key="sub.id"
            >{{ sub.name }}</RouterLink
          >
        </template>

        <!-- 骨架屏 -->
        <template v-else>
          <XtxSkeleton
            :width="60"
            :height="18"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
            animated
          ></XtxSkeleton>
          <XtxSkeleton
            :width="50"
            :height="18"
            bg="rgba(255,255,255,0.2)"
            animated
          ></XtxSkeleton>
        </template>
      </li>
    </ul>

    <!-- 弹层 -->
    <div class="layer" v-if="goods">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      // &:hover 鼠标在 li 上时，对应 li 正常高亮 （辅助高亮）
      // &.active 鼠标悬停到对应盒子，根据 id 也要让对应的 li 高亮
      &:hover {
        background: @xtxColor;
      }
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
