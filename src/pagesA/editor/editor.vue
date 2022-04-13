<template>
    <view class="editor-container">
        <markdown :articleContent="textareaData" :showTextarea="showTextarea" @previewArticle="previewArticle" @publishArticle="showDrawer()"></markdown>
        <bottom-popup class="bottom-popup" style="width:100%; height: 100%; position: fixed; bottom: -100%; background-color: transparent; z-index: 100;"
            v-on:closePopup="closePopupAnimation()"
            :animation="animationData" 
            :editTheme="editorTheme"
        >
            <view class="switchTheme" @click="switchTheme('dark')" v-if="editorTheme === 'light'"><icon class="iconfont icon-dark_mode"></icon></view>
            <view class="switchTheme" @click="switchTheme('light')" v-else><icon class="iconfont icon-Light"></icon></view>
			<scroll-view :style="{'height: 100%;background-color': (editorTheme == 'light' ? '#fff' : '#000')}" scroll-y="true">
                <view class="content-box">
                    <towxml :nodes="content"></towxml>
                </view>
			</scroll-view>
        </bottom-popup>

        <uni-drawer ref="showLeft" mode="left" :mask-click="false">
            <scroll-view style="height: 100%;" scroll-y="true">
                <view class="close-drawer" @click="closeDrawer()"><icon class="iconfont icon-close"></icon></view>
                <view class="from-box">
                    <uni-forms
                        ref="articleInfo"
                        :modelValue="articleData"
                        :rules="formRules"
                    >
                        <uni-forms-item name="title">
                            <uni-easyinput
                                :styles="{borderColor: styles.themeColor}"
                                :trim="true"
                                type="text"
                                placeholder="标题"
                                clearSize="20"
                                :clearable="true"
                                maxlength="32"
                                v-model="articleData.title"
                            />
                        </uni-forms-item>
                        <uni-forms-item name="summary">
                            <uni-easyinput
                                :styles="{borderColor: styles.themeColor}"
                                :trim="true"
                                type="textarea"
                                bot
                                autoHeight
                                maxlength="150"
                                clearSize="20"
                                placeholder="摘要"
                                v-model="articleData.summary"
                            />
                        </uni-forms-item>
                    </uni-forms>
                    <view class="select-img" v-if="$commonJs.isEmpty(articleData.picture)" @click="toClipperPage()">
                        <icon class="iconfont icon-xiangji1"></icon>
                        <text class="text">选择封面图片</text>
                    </view>
                    <view class="show-box" v-else>
                        <image class="show-img" :src="articleData.picture"></image>
                        <view class="delete-btn" @click="deleteArticleImg()">&times;</view>
                    </view>
                </view>
                <view class="operator-box">
                    <view class="save" @click="saveArticle()">
                        <text>保存</text>
                    </view>
                    <view class="publish" @click="publishArticle()">
                        <text>发布</text>
                    </view>
                </view>
            </scroll-view>
        </uni-drawer>
    </view>
</template>

