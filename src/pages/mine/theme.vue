<template>
    <view class="theme-container">
        <z-paging ref="paging" :refresher-threshold="100" :refresher-max-angle="60" :empty-view-text="'暂无数据'" :empty-view-title-style="emptyData"
            :empty-view-img="emptyDataImg" :empty-view-center="false" :empty-view-img-style="emptyDataImgStyle" :lower-threshold="5" 
            :loading-more-no-more-text="'我可是有底线的'"
            :hide-loading-more-when-no-more-and-inside-of-paging="true"
            :show-refresher-update-time="true"
            :hide-loading-more-when-no-more-by-limit="11"
            :default-page-size="10"
            v-model="themeleList" @query="queryList">
            <uni-swipe-action>
              <view class="item" v-for="(item, index) in themeleList" :key="index">
                <uni-swipe-action-item style="width: 100%;" :right-options="options" :threshold="60"  @click="bindClickItem($event, index)" @change="swipeChange($event, index)">
                  <view class="warpper-box">
                    <image class="theme-img" :lazy-load="true" :src="item.picture" @click.stop="previewImg(index)"></image>
                    <view class="content-box">
                        <view class="describle-box">
                            <view class="title">{{ item.name }}</view>
                            <xzj-readmore hideLineNum="1" :showHeight="50">{{ item.description }}</xzj-readmore>
                            <view class="article-count">章节数 {{ item.id }}</view>
                        </view>
                    </view>
                  </view>
                </uni-swipe-action-item>
              </view>
            </uni-swipe-action>
        </z-paging>
        <view class="add-btn" :style="{backgroundColor: styles.themeColor, boxShadow: '2rpx 0rpx 20rpx 0 ' + styles.themeColor}" @click="popupAnimation()">
            <view class="wrap-btn">
                <icon class="iconfont icon-tag"></icon>
                新建
            </view>
        </view>

        <bottom-popup class="bottom-popup" style="width:100%; height: 100%; position: fixed; bottom: -100%; background-color: transparent; z-index: 100;"
          v-on:closePopup="closePopupAnimation()"
          :animation="animationData" 
          @touchmove.stop.prevent=""
        >
          <scroll-view scroll-y="true" :style="{ height: scrollViewHeight }">
            <view class="from-box">
                <uni-forms
                ref="themeInfo"
                :modelValue="themeInfo"
                :rules="formRules"
                >
                    <uni-forms-item name="name">
                      <uni-easyinput
                        :styles="{borderColor: styles.themeColor}"
                        :trim="true"
                        type="text"
                        placeholder="专题名称"
                        clearSize="20"
                        :clearable="true"
                        maxlength="15"
                        v-model="themeInfo.name"
                      />
                    </uni-forms-item>
                    <uni-forms-item name="description">
                      <uni-easyinput
                        :styles="{borderColor: styles.themeColor}"
                        :trim="true"
                        type="textarea"
                        bot
                        autoHeight
                        maxlength="100"
                        clearSize="20"
                        placeholder="专题描述"
                        v-model="themeInfo.description"
                      />
                    </uni-forms-item>
                </uni-forms>
                <view class="select-img" v-if="$commonJs.isEmpty(themeInfo.picture)" @click="toClipperPage()">
                    <icon class="iconfont icon-xiangji1"></icon>
                    <text class="text">选择封面图片</text>
                </view>
                <view class="show-box" v-else>
                    <image class="show-img" :src="themeInfo.picture"></image>
                    <view class="delete-btn" @click="deleteThemeImg()">&times;</view>
                </view>
                <wyb-button
                    width="80%"
                    type="filled"
                    :color="styles.themeColor"
                    ripple="true"
                    ripple-bg-color="rgba(255,255,255,0.15)"
                    font-size="32rpx"
                    :radius="['40rpx']"
                    box-shadow="0 2px 4px 0 rgba(0, 0, 0, 0.1)"
                    @click="saveTheme()"
                    >保存</wyb-button
                >
            </view>
          </scroll-view>
        </bottom-popup>

    </view>
</template>

