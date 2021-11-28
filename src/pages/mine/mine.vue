<!--  -->
<template>
  <view class="mine-container page">
    <view class="mine-top" :style="{ background: (backImg != '' ? `url(${backImg})` : 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)') }">
      <view class="stars">
        <view class="star" style="top: 100rpx; left: 400rpx; animation-delay: 3s;"></view>
        <view class="star" style="top: 30rpx; left: 310rpx; animation-delay: 2.5s;"></view>
        <view class="star" style="top: 140rpx; left: 480rpx; animation-delay: 2s;"></view>
        <view class="star" style="top: 35rpx; left: 540rpx; animation-delay: 4s;"></view>
        <view class="star" style="top: 90rpx; left: 640rpx; animation-delay: 2s;"></view>
        <view class="star" style="top: 25rpx; left: 738rpx; animation-delay: 3.5s;"></view>
      </view>
      <view class="avatar-box">
        <image class="avatar" src="../../static/123.jpg"></image>
      </view>
      <view class="baseinfo-box">
        <view class="baseinfo">
          <text class="loginRegist" v-if="!isLogin" @click="toLoginPage()">登录/注册</text>
          <slot v-else>
            <text class="nickname">{{ userInfo.nickname }}</text>
            <text class="remark">{{ userInfo.remark }}</text>
            <view class="other-operation">
              <text class="">关注 2</text>
              <text class="">粉丝 4</text>
            </view>
          </slot>
        </view>
      </view>
      <view class="setting-background"></view>
    </view>
    <view class="mine-bottom">
      <view class="operation-box">
        <view class="selector-card" 
          v-for="(item, index) in selectorCard" 
          :key="index" 
          :style="{backgroundImage: 'url(' + item.png + ')'}">
          <text class="maintitle">{{ item.text }}</text>
          <text class="subtitle">{{ item.text }}</text>
        </view>
      </view>
      <view class="list-box">
        <view class="list-item" v-for="(item, index) in listItem" :key="index" @click="callItem(item)">
          <icon :class="['iconfont', item.icon]"></icon>
          <text class="text">{{ item.text }}</text>
          <icon class="iconfont icon-youjiantou"></icon>
        </view>
      </view>
      <view class="more-container">
        <view class="title">更多功能</view>
        <view class="more">
          <view>asd</view>
          <view>asd</view>
          <view>asd</view>
        </view>
      </view>
    </view>
    <!-- @touchmove.stop.prevent="" 阻止弹窗底部的页面一起滚动，加在弹窗层-->
    <!-- <view class="popup-container" @click="closePopupAnimation()" :animation="animationData" @touchmove.stop.prevent=""> -->
      <!--@click.stop="" 阻止点击冒泡-->
      <!-- <view class="popup" @click.stop="">
        asd
      </view>
    </view> -->
    <bottom-popup style="width:100%; height: 100%; position: fixed; bottom: -100%; background-color: transparent; z-index: 100;"
      v-on:closePopup="closePopupAnimation()"
      :animation="animationData" 
      @touchmove.stop.prevent=""
    >
      asda
    </bottom-popup>
  </view>
</template>

