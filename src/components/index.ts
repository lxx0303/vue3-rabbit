// 统一的注册所有的全局组件
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import { App } from 'vue'
export default {
  // app 创建出来的应用实例 => 类型是固定的 => vue库内部会提供好实例类型的
  install(app: App) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
  },
}