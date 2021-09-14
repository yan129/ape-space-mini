<template>
  <view class="title-split">
    <view class="left-line"></view>
    <slot>
        <text class="content">猜你喜欢</text>
    </slot>
    <view class="right-line"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {

    }
  },
};
</script>

<style lang="scss" scoped>
.title-split {
  margin: 48rpx 0 28rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // .content {
  //   color: #BFBFBF;
  //   font-weight: 500;
  //   font-size: 28rpx;
  //   padding: 0 24rpx;
  // }
  .left-line, .right-line {
    width: 120rpx;
    height: 4rpx;
    border-radius: 3rpx;
    &:first-of-type {
      background: linear-gradient(90deg, #fff 0%, #bfbfbf 100%);
    }
    &:last-of-type {
      background: linear-gradient(90deg, #bfbfbf 0%, #fff 100%);
    }
  }
}
</style>