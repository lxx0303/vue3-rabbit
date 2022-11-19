// 所有接口的通用类型
export interface ApiRes<T>{
  code:string
  msg:string
  result:T
}
// 单个分类的类型
export interface categoryItem{
  id:string
  name:string
  picture:string
  children:categoryItem[]//无论有多少层都可以，
  open:boolean//控制头部弹层显示
}