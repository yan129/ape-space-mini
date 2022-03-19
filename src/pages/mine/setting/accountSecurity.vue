<template>
  <view class="account-security-container">
    <view class="list-item" @click="toClipperPage()">
      <text class="text">头像</text>
      <image class="avatar" @click.stop="previewImg(userInfo)" :src=" userInfo.avatar != null ? userInfo.avatar : 'https://ape-space.oss-cn-shenzhen.aliyuncs.com/avatar/avatar.jpg'"></image>
      <icon class="iconfont icon-youjiantou"></icon>
    </view>
    <view class="list-item">
      <text class="text">昵称</text>
      <text class="nickname">{{ userInfo.nickname }}</text>
      <icon class="iconfont icon-youjiantou"></icon>
    </view>
    <view class="list-item" v-if="!$commonJs.isEmpty(userInfo) && !userInfo.hasOwnProperty('loginType')">
      <text class="text">账号</text>
      <text class="username">{{ userInfo.username }}</text>
      <icon class="iconfont icon-youjiantou"></icon>
    </view>
    <view class="list-item" v-else>
      <text class="text">手机号</text>
      <text class="username">{{ userInfo.phone != null ? userInfo.phone : '绑定' }}</text>
      <icon class="iconfont icon-youjiantou"></icon>
    </view>
    <view class="list-item remark-item">
      <text class="text">个性签名</text>
      <text class="remark">{{ userInfo.remark != null ? userInfo.remark : '未填写' }}</text>
      <icon class="iconfont icon-youjiantou"></icon>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  onShow(){
    this.$commonJs.setNavigationBarColor();
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  methods: {
    // 预览图片
    previewImg(userInfo) {
      let images = [];
      if (userInfo != null) {
        images[0] = userInfo.avatar;
      } else {
        images[0] =
          "https://ape-space.oss-cn-shenzhen.aliyuncs.com/avatar/avatar.jpg";
      }
      uni.previewImage({
        current: 0,
        urls: images,
        longPressActions: {
          //长按保存图片到相册
          itemList: ["保存图片"],
          success: (data) => {
            uni.saveImageToPhotosAlbum({
              //保存图片到相册
              filePath: payUrl,
              success: function () {
                uni.showToast({ icon: "success", title: "保存成功" });
              },
              fail: (err) => {
                uni.showToast({ icon: "none", title: "保存失败，请重新尝试" });
              },
            });
          },
          fail: (err) => {
            console.log(err.errMsg);
          },
        },
      });
    },
    toClipperPage() {
      uni.navigateTo({
        url: "/pages/mine/clipper?type=avatar",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../static/css/iconfont.scss";
.account-security-container {
  height: 100%;
  background-color: #f2f2f2;
  .list-item {
    height: 120rpx;
    line-height: 120rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    // 设置头像居中
    display: flex;
    align-items: center;
    color: $uni-text-color;
    background-color: #fff;
    .text {
      height: 119rpx;
      width: 100%;
      position: absolute;
      border-bottom: 1rpx solid #f7f7f7;
    }
    .avatar {
      position: absolute;
      right: 80rpx;
      width: 100rpx;
      height: 100rpx;
    }
    .nickname, .username, .remark {
      position: absolute;
      right: 80rpx;
      color: #9e9e9e;
      text-align: right;
    }
    .remark{
        width: 65%;
        line-height: 48rpx;
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
}
</style>