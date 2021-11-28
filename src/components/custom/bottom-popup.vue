<template>
  <view class="popup-container" @click="closePopup()">
    <!--@click.stop="" 阻止点击冒泡-->
    <view class="popup" @click.stop="">
        <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
        // 初始化动画实例
        animationData: {},
    }
  },
  //生命周期 - 开始加载
  onLoad() {
    // 创建动画实例
    this.animation = uni.createAnimation()
  },
  onUnload() {
    // 页面关闭后清空数据
    this.animationData = {}
  },
  //方法入口
  methods: {
    closePopup(){
        this.$emit("closePopup");
    }
  }
};
</script>

<style lang="scss" scoped>
    .popup-container{
      width: 100%;
      height: 100%;
    //   position: fixed;
    //   bottom: -100%;
    //   background-color: transparent;
    //   z-index: 100;
      .popup{
        width: 100%;
        height: 69%;
        background: #fff;
        position: absolute;
        bottom: 0;
        border-radius: 40rpx 40rpx 0 0;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      }
    }
</style>