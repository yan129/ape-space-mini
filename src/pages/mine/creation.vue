<template>
  <view class="creation-center">
    <view class="list-box">
      <!-- https://z-paging.zxlee.cn/api/props/empty.html -->
      <z-paging ref="paging" :refresher-threshold="100" :refresher-max-angle="60" :empty-view-text="'暂无数据'" :empty-view-title-style="emptyData"
        :empty-view-img="emptyDataImg" :empty-view-center="false" :empty-view-img-style="emptyDataImgStyle" :lower-threshold="5" 
        :loading-more-no-more-text="'我可是有底线的'"
        :hide-loading-more-when-no-more-and-inside-of-paging="true"
        :show-refresher-update-time="true"
        :hide-loading-more-when-no-more-by-limit="11"
        :default-page-size="10"
        v-model="articleTitleList" :height="scrollViewHeight">
        <uni-swipe-action>
          <view class="item" v-for="(item, index) in articleTitleList" :key="index">
            <uni-swipe-action-item style="width: 100%;" :right-options="options" :threshold="60"  @click="bindClickItem($event, index)" @change="swipeChange($event, index)">
              <view class="warpper-box">
                <view class="file-icon">
                  <icon class="iconfont icon-file"></icon>
                </view>
                <view class="content-box">
                  <view class="left-box">
                    <view class="title">{{ item.title }}</view>
                    <view class="create-date">{{ item.gmtCreated }}</view>
                  </view>
                  <view class="right-box">
                    <icon class="iconfont icon-setting2"></icon>
                  </view>
                </view>
              </view>
            </uni-swipe-action-item>
          </view>
        </uni-swipe-action>
      </z-paging>
    </view>
    <view class="operate-box">
      <view class="select-card">
        <view
          class="select-btn"
          v-for="(item, index) in cardText"
          :key="index"
          :style="[index === 1 ? { backgroundColor: styles.themeColor, color: '#FFF', borderRadius: '40rpx' } : {color: styles.themeColor}]"
          @click="tapSelect(item.text)"
          >
            <icon :class="['iconfont', item.icon]"></icon>
            {{ item.text }}
          </view
        >
      </view>
      <view class="select-topic" :style="{ color: styles.themeColor }">
        <picker class="picker" mode="selector" @change="bindPickerChange($event, themeList)" :value="themeIndex" :range="themeList" :range-key="'name'">
				  <view>◀&nbsp;&nbsp;{{ themeList[themeIndex].name }}&nbsp;&nbsp;▶</view>
			  </picker>
      </view>
    </view>

  </view>
</template>

<script>
import styles from "../../uni.scss";
import uniSwipeAction from "../../components/uni-swipe-action/uni-swipe-action.vue";
import uniSwipeActionItem from "../../components/uni-swipe-action-item/uni-swipe-action-item.vue";
import zPaging from "../../components/z-paging/z-paging.vue";
import imgStatic from "../../static/image/image.js";
export default {
  data() {
    return {
      emptyDataImg: imgStatic.emptyData,
      emptyData: {
        marginTop: '-70rpx',
        fontSize: '24rpx',
        color: '#9e9e9e'
      },
      emptyDataImgStyle: {
        width: '320px',
        height: '320px'
      },
      themeIndex: 0, // 选中的专题索引
      pickerThemeData: '', // 选中的专题数据
      articleTitleList: [], // 文章列表数据
      // 滑动按钮数据
      options:[
        {
          text: '编辑',
          style: {
            backgroundColor: styles.themeColor
          }
        },
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
      // 专题列表数据
      themeList: [],
      scrollViewHeight: "",
      content: {},
      textareaData: "",
      textareaHtml: "",
      // 底部按钮选项数据
      cardText: [
        {text: '回收站', icon: 'icon-recycle'},
        {text: '新建文章', icon: 'icon-pen'},
        {text: '新建专题', icon: 'icon-tag'}  
      ],
    };
  },
  onLoad() {
    let scrollView = uni.createSelectorQuery().select(".operate-box");
    scrollView
      .boundingClientRect((dom) => {
        let _this = this;
        uni.getSystemInfo({
          success: function (res) {
            _this.scrollViewHeight = res.windowHeight - dom.height + "px";
          },
        });
      })
      .exec();
  },
  onShow() {
    this.$commonJs.setNavigationBarColor();
  },
  components: {
    uniSwipeAction,
    uniSwipeActionItem,
    zPaging
  },
  created(){
    this.initThemeListData();
  },
  computed: {
    styles(){
      return styles;
    },
    userInfo(){
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    bindClickItem(e, index){
      if (e.content.text == '编辑') {
        uni.redirectTo({
          url: `../../pagesA/editor/editor?id=${this.articleTitleList[index].id}`,
        });
      }
      if (e.content.text == '删除') {
        var _this = this;
        uni.showModal({
            title: this.articleTitleList[index].title,
            content: '确定删除该文章吗？',
            confirmColor: styles.themeColor,
            success: function (res) {
              if (res.confirm) {
                let a = ['1','2','3'];
                a.splice(1,1);
                console.log(a)
                _this.articleTitleList.splice(index, 1);
                uni.showToast({ title: '删除成功', icon: "none" });
              }
            }
        });
      }
    },
    swipeChange(e,index){
      console.log('当前状态：'+ e +'，下标：' + index)
    },
    // 初始化文章列表数据
    initArticleListData() {
      this.$http.get('/ape-article/article/searchArticleList', {uid: this.userInfo.id, tid: this.themeList[this.themeIndex].id}, {load: false}).then((response) => {
        // 本地分页
        this.$refs.paging.setLocalPaging(response.data);
      }).catch((error) => {
        this.$refs.paging.setLocalPaging(false);
        uni.showToast({ title: '请检查网络', icon: "none" });
      })
    },

    // 跳转编辑页
    tapSelect(text){
      if (text === "新建文章") {
        // redirectTo跳转到分包页面
        uni.redirectTo({
          // url: "/pages/mine/creation/editor",
          url: '../../pagesA/editor/editor',
        });
      }
    },

    // 初始化专题数据
    initThemeListData(){
      let cacheCheckThemeData = uni.getStorageSync('themeIndex');
      this.$http.get("/ape-article/loading/themeArticleData", {uid: this.userInfo.id, tid: cacheCheckThemeData.id}, {header: {'transferToken': false}, load: false}).then((response) => {
        this.themeList = response.data.themeList;
        this.themeIndex = cacheCheckThemeData.index;
        this.$refs.paging.setLocalPaging(response.data.articleList);
      }).catch((error) => {
        this.$refs.paging.setLocalPaging(false);
        uni.showToast({ title: '请检查网络', icon: "none" });
      })
    },
    // 专题选中方法
    bindPickerChange: function(e, storage) {
      let _this = this;
      this.themeIndex = e.target.value
      this.pickerThemeData = storage[this.themeIndex];
      // 将专题下标设置到缓存，下次直接取出来
      uni.setStorage({
          key: 'themeIndex',
          data: {index: e.target.value, id: _this.pickerThemeData.id},
          success: function () {
            _this.initArticleListData();
          }
      })
    },
    // 加载数据
    // load(paging) {
    //   console.log("加载中")
    //   console.log(paging)
    //   this.articleTitleList.push({
    //     title: '无条件',
    //     id: 23,
    //     date: '2022-03-09'
    //   })
    //   // 加载成功  参数对象{list: 当前列表,total: 数据总长度(后端查询的total)}
    //   this.$refs.list.loadSuccess({ list: this.articleTitleList, total: 10 });
    //   // 加载失败
    //   // this.$refs.list.loadFail()
    //     // setTimeout(() => {
    //     //     let list = [];
    //     //     for (var i = 0; i < paging.size; i++) {
    //     //         list.push(i);
    //     //     }
    //     //     this.list = [...this.list, ...list];
    //     //     // 加载成功  参数对象{list: 当前列表,total: 数据总长度(后端查询的total)}
    //     //     this.$refs.list.loadSuccess({ list: this.list, total: 50 });
    //     //     // 加载失败
    //     //     // this.$refs.list.loadFail()
    //     // }, this.$u.random(100, 1000));
    // },
    // 刷新刷剧
    // refresh(paging) {
    //   console.log("刷新中")
    //   console.log(paging)
    //   // 刷新成功  参数对象{list: 当前列表,total: 数据总长度(后端查询的total)}
    //   this.$refs.list.refreshSuccess({ list: this.articleTitleList, total: 10 });
    //   // 刷新失败
    //   // this.$refs.list.refreshFail()
    //     // setTimeout(() => {
    //     //     let list = [];
    //     //     for (var i = 0; i < paging.size; i++) {
    //     //         list.push(i);
    //     //     }
    //     //     this.list = list;
    //     //     // 刷新成功  参数对象{list: 当前列表,total: 数据总长度(后端查询的total)}
    //     //     this.$refs.list.refreshSuccess({ list: this.list, total: 50 });
    //     //     // 刷新失败
    //     //     // this.$refs.list.refreshFail()
    //     // }, this.$u.random(100, 1000));
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "../../static/css/iconfont.scss";
.creation-center {
  height: 100%;
  .list-box {
    /deep/ .zp-main {
      padding: 0;
    }
    .item {
      width: 100%;
      min-height: 180rpx;
      border-bottom: 1rpx solid #f7f7f7;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      .warpper-box{
        display: flex;
      }
      .file-icon{
        padding: 0rpx 20rpx;
        align-self: center;
        .iconfont {
          font-size: 80rpx;
          color: #9e9e9e;
        }
      }
      .content-box {
        width: 100%;
        display: flex;
        flex-direction: row;
        .left-box{
          position: relative;
          width: 85%;
          min-height: 180rpx;
          display: flex;
          .title{
            align-self: center;
            font-size: 36rpx;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
          }
          .create-date{
            position: absolute;
            bottom: 0;
            font-size: 24rpx;
            color: #9e9e9e;
          }
        }
        .right-box{
          width: 15%;
          align-self: center;
          text-align: center;
          .icon-setting2{
            padding: 15rpx;
            font-size: 40rpx;
            color: #9e9e9e;
          }
        }
      }
    }
    // 修改滑动删除按钮大小
    /deep/ .uni-swipe_button{
      width: 100rpx;
      .uni-swipe_button-text{
        font-size: 28rpx;
      }
    }
  }
  .operate-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 220rpx;
    display: flex;
    flex-direction: column;
    z-index: 100;
    .select-card {
      width: 70%;
      height: 80rpx;
      margin: 30rpx auto 0rpx;
      margin-bottom: 100rpx;
      border-radius: 40rpx;
      // border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 0rpx 4rpx 20rpx 0 rgba(0, 0, 0, 0.2);
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
      align-content: center;
      .select-btn {
          width: 100%;
          text-align: center;
          display: grid;
          font-size: 18rpx;
          color: #9e9e9e;
          icon {
              margin-top: -5rpx;
              font-size: 46rpx;
          }
      }
    }
    .select-topic {
      display: flex;
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 100rpx;
      font-size: 24rpx;
      text-align: center;
      color: #9e9e9e;
      .picker{
        align-self: center;
        margin: 0 auto;
      }
    }
  }
}
</style>