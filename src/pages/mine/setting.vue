<template>
  <view class="setting-container">
    <view class="list-item" v-for="(item, index) in listItem" :key="index" @click="callItem(item)">
      <text class="text">{{ item.title }}</text>
      <view class="theme-color" :style="{ backgroundColor: ((!$commonJs.isEmpty(checkColor) && styles.themeColor !== checkColor) ? checkColor : styles.themeColor) }" v-if="item.hasOwnProperty('theme')"></view>
      <icon class="iconfont icon-youjiantou"></icon>
    </view>
    <view class="logout" @click="logout()">退出登录</view>

    <bottom-popup class="bottom-popup" style="width:100%; height: 100%; position: fixed; bottom: -100%; background-color: transparent; z-index: 100;"
      v-on:closePopup="closePopupAnimation()"
      :animation="animationData" 
      @touchmove.stop.prevent=""
    >
      <scroll-view class="scroll-view" scroll-y="true" :style="{ height: scrollViewHeight }">
        <view class="color-item">
          <text class="title">推荐主题色:</text>
          <view class="color-container">
            <view class="color-box" v-for="(item, index) in colorItem" :key="index" @click="checkCurrentColor(index)" :style="{ border: (index === colorActive ? '1rpx solid #8ce600' : '1rpx solid #f2f2f2') }">
              <view class="color-block" :style="{ backgroundColor: item.value }"></view>
            </view>
          </view>
          <wyb-button
            class="custom-color-btn"
            width="30%"
            type="filled"
            :color="((!$commonJs.isEmpty(checkColor) && styles.themeColor !== checkColor) ? checkColor : styles.themeColor)"
            ripple="true"
            ripple-bg-color="rgba(255,255,255,0.15)"
            box-shadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
            @click="openColorPicker()"
          >自定义颜色</wyb-button>
          <t-color-picker ref="colorPicker" :color="normalpickerColor" @confirm="confirm()"></t-color-picker>
        </view>
        
      </scroll-view>
    </bottom-popup>
  </view>
</template>

