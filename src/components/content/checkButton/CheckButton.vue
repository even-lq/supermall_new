<template>
  <div class="check-button" :class="{check: isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
