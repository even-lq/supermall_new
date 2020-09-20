import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
  //该混入用于替换回到顶部组件，暂且不替换Home组件，让其与Detail的混入效果对比
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    //1.图片加载完成的实践监听: 商品组件被挂载，但是商品的图片信息还未加载，此时scroll高度计算有误，需要刷新
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // setTimeout(括号里面的东西会放在最后执行)，所以即使不写延迟也会延迟执行
    this.itemImageListener = () => {
      refresh() /*虽然refresh是局部变量但是改函数在闭包里面所以在栈内不会被丢弃*/
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    backTopListener(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }

}