<script>
import styles from "../../uni.scss";
import uniSwipeAction from "../../components/uni-swipe-action/uni-swipe-action.vue";
import uniSwipeActionItem from "../../components/uni-swipe-action-item/uni-swipe-action-item.vue";
import zPaging from "../../components/z-paging/z-paging.vue";
import imgStatic from "../../static/image/image.js";
import xzjReadmore from "../../components/xzj-readMore/xzj-readMore.vue";
import bottomPopup from '../../components/custom/bottom-popup.vue';
import { uniForms } from "../../components/uni-forms/uni-forms.vue";
import { uniFormsItem } from "../../components/uni-forms-item/uni-forms-item.vue";
import { uniEasyinput } from "../../components/uni-easyinput/uni-easyinput.vue";
import { uniDataCheckbox } from "../../components/uni-data-checkbox/uni-data-checkbox.vue";
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
            themeleList: [],
            // 初始化动画实例
            animationData: {},
            scrollViewHeight: '',
            formRules: {
                name: {
                    rules: [
                        {
                          required: true,
                          errorMessage: "专题名称不能为空",
                        }
                    ],
                },
                description: {
                    rules: [
                        {
                          required: true,
                          errorMessage: "专题描述不能为空",
                        }
                    ],
                }
            },
            themeInfo: {
                uid: '',
                name: '',
                description: '',
                picture: ''
            },
            // 当前更新的专题下标
            currentUploadThemeIndex: null
        }
    },
    onLoad(){
        // 创建动画实例
        this.animation = uni.createAnimation();
        let bottomPopupDom = uni.createSelectorQuery().select(".bottom-popup");
        bottomPopupDom
          .boundingClientRect((dom) => {
            this.scrollViewHeight = (dom.height * 0.8 - 30) + "px";
          })
        .exec();
    },
    onUnload() {
        // 页面关闭后清空数据
        this.animationData = {}
    },
    onShow() {
        this.$commonJs.setNavigationBarColor();
    },
    components: {
        zPaging,
        uniSwipeAction,
        uniSwipeActionItem,
        xzjReadmore,
        uniForms,
        uniFormsItem,
        uniEasyinput,
        uniDataCheckbox,
        bottomPopup
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
                let _this = this;
                _this.themeInfo = _this.themeleList[index];
                _this.popupAnimation();
                _this.currentUploadThemeIndex = index;
            }

            // 删除专题
            if (e.content.text == '删除') {
              let _this = this;
              uni.showModal({
                  title: this.themeleList[index].name,
                  content: '确定删除该专题吗？相关数据将转移',
                  confirmColor: styles.themeColor,
                  success: function (res) {
                    if (res.confirm) {
                        _this.$http.delete('/ape-article/theme/delete', {id: _this.themeleList[index].id, uid: _this.userInfo.id}, 
                            {header: {"content-type":"application/x-www-form-urlencoded;charset=UTF-8"}, load: false}).then((response) => {
                            if (response.success) {
                                _this.themeleList.splice(index, 1);
                                _this.$refs.paging.complete(_this.themeleList);
                                uni.showToast({ title: response.message, icon: "none" });
                            }
                        }).catch((error) => {
                            uni.showToast({ title: '请检查网络', icon: "none" });
                        })
                    }
                  }
              });
            }
        },
        swipeChange(e,index){
            console.log('当前状态：'+ e +'，下标：' + index)
        },
        // 预览图片
        previewImg(index){
            let images = [];
            images[0] = this.themeleList[index].picture;
            uni.previewImage({
                current: 0,
                urls: images,
                longPressActions: {
                    //长按保存图片到相册
                    itemList: ["保存图片"],
                    success: (data) => {
                        uni.saveImageToPhotosAlbum({
                            //保存图片到相册
                            filePath: path,
                            success: function () {
                                uni.showToast({ icon: "success", title: "保存成功" });
                            },
                            fail: (err) => {
                                uni.showToast({ icon: "none", title: "保存失败，请重新尝试" });
                            },
                        });
                    },
                    fail: (err) => {
                        console.log(err.errMsg);
                    },
                },
            });
        },
        // 查询所有专题
        queryList(pageNo, pageSize) {
            this.$http.get(`/ape-article/theme/AA`, null, {load: false}).then((response) => {
                console.log(response)
            }).catch((error) => {
                
            })
            console.log("==============")
            this.$http.get(`/ape-article/theme/searchAll/${this.userInfo.id}`, null, {load: false}).then((response) => {
                this.$refs.paging.complete(response.data);
            }).catch((error) => {
                this.$refs.paging.complete(false);
                uni.showToast({title: '服务内部错误', icon: 'none'});
            })
            
        },
        toClipperPage() {
            uni.navigateTo({
                url: "/pages/mine/clipper?type=theme&width=500&height=300&isLockWidth=true&isLockHeight=true",
            });
        },
        popupAnimation(){
            this.animation.translateY('-100%').step({duration: 200});
            this.animationData = this.animation.export();
        },
        closePopupAnimation(){
            this.animation.translateY('100%').step({duration: 200});
            this.animationData = this.animation.export();
        },
        // 保存专题
        saveTheme(){
            this.$refs.themeInfo.validate().then((valid) => {
                if (this.themeInfo.picture === '') {
                    uni.showToast({ title: '封面图片不能为空', icon: "none" });
                    return;
                }
                // 新增
                if (this.$commonJs.isEmpty(this.currentUploadThemeIndex)) {
                    this.themeInfo.uid = this.userInfo.id;
                    this.$http.post('/ape-article/theme/create', JSON.stringify(this.themeInfo), {header: {"content-type":"application/json;charset=UTF-8"}, load: false}).then((response) => {
                        if (response.success) {
                            this.themeleList.push(response.data);
                            this.$refs.paging.complete(this.themeleList);
                            uni.showToast({ title: response.message, icon: "none" });
                            this.closePopupAnimation();
                            this.cleanThemeInfo(this);
                        }
                    })
                }else {
                    // 更新
                    this.$http.post('/ape-article/theme/update', JSON.stringify(this.themeInfo), {header: {"content-type":"application/json;charset=UTF-8"}, load: false}).then((response) => {
                        if (response.success) {
                            this.themeleList[this.currentUploadThemeIndex] = this.themeInfo;
                            this.$refs.paging.complete(this.themeleList);
                            uni.showToast({ title: response.data, icon: "none" });
                            this.closePopupAnimation();
                            this.cleanThemeInfo(this);
                            this.currentUploadThemeIndex = null;
                        }
                    })
                }
                
            }).catch((error) => {
              console.log("表单错误信息：", error);
            });
        },
        // 删除专题图片
        deleteThemeImg(){
            this.$http.delete('/ape-article/theme/deleteCoverImg', {url: this.themeInfo.picture}, {header: {"content-type":"application/x-www-form-urlencoded;charset=UTF-8"}, load: false})
                .then((response) => {
                    if (response.success) {
                        this.themeInfo.picture = '';
                    }
                });
        },
        cleanThemeInfo(_this){
            _this.themeInfo = { uid: '', name: '', description: '', picture: '' };
        }

    }   
}
</script>

