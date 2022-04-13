<template>
    <view class="markdown-container">
        <scroll-view scroll-x="true" class="toolbar" style="white-space: nowrap;">
			<view class="tool" @click="previewArticle()"><icon class="iconfont icon-preview5"></icon></view>
			<view class="tool" @click.prevent="clickChooseToolbar('bold')"><icon class="iconfont icon-bold"></icon></view>
			<view class="tool" @click="clickChooseToolbar('italic')"><icon class="iconfont icon-italic"></icon></view>
			<view class="tool" @click="clickChooseToolbar('header')"><icon class="iconfont icon-header"></icon></view>
			<view class="tool" @click="clickChooseToolbar('underline')"><icon class="iconfont icon-underline"></icon></view>
			<view class="tool" @click="clickChooseToolbar('strike')"><icon class="iconfont icon-strike"></icon></view>
			<view class="tool" @click="clickChooseToolbar('sup')"><icon class="iconfont icon-sup"></icon></view>
			<view class="tool" @click="clickChooseToolbar('sub')"><icon class="iconfont icon-sub"></icon></view>
			<view class="tool" @click="clickChooseToolbar('aligncenter')"><icon class="iconfont icon-aligncenter"></icon></view>
			<view class="tool" @click="clickChooseToolbar('link')"><icon class="iconfont icon-link"></icon></view>
			<view class="tool" @click="clickChooseToolbar('imgage')"><icon class="iconfont icon-image"></icon></view>
			<view class="tool" @click="clickChooseToolbar('code')"><icon class="iconfont icon-code"></icon></view>
			<view class="tool" @click="clickChooseToolbar('table')"><icon class="iconfont icon-table"></icon></view>
			<view class="tool" @click="clearArticle()"><icon class="iconfont icon-clear"></icon></view>
            <view class="tool" @click="importMdFile()"><icon class="iconfont">导入</icon></view>
			<view class="tool" @click="publishArticle('publish')"><icon class="iconfont">发布</icon></view>
		</scroll-view>
        <view class="input-content" :style="{ height: inputContentHeight }" v-if="showTextarea">
            <textarea class="text-box" :style="{ height: inputContentHeight }" maxlength="-1" placeholder="写你心灵所想..." 
                :cursor="normalCursorPosition" @blur="getCursor($event)" :focus="cursor" v-model="textareaData"></textarea>
        </view>
    </view>
</template>