<script>
import bottomPopup from '../../components/custom/bottom-popup.vue';
  export default {
    data() {
      return {
        // isLogin: false,
        // 初始化动画实例
        animationData: {},
        // 背景图片
        backImg: '',
        selectorCard: {
          publish: {
            text: '发布',
            png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVRoge2azW7TQBhF73UiakGBqLRSFiyiwooVC8RbQGKeoKvW4oEQYdU3sCkbHoIFK3agLPmp1BSFKlXruWywY4SSjn/UcZDPKra+zJwrzXg09lASAIAkACB4eXQ3SZJdkj6ADTSDc0nzTqfzJXr1/BQAMu98gNF+tC2PjwB4zlRXY2j0KX4THKfemehoL+qKHKC58gDgiRyM9qJudiP9YXxtgdh041UAYtP42kovvcV9+G6MipN3zQIIbPLQ+Yu869pIL6MN4Jru1SULKPww1K+ynREclP3vMqwDEPoYj4Npxf4mwzB+CuBmxXYybIfQNH5dWR4AIOh7He2kWAWgcFFbhwaXdbUFWAYQsTMKo14dHYrs19FOivUcEPh4GMZTQdOynTmdxH/oEezVLVGFtV8H2gCusZ8DwozSV3iYLa2htwHhvqDbdcjZYB3g7Xj0wbL02/AgfnJdmyO7dQCaFGlU1HEpmxLYrcT0dvL70Cvrr/FRazeJpVvy+TAIj+6tKnux//7GMIx3AfRqcLOiyELWNzD9YRgvLUgwryxUlLV/jLYBXNMGcE0bwDVtANe0AVzTBnBNG8A1bQDX/EcB6CUOPYqRc80CdOhgQ1uSvOviO/GZOYFWvHVrCsJMZ+YkvcwCxIfBJaUJgCYPpYTSJD4Msq88/Oe4zcG7O/LMA0E+1JDjNsQ5wTmN9zkaP/sJLI7b/AZMAKCP8S0gpwAAAABJRU5ErkJggg==',
          },
          comment: {
            text: '评论',
            png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADu0lEQVRoge2Z3VPbRhTFz13ZEMYY/AUhTHno2CZpXhpsz/S1/3wf2kGkbx1AJEBCKGCMKNA4WNbpA6ajb8uyLcNMfm9Xu7o6Z3a1ursSknjOqFkLGJfvBmZNxhmISKIktcvGkkCWRbBM4bxANAIZcJBfYAlgEewD8o3EFRT+MQr6TZLnOd9bcQUjGKiajbyy1SuQZQjmkwgB0AWkYyv79KCwE9vMWAb+Fw6ujyh2CPIlrpHEBuqXzQ0IqmOoHA5xsF/WP0V2GdXAj7e/zGXve1VCXk5IZiQCnvXmsgcfF3+/D2ofyUDtZisnPfUTgMXJS43klln7LyP//s7b4NQcuYwOxL9F+uIBYFF66m3tZisX1SnUgEN8ZIIpkxtmItSA9FQVsxX/SG6gJZBAA/VOax1AaWqSRqc00OTDZ6B2upUFuTF9TSNCbtROt7Leyz4D8kKtQrCQjqoRECyoObXmvRw0hSopyEmG0KfNZaB63VgAUUxP0WgQsuxdkVwGxEIqX9qxuJcVZ+ieQkpepComCR6N7v0AY728FgUmLPmsNK4QWAXgWx0AdCEwaeNSKaySWAnoEzdXqMaMp33oCBA4Nor68SA061ctgvzB9yAbxl5Fbw/Ci3qn+Q5AIUmuKI3uKUSfIR+Wpf52xpqmvgR0u3OIH+TmecJcXlwj5F1GfZWfF03ruwq7vmUFTbvcm6t37tFUsuRTomxXH6tnxfn6f3WldQaMYUAJ1jbbzQrwUPCRyAf1s2y1VjUbeQDYbDcroHv6AACFpdpFqwA87KuhxNfHh0jXFTpr69ed1gbj77hMwC8qgDsMLwrj5gIEn/cK28Zj6BoBW8lX/x2hxHtgvIo2bi6gz2tn6H4H2mYHxL+xk6UN8W2/snPhvOQyYNQNGwpn6aqKDwHfSuYr5pRoZwD6qSgaDUKLYWC38EcXeIKjQDkJOskL3JFJFx+f2LvQo8WToIZAA3vrek+J7E5XU3xInhgv9cAVMnRTv1vavuYTMEHy0CjvHIa1R54LGcXtUwj2J64qJsPEAzGPFjfbrSUqNiaqbhgRZ6SJDnc32z/PU7JvIJz2lvOWxAejrHfCOox1vF7vNH8dT18oFoBzay5zGHao+4hT89D6f9oMKuAzGzj/UNK7Q2/wMCsDdyDatsLVQVE3x0k0SQM3SuTIpk1AMgQ0R35LHsoTi1m7G3RknpQJGZBPqj9/uLvyW+o11FgGBLi2yaOoFWPaJPlPbAIAiKP1Yv5Po7wzM/GAZxl9jjz7P/XfDcya/wDlBZhRExXvjwAAAABJRU5ErkJggg==',
          },
          statistics: {
            text: '统计',
            png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD0klEQVRogdWawWsjZRiHn3emaTZp0tAu3SyiuCtuFOnSi4h4EYTuwSU9FAJ62IO39A/Qs2e9Co0nDwoiCx4a9KAnETwIHsQ9SC8rVKS1WGk7TTZNZ14PzcbMZCaZSSbT5HcJ33wz3zy/eWfm++Z9I6rKLMu4aoBxNfMG5nobIhLpYK1U5Li1nEth5hQtqGpWxDBBTeDpLyA2YIPYqo4tIg1BjtvYViF9ZMnDh5Hu497bXlyNEAb27z0ws+mFFQNWEFkEUlFO7qM2qicOHDZaZ4c3v/vcHnbASAbONqo5RYrACnBtLORgPQEOBT1Y2KlZQTtFNnBart4W5DkkoWdGcRTdy9drj327oxiwyluvIWQngDlcSiNX3/65b3MP88ArapWra1cGDyBkrXJ1bdAugQascrWIyFL8VBElsmSVq8Wgbl8D1sZWToXS5KiiSYWStbGV8+sLikBREHOCTJHUYfGNQp+B/XsPTC5fldOmlQ6bS30GsumFSb7nx9G1DptLfQaMGK9+anOd+fc24xrOl821FtJKRc5aUojjZJntDzGeuQGA+cqLNN//aPxBRQpaqQjQnQhcEWg2l/N4TI0ic7XUhQcwSrcwV2N5qc11GP8fu7fhGOZiHGeZpLyM3mcgTwTJjevIUuKeXYzuZ0CdTNhvgszHH2CUbgFw8f1PtD75Iia+wVJ1Mr1tVwQuP0aGy3x1tQsPMLf+BqTGfnRCycvouYU0nIE7z/dve+mFMbCiSAcZIPHlg2Qiz5kuRk/c1YRo38Wjav7d+6TeuQ9A+9sfOP/0q5BHDo5AYnoKD5B6+82R5wmPARn6QR2H/GDNu3dCHu1m9EYgEQNjapCBZCIwngZEQNWZegNeRs9EJo1kcaLLy+g2gBwnixNdXkaXgTZ2YDZsWuRldBkopI8soD1skPMvv3G1nd0/sB/tdtv2o12cv/4O3e83ZhB/h7GrvsycVa7eReT6sJGM288y99br4Dicf/a17z6pzXWkkB/cn57n4sdfcP7cH46v+k+uXvttYGrxpFy9aYi8PHy05OWo/r5Yr+0PTC02WmeHXGaJp01POmwu9Rno5Of7dpwC+dYOfBdzgh6gOJNnCinFEfTAr8vXwMJOzVJ0b7JU4aXoXlDBI3A5na/XHqNc/cysNIIKHRCqwFFdu7I0u+q/uXrt1/7NEUtMVrlaVKGUVMZaUVuU3Vy95nvfj1Tk6+TnEynyAQe5ne34iny98pRZC4yfirxA9XjiZVbfgSoVaTaX8510X/4yMRam0G00gVPDsU8ymaPT2Ards6iZ/6/EzBv4DwVWin1diXHIAAAAAElFTkSuQmCC',
          },
          collect: {
            text: '收藏',
            png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECUlEQVRogdWZzW8bRRjGn3fWTexs0tiu1KZ2G1JCUcSBA2lsirgjwA6c+N/4FzhQgp1Ajz3aCUKA1EggKLRNmob4K9jgxN55OJBG/XB2x7vjhPwkH7zz7rzPMzOeLwtGQPPOYoIXYq8BTEKDBBtjVL9PflI5tJ0rZrvC3S/echhzFkBOAwAEEEiiJ3QAbNrOp2xXODYxOQ9gekDRlWYpl7Gdz6qBdik3SeJEkRrIbny+KDZzWjXQE1z1KxfAfSPjXLeZ05qBv9byLohsUByJ7M7dtx1bea0Z0Jq+rX+MYDzei8/aymvFQKuUT2jimmk8NbLN8vtWZkArBjzQWDwAQBCjPrxhI3dkA41v3o0Lgsf+Kwiy7ZX8WNT8kQ2Ip0OP577Duaj5Ixmo3V0a95v3gyCRqX21NB5FQ2gDrW9vJ9ShijyOlaNutFZuJ8K+H7gqcu1D1dJ1lx5dUXABcQm6ACK13AC6ADqEdByw42nppJYrbQlQ+ELxzpfvjcVifddRmKCmCxFXBC5of9NnSE+ANiEdITsepNMb/6cz88GP3rMAAYB6OXdJEZcJXDkjocPQE8ieBvbSxUpN9ldzE57GOxjB1nqkCLrJv9tV5Wm8jvMmHgCIeH18clYBPH/ij1AKcesHmtOFcUXBk7OWERrhY5UurD8Vwe5ZaxkWErupwsbe8TrQ+Dq/AOHMWYoyRYTbycL6z8BLC1mjtHQTkOF3lqcIgUfpYvXXZ99fWajrpdy8AFbPrbYQwYNkofrHC88GBdZWcnNKYe5UVBlCyC/pYmXr5ecnbpWapdx1AvOjlWWGAjeni+tPB5X57vXqpXxWwJujkWVEn8RmerlaOykgcDvdWF2agZYFu7qM6NLDZvrTassvKHAlTn28vqPJ+/Z0mUHl/BQkHjA8kSlHIh++hyWmQZM4s72QHnhZO1II76JJnOlmbiqCllBo0CinqYF4BC2hEIidHqiVckYV2YaGvR5oQCmciQEA2F/NTQTFBA8hz2wsjgICk0ExgQYoEljJqNBaAhsv0IAArh05YdDRDLRKt6KOfx59wiERe4BUYYdPn8SDVLF6L1Ws3iPxG4H+0LUQTtAP2fdKhQoyZPt1BdhKFquPnn+YXq4+BPDwv92tngXE+F71wPN8/0/zNeARB0b/xol0QDxJFSuP/cKODiRbzXI+A/AaicBpMh7TXb9y/x7QFxpQvTZOms5EWqK5kyxWhrqaSRYq2wC2m+V8hpoZyOD6CWxPffR9z6+u4PNA6VZS4LxJ8Li1SNQVuJNcXrdyHdMs5zMkr+K51ZfEfr/b/uHyZ/c9n1eDDRwnWVtM0HMcB97BxeJ3vq0SlmY5P+V5vDTm6D+nChsdk3eEDD/L/R8453ejwL+YPGPSZcnnTwAAAABJRU5ErkJggg==',
          }
        },
        listItem: [
          {
            icon: 'icon-pen',
            text: '创作中心',
            callPopup: false,
            navigateUrl: ''
          },
          {
            icon: 'icon-zujihuitabber',
            text: '历史足迹',
            callPopup: true
          },
          {
            icon: 'icon-fankui',
            text: '意见反馈',
            callPopup: false,
            navigateUrl: ''
          },
          {
            icon: 'icon-setting',
            text: '设置',
            callPopup: false,
            navigateUrl: './setting'
          },
        ],
        bimg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM000E11CggSDVi-zTuAT1Y3AAB2NSzPgKI097.jpg%3Fwidth%3D576%26height%3D340&refer=http%3A%2F%2Fstc.zjol.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914972&t=9cc0a578d4818d87c43f1fe839010096'
      }
    },
    components: {
      bottomPopup
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
    computed: {
      isLogin(){
        return this.$store.state.loginStatus;
      },
      userInfo(){
        return this.$store.getters.getUserInfo;
      }
    },
    //方法入口
    methods: {
      callItem(item){
        if (item.callPopup){
          this.popupAnimation();
        }else{
          uni.navigateTo({
            url: item.navigateUrl
          })
        }
      },
      popupAnimation(){
        this.animation.translateY('-100%').step({duration: 200});
        this.animationData = this.animation.export();
      },
      closePopupAnimation(){
        this.animation.translateY('100%').step({duration: 200});
        this.animationData = this.animation.export();
      },
      toLoginPage(){
        uni.navigateTo({
          url: '../login/wxLogin'
        })
      },
      getUserInfo(){
        let jsonData = uni.getStorage({key: 'user_info'});
        let { userInfo } = JSON.parse(jsonData);
        // this.userInfo = userInfo;
      }
    }
  }
</script>
<style lang="scss" scoped>
  /* @import url(); 引入css类 */
  @import "../../static/css/iconfont.scss";

  @-webkit-keyframes star-opacity{
    0% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes star-opacity{
    0% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes star-pos{
    0% {
      transform: scale(0) rotate(0) translate3d(0, 0, 0);
      -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
      -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
    }
    100% {
      transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
      -webkit-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
      -moz-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
    }
  }

  @keyframes star-pos{
    0% {
      transform: scale(0) rotate(0) translate3d(0, 0, 0);
      -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
      -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
    }
    100% {
      transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
      -webkit-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
      -moz-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
    }
  }

  .mine-container{
    height:100%;
    display: flex;
    flex-direction: column;
    .mine-top{
      position: relative;
      height: 30%;
      display: flex;
      flex: 4;
      flex-direction: row;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      // background: #FF7C3C;
      // background: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
      .stars{
        height: 0;
        .star{
          display: block;
          width: 10rpx;
          height: 10rpx;
          border-radius: 50%;
          position: relative;
          top: 80rpx;
          left: 500rpx;
          background-color: #fff;
          -webkit-transform-origin: 100% 0;
          transform-origin: 100% 0;
          -webkit-animation: star-opacity 5s infinite ease-in, star-pos 5s infinite ease-in;
          animation: star-opacity 5s infinite ease-in, star-pos 5s infinite ease-in;
          -webkit-box-shadow: 0 0 10rpx 10rpx rgba(255, 255, 255, .3);
          box-shadow: 0 0 10rpx 10rpx rgba(255, 255, 255, .3);
          z-index: 100;
          opacity: 0;
          &::after{
            content: '';
            display: block;
            top: 0;
            left: 8rpx;
            border: 0 solid #fff;
            border-width: 0 120rpx 4rpx;
            border-color: transparent transparent transparent rgba(255, 255, 255, .3);
            -webkit-transform: rotate(-45deg) translate3d(2rpx, 6rpx, 0);
            transform: rotate(-45deg) translate3d(2rpx, 6rpx, 0);
            -webkit-box-shadow: 0 0 2rpx 0 rgba(255, 255, 255, .1);
            box-shadow: 0 0 2rpx 0 rgba(255, 255, 255, .1);
            -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
          }
        }
      }
      .avatar-box{
        display: flex;
        flex: 1;
        .avatar{
          align-self: flex-end;
          margin: 0 auto 60rpx;
          width: 150rpx;
          height: 150rpx;
          border-radius: 50%;
        }
      }
      .baseinfo-box{
        display: flex;
        flex: 2.8;
        .baseinfo{
          display: flex;
          flex-direction: column;
          align-self: flex-end;
          justify-content: center;
          width: 100%;
          height: 150rpx;
          margin-bottom: 60rpx;
          .loginRegist{
            font-size: 40rpx;
            color: rgba(255, 255, 255, .7);
          }
          .nickname{
            display: inline-block;
            font-size: 48rpx;
            color: $uni-text-color;
            font-weight: bold;
          }
          .remark{
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 26rpx;
            color: rgba(255, 255, 255, .7);
          }
          .other-operation{
            margin-top: 20rpx;
            font-size: $small-font-size;
            color: $uni-text-color;
            text{
              margin-left: 30rpx;
              &:first-child{
                margin-left: 0rpx;
              }
            }
          }
        }
      }
      .setting-background{
        position: absolute;
        right: 10rpx;
        bottom: 10rpx;
        width: 48rpx;
        height: 48rpx;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABKxJREFUaEPtWV1oHFUU/s7sErVmtlS0qE0RodbdDVSKCC1FVNqqCcjOrKYl/sQWbB6a3WIbi0/FBMQ3W3VmqxWF/qBCFudKoaQWWyKIQkAQqrtTFKlIilCFZndbqEvmyMSdzWQyWd2dDZtA7uO95+f7zjl37j13CEt80BLHj2UCrc7gcgYWfQZ6enruKpfLna0ASkQXhRB/1fI9bwklEoluSZIOAdjUCvAun98R0YhhGO/44fAloCjKGSLqbjFwr/vPhBDPeyfnEFBVNQngc5fgRWY2WkGGiJ4D4C7fR4UQ37ixzCGQTCaPMXO/LURE+wzD0FoB3vGpqup+AIcreI4bhrG7JgFFUX4monW2UDgcfiCbzf7SSgKJRCIuSdJPFQyXhRD31ySgqio7AkKIWRmKpUvbwNZ9DF5LFPqVLEzkMu3nF5pgLUx+e8CXQDxV7GFgxAuWgSFTl4cXkkRgAtHU5BBBemM+kATsyOlydqFIBCIQHyhtZeKvKuDGGNbXpr5yKLq3sIskehnA49NrRNvzWrsj11QugQjE0qU+MJ+wEbHFu82jkeMOutmZ4VfyeuTjpiKvGAtEwA0yr8tz9kwsVZzeMwxr2M7MoiOw5DOw5PeAXRKxVOEUQC/OVx5MSJuarC9E+dg2A+0B/w07C6rI67J9f1qw0RQCNrrOvZNPs0SPMWgTM5+DJH1vau3nGkW+Ls23hLm02dTlsVo2mkagUaBevfWpQjQEegtAF4BbAVwl4lM5LTLo52NREYimis8S8C6ANT5gx/K6/IR3ftEQiKZKTxH4bBUg4U8wfqye5vZ5wnzWzETszFRH0wh07Ofb2m8Wd4JoIxE2gPm9fCYi/k9pdaZubLEwVW1G3AdfZ7oYtxjOlRkgjOQ1eadjtykE4unrG5ktu7H49+4zM8YYGK61EaMDhc1E9K2jwsxvm5nIa24j6wcLd4Zu0lVXdj7Ka/KewJ/Rh/uvrLjeJh8k0EGAb58v2gSrO6evHPWub0jf6Cjz1O8z4PGJmZF9z5TOdOkhi/kHR5aIDue09sGGM2Dee7KXwQeI6JEZYDRKsC4A9BuIXmLmZ5w1711pTg9BOJ/X5G21Si42MNkNks5UCcMajk3sql7lvU1WzYbGXHNyti/GoXxGftM9GUsV7SanZ2aOX2fQuAT0MjDdW1eG7xfGj0w0XdhDTB86a9GJvqpYgwRolEgaymkrxv0cziXh5Y0Lpi5vrRV575r7FhyIAAH7crr8ny8T8VRRYyABYO0sMIRMXpNT9YB3ZJ0SbJhA7u4T0UvvRy7V4zw2cG07E20hDo/z1N8584NVl+vR98raJB6c6Kv24nWVkFc4CJAgug1/hZYqAfs1+A47YuFweHU2m505XIKEsUHdZDJ5DzNfqahfE0Kscpvy+4x+CqDXFiKiAcMwjjbouylqiqK8SkRHKni+MAxDrUlAUZR+IjrmElo0j7tE9IJhGHaAq8P3eV1V1S8BPNmUEDbPSFYIscNrbt4fHD6ZaB6U+i0dEUIc8FOr+ZOvq6sr0tbW1kFEq+v3GVwjFAr9US6XJ06fPl2cz9ryX8rgcQ5mYTkDweIXXHs5A8FjGMzCPz7EUk848OpBAAAAAElFTkSuQmCC');
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .mine-bottom{
      height: 70%;
      .operation-box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 30rpx;
        .selector-card{
          display: flex;
          justify-content: center;
          // align-items: center;
          flex-direction: column;
          width: 23%;
          height: 120rpx;
          border-radius: 16rpx;
          box-shadow: 0px 1px 6px 0 rgba(0, 0, 0, .1);
          overflow: hidden;
          background-repeat: no-repeat;
          background-size: 40%;
          background-position: 110% 120%;
          text{
            margin-left: 20rpx;
          }
          .maintitle{
            color: $uni-text-color;
            font-weight: bold;
          }
          .subtitle{
            margin-top: 4rpx;
            color: #9e9e9e;
            font-size: $small-font-size;
          }
        }
      }
      .list-box{
        border-top: 20rpx solid #f2f2f2;
        color: $uni-text-color;
        .list-item{
          height: 120rpx;
          line-height: 120rpx;
          padding-left: 20rpx;
          padding-right: 20rpx;
          box-sizing: border-box;
          color: $uni-text-color;
          .iconfont{
            width: auto;
            font-size: 60rpx;
          }
          .text{
            height: 119rpx;
            width: 100%;
            position: absolute;
            margin-left: 30rpx;
            border-bottom: 1rpx solid #F7F7F7;
          }
          .icon-youjiantou{
            right: 20rpx;
            position: absolute;
            font-size: 48rpx;
            color: #ddd;
          }
          &:last-child .text{
            height: 120rpx;
            border-bottom: none !important;
          }
        }
      }
      .more-container{
        border-top: 20rpx solid #f2f2f2;
        padding-left: 30rpx;
        padding-right: 30rpx;
        color: $uni-text-color;
        .title{
          width: 100%;
          height: 100rpx;
          line-height: 100rpx;
        }
      }
    }
    // .popup-container{
    //   width: 100%;
    //   height: 100%;
    //   position: fixed;
    //   bottom: -100%;
    //   background-color: transparent;
    //   z-index: 100;
    //   .popup{
    //     width: 100%;
    //     height: 69%;
    //     background: #fff;
    //     position: absolute;
    //     bottom: 0;
    //     border-radius: 40rpx 40rpx 0 0;
    //     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    //   }
    // }
  }
</style>