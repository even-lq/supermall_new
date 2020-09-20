<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.iid" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    margin-top: 44px;
    display: flex;
    flex-wrap: wrap;/*根据元素的宽度决定一行放几个元素*/
    justify-content: space-evenly; /*均匀排列每个元素,每个元素之间的间隔相等*/
    padding: 2px;
  }
</style>
