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
          <uni-forms-item name="captchCode">
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
              v-model="accountInfo.captchCode"
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
            <image :src="captchaImg" class="verify-code-img" @click="getCaptchaImg()"></image>
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
          <uni-forms-item name="captchCode">
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
              v-model="mobileInfo.captchCode"
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
          <view class="page-switch" @click="clickMobileSwitch()">账号登录</view>
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
    <view class="three-login-box">
      <!--分割线-->
      <split-line>
        <text class="line-content">第三方登录</text>
      </split-line>
      <view class="three-icon">
        <i
          v-for="(item, index) in threeIcon"
          :key="index"
          :class="[item.icon, 'icon']"
          :style="{ color: item.color }"
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
          icon: "iconfont icon-QQ",
          color: "rgb(48,165,221)",
        },
        gitee: {
          icon: "iconfont icon-gitee-fill-round",
          color: "rgb(199,29,35)",
        },
        github: {
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
        captchCode: {
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
        captchCode: ""
      },
      mobileInfo: {
        username: "",
        captchCode: "",
      },
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
        if (newVal.captchCode !== null || newVal.captchCode !== "") {
          this.iconColor.c1 = "#595a78";
          // this.inputFlag.c1 = true;
        }
        if (newVal.captchCode === null || newVal.captchCode === "") {
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
        if (newVal.captchCode !== null || newVal.captchCode !== "") {
          this.iconColor.c2 = "#595a78";
        }
        if (newVal.captchCode === null || newVal.captchCode === "") {
          this.iconColor.c2 = "#c0c0c0";
        }
      },
      deep: true,
    },
    // 监控登录方式切换，当切换到账号登录时，更新验证码
    pageSwitch(newVal, oldVal){
      if(newVal === 0){
        this.getCaptchaImg();
        this.accountInfo.captchCode = '';
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
      // this.postRequest('/user/getRegisterCode', {phone: this.registryForm.phone});
    },

    // 获取验证码图片
    getCaptchaImg(){
      this.$http.get("/ape-user-server/user/captchaImg", null, {load: false}).then((response) => {
        this.captchaImg = response.data.data.img;
        this.captchaUuid = response.data.data.uuid;
      }).catch((error) => {
        uni.showToast({title: '验证码加载失败', icon: 'none'})
      })
    },

    // 账号密码登录
    login() {
      this.$refs.accountLogin
        .validate()
        .then((valid) => {
          this.$$http.post('/ape-user-server/oauth2/login', this.accountInfo, { header: {uuid: this.uuid} }).then((response) => {

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
          //   uni.request({
          // 	url: 'http://localhost:9531/role/hello',
          // 	//请求成功后返回
          // 	success: (res) => {
          //     console.log(res)
          // 		// 请求成功之后将数据给Info
          // 	}
          // });
          this.$http.get("/role/hello", {}).then((response) => {
            console.log(response);
          });
          console.log("表单数据信息：", valid);
        })
        .catch((error) => {
          console.log("表单错误信息：", error);
        });
    },
    decode() {
      const sm2 = require("sm-crypto").sm2;
      const cipherMode = 1;
      let encryptData =
        "04CEB0F05C8318C9915C9180B5BE6BEF533A171A0F6B98A5B12025B7DF0E58FBA25730EDB0560E2DAE902BBA458379B6C14E76F248BB606439285E0D8C2BCEE25D11F6388EF55013ECD587DB6984C7469FD925ABC2E7352341FC9B0794531894CA4365335F0F93EE384C80538142D94C6EAA769BCF6F1A8FD4";
      let keypair = sm2.generateKeyPairHex();
      console.log("publicKey = " + keypair.publicKey);
      console.log("privateKey = " + keypair.privateKey);

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