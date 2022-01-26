<template>
  <view class="creation-center">
      <view class="list-box">
        <view class="item"></view>
      </view>
      <view class="operate-box">
          <text class="select-topic" :style="{color: styles.themeColor}">切换 随笔</text>
      </view>

      <!-- <lc-fab-touch
          :pattern="pattern"
          :content="content"
          :horizontal="horizontal"
          :vertical="vertical"
          :direction="direction"
          @trigger="trigger"
      ></lc-fab-touch> -->
      
      <!-- <ly-markdown :showPreview="true" :textareaData.sync="textareaData" :textareaHtml.sync="textareaHtml"></ly-markdown>
      <towxml :nodes="content"></towxml> -->
  </view>
</template>

<script>
import lcFabTouch from '../../components/lc-fab-touch/lc-fab-touch.vue';
import lyMarkdown from '../../components/markdown/ly-markdown.vue';
import towxml from '../../static/towxml/towxml';
import styles from '../../uni.scss';
export default {
    data() {
        return {
            content: {},
            textareaData: "",
            textareaHtml:"",
        }
    },
    onLoad(){
        uni.getSystemInfo({
            success: (e) => {
                var titleBarHeight = (uni.getMenuButtonBoundingClientRect().top - uni.getSystemInfoSync().statusBarHeight) * 2 +
		    	uni.getMenuButtonBoundingClientRect().height;
		        let gao =uni.getSystemInfoSync().statusBarHeight + titleBarHeight;
                console.log(gao)
            }
        })
    },
    onShow(){
        this.$commonJs.setNavigationBarColor();
    },
    components: {
        lyMarkdown,
        towxml,
        lcFabTouch
    },
    watch: {
        "textareaData":function(){
            this.content = this.towxmlFunc(this.textareaData, 'markdown',{
			    base:'https://xxx.com',	  // 相对资源的base路径
			    theme:'light',	// 主题，默认`light`, dark
			    events:{	// 为元素绑定的事件方法
			    	tap:(e)=>{
			    		console.log('tap',e);
			    	}
			    }
		    });
            console.log("=========")
            console.log(this.content)
            console.log("=========")
			// console.log("markdown:"+this.textareaData)
			// console.log("html:"+this.textareaHtml)
		},
    },
    methods: {
        trigger(){
            console.log("trigger")
        }
    }
}
</script>

<style lang="scss" scoped>
    .creation-center{
        height: 100%;
        background: #f8f8f8;
        .list-box{
            padding: 30rpx 50rpx;
            .item{
                width: 100%;
                min-height: 200rpx;
                margin: 0 auto 40rpx;
                border-radius: 20rpx;
                box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.1);
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
        .operate-box{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 180rpx;
            display: flex;
            flex-direction: column;
            background: linear-gradient(transparent, red);
            z-index: 100;
            .select-topic{
                font-size: 24rpx;
                text-align: center;
            }
        }
    }
</style>