<template>
    <view class="editor-container">
        <!-- <ly-markdown v-on:preview="preview()" :showPreview="true" :showTextarea="showTextarea" :textareaData.sync="textareaData" :textareaHtml.sync="textareaHtml"></ly-markdown> -->
        <uni-drawer ref="showLeft" mode="left" :mask-click="false">
			<scroll-view style="height: 100%;" scroll-y="true">
				<!-- <towxml :nodes="content"></towxml> -->
                <!-- <mp-html :content="html" :markdown="true"/> -->
                <view class="close-drawer" :style="{backgroundColor: styles.themeColor}" @click="closeDrawer">
                    <icon class="iconfont icon-backing"></icon>
                    <tex class="backing">返回</tex>
                </view>
			</scroll-view>
		</uni-drawer>
    </view>
</template>

<script>
import styles from "../../../uni.scss";
// import lyMarkdown from '../../../components/markdown/ly-markdown.vue';
// import towxml from '../../../static/towxml/towxml';
import uniDrawer from '../../../components/uni-drawer/uni-drawer.vue';
// import mpHtml from '../../../components/mp-html/mp-html.vue';
// import { marked } from "marked";
// import hljs from "highlight.js";
// import "highlight.js/scss/androidstudio.scss";
export default {
    data() {
        return {
            // 解决textarea默认的层级问题
            showTextarea: true,
            content: {},
            textareaData: '',
            textareaHtml: '',
            html: ''
        }
    },
    components: {
        // lyMarkdown,
        // towxml,
        uniDrawer,
        // mpHtml
    },
    mounted() {
        // this.initHighLight();
        // this.html = marked(this.html);
        // 下面代码是解决代码高亮无效问题
        // this.html = marked(this.markdown).replace(/<pre>/g, "<pre class='hljs'>");
    },
    watch: {
        // "textareaData":function(){
        //     // this.content = this.towxmlFunc(this.textareaData, 'markdown',{
        // 	//     base:'https://xxx.com',	  // 相对资源的base路径
        // 	//     theme:'light',	// 主题，默认`light`, dark
        // 	//     events:{	// 为元素绑定的事件方法
        // 	//     	tap:(e)=>{
        // 	//     		console.log('tap',e);
        // 	//     	}
        // 	//     }
        //     // });
        //     // this.html = this.textareaData;
        //     // this.html = marked(this.textareaData);
        //     // console.log("=========")
        //     // console.log(this.content)
        //     // console.log("=========")
        // 	console.log("markdown:"+this.textareaData)
        // 	// console.log("html:"+this.textareaHtml)
        // },
    },
    computed: {
        styles(){
          return styles;
        },
    },
    methods: {
        preview(){
            this.$refs.showLeft.open();
            this.showTextarea = false;
        },
        closeDrawer() {
			this.$refs.showLeft.close();
            this.showTextarea = true;
		},
        // initHighLight() {
        //     hljs.configure({
        //         useBR: true,
        //         tabReplace: " ",
        //     });
        //     marked.setOptions({
        //         renderer: new marked.Renderer(),
        //         gfm: true,
        //         tables: true,
        //         breaks: false,
        //         pedantic: false,
        //         highlight: function (code, lang) {
        //             if (lang && hljs.getLanguage(lang)) {
        //                 return hljs.highlight(lang, code, true).value;
        //             } else {
        //                 return hljs.highlightAuto(code).value;
        //             }
        //         },
        //     });
        // }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../static/css/iconfont.scss';
.editor-container{
    /deep/ .uni-drawer__content{
        width: 100% !important;
        .h2w{
            line-height: 1.5 !important;
            .h2w__main{
                padding: 0rpx;
                margin: 0rpx 30rpx 30rpx;
            }
        }
    }
    .close-drawer{
        position: fixed;
        bottom: 50rpx;
        right: 50rpx;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        box-sizing: border-box;
        box-shadow: 0rpx 0rpx 20rpx 0 rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        text-align: center;
        color: #fff;
        opacity: .5;
        .iconfont{
            font-size: 44rpx;
        }
        .backing{
            font-size: 20rpx;
        }
    }
}
</style>