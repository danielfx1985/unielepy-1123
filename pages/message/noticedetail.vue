<template>
	<view class="container">
		<view style="height: 20rpx;background-color: #F6F8F8;"></view>
		<view class="rich-text-detail">
			<view class="headertext">
				<text class="firsttext">{{name}}</text>
				<text>{{create_datetime}}</text>
			</view>
			<!-- <rich-text class="pro-detail" :nodes="content"></rich-text> -->
			<u-parse class="pro-detail" :content="content"></u-parse>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				content: '',
				name:'小程序全新升级啦，快来体验吧！',
				create_datetime:'2022.03.10',
				
			};
		},
		onShow() {
			// let richtext = uni.getStorageSync('__rich_text');
			// // console.log('richtext', richtext);
			// this.content = richtext;

		},
		onLoad(e) {
			// console.log(e)
			// if(Object.keys(e).length>0){
			// 	this.content = e.content;
			// 	this.name = e.name;
			// 	this.create_datetime = e.create_datetime;
			// }
			var globalData = getApp().globalData.richcontent; //获取全局变量
			this.content = globalData.msg_content;
			this.name = globalData.msg_title;
			this.create_datetime = globalData.create_datetime;
		}
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
	.headertext{
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		.firsttext{
			word-break: break-all;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: pre-wrap;
		}
		text:last-child{
			text-align: right;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
			margin-top: 10rpx;
		}
	}
	.rich-text-detail{	
		background: #FFFFFF;
		border-radius: 10rpx;
		padding:30rpx 30rpx 60rpx 30rpx;
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