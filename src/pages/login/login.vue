<template>
  <view class="login-box">
    <view class="logo-wrap">
      <image class="logo"></image>
    </view>
    <view class="main-wrap">
      <!-- <view class="tab-box">
        <view
          class="tab"
          :class="{ active: tabIndex == index }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="clickTab(index)"
          >{{ item.name }}</view
        >
      </view> -->
      <view class="account-login-card" v-if="pageSwitch === 0">
        <uni-forms
          ref="accountLogin"
          :modelValue="accountInfo"
          :rules="formRules"
        >
          <uni-forms-item name="username">
            <span
              class="iconfont icon-shouji"
              :style="{ color: iconColor.u1 }"
            ></span>
            <uni-easyinput
              :inputFlag="inputFlag.u1"
              :inputBorder="false"
              :trim="true"
              type="text"
              placeholder="账号"
              clearSize="15"
              :clearable="true"
              maxlength="11"
              v-model="accountInfo.username"
            />
          </uni-forms-item>
          <uni-forms-item name="password">
            <span
              class="iconfont icon-mima"
              :style="{ color: iconColor.p1 }"
            ></span>
            <uni-easyinput
              :inputFlag="inputFlag.p1"
              :inputBorder="false"
              :trim="true"
              type="password"
              bot
              placeholder="密码"
              maxlength="18"
              v-model="accountInfo.password"
            />
          </uni-forms-item>
          <uni-forms-item name="captchaCode">
            <span
              class="iconfont icon-yanzhengma"
              :style="{ color: iconColor.c1 }"
            ></span>
            <uni-easyinput
              class="input-verify-code"
              :inputFlag="inputFlag.c1"
              :inputBorder="false"
              :trim="true"
              type="text"
              bot
              placeholder="验证码"
              clearSize="15"
              maxlength="6"
              v-model="accountInfo.captchaCode"
            />
            <!-- <wyb-button
              class="verify-code-btn"
              type="hollow"
              color="#FF7C3C"
              :radius="['0']"
              font-size="32"
              ripple="true"
              ripple-bg-color="rgba(0,0,0,0.15)"
              :disabled="verifyCode.normalBtn"
              >获取验证码</wyb-button
            > -->
            <image :src="captchaImg" alt="图片加载失败" class="verify-code-img" @click="getCaptchaImg()"></image>
          </uni-forms-item>
        </uni-forms>
        <view class="login-page-box">
          <view class="page-switch" @click="clickAccountSwitch()"
            >手机登录</view
          >
          <view class="page-regist">注册</view>
        </view>
        <wyb-button
          class="login-btn"
          width="100%"
          type="filled"
          color="#FF7C3C"
          ripple="true"
          ripple-bg-color="rgba(255,255,255,0.15)"
          font-size="36rpx"
          :radius="['40rpx']"
          box-shadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
          @click="login()"
          >登录</wyb-button
        >
      </view>
      <!--手机号登录-->
      <view class="mobile-login-card" v-if="pageSwitch === 1">
        <uni-forms
          ref="mobileLogin"
          :modelValue="mobileInfo"
          :rules="formRules"
        >
          <uni-forms-item name="username">
            <span
              class="iconfont icon-shouji"
              :style="{ color: iconColor.u2 }"
            ></span>
            <uni-easyinput
              :inputFlag="inputFlag.u2"
              :inputBorder="false"
              :trim="true"
              type="text"
              placeholder="账号"
              clearSize="15"
              :clearable="true"
              maxlength="11"
              v-model="mobileInfo.username"
            />
          </uni-forms-item>
          <uni-forms-item name="smsCode">
            <span
              class="iconfont icon-yanzhengma"
              :style="{ color: iconColor.c2 }"
            ></span>
            <uni-easyinput
              class="input-verify-code"
              :inputFlag="inputFlag.c2"
              :inputBorder="false"
              :trim="true"
              type="text"
              bot
              placeholder="验证码"
              clearSize="15"
              maxlength="6"
              v-model="mobileInfo.smsCode"
            />
            <wyb-button
              class="verify-code-btn"
              type="hollow"
              color="#FF7C3C"
              :radius="['0']"
              font-size="32"
              ripple="true"
              ripple-bg-color="rgba(0,0,0,0.15)"
              :disabled="verifyCode.mobileBtn"
              @click="getRegistryCode()"
              >{{ secondText }}</wyb-button
            >
          </uni-forms-item>
        </uni-forms>
        <view class="login-page-box">
          <view class="page-switch" @click="clickMobileSwitch()">密码登录</view>
          <view class="page-regist">注册</view>
        </view>
        <wyb-button
          class="login-btn"
          width="100%"
          type="filled"
          color="#FF7C3C"
          ripple="true"
          ripple-bg-color="rgba(255,255,255,0.15)"
          font-size="36rpx"
          :radius="['40rpx']"
          box-shadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
          @click="login2()"
          >登录</wyb-button
        >
      </view>

      <!-- <wyb-button
        class="regist-btn"
        width="100%"
        type="hollow"
        color="#FF7C3C"
        ripple="true"
        ripple-bg-color="rgba(0,0,0,0.15)"
        font-size="36rpx"
        :radius="['40rpx']"
        box-shadow="0 2px 12px 0 rgba(0, 0, 0, 0.1)"
        @click="clickMobileSwitch()"
        >注册</wyb-button
      > -->
    </view>
    <!--新版登录方式-->
                <button v-if="canIGetUserProfile" class='login-btn' type='primary' @click="bindGetUserInfo"> 授权登录 </button>
                <!--旧版登录方式-->
                <button v-else class='login-btn' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="bindGetUserInfo"> 授权登录 </button>
    <view class="three-login-box">
      <!--分割线-->
      <split-line>
        <text class="line-content">社交登录</text>
      </split-line>
      <view class="three-icon">
        <i
          v-for="(item, index) in threeIcon"
          :key="index"
          :class="[item.icon, 'icon']"
          :style="{ color: item.color }"
          @click="socialLogin(item.name)"
        ></i>
      </view>
    </view>
  </view>
