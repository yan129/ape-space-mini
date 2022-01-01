<template>
  <view class="setting-container">
    <view class="list-item" v-for="(item, index) in listItem" :key="index" @click="jumpPage(item.navigateUrl)">
      <text class="text">{{ item.title }}</text>
      <icon class="iconfont icon-youjiantou"></icon>
    </view>
    <view class="logout" @click="logout()">退出登录</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // show: false,
      url: "",
      listItem: [
        {
          title: "账号与安全",
          navigateUrl: './setting/accountSecurity'
        },
        {
          title: "主题颜色",
          navigateUrl: './theme/themeColor'
        },
        {
          title: "用户协议",
          navigateUrl: ''
        },
        {
          title: "隐私政策",
          navigateUrl: ''
        },
        {
          title: "意见反馈",
          navigateUrl: ''
        },
        {
          title: "关于猿空间",
          navigateUrl: ''
        },
      ],
    };
  },
  methods: {
    jumpPage(navigateUrl){
      uni.navigateTo({
        url: navigateUrl
      })
    },
    logout() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/iconfont.scss";
.setting-container {
  height: 100%;
  background-color: #f2f2f2;
  .list-item {
    height: 120rpx;
    line-height: 120rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    color: $uni-text-color;
    background-color: #fff;
    .text {
      height: 119rpx;
      width: 100%;
      position: absolute;
      border-bottom: 1rpx solid #f7f7f7;
    }
    .icon-youjiantou {
      right: 20rpx;
      position: absolute;
      font-size: 48rpx;
      color: #ddd;
    }
    &:last-child .text {
      height: 120rpx;
      border-bottom: none !important;
    }
  }
  .logout {
    height: 120rpx;
    line-height: 120rpx;
    margin-top: 20rpx;
    text-align: center;
    background-color: #fff;
  }
}
</style>