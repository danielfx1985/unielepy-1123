<template>
	<view>
		<!-- <u-navbar leftText="个人信息" class="leftext" size="30"   :autoBack="true" :bgColor="bgColor">
		</u-navbar> -->
		<view class="info-container" >
			<view class="lygap20-bg"></view>
			<view class="info-item" @click="changeAvatar">
				<text>头像</text>
				<view class="info-item-right">
					<image :src="userInfo.avatar" class="u-tou"></image>
					<image src="/static/unielepystatic/img/public/arrow-right.png" class="u-tou-right-jiantou"></image>
				</view>
			</view>
			<view class="info-item" @click="jumpto('/pages/my/setnick?nickname='+userInfo.nickname)">
				<text>昵称</text>
				<view class="info-item-right">
					<text>{{userInfo.nickname}}</text>
					<image src="/static/unielepystatic/img/public/arrow-right.png" class="u-tou-right-jiantou"></image>
				</view>
			</view>
			<view class="info-item" @click="jumpto('/pages/login/pwdreset/pwdreset')">
				<text>修改密码</text>
				<view class="info-item-right">
					<text></text>
					<image src="/static/unielepystatic/img/public/arrow-right.png" class="u-tou-right-jiantou"></image>
				</view>
			</view>
		</view>
		<!-- <view style="flex: auto;">
		    <view style="position: absolute;text-align: center; bottom:100rpx;width: 100%;"><button class="btn-add" type="primary" @click="logout">退出登录</button></view>
		</view> -->
	</view>
</template>

<script>
	import {xcxChooseUploadAvatar} from '@/api/api.js'
	export default {
		data() {
			return {
				bgColor:'#F6F6F6',
				userInfo:{
					avatar:"/static/unielepystatic/img/lycenter/defaultAvatarUrlgrey.png",
					nickname:"未登录",
					mobile:"1xxxxxxxxx",
				},
			}
		},
		onShow() {
			// //网络请求请去掉以下注释
			// this.userInfo = getApp().globalData.userinfo
		},
		methods:{
			jumpto(urls){
				this.$common.linkjump(urls)
			},
			async changeAvatar(){
				var vm = this
				// var params = ['album','camera']
				var params = ['album','camera']
				let obj= await xcxChooseUploadAvatar(params)
				if(obj.code == 2000) {
					let ress=''
					if (obj.data.data[0].indexOf("://")>=0){
						ress = obj.data.data[0]
					}else{
						ress = url.split('/api')[0]+obj.data.data[0]
					}
					// console.log(ress)
					this.userInfo.avatar = ress
					 getApp().globalData.userinfo.avatar = ress
				} else {
					common.showToast(obj.msg)
				}
			},
			logout(){
				getApp().globalData.userinfo = ""
				this.$common.clearUser()
				this.$common.linkjump('/pages/index/index',true)
			},
		},
	}
</script>
<style lang="scss" scoped>
	.info-container{	
		background: #fff;
		height: 600rpx;
	}
	.info-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #202020;
		text{
			font-size: 30rpx;
		}
		border-bottom: 1px solid rgba(0, 0, 0, 0.1); 
		padding: 34rpx 20rpx 34rpx 20rpx;
		.info-item-right{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.u-tou{
			width: 80rpx;
			height: 80rpx;
			border: 1px solid #FFFFFF;
			border-radius: 50%;
		}
		.u-tou-right-jiantou{
			width: 14rpx;
			height: 20rpx;
			border-radius: 0;
			opacity: 1;
			margin-left: 30rpx;
		}
	}
	.btn-add{
		border-radius: 45rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin: 130rpx 40rpx 0 40rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #FFFFFF;
		font-size: 30rpx;
	}
</style>