</template>

<script>
import { uniForms } from "../../components/uni-forms/uni-forms.vue";
import { uniFormsItem } from "../../components/uni-forms-item/uni-forms-item.vue";
import { uniEasyinput } from "../../components/uni-easyinput/uni-easyinput.vue";
import { uniDataCheckbox } from "../../components/uni-data-checkbox/uni-data-checkbox.vue";
import styles from "../../uni.scss";
export default {
  data() {
    return {
      pageSwitch: 0,
      totalCount: 0,
      captchaImg: '',
      canIGetUserProfile: false,
      // tabList: [
      //   { id: "1", name: "账号登录" },
      //   { id: "2", name: "手机登录" },
      // ],
      iconColor: {
        u1: "#c0c0c0",
        p1: "#c0c0c0",
        c1: "#c0c0c0",
        u2: "#c0c0c0",
        c2: "#c0c0c0",
      },
      verifyCode: {
        normalBtn: false,
        mobileBtn: false,
      },
      inputFlag: {
        u1: false,
        p1: false,
        c1: false,
        u2: false,
        c2: false,
      },
      accountFlag: {
        usernameFlag: false,
      },
      threeIcon: {
        qq: {
          name: "qq",
          icon: "iconfont icon-QQ",
          color: "rgb(48,165,221)",
        },
        gitee: {
          name: "gitee",
          icon: "iconfont icon-gitee-fill-round",
          color: "rgb(199,29,35)",
        },
        github: {
          name: "github",
          icon: "iconfont icon-github",
          color: "#333333",
        },
      },
      formRules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: "手机号不能为空",
            },
            {
              pattern: "^[1][3,4,5,7,8][0-9]{9}$",
              errorMessage: "手机号错误",
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "密码不能为空",
            },
            {
              minLength: 6,
              maxLength: 18,
              errorMessage: "密码长度为{minLength}~{maxLength}个字符",
            },
          ],
        },
        captchaCode: {
          rules: [
            {
              required: true,
              errorMessage: "验证码不能为空",
            },
          ],
        },
      },
      captchaUuid: '',
      accountInfo: {
        username: "",
        password: "",
        captchaCode: ""
      },
      mobileInfo: {
        username: "",
        smsCode: "",
      },
      userInfo: {},
    };
  },
  components: {
    uniForms,
    uniFormsItem,
    uniEasyinput,
    uniDataCheckbox,
  },
  created(){
    this.getCaptchaImg();
    this.setCanIGetUserProfile();
  },
  computed: {
    // 获取验证码文本
    secondText() {
      return this.totalCount !== 0
        ? `${this.totalCount}秒再次获取`
        : "点击获取";
    },
  },
  watch: {
    accountInfo: {
      handler(newVal, oldVal) {
        if (newVal.username !== null || newVal.username !== "") {
          this.iconColor.u1 = "#595a78";
          // this.inputFlag.u1 = true;
        }
        if (newVal.username === null || newVal.username === "") {
          this.iconColor.u1 = "#c0c0c0";
          // this.inputFlag.u1 = false;
        }
        if (newVal.password !== null || newVal.password !== "") {
          this.iconColor.p1 = "#595a78";
          // this.inputFlag.p1 = true;
        }
        if (newVal.password === null || newVal.password === "") {
          this.iconColor.p1 = "#c0c0c0";
          // this.inputFlag.p1 = false;
        }
        if (newVal.captchaCode !== null || newVal.captchaCode !== "") {
          this.iconColor.c1 = "#595a78";
          // this.inputFlag.c1 = true;
        }
        if (newVal.captchaCode === null || newVal.captchaCode === "") {
          this.iconColor.c1 = "#c0c0c0";
          // this.inputFlag.c1 = false;
        }
      },
      deep: true,
    },
    mobileInfo: {
      handler(newVal, oldVal) {
        if (newVal.username !== null || newVal.username !== "") {
          this.iconColor.u2 = "#595a78";
        }
        if (newVal.username === null || newVal.username === "") {
          this.iconColor.u2 = "#c0c0c0";
        }
        if (newVal.smsCode !== null || newVal.smsCode !== "") {
          this.iconColor.c2 = "#595a78";
        }
        if (newVal.smsCode === null || newVal.smsCode === "") {
          this.iconColor.c2 = "#c0c0c0";
        }
      },
      deep: true,
    },
    // 监控登录方式切换，当切换到账号登录时，更新验证码
    pageSwitch(newVal, oldVal){
      if(newVal === 0){
        this.getCaptchaImg();
        this.accountInfo.captchaCode = '';
      }
    }
  },
  methods: {
    clickAccountSwitch() {
      this.pageSwitch = 1;
    },

    clickMobileSwitch() {
      this.pageSwitch = 0;
    },

    // 获取注册码
    getRegistryCode() {
      if (this.$commonJs.isEmpty(this.mobileInfo.username)){
        uni.showToast({title: '请输入手机号码', icon: 'none'})
        return;
      }
      if (!this.$commonJs.validatePhone(this.mobileInfo.username)){
        uni.showToast({title: '手机号码不合法', icon: 'none'})
        return;
      }
      // 按钮60秒倒计时
      this.verifyCode.mobileBtn = true;
      this.totalCount = 60;
      this.getCode(); //下一次60秒才能调用的事件
      this.interval = setInterval(() => {
        this.totalCount--;
        if (this.totalCount === 0) {
          clearInterval(this.interval);
          this.verifyCode.mobileBtn = false;
        }
      }, 1000);
    },
    getCode(){
      this.$http.post(`/ape-user/user/sms/${this.mobileInfo.username}`, null, {load: false}).then((response) => {
        // console.log(response.data);
      }).catch((error) => {
        uni.showToast({title: '验证码获取失败', icon: 'none'})
      })
    },

    // 获取验证码图片
    getCaptchaImg(){
      this.$http.get("/ape-user/user/captchaImg", null, {load: false}).then((response) => {
        console.log(response)
        this.captchaImg = response.data.img;
        this.captchaUuid = response.data.uuid;
      }).catch((error) => {
        uni.showToast({title: '验证码加载失败', icon: 'none'})
      })
    },

    // 账号密码登录
    login() {
      // this.decode();
      // const ecdh = require('ecdh/examples/ecdh');
      // console.log(ecdh)
      // var curve = ecdh.getCurve('secp128r1');
      // const aliceKeys = ecdh.generateKeys(curve);
      // console.log(aliceKeys)

      // const ecdh = require('create-ecdh');
      // console.log(ecdh.createECDH())
      // var curve = ecdh.getCurve('secp128r1');
      // var curve = ecdh.createECDH;
      // const aliceKeys = ecdh.generateKeys(curve);
      // console.log(aliceKeys)

//       const crypto = require('crypto-browserify');
// const alice = crypto.createECDH('secp256k1');
// console.log(alice)
// alice.generateKeys();

// const bob = crypto.createECDH('secp256k1');
// bob.generateKeys();

// const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
// const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

// const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');
// const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

// console.log(aliceSharedKey === bobSharedKey);
// console.log('Alice shared Key: ', aliceSharedKey);
// console.log('Bob shared Key: ', bobSharedKey);
// bufferutil@^4.0.1 utf-8-validate@^5.0.2 @vue/compiler-sfc@^3.0.0-beta.14 canvas@2.5.0 adbkit@^2.11.1 jimp@^0.10.1 node-simctl@^6.1.0 puppeteer@^3.0.1
      this.$refs.accountLogin
        .validate()
        .then((valid) => {
          this.$http.post('/ape-user/user/oauth2/captchaLogin', this.accountInfo, { header: {uuid: this.captchaUuid, 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'} }).then((response) => {
            if(response.code == 400){
              uni.showToast({title: response.data, icon: 'none'})
              // 错误信息为 “账号密码错误” 时，自动刷新验证码
              if(response.data === '账号密码错误') {
                this.getCaptchaImg();
              }
            }
            // todo 将token保存
            console.log(response)
          }).catch((error) => {
            uni.showToast({title: '网络异常', icon: 'none'})
          })
        })
        .catch((error) => {
          console.log("表单错误信息：", error);
        });
    },

    // 免密登录
    login2() {
      this.$refs.mobileLogin
        .validate()
        .then((valid) => {
          this.$http.post("/ape-user/user/oauth2/smsLogin", this.mobileInfo, { header: {uuid: this.captchaUuid, 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'} }).then((response) => {
            console.log(response.data);
          }).catch((error) => {
            uni.showToast({title: '网络异常', icon: 'none'})
          })
        })
        .catch((error) => {
          console.log("表单错误信息：", error);
        });
    },

    // 社交登录
    socialLogin(loginType){
      if(loginType === 'qq'){

      }else if(loginType === 'gitee'){
        this.$http.get('/ape-user/oauth2/gitee/login', null).then((response) => {
          console.log(response)
        }).catch((error) => {
          uni.showToast({title: '网络异常', icon: 'none'})
        })
      }else if(loginType === 'github'){

      }
    },

    decode() {
      const sm2 = require("sm-crypto").sm2;
      const cipherMode = 1;
      let encryptData =
        "04CEB0F05C8318C9915C9180B5BE6BEF533A171A0F6B98A5B12025B7DF0E58FBA25730EDB0560E2DAE902BBA458379B6C14E76F248BB606439285E0D8C2BCEE25D11F6388EF55013ECD587DB6984C7469FD925ABC2E7352341FC9B0794531894CA4365335F0F93EE384C80538142D94C6EAA769BCF6F1A8FD4";
      let keypair = sm2.generateKeyPairHex();


      encryptData = sm2.doEncrypt(
        "awc213we123dwadsadsd",
        "04B34887F9D924AA83AB9EAC5B85C6E72E1C37907354A69615A18C50C9DABC77D941174E55E1F9B9B93FA39B7B539E89E827621703698B852499D298882CF26DF2",
        cipherMode
      ); // 加密结果
      // encryptData = encryptData.slice(2);
      const decryptData = sm2.doDecrypt(
        encryptData,
        "e402da5128f9a7febe407ade5b433746308fe0ec765d627868d980ebe0b311c2",
        cipherMode
      );

      console.log("encryptData = " + `04${encryptData}`);
      console.log("decryptData = " + decryptData);

      // const signData = sm2.doSignature("hello", keypair.privateKey,  { hash:true, der:true });
      // console.log(signData)

      const ver2 = sm2.doVerifySignature(
        "sign",
        "304502210089F04BCB1D5D46D8B8109E3FC42D1623217690B9D15D807DCB1952C3DB482B1B02205685AA7497E201291A3378DA37578F3F0C9CB56C2EEF480F45D88D74B5979916",
        "04B34887F9D924AA83AB9EAC5B85C6E72E1C37907354A69615A18C50C9DABC77D941174E55E1F9B9B93FA39B7B539E89E827621703698B852499D298882CF26DF2",
        { hash: true, der: true }
      );
      console.log(ver2);
    },

    setCanIGetUserProfile(){
      if( uni.getUserProfile ){
        this.canIGetUserProfile = true;
      }
    },

    //登录授权
    bindGetUserInfo(e) {
      let _this = this;
      if(this.canIGetUserProfile){
          //新版登录方式
          uni.getUserProfile({
              desc:'登录',
              success:(res)=>{
                  console.log(res);
                  _this.userInfo = res.userInfo;
                  try {
                      _this.login();
                  } catch (e) {}
              },
              fail:(res)=>{
                  console.log(res)
              }
          });
      }else{
          //旧版登录方式
          if (e.detail.userInfo) {
            console.log("=-=-")
              _this.userInfo = e.detail.userInfo;
              console.log(_this.userInfo)
              try {
                  _this.login();
              } catch (e) {}
          } else {
              console.log('用户拒绝了授权');
              //用户按了拒绝按钮
          }
      }
    },

    appLoginWx(){
      let _this = this;
      // #ifdef MP-WEIXIN
      uni.getProvider({
        service: 'oauth',
        success: function (res) {
          // 判断服务商等于weixin
          if (~res.provider.indexOf('weixin')) {
            uni.login({
                provider: 'weixin',
                success: (loginRes) => {
                  console.log(loginRes)
                  // 如果是 canIGetUserProfile=true，使用新版登录方式，否则使用旧版
                  if (_this.canIGetUserProfile){
                    uni.getUserProfile({
                      desc: '登录',
                      provider: 'weixin',
                      success: (info) => {//这里请求接口
                          console.log('用户昵称为：' + info.userInfo.nickName);
                      },
                      fail: () => {
                          uni.showToast({title:"微信登录授权失败",icon:"none"});
                      }
                    })
                  }else {

                  }
                },
                fail: () => {
                  uni.showToast({title:"微信登录授权失败",icon:"none"});
                }
            })
          }else{
              uni.showToast({
                  title: '请先安装微信或升级版本',
                  icon:"none"
              });
          }
        }
      });
      //#endif
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/iconfont.scss";
.login-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .logo-wrap {
    height: 350rpx;
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
    .tab-box {
      display: flex;
      flex-direction: row;
      margin-bottom: 50rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      text-align: center;
      color: #595a78;
      font-weight: bold;
      box-shadow: $normal-box-shadow;
      .tab {
        width: 50%;
        border-radius: 40rpx;
      }
    }
    .account-login-card,
    .mobile-login-card {
      /deep/ .uni-forms {
        display: block;
        margin-bottom: 20rpx;
        .uni-forms-item {
          .iconfont {
            position: absolute;
            display: flex;
            align-items: center;
            height: 100%;
            font-size: 42rpx;
            z-index: 100;
          }
          .uni-forms-item__inner {
            padding: 0;
          }
          .uni-easyinput__content {
            min-height: 100rpx;
            line-height: 100rpx;
            .uni-easyinput__content-input {
              padding-left: 60rpx !important;
              height: 100rpx;
              font-size: $biggest-font-size;
              color: $uni-text-color;
            }
          }
          .input-verify-code {
            .uni-easyinput__content {
              width: 64% !important;
            }
          }
          .verify-code-img{
            position: absolute;
            right: 0;
            bottom: 2rpx;
            height: 98%;
            width: 36%;
          }
          .verify-code-btn {
            position: absolute;
            right: 0;
            bottom: 2rpx;
            width: 36%;
            button {
              width: 31% !important;
              height: 100rpx !important;
              position: absolute;
              left: 0;
              bottom: 0rpx;
              padding: 0;
              border: none !important;
              background-color: rgba(248, 248, 248, 0.8) !important;
            }
          }
        }
      }
    }
  }
  .login-page-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50rpx;
    color: $normal-color;
    .page-regist {
      text-decoration: underline;
    }
  }
  .regist-btn {
    margin-top: 30rpx;
  }
  .three-login-box {
    position: absolute;
    bottom: 0;
    height: 20%;
    width: 100%;
  }
  .line-content {
    color: #bfbfbf;
    font-size: 28rpx;
    padding: 0 14rpx;
    font-weight: 500;
  }
  .three-icon {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 300rpx;
    margin: 30rpx auto 0rpx;
    .icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      font-size: 80rpx;
    }
  }
}

.active {
  background-color: $normal-background-color;
  color: #fff;
}
.not-empty-active {
  color: $normal-font-color !important;
}
</style>