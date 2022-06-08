<script>
	import initApp from '@/api/init.js'
	export default {
		//全局变量
		globalData:{
			richcontent:"",//富文本临时传递存储
			appVersion: "",//当前app版本号
		},
		onLaunch: function() {
			console.warn('unielepy已启动')
			console.log('App Launch')
			initApp()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import "@/uni_modules/uview-ui/index.scss";  
	/* #ifndef APP-NVUE */
	@import '@/static/unielepystatic/customicons.css';
	@import '@/static/unielepystatic/css/css.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
