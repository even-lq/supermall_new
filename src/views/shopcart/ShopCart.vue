<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";


  import Scroll from "components/common/scroll/Scroll";
  //mapGetters可以将store中的getters直接映射到计算属性中
  //而当计算属性需要调用state时用getters方便管理
  import {mapGetters} from 'vuex'

  export default {
    name: "ShopCart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //调用方法一：
      ...mapGetters(['cartLength']),

      //调用方法二：重命名
      /*...mapGetters({
        length: 'cartLength'
      })
      然后在上面可以直接使用{{length}}*/
    },

  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
