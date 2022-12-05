// 所有接口的通用类型
export interface ApiRes<T>{
  code:string
  msg:string
  result:T
}

// 分类中的商品类型
export interface CateGoodsItem{
  desc:string
  // discount:null
  id:string
  name:string
  // orderNum:null
  picture:string
  price:string
}
// 单个分类的类型
export interface categoryItem{
  id:string
  name:string
  picture:string
  children:categoryItem[]//无论有多少层都可以，
  goods:CateGoodsItem[]
  open:boolean//控制头部弹层显示
}

// ==============================================

// 轮播图类型
export interface BannerItem {
  hrefUrl: string
  id:string
  imgUrl:string
  type: string
}


