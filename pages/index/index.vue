<template>
	<view class="container">
		<view class="home-swiper">
			<swiper :indicator-dots="indicatorDots" :indicator-color="indicatorDotsColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in swiperDatas" :key="index">
					<image mode="aspectFill" @click.stop="jumptopage(item)" :src="item.image"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {getOtherSettings,getRotationimgs} from '@/api/api'
	export default {
		components:{
		},
		data() {
			return {
				indicatorDots:true,
				indicatorDotsColor: 'rgba(255,255,255,.5)',
				indicatorActiveColor: 'rgba(255,255,255,1)',
				autoplay: true,
				interval: 5000,
				duration: 500,
				swiperDatas:[
					{id:1,image:'../../static/logo.png',link:'https://www.baidu.com'},
					{id:2,image:'../../static/logo.png',link:'https://www.baidu.com'},
					{id:3,image:'../../static/logo.png',link:'https://www.baidu.com'},
				],//轮播图
				formInline:{
					page:1,
					limit:10
				},
			}
		},
		// 监听页面加载
		onLoad() {
			
		},
		created() {
		},
		// 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		onShow() {
			this.getData()
		},
		// 监听用户下拉刷新
		onPullDownRefresh() {
			this.getData()
			uni.stopPullDownRefresh()
		},
		methods: {
			//轮播图获取数据
			getLunBo() {
				var params = {
					type:1
				}
				getRotationimgs(params).then(res=>{
					if(res.code == 2000) {
						let data = res.data.data
						console.log(data)
						this.swiperDatas = data
					}
					//  else {
					// 	uni.showToast({
					// 		icon:'none',
					// 		mask:true,
					// 		title:res.msg || '请求失败'
					// 	})
					// }
				})
			},
			// 跳转页面
			jumptopage(item) {
				if (item && (item.link.indexOf("http://") != -1 || item.link.indexOf("https://") != -1)) {
					uni.navigateTo({
						url: `/pages/content/webview?url=${item.link}`
					});
				} else if (item && item.link.indexOf("/pages/") != -1) {
					uni.navigateTo({
						url: `${item.link}`
					});
				}
			},
			getData() {
				this.getLunBo()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.home-logo{
		
	}
	.container {
		font-size: 14px;
		line-height: 24px;
		background: #FFFFFF;
	}
	.home-swiper{
		swiper{
			height: 380rpx;
		}
		image{
			width: 100%;
			height: 100%;
		}
	}
	.home-swiper ::v-deep .swiper-dot{
		background: rgba(255,255,255,.5) !important;
	}
	.home-swiper ::v-deep .swiper-dot-active{
		background: rgba(255,255,255,1) !important;
	}
</style>
