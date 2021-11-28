<script>
	import { mapMutations } from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//同步获取本地数据
			let userInfo = uni.getStorageSync('user_info');
			//判断本地缓存是否存在数据
			if (userInfo !== "") {
				//传到vuex里面储存起来，并改变登录状态
				this.login(userInfo)
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login'])
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 设置页面高度100%，需要在子页面标签中设置100% */
	uni-page-body, html, body{  
        height: 100%;  
    }
	.container{
		padding: 30rpx 30rpx 0rpx;
	}
</style>
