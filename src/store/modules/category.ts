import { defineStore } from 'pinia'
import request from '@/utils/request'
import {ApiRes,categoryItem} from '@/types/data'

export default defineStore('category', {
  state() {
    return{
      // 头部分类-PC
      list:[] as categoryItem[], //初始化的空数组，和现在的不统一
    }
  },
  actions:{
    async getCateGoryList(){
      const res=await request.get<ApiRes<categoryItem[]>>('/home/category/head')
      console.log(res.data.result,'头部分类-PC');
      this.list=res.data.result
    }
  }
})