<style lang="scss" scoped>
@import "../../static/css/iconfont.scss";
.theme-container{
    height: 100%;
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
        .theme-img{
          margin: 0rpx 20rpx;
          align-self: center;
          width: 200rpx;
          height: 120rpx;
          border-radius: 10rpx;
          overflow: hidden;
        }
        .content-box {
            width: 100%;
            display: flex;
            flex-direction: row;
            .describle-box{
                position: relative;
                width: 95%;
                min-height: 180rpx;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                .title{
                    align-self: flex-start;
                    margin-top: 40rpx;
                    font-size: 36rpx;
                    color: #333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
                /deep/ .watchMore{
                    width: auto;
                    float: right;
                }
                .article-count{
                    position: absolute;
                    bottom: 0;
                    font-size: 24rpx;
                    color: #9e9e9e;
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
    .add-btn{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 120rpx;
        height: 120rpx;
        border-radius: 0 120rpx 0 0;
        z-index: 100;
        opacity: 0.6;
        color: #fff;
        font-size: 24rpx;
        .wrap-btn{
            display: flex;
            flex-direction: column;
            position: absolute;
            bottom: 10rpx;
            margin-left: 25rpx;
            .icon-tag {
                font-size: 46rpx;
            }
        }
    }

    /deep/ .popup-container {
        background: rgba(0, 0, 0, 0.2);
        .popup{
            height: 70% !important;
        }
    }

    .from-box{
        width: 70%;
        margin: 40rpx auto;
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
        /deep/ .wyb-btn-box{
            margin: 40rpx auto 0;
        }
    }
}
</style>