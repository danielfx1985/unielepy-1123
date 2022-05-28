<template>
	<view class="container rich-text-detail">
		<!-- <rich-text class="pro-detail" :nodes="content"></rich-text> -->
		<u-parse class="pro-detail" :content="content"></u-parse>
	</view>
</template>

<script>
	import {getOtherSettings} from '@/api/api.js'
	export default {
		data() {
			return {
				content: '',
				name:'',//标题名字
				type:'',//其他配置键值
			};
		},
		onShow() {
			// let richtext = uni.getStorageSync('__rich_text');
			// // console.log('richtext', richtext);
			// this.content = richtext;

		},
		onLoad(e) {
			this.name = e.name
			this.type = e.type
			uni.setNavigationBarTitle({ title:e.name })
			this.getData(e.name)
		},
		methods:{
			getData(type){
				var params = {
					key:type
				}
				getOtherSettings(params).then(res=>{
					if(res.code==2000){
						this.content = res.data.data.value
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.container{
		
	}
	.margin-lr {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.margin-top {
	    margin-top: 15rpx;
	}
	.rich-text-detail{	
		background: #FFFFFF;
		border-radius: 10rpx;
		padding:30rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.pro-detail {
		overflow: hidden;
		-webkit-touch-callout: none;
		font-size: 26rpx;
		font-weight: 400;
		color: #333333;
		::v-deep img{		
			max-width: 100%;
			overflow: hidden;
		}
	}
</style>
<style>
	
</style>