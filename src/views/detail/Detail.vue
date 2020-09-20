<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentPosition">
      <detail-swiper :top-images="topImages "/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getDetail, getRecommend, Shop, GoodsParam, Goods} from "../../network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        // itemImageListener: null
        themeTopYs:[],
        currentIndex: 0
      }
    },
    created() {
      //1.保持存入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情页的数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //1.获取顶部轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //4.获取详情商品信息
        this.detailInfo = data.detailInfo

        //5.保持参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        /*this.$nextTick(() => {
          法二：可以在这里插入offsetTop：缺点 -> dom渲染完成但是图片还没加载完，计算的offsetTop不准确
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        })*/

        /*法四：创建一个新的函数变量 接收 防抖后 监听到的图片加载函数，在Detail.vue的imageLoad回调中调用该函数变量，实现精确计算offsetTop
        this.getthemeTopYs = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        })*/

      })

      //3.获取推荐信息
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    /*mounted() {
    },已经混入了*/
    /*updated() {
      法一：可以在这里插入offsetTop：缺点 -> 数据更新频繁
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    },*/
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        // console.log('-----');

        //（最佳方法）法三：防抖后计算
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);

        /*4.法四：created中已解释
        this.getthemeTopYs()*/
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentPosition(position) {
        //1.滚动改变导航栏
        const positionY = -position.y
        let length = this.themeTopYs.length
        //法一：普通方法
        for (let i = 0; i < length; i++) {
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
            ((i === length - 1) && positionY >= this.themeTopYs[i]))){
            this.currentIndex = i
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //法二：给themeTopYs加上一个非常大的值用于判断数组最后一个数实现简单判断
        /*for (let i = 0; i < length - 1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }*/

        //2.滚动到一定位置显示回到顶部按钮
        this.backTopListener(position)
      },
      addToCart() {
        //1.获取购物车需要的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc ;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车里（1.Promise 2.mapAcrions）
        // this.$store.commit('addCart', product)
        /*this.$store.dispatch('addCart', product).then(res => {
          console.log(res);
        })*/
        this.addCart(product).then(res => {
          this.$toast.show(res)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