<script>
import styles from '../../uni.scss';
import bottomPopup from '../../components/custom/bottom-popup.vue';
import tColorPicker from '../../components/t-color-picker/t-color-picker.vue';
export default {
  data() {
    return {
      // 初始化动画实例
      animationData: {},
      scrollViewHeight: '',
      // 标记当前选中的主题色块
      colorActive: 0,
      checkColor: '',
      normalpickerColor: {r: 255,g: 124,b: 60,a: 1},
      listItem: [
        {
          title: "账号与安全",
          navigateUrl: './setting/accountSecurity'
        },
        {
          theme: 'theme',
          title: "主题颜色"
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
      colorItem: [
        {
          value: '#FF7C3C',
          description: '活力橙'
        },
        {
          value: '#FFC0CB',
          description: '樱花粉'
        },
        {
          value: '#C2D3FD',
          description: '浅紫'
        }
      ],
    };
  },
  components: {
    bottomPopup,
    tColorPicker
  },
  //生命周期 - 开始加载
  onLoad() {
    this.$commonJs.setNavigationBarColor();
    // 创建动画实例
    this.animation = uni.createAnimation();
    let bottomPopupDom = uni.createSelectorQuery().select(".bottom-popup");
    bottomPopupDom
      .boundingClientRect((dom) => {
        this.scrollViewHeight = (dom.height * 0.80 - 30) + "px";
      })
    .exec();
  },
  onShow(){
    this.$commonJs.setNavigationBarColor();
  },
  onUnload() {
    // 页面关闭后清空数据
    this.animationData = {}
  },
  created(){
    // 获取登录用户主题颜色
    this.getLoginUserThemeColor();
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    styles(){
      return styles;
    }
  },
  methods: {
    popupAnimation(){
      this.animation.translateY('-100%').step({duration: 200});
      this.animationData = this.animation.export();
    },
    closePopupAnimation(){
      this.animation.translateY('100%').step({duration: 200});
      this.animationData = this.animation.export();
    },
    callItem(item){
      if (item.hasOwnProperty('navigateUrl') && !this.$commonJs.isEmpty(item.navigateUrl)){
        uni.navigateTo({
          url: item.navigateUrl
        })
        return;
      }else if (item.hasOwnProperty('theme')){
        this.popupAnimation();
        return;
      }
    },
    // 打开颜色选择器
    openColorPicker(){
      this.$refs.colorPicker.open();
    },
    // 更新选中的主题颜色
    confirm(e){
      let hexColor = e.hex;
      let oldColorActive = this.colorActive;
      if (this.$commonJs.isEmpty(this.userInfo.id)) {
        uni.showToast({title: '请先登录', icon: 'none'})
        return;
      }
      this.$http.post(`/ape-user/userInfo/modifyThemeColor/${this.userInfo.id}`, 
        { themeColor: hexColor }, 
        {header: {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}, load: true}).then((response) => {
        if (response.status === 500) {
          this.colorActive = oldColorActive;
          return;
        }
        // 更新缓存用户信息
        this.userInfo.themeColor = hexColor;
        this.$store.commit('updateUserInfo', this.userInfo);
        styles.themeColor = hexColor;
        // 将自定义的颜色push到数组
        this.colorItem.push({value: hexColor.toUpperCase(), description: ''});
        this.checkColor = styles.themeColor;
        this.colorActive = this.colorItem.length - 1;
        this.$commonJs.setNavigationBarColor();
      }).catch((error) => {
        this.colorActive = oldColorActive;
        uni.showToast({title: '网络错误', icon: 'none'})
      })
    },
    getLoginUserThemeColor(){
      if (!this.$commonJs.isEmpty(this.userInfo)){
        let existsColor = false;
        let curIndex = 0;
        this.colorItem.forEach((value, index) => {
          if (this.styles.themeColor.toUpperCase() === value.value.toUpperCase()) {
            existsColor = true;
            curIndex = index;
            return;
          }
        })
        if (existsColor) {
          this.colorActive = curIndex;
        } else {
          this.colorItem.push({value: this.styles.themeColor, description: ''});
          this.colorActive = this.colorItem.length - 1;
        }
      }
    },
    // 点击选择推荐主题颜色
    checkCurrentColor(index){
      let oldColorActive = this.colorActive;
      if (oldColorActive === index){
        return;
      }
      this.colorActive = index;
      if (this.$commonJs.isEmpty(this.userInfo.id)) {
        uni.showToast({title: '请先登录', icon: 'none'})
        return;
      }
      // 更新选中的主题颜色
      this.$http.post(`/ape-user/userInfo/modifyThemeColor/${this.userInfo.id}`, 
        { themeColor: this.colorItem[index].value }, 
        {header: {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}, load: true}).then((response) => {
        if (response.status === 500) {
          this.colorActive = oldColorActive;
          return;
        }
        // 更新缓存用户信息
        this.userInfo.themeColor = this.colorItem[index].value;
        this.$store.commit('updateUserInfo', this.userInfo);
        styles.themeColor = this.colorItem[index].value;
        this.checkColor = styles.themeColor;
        this.$commonJs.setNavigationBarColor();
      }).catch((error) => {
        this.colorActive = oldColorActive;
        uni.showToast({title: '网络错误', icon: 'none'})
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
    // 设置主题色块居中
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
    .theme-color{
      position: absolute;
      right: 80rpx;
      width: 40rpx;
      height: 40rpx;
      border-radius: 10rpx;
      border: 1px solid #ddd;
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

  /deep/ .popup-container .popup {
    height: 80%;
  }
  .scroll-view{
    box-sizing: border-box;
    padding: 0rpx 30rpx 10rpx;
    .color-item{
      .title{
        line-height: 50rpx;
        color: #9e9e9e;
      }
      .color-container{
        display: flex;
        flex-direction: row;
        .color-box{
          width: 50rpx;
          height: 50rpx;
          border-radius: 6rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 30rpx 30rpx 30rpx 0rpx;
        }
        .color-block{
          width: 40rpx;
          height: 40rpx;
          border-radius: 6rpx;
        }
      }
      .custom-color-btn{
        /deep/ button {
          margin-top: 20rpx !important;
        }
      }
    }
  }
}
</style>