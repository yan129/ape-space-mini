<!-- 主页 -->
<template>
  <view>
    <!-- 轮播图 -->
    <Xsuu-swiper
      :borderRadius="swiperConfig.borderRadius"
      :UncheckedBG="swiperConfig.UncheckedBG"
      :previousMargin="swiperConfig.previousMargin"
      :nextMargin="swiperConfig.nextMargin"
      :dotMargin="swiperConfig.dotMargin"
      :margin="swiperConfig.margin"
      :swiperItems="swiperItems"
    ></Xsuu-swiper>
    <view class="container">
      <!-- 选项卡 -->
      <view class="select-card">
        <navigator
          class="nav"
          v-for="(item, index) in cardList"
          :key="index"
          :url="item.url"
          open-type="navigate"
          hover-class="none"
          target="self"
        >
          <icon :class="['iconfont', item.icon]"></icon>
          <text class="card-name">{{ item.name }}</text>
        </navigator>
      </view>

      <!-- 通知滚动内容 -->
      <view class="notify-scroll" ref="notify">
        <icon class="iconfont icon-tongzhi1"></icon>
        <swiper
          class="title-box"
          :indicator-dots="notifyConfig.indicatorDots"
          :autoplay="notifyConfig.autoplay"
          :interval="notifyConfig.interval"
          :duration="notifyConfig.duration"
          :vertical="notifyConfig.vertical"
          :circular="notifyConfig.circular"
        >
          <swiper-item v-for="(item, index) in notifyList" :key="index">
            <navigator class="title-navigator" open-type="navigate" hover-class="none">{{ item }}</navigator>
          </swiper-item>
        </swiper>
      </view>

      <view class="article-box">文章列表</view>
      <button @click="loginpage">跳转</button>
    </view>
  </view>
</template>

<script>
import XsuuSwiper from "../../components/Xss-swiper/Xsuu-swiper.vue";
export default {
  components: {
    XsuuSwiper,
  },
  data() {
    return {
      // 轮播图
      swiperConfig: {
        borderRadius: 15,
        UncheckedBG: "#FF7C3C",
        previousMargin: 20,
        nextMargin: 20,
        dotMargin: 35,
        margin: 10,
      },
      swiperItems: [
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn11%2F440%2Fw744h496%2F20181030%2F97c2-hnaivxq7344712.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914829&t=52a970d21d4898c8e7ca21b8b5aa9312",
          title: "鲤程新能源",
          Subtitle: "心鲤程，心鲤想！",
          tip: "限时",
          url: "111",
        },
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs1.xchuxing.com%2Fxchuxing%2Fforum%2F201607%2F27%2F185524zj7wog6qizk9o90k.jpg&refer=http%3A%2F%2Fs1.xchuxing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914861&t=4c64a4a5cec709f9d03507b793546646",
          title: "包月低至9.9元",
          Subtitle: "立享受充电礼包！",
          tip: "推荐",
          url: "111",
        },
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11780621658%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914935&t=7d98cfe6b5a2634598fc7bda871aa7c9",
          title: "进口儿童座椅",
          Subtitle: "￥698.99",
          tip: "进口",
          url: "111",
        },
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM000E11CggSDVi-zTuAT1Y3AAB2NSzPgKI097.jpg%3Fwidth%3D576%26height%3D340&refer=http%3A%2F%2Fstc.zjol.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914972&t=9cc0a578d4818d87c43f1fe839010096",
          title: "品牌T恤",
          Subtitle: "￥22.99",
          tip: "nike",
          url: "111",
        },
      ],
      // 选项卡
      cardList: [
        {
          name: "热度",
          icon: "icon-redu",
          url: "",
        },
        {
          name: "提问",
          icon: "icon-wenti",
          url: "",
        },
        {
          name: "便签",
          icon: "icon-bianqianguanli",
          url: "../notebook/notebook",
        },
        {
          name: "搜索",
          icon: "icon-icon-search",
          url: "",
        },
        {
          name: "搜索",
          icon: "icon-icon-search",
          url: "",
        },
        {
          name: "搜索",
          icon: "icon-icon-search",
          url: "",
        },
        {
          name: "搜索",
          icon: "icon-icon-search",
          url: "",
        },
      ],
      // 通知
      notifyList: [
        "通知1chabkjbgaqdfavakcnab",
        "通知2jchaj829hnaohcladadwdaca",
        "通知3",
        "通知4",
      ],
      notifyConfig: {
        indicatorDots: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        vertical: true,
        circular: true,
      }
    };
  },
  //生命周期 - 开始加载
  onLoad() {},
  //方法入口
  methods: {
    change(e) {
      this.current = e.detail.current;
    },
    click() {
      let notifyScroll = uni.createSelectorQuery().select(".notify-scroll");
      notifyScroll
        .boundingClientRect((dom) => {
          console.log(dom);
        })
        .exec();
    },
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    },
    loginpage(){
      uni.navigateTo({
        url: '../login/login'
      })
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../static/css/iconfont.scss";
.container {
  .select-card {
    box-sizing: border-box;
    width: 100%;
    padding: 20rpx;
    border-radius: $normal-border-radius;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: hidden;
    .nav {
      float: left;
      width: 25%;
      margin-bottom: 10rpx;
      // 最后三个的外部下边距设置为0
      &:nth-last-child(-n + 3) {
        margin-bottom: 0rpx;
      }
      .iconfont {
        display: block;
        font-size: 60rpx;
      }
      .icon-redu {
        color: rgb(246, 78, 84);
      }
      .icon-wenti {
        color: rgb(255, 134, 51);
      }
      .icon-bianqianguanli {
        color: rgb(248, 179, 68);
      }
      .icon-icon-search {
        color: rgb(74, 131, 196);
      }
      .card-name {
        margin-top: 10rpx;
        line-height: 20rpx;
        color: $normal-color;
        font-size: $normal-font-size;
      }
    }
  }

  .notify-scroll {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 75%;
    padding: 0rpx 10rpx;
    margin: 40rpx auto;
    line-height: 70rpx;
    box-shadow: $normal-box-shadow;
    border-radius: 60rpx;
    color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    .iconfont {
      margin-left: 12rpx;
      color: $normal-font-color;
      font-size: 46rpx;
    }
    .title-box {
      height: 70rpx;
      // 占满空间，当图标（.iconfont）没设置这个属性时，右边文字占满右边空间
      flex-grow: 1;
      margin-left: 20rpx;
      text-align: center;
      .title-navigator {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>