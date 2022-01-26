<template>
  <view class="login-box">
    <view class="logo-wrap">
      <image class="logo"></image>
    </view>
    <view class="main-wrap">
      <view class="mobile-login-card">
        <uni-forms
          ref="mobileLogin"
          :modelValue="mobileInfo"
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
              v-model="mobileInfo.username"
            />
          </uni-forms-item>
          <uni-forms-item name="smsCode">
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
          @click="mobileLogin()"
          >登录</wyb-button
        >
      </view>
    </view>
    
  </view>
</template>

<script>
import { uniForms } from "../../components/uni-forms/uni-forms.vue";
import { uniFormsItem } from "../../components/uni-forms-item/uni-forms-item.vue";
import { uniEasyinput } from "../../components/uni-easyinput/uni-easyinput.vue";
import { uniDataCheckbox } from "../../components/uni-data-checkbox/uni-data-checkbox.vue";
export default {
  data() {
    return {
      totalCount: 0,
      iconColor: {
        u1: "#c0c0c0",
        c1: "#c0c0c0",
      },
      inputFlag: {
        u1: false,
        c1: false,
      },
      accountFlag: {
        usernameFlag: false,
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
              errorMessage: "手机号码不合法",
            },
          ],
        },
        smsCode: {
          rules: [
            {
              required: true,
              errorMessage: "验证码不能为空",
            },
          ],
        },
      },
      mobileInfo: {
        username: "",
        smsCode: "",
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
    mobileInfo: {
      handler(newVal, oldVal) {
        if (newVal.username !== null || newVal.username !== "") {
          this.iconColor.u1 = "#595a78";
        }
        if (newVal.username === null || newVal.username === "") {
          this.iconColor.u1 = "#c0c0c0";
        }
        if (newVal.smsCode !== null || newVal.smsCode !== "") {
          this.iconColor.c1 = "#595a78";
        }
        if (newVal.smsCode === null || newVal.smsCode === "") {
          this.iconColor.c1 = "#c0c0c0";
        }
      },
      deep: true,
    },
  },
  methods: {
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

    // 免密登录
    mobileLogin() {
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
    /deep/ .wyb-button{
      margin-top: 50rpx;
    }
  }
}
</style>