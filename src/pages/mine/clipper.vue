<template>
<!-- https://ext.dcloud.net.cn/plugin?id=3594 -->
  <view>
    <l-clipper
      :width="width"
      :height="height"
      :is-lock-width="isLockWidth"
      :is-lock-height="isLockHeight"
      @success="success($event)"
      @cancel="cancel()"
    />
  </view>
</template>

<script>
import lClipper from "../../components/l-clipper/l-clipper.vue";
export default {
    data() {
        return {
            type: null,
            width: 400,
            height: 400,
            isLockWidth: false,
            isLockHeight: false,
            url: ''
        }
    },
    onLoad(options) {
        if (options.type != undefined) {
            this.type = options.type;
        }
        if (options.width != undefined) {
            this.width = options.width;
        }
        if (options.height != undefined) {
            this.height = options.height;
        }
        if (options.isLockWidth != undefined) {
            this.isLockWidth = options.isLockWidth;
        }
        if (options.isLockHeight != undefined) {
            this.isLockHeight = options.isLockHeight;
        }
    },
    components: {
        lClipper,
    },
    methods: {
        success($event){
            if (this.type === 'avatar') {
                this.uploadAvatarImg($event);
            }
            if (this.type === 'theme') {
                this.uploadThemeImg($event);
            }
        },
        cancel(){
            uni.navigateBack();
        },

        // 上传头像
        uploadAvatarImg($event){
            this.url = $event.url;
            let jwtData = uni.getStorageSync('user_info');
            let uid = jwtData.userInfo.id;
            const _this = this;
            // 先返回上一页再上传图片
            this.$http.uploadFile(
                `/ape-user/userInfo/modifyAvatar/${uid}`,
                'file', 
                {},
                this.url
            ).then((response) => {
                if (!response.success){
                    uni.showToast({ title: response.message, icon: "none" });
                    return;
                }
                jwtData.userInfo.avatar = response.data;
                uni.setStorage({
                    key: 'user_info',
                    data: jwtData,
                    success: function () {
                        _this.$store.commit('updateUserInfo');
                    }
                })
                uni.navigateBack({delta: 1});
            }).catch((error) => {
                console.log(error)
            })
        },

        // 上传专题封面图
        uploadThemeImg($event){
            this.url = $event.url;
            const _this = this;
            this.$http.uploadFile(
                '/ape-article/theme/uploadCoverImg',
                'file', 
                {},
                this.url
            ).then((response) => {
                if (!response.success){
                    uni.showToast({ title: response.message, icon: "none" });
                    return;
                }
                // 获取所有页面栈实例列表
                let currentPage = getCurrentPages();
                // 上一页页面实例
                let prePage = currentPage[currentPage.length - 2];
                // 给上一页的专题封面图设置图片URL
                prePage.$vm.themeInfo.picture = response.data;
                uni.navigateBack({delta: 1});
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>