<script>
export default {
    props : {
        showTextarea: {
			type: Boolean,
			default: true
		},
        articleContent: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imageValue:[],
            inputContentWidth: 0,
			inputContentHeight: 0,
            // 点击选择的toolbar
            clickTool: '',
            // 默认不聚焦
            cursor: true,
            // 默认光标位置
            normalCursorPosition: 0,
            textareaData: '',
        }
    },
    watch: {
        articleContent(newVal, oldVal) {
            if (!this.$commonJs.isEmpty(newVal)) {
                this.textareaData = newVal;
            }
        }
    },
    created(){
        // 可用窗口宽高
		let windowHeight = null;
		let windowWidth = null;
		uni.getSystemInfo({
		    success: function (res) {
		        windowHeight = res.windowHeight;
				windowWidth = res.windowWidth;
		    }
		});
		let toolbar = uni.createSelectorQuery().in(this).select(".toolbar");
    	toolbar.boundingClientRect((dom) => {
			if (windowHeight !== null) {
				this.inputContentHeight = (windowHeight - dom.height - 4) + 'px';
			}
    	}).exec();
		
	},
    methods: {
        importMdFile(){
            // wx.chooseMessageFile({
            //     count: 1, // 最多可以选择的文件个数，可以 0～100
            //     type: 'file', // 所选的文件的类型 默认值 all 可选值 video image file
            //     extension: ['md','MD'], // 根据文件拓展名过滤
            //     success: function (res) {
            //         console.log(res)
            //     }
            // })
            uni.chooseFile({
              count: 1, //默认100
              extension:['.md'],
            	success: function (res) {
            		console.log(JSON.stringify(res.tempFilePaths));
            	}
            });
        },
        // 失去焦点时获取当前光标的位置
        getCursor(event) {
            // 这里可适当加个定时器，延时执行下面的内容，因为可能会执行getCursor()再执行clickChooseToolbar()
            //取消聚焦
            this.cursor = false;
            this.normalCursorPosition = event.target.cursor;
            if (!this.$commonJs.isEmpty(this.clickTool)) {
                this.toolBarClick(this.clickTool);
                this.clickTool = '';
            }
        },
        // 点击工具栏拼接插入内容，value => 值，position => 插入内容时，光标偏移插入内容的偏移量
        chooseToolbarSetValue(value, position){
            // 返回获取从0到光标位置的字符串，在光标处插入value值
            this.textareaData = this.textareaData.slice(0, this.normalCursorPosition) + value + this.textareaData.slice(this.normalCursorPosition);
            this.normalCursorPosition = this.normalCursorPosition + value.length - position;
            // this.$nextTick 在下一次DOM更新后执行回调
            setTimeout(() =>{
                this.$nextTick(() => {
                    this.cursor = true;
                });
            }, 100);
        },
        // 点击选择插入那个按钮的内容
        clickChooseToolbar(value){
            this.clickTool = value;
            // 失去了焦点并点击了toolbar
            // if (!this.cursor && !this.$commonJs.isEmpty(this.clickTool)) {
            //     this.toolBarClick(this.clickTool);
            //     this.clickTool = '';
            // }
        },
        toolBarClick(type){
            if (type === 'bold') {
                this.chooseToolbarSetValue('**粗体文字**', 2);
            } else if (type == "italic") {
                this.chooseToolbarSetValue('*斜体*', 1);
			} else if (type == "header") {
                let _this = this;
				uni.showActionSheet({
					itemList: ["标题1", "标题2", "标题3", "标题4", "标题5", "标题6"],
					success: res => {
						switch (res.tapIndex) {
							case 0:
                                if (_this.$commonJs.isEmpty(this.textareaData)) {
                                    _this.chooseToolbarSetValue('# 标题1', 0);
                                }else{
                                    _this.chooseToolbarSetValue('\n# 标题1', 0);
                                }
								return;
							case 1:
                                if (_this.$commonJs.isEmpty(this.textareaData)) {
                                    _this.chooseToolbarSetValue('## 标题2', 0);
                                }else{
                                    _this.chooseToolbarSetValue('\n## 标题2', 0);
                                }
								return;
							case 2:
                                if (_this.$commonJs.isEmpty(this.textareaData)) {
                                    _this.chooseToolbarSetValue('### 标题3', 0);
                                }else{
                                    _this.chooseToolbarSetValue('\n### 标题3', 0);
                                }
								return;
							case 3:
                                if (_this.$commonJs.isEmpty(this.textareaData)) {
                                    _this.chooseToolbarSetValue('#### 标题4', 0);
                                }else{
                                    _this.chooseToolbarSetValue('\n#### 标题4', 0);
                                }
								return;
							case 4:
                                if (_this.$commonJs.isEmpty(this.textareaData)) {
                                    _this.chooseToolbarSetValue('##### 标题5', 0);
                                }else{
                                    _this.chooseToolbarSetValue('\n##### 标题5', 0);
                                }
								return;
							case 5:
                                if (_this.$commonJs.isEmpty(this.textareaData)) {
                                    _this.chooseToolbarSetValue('###### 标题6', 0);
                                }else{
                                    _this.chooseToolbarSetValue('\n###### 标题6', 0);
                                }
								return;
						}
					}
				})
			} else if (type == "underline") {
                this.chooseToolbarSetValue('++下划线++', 2);
			} else if (type == "strike") {
                this.chooseToolbarSetValue('~~中划线~~', 2);
			} else if (type == "sup") {
                this.chooseToolbarSetValue('<sup>上角标</sup>', 6);
			} else if (type == "sub") {
                this.chooseToolbarSetValue('<sub>下角标</sub>', 6);
			} else if (type == "alignleft") {
                this.chooseToolbarSetValue('\n<alignleft>左对齐</alignleft>\n', 12);
			} else if (type == "aligncenter") {
                this.chooseToolbarSetValue('\n<center>居中对齐</center>\n', 9);
			} else if (type == "alignright") {
                this.chooseToolbarSetValue('\n<alignright>右对齐</alignright>\n', 13);
			} else if (type == "link") {
                this.chooseToolbarSetValue('[在此输入网址描述](在此输入网址)', 9);
			} else if (type == "imgage") {
				uni.chooseImage({
					count: 1,
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							mask: true,
							title: "上传中",
						})
						uni.uploadFile({
							url: '', //在此填写图片上传地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {},
							complete: function () {
								uni.hideLoading();
							},
							success: uploadFileRes => {
								var data = JSON.parse(uploadFileRes.data);
                                this.chooseToolbarSetValue("![](" + data.data + ")", 0);
                                return;
							}
						});
					}
				})
                this.chooseToolbarSetValue("![](在此输入图片地址)", 1);
			} else if (type == "code") {
                if (this.$commonJs.isEmpty(this.textareaData)) {
                    this.chooseToolbarSetValue("```代码块\n\n```\n", 6);
                }else{
                    this.chooseToolbarSetValue("\n```代码块\n\n```\n", 6);
                }
			} else if (type == "table") {
                if (this.$commonJs.isEmpty(this.textareaData)) {
                    this.chooseToolbarSetValue("|列1|列2|列3|\n| :--: | :--: | :--: |\n|单元格1|单元格2|单元格3|\n", 0);
                }else{
                    this.chooseToolbarSetValue("\n|列1|列2|列3|\n| :--: | :--: | :--: |\n|单元格1|单元格2|单元格3|\n", 0);
                }
			}
        },
        // 预览编辑内容
        previewArticle(){
            this.$emit('previewArticle', this.textareaData);
        },
        // 清空内容
        clearArticle(){
            let _this = this;
			uni.showModal({
				title: "提示",
				content: "确定清空?",
				success: res => {
					if (res.confirm) {
						_this.textareaData = "";
                        setTimeout(() =>{
                            _this.normalCursorPosition = 0;
                            _this.$nextTick(() => {
                                _this.cursor = true;
                            });
                        }, 100);
					}
				}
			});
        },
        publishArticle(){
            this.$emit('publishArticle');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/iconfont.scss';
.markdown-container{
	height: 100%;
	.toolbar {
		width: 100%;
		border: none;
		box-shadow: 0 0rpx 4rpx rgba(0, 0, 0, 0.157), 0 0px 4rpx rgba(0, 0, 0, 0.227);
		background-color: #fff;
		.tool {
            display: inline-flex;
            flex-wrap: nowrap;
            flex-direction: column;
			text-align: center;
			outline: none;
			.iconfont{
				padding: 20rpx 26rpx 30rpx;
				color: #757575;
			}
		}
	}
	.input-content{
		position: relative;
		.text-box {
            position: fixed;
            width: 100%;
			height: 100%;
			padding: 16rpx;
			line-height: 1.5;
			box-sizing: border-box;
			color: #333;
			font-size: 30rpx;
		}
	} 
}
</style>