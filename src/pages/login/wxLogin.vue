<template>
  <view class="login-box">
    <view class="logo-wrap">
      <image class="logo"></image>
    </view>
    <view class="main-wrap" v-if="canIUse || canIGetUserProfile">
      <view class="content">
        <view>申请获取以下权限</view>
        <text>获得你的公开信息(昵称、头像、地区等)</text>
      </view>
      <!--新版登录方式-->
      <wyb-button
        v-if="canIGetUserProfile"
        width="100%"
        type="filled"
        color="#FF7C3C"
        ripple="true"
        ripple-bg-color="rgba(255,255,255,0.15)"
        font-size="36rpx"
        :radius="['40rpx']"
        box-shadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
        @click="bindWxLogin()"
        >微信快速授权登录</wyb-button
      >
      <!--旧版登录方式-->
      <button
        v-else
        class="login-btn"
        open-type="getUserInfo"
        withCredentials="true"
        lang="zh_CN"
        @getuserinfo="bindWxLogin()"
      >
        微信快速授权登录
      </button>
    </view>
    <view v-else class="text-center">请升级微信版本</view>

    <navigator
      class="mobileLogin"
      hover-class="none"
      url="/pages/login/mobileLogin"
      >免密登录</navigator
    >
  </view>
</template>

<script>
import jwtDecode from 'jwt-decode';
export default {
  data() {
    return {
      canIGetUserProfile: false,
      canIUse: uni.canIUse("button.open-type.getUserInfo"),
    };
  },
  created() {
    this.setCanIGetUserProfile();
  },
  methods: {
    setCanIGetUserProfile() {
      if (uni.getUserProfile) {
        this.canIGetUserProfile = true;
      }
    },

    bindWxLogin() {
      const _this = this;
      uni.getProvider({
        service: "oauth",
        success: function (res) {
          // 判断服务商等于weixin
          if (~res.provider.indexOf("weixin")) {
            // 如果是 canIGetUserProfile=true，使用新版登录方式，否则使用旧版
            if (_this.canIGetUserProfile) {
              uni.getUserProfile({
                desc: "获取微信用户的昵称与头像",
                success: (infoRes) => {
                  _this.login(infoRes);
                },
                fail: () => {
                  uni.showToast({
                    title: "微信登录授权失败",
                    icon: "none",
                  });
                },
              });
            } else {
              uni.getUserInfo({
                provider: "weixin",
                success: function (infoRes) {
                  _this.login(infoRes);
                },
                fail: () => {
                  uni.showToast({
                    title: "微信登录授权失败",
                    icon: "none",
                  });
                },
              });
            }
          } else {
            uni.showToast({
              title: "请先安装微信或升级版本",
              icon: "none",
            });
          }
        }.bind(this),
      });
    },

    login(infoRes){
      let _this = this;
      uni.login({
        provider: "weixin",
        success: function(loginRes) {
          _this.$http.post("/ape-user/oauth2/wxApp/login", 
            {
              code: loginRes.code,
              rawData: infoRes.rawData,
              signature: infoRes.signature,
              encryptedData: infoRes.encryptedData,
              iv: infoRes.iv
            },
            { header: {
                "content-type":"application/x-www-form-urlencoded;charset=UTF-8",
              },
              load: false,
            },
            ).then((response) => {
              let jwtData = jwtDecode(response.data.access_token);
              _this.$store.commit('login', jwtData);
            });
          }
      });
      
    },

  },
};
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .logo-wrap {
    height: 400rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .logo {
      margin: 0 auto;
      width: 150rpx;
      height: 150rpx;
      background-color: $normal-background-color;
      border-radius: 50%;
    }
  }
  .main-wrap {
    display: flex;
    flex-direction: column;
    padding: 0 80rpx;
    .content {
      line-height: 90rpx;
      margin-bottom: 40rpx;
      border-top: 1px solid $normal-color;
      color: $normal-color;
      view {
        margin-top: 40rpx;
        font-size: $biggest-font-size;
        font-weight: bolder;
        color: #555555;
      }
    }
    .login-btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      color: #ffffff;
      border: none;
      background-color: #ff7c3c;
      border-top-left-radius: 40rpx;
      border-top-right-radius: 40rpx;
      border-bottom-right-radius: 40rpx;
      border-bottom-left-radius: 40rpx;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .mobileLogin {
    position: absolute;
    bottom: 50rpx;
    width: 100%;
    text-align: center;
    color: $normal-color;
  }
}
</style>