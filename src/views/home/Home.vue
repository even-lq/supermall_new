<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 ref="tabControlTop"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"/> <!-- -->

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"><!---->
      <home-swiper :banners="banners"
                   @swiperImageLoad.once="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   ref="tabControlBottom"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  /*子组件*/
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  /*公共组件*/
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getMultiData, getHomeGoods} from "network/home";
  import {itemListenerMixin} from "common/mixin";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // itemImageListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.离开时保持滑动的Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.离开时取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    created() {
      //1.请求多个数据
      this.getMultiData()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    /*mounted() {
    },已经混入了*/
    methods: {
      /**
       *  事件监听相关的方法
       */
      tabClick(index) {
        this.currentType = (index < 1) ? 'pop' : (index == 1) ? 'new' : 'sell';
        this.$refs.tabControlTop.currentIndex = index;
        this.$refs.tabControlBottom.currentIndex = index;
        /*switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }*/
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        /*console.log(position);*/
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      //2.获取tabControl的offsetTop
      //所有组件都有一个属性：$el => 用于获取组件中的元素
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControlBottom.$el.offsetTop
      },

      /**
       * 网络请求相关方法
       */
      getMultiData() {
        getMultiData().then(res => {
          //  console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;


    /*在使用原生浏览器的时候为了不让导航栏跟随页面滚动*/
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .tab-control {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .content {
    height: 89vh;/*标准：87.6*/
    overflow: hidden;
    /*margin-top: 43px;*/
  }
</style>
