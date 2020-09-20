<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-active="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="total-price">合计{{totalPrice}}</div>
    <div class="total-calculate">去计算({{checkLength}})</div>

  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //法一：
        if(this.cartList.length === 0) return false
        return !(this.cartList.filter(item => !item.checked).length)

        //法二：
        /*if(this.cartList.length === 0) return false
        return !(this.cartList.find(item => !item.checked))*/

        //法三：
        // if(this.cartList.length === 0) return false
        // for(let item of this.cartList) {
        //   if(!item.checked) return false
        // }
        // return true

      },
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 15px;

  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 60px;
  }

  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .total-price {
    flex: 1;
    margin-left: 20px;
  }

  .total-calculate {
    width: 90px;
    background-color: var(--color-tint);
    color: #eeeeee;
    text-align: center;
  }
</style>