<script>
import styles from "../../uni.scss";
import markdown from "../../components/custom/markdown.vue";
import bottomPopup from '../../components/custom/bottom-popup.vue';
import towxml from "../static/towxml/towxml"
import uniDrawer from "../../components/uni-drawer/uni-drawer.vue";
import { uniForms } from "../../components/uni-forms/uni-forms.vue";
import { uniFormsItem } from "../../components/uni-forms-item/uni-forms-item.vue";
import { uniEasyinput } from "../../components/uni-easyinput/uni-easyinput.vue";
import { uniDataCheckbox } from "../../components/uni-data-checkbox/uni-data-checkbox.vue";
export default {
    data() {
        return {
            // 解决textarea默认的层级问题
            showTextarea: true,
            editorTheme: 'light',
            animationData: {},
            content: '',
            tempContent: '',
            // 将要编辑修改的文章内容传给子组件textarea显示
            textareaData: '',
            // 文章信息
            articleData: {
                id: '',
                uuid: '',
                title: '',
                summary: '',
                picture: '',
            },
            // 表单校验规则
            formRules: {
                title: {
                    rules: [
                        {
                          required: true,
                          errorMessage: "标题不能为空",
                        }
                    ],
                },
                summary: {
                    rules: [
                        {
                          required: true,
                          errorMessage: "摘要不能为空",
                        }
                    ],
                },
            }
        }
    },
    components: {
        bottomPopup,
        markdown,
        towxml,
        uniDrawer,
        uniForms,
        uniFormsItem,
        uniEasyinput,
        uniDataCheckbox
    },
    onLoad(options){
        // 创建动画实例
        this.animation = uni.createAnimation();
        if (!this.$commonJs.isEmpty(options.id)) {
            this.loadArticleById(options.id);
        }else {
            // 新建文章时，请求服务器新建默认文章
            // this.createArticle();
        }
    },
    onUnload() {
        // 页面关闭后清空数据
        this.animationData = {}
    },
    onBackPress(){

    },
    watch: {

    },
    mounted(){
        
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
        showDrawer() {
            this.$refs.showLeft.open();
        },
        closeDrawer() {
            this.$refs.showLeft.close();
        },
        // 跳转到封面图裁剪页面
        toClipperPage() {
            uni.navigateTo({
                url: "/pages/mine/clipper?type=article&width=500&height=300",
            });
        },
        // 删除文章封面图片
        deleteArticleImg(){
            // this.$http.delete('/ape-article/theme/deleteCoverImg', {url: this.themeInfo.picture}, {header: {"content-type":"application/x-www-form-urlencoded;charset=UTF-8"}, load: false})
            //     .then((response) => {
            //         if (response.success) {
            //             this.themeInfo.picture = '';
            //         }
            //     });
        },
        switchTheme(theme) {
            if (this.editorTheme === theme) {
                return;
            }
            this.editorTheme = theme;
            this.content = this.towxmlFunc(this.tempContent, 'markdown',{
        	    base:'https://xxx.com',	  // 相对资源的base路径
        	    theme: this.editorTheme,	// 主题，默认`light`, dark
        	    events:{	// 为元素绑定的事件方法
        	    	tap:(e)=>{
                        console.log("55555555")
        	    		console.log(e);
        	    	}
        	    }
            });
        },
        previewArticle(value){
            this.tempContent = value;
            this.content = this.towxmlFunc(value, 'markdown',{
        	    base:'https://xxx.com',	  // 相对资源的base路径
        	    theme: this.editorTheme,	// 主题，默认`light`, dark
        	    events:{	// 为元素绑定的事件方法
        	    	tap:(e)=>{
        	    		console.log('tap',e);
        	    	}
        	    }
            });
            this.preview();
        },
        popupAnimation(){
            this.animation.translateY('-100%').step({duration: 200});
            this.animationData = this.animation.export();
            this.showTextarea = false;
        },
        closePopupAnimation(){
            this.animation.translateY('100%').step({duration: 200});
            this.animationData = this.animation.export();
            this.showTextarea = true;
        },
        preview(){
            this.popupAnimation();
            this.showTextarea = false;
        },
        // 默认初始化空文章
        createArticle(){
            this.$http.post('/ape-article/article/create', {uid: this.userInfo.id}, {header: {"content-type":"application/x-www-form-urlencoded;charset=UTF-8"}, load: false}).then((response) => {
                if (response.success) {
                    this.articleData = response.data;
                }
            }).catch((error) => {
                uni.showToast({ title: '请检查网络', icon: "none" });
            })
        },
        // 加载需要修改的文章
        loadArticleById(id){
            this.$http.get(`/ape-article/article/search/${id}`, null, {header: {"content-type":"application/x-www-form-urlencoded;charset=UTF-8"}, load: false}).then((response) => {
                if (response.success) {
                    this.articleData = response.data;
                    this.textareaData = response.data.content;
                }
            }).catch((error) => {
                uni.showToast({ title: '请检查网络', icon: "none" });
            })
        },
        //保存文章内容
        saveArticle(){

        },
        //发布文章内容
        publishArticle(){
            this.$refs.articleInfo.validate().then((valid) => {
                if (this.$commonJs.isEmpty(this.articleData.picture)) {
                    uni.showToast({ title: '封面图片不能为空', icon: "none" });
                    return;
                }
            }).catch((error) => {
                console.log("表单错误信息：", error);
            });
        }
    },
    destroyed() {
        
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/iconfont.scss';
.editor-container{
    /deep/ .popup-container {
        background: rgba(0, 0, 0, 0.2);
        .popup{
            height: 100% !important;
        }
    }
    .bottom-popup {
        .switchTheme {
            position: absolute;
            top: 0;
            right: 90rpx;
            line-height: 60rpx;
            icon {
                font-size: 40rpx;
                padding-left: 5rpx;
                padding-right: 5rpx;
            }
            .icon-dark_mode {
                color: #333;
            }
            .icon-Light {
                color: #fff;
            }
        }
    }
    .content-box{
        width: 100%;
        padding-bottom: 40rpx;
        box-sizing: border-box;
        /deep/ .h2w__main {
            padding-top: 0rpx;
        }
    }
    /deep/ .uni-drawer__content {
        width: 100% !important;
    }
    .close-drawer {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 40rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
    }
    .from-box {
        width: 70%;
        margin: 80rpx auto 40rpx;
        /deep/ .uni-easyinput{
            border-bottom: none !important;
        }
        /deep/ .uni-error-message-text{
            padding-left: 0rpx !important;
        }

        .select-img{
            width: 300rpx;
            height: 180rpx;
            margin: 0 auto;
            border-radius: 10rpx;
            border: 2rpx dashed #DDD;
            background-color: #EFEFEF;
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            color: #9e9e9e;
            .icon-xiangji1{
                font-size: 60rpx;
            }
            .text{
                margin-top: 10rpx;
                font-size: 28rpx;
            }
        }
        .show-box{
            position: relative;
            width: 350rpx;
            height: 210rpx;
            margin: 0 auto;
            .show-img{
                width: 100%;
                height: 100%;
                border-radius: 10rpx;
            }
            .delete-btn{
                position: absolute;
                padding: 10rpx 15rpx;
                top: 0;
                right: 0;
                background: rgba(0, 0, 0, .3);
                border-radius: 0 10rpx 0 10rpx;
                color: #fff;
            }
        }
    }
    .operator-box {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: #e3e3e3;
        .save, .publish {
            width: 50%;
            display: grid;
            padding: 20rpx 0;
            text-align: center;
        }
        text {
            font-size: 24rpx;
        }
    }
}
</style>