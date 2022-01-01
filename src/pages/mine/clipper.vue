<template>
  <view>
    <l-clipper
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
            url: ''
        }
    },
    components: {
        lClipper,
    },
    methods: {
        success($event){
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
        cancel(){
            uni.navigateBack();
        },
    }
}
</script>

<style lang="scss" scoped>

</style>