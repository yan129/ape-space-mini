<template>
  <view class="creation-center">
    <view class="list-box">
      <!-- https://z-paging.zxlee.cn/api/props/empty.html -->
      <z-paging ref="paging" :refresher-threshold="100" :refresher-max-angle="60" :empty-view-text="'暂无数据'" :empty-view-title-style="emptyData"
        :empty-view-img="emptyDataImg" :empty-view-center="false" :empty-view-img-style="emptyDataImgStyle" :lower-threshold="5" 
        :loading-more-no-more-text="'我可是有底线的'"
        :hide-loading-more-when-no-more-and-inside-of-paging="true"
        :hide-loading-more-when-no-more-by-limit="11"
        :default-page-size="10"
        v-model="articleTitleList" @query="queryList" :height="scrollViewHeight">
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
                    <view class="create-date">{{ item.date }}</view>
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

    <!-- <ly-markdown :showPreview="true" :textareaData.sync="textareaData" :textareaHtml.sync="textareaHtml"></ly-markdown>
      <towxml :nodes="content"></towxml> -->
  </view>
</template>

<script>
// import lyMarkdown from '../../components/markdown/ly-markdown.vue';
// import towxml from '../../static/towxml/towxml';
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
      themeList: [
        {id: '12123', name: '中国'},
        {id: '5252', name: '美国'},
        {id: '7474', name: '俄罗斯'},
        {id: '235423', name: '巴西'}
      ],
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
    // lyMarkdown,
    // towxml,
  },
  watch: {
    // "textareaData":function(){
    //     this.content = this.towxmlFunc(this.textareaData, 'markdown',{
    // 	    base:'https://xxx.com',	  // 相对资源的base路径
    // 	    theme:'light',	// 主题，默认`light`, dark
    // 	    events:{	// 为元素绑定的事件方法
    // 	    	tap:(e)=>{
    // 	    		console.log('tap',e);
    // 	    	}
    // 	    }
    //     });
    //     console.log("=========")
    //     console.log(this.content)
    //     console.log("=========")
    // 	// console.log("markdown:"+this.textareaData)
    // 	// console.log("html:"+this.textareaHtml)
    // },
  },
  computed: {
    styles(){
      return styles;
    }
  },
  methods: {
    bindClickItem(e, index){
      console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
      if (e.position == 'right') {
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
    
    queryList(pageNo, pageSize) {
          for (var i = 0; i < 20; i++) {
            if(i / 2 == 0) {
              this.articleTitleList.push({
              title:"瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半",
              id:i,
              date: '2022-03-06'
              })
            }else if(i / 2 == 1){
              this.articleTitleList.push({
              title:"哈哈哈",
              id:i,
              date: '2022-03-09'
              })
            }
          }
          if (this.articleTitleList.length >=40) {
            return;
          }
          setTimeout(() => {
            this.$refs.paging.complete(this.articleTitleList);
          }, 100);
              	//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
              	//这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过this.$refs.paging.complete(请求回来的数组)将请求结果传给z-paging
                // this.$request.queryList({ pageNo,pageSize }).then(res => {
                // 	//请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
                	// this.$refs.paging.complete(res.data.list);
                // }).catch(res => {
                // 	//如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
                // 	//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
                // 	//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
                // 	this.$refs.paging.complete(false);
                // })
            },

    // 专题选中方法
    bindPickerChange: function(e, storage) {
        console.log(e)
        console.log(storage)
        this.themeIndex = e.target.value
        this.pickerThemeData = storage[this.themeIndex];
        console.log(this.pickerThemeData)
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