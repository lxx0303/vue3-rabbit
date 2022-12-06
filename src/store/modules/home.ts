import {defineStore} from 'pinia'
import request from '@/utils/request'
import { ApiRes, BannerItem, GoodItem, HotsGoods } from '@/types/data'

export default defineStore('home',{
  state() {
    return{
      bannerList:[] as BannerItem[],
      newGoodList:[] as GoodItem[],
      hootGoodList:[] as HotsGoods[]
    }
  },
  actions:{
    async getBannerList(){
      const res=await request.get<ApiRes<BannerItem[]>>('/home/banner')
      // console.log(res,'轮播图'); 
      this.bannerList=res.data.result
    },
    // 新鲜好物部分
    async getNewList(){
      const res =await request.get<ApiRes<GoodItem[]>>('/home/new')
      // console.log(res,"新鲜好物");
      this.newGoodList=res.data.result
    },
    // 人气推荐
    async getHotList(){
      const res =await request.get<ApiRes<HotsGoods[]>>('/home/hot')
      // console.log(res,"人气推荐");
      this.hootGoodList=res.data.result
    }
  }
})