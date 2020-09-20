<template>
  <swiper class="detail-swiper">
    <template #swiperx>
      <swiper-item v-for="item in topImages" class="swiper-item">
        <img :src="item" alt="">
      </swiper-item>
    </template>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 400px;
    overflow: hidden;
  }

</style>
