import { defineStore } from 'pinia'
import request from '@/utils/request'
import {ApiRes,categoryItem} from '@/types/data'
import {topCategory} from '../constants'

const defaultCategory=topCategory.map((item)=>{
  return{
    name:item,
  }
})

export default defineStore('category', {
  state() {
    return{
      // 头部分类-PC
      list:defaultCategory as categoryItem[], //初始化的空数组，和现在的不统一
    }
  },
  actions:{
    // 头部分类-pc
    async getCateGoryList(){
      const res=await request.get<ApiRes<categoryItem[]>>('/home/category/head')
      // console.log(res.data.result,'头部分类-PC');
      
      // 这里对后台返回的数据进行加工，新增一个属性 open ，用来标记弹层的显示和隐藏
      // 默认所有的都隐藏
      // 一进页面，将所有数据遍历，并且添加属性
      res.data.result.forEach((item)=>{
        item.open=false//item中没有open这个属性，可以直接自己在categoryItem添加
      })
      
      this.list=res.data.result
    },
    // 显示
    // 通过id判断的
    show(id:string){
      const itemObj=this.list.find((item)=>item.id===id)
      itemObj!.open=true // ?. 只能用于获取，不能用于赋值
      // 可以加一个 ！表示 非空断言，就是一定存在这个open属性
    },
    // 隐藏
    hide(id:string){
      const itemObj=this.list.find((item)=>item.id===id)
      itemObj!.open=false
    }
  }
})