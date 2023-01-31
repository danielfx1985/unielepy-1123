<template>
	<view class="mypage">
		<view class="lyheader">
			<!-- <view class="lynavbar">我的</view> -->
			<u-navbar title="个人中心" :titleStyle='{color:"#202020",fontWeight:"bold",fontSize:"30rpx"}' :autoBack="false" bgColor="transparent" leftIcon=" "></u-navbar>
			<view class="lyuser">
				<view class="lyuser-left">
					<image class="lyavatar" src="/static/unielepystatic/img/lycenter/defaultAvatarUrlgrey.png"></image>
					<text class="lynickname">{{userinfo.nickname}}</text>
				</view>
				<u-icon name="arrow-right"  size="20"></u-icon>
			</view>
		</view>
		<view class="lylist">
			<view class="lyli">
				<view class="lycommon" @click="navTo('/pages/message/notice')">
					<view class="pic">
						<u-icon name="bell"  size="30"></u-icon>
						<!-- <image src="../../static/cy-my/qianbao.png" style="width: 40rpx;" mode="widthFix"></image> -->
					</view>
					<view class="txt">
						<text>我的消息</text>
					</view>
				</view>
			</view>
			<view class="lyli">
				<view class="lycommon" @click="navTo('')">
					<view class="pic">
						<u-icon name="setting"  size="30"></u-icon>
						<!-- <image src="../../static/cy-my/dingdan.png" style="width: 35rpx;" mode="widthFix"></image> -->
					</view>
					<view class="txt">
						<text>个人设置</text>
					</view>
				</view>
			</view>
			<view class="lyli2">
				<view class="lycommon" @click="logout">
					<view class="pic">
						<u-icon name="share-square"  size="30"></u-icon>
						<!-- <image src="../../static/cy-my/dingdan.png" style="width: 35rpx;" mode="widthFix"></image> -->
					</view>
					<view class="txt">
						<text>退出登录</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userinfo:{
					avatar:"",
					nickname:"昵称"
				},
			}
		},
		onLoad() {

		},
		methods: {
			// 统一跳转路由
			navTo(url) {
				uni.navigateTo({ url });
			},
			logout(){
				uni.showToast({ title: '点击了退出登录按钮' });
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #fff;
	}
	.mypage{
		
	}
	.lycommon{
		display: flex;
		align-items: center;
	}
	.lyheader{
		height: 400rpx;
		background: linear-gradient(55deg, rgba(244,249,249,0.45), rgba(215,234,252,0.45), rgba(41,121,255,0.45));
	}
	.lynavbar{
		text-align: center;
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #202020;
		background-color: transparent;
		height: 88rpx;
		line-height: 88rpx;
	}
	.lyuser{
		margin-top: 130rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx;
	}
	.lyuser-left{
		display: flex;
		align-items: center;
		
	}
	.lyavatar{
		width: 160rpx;
		height: 160rpx;
		background: #DCDCDC;
		border: 2rpx solid #FFFFFF;
		border-radius: 50%;
	}
	.lynickname{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #333333;
		margin-left: 30rpx;
	}
	.lylist {
		overflow: hidden;
		padding: 0 30rpx;
		padding-top: 10rpx;
		padding-bottom: 100rpx;
	}

	.lylist .lyli {
		padding: 30rpx 0;
		overflow: hidden;
		position: relative;
		border-bottom: 1px solid rgb(242, 242, 242);
	}
	.lylist .lyli2 {
		padding: 30rpx 0;
		overflow: hidden;
		position: relative;
		border-bottom: 1px solid rgb(242, 242, 242);
	}

	.lylist .lyli .pic {
		float: left;
		margin-right: 30rpx;
	}
	.lylist .lyli2 .pic {
		float: left;
		margin-right: 30rpx;
	}
	.lylist .lyli2 .txt {
		overflow: hidden;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		padding-bottom: 10rpx;
		/* border-bottom: 1px solid rgb(242, 242, 242); */
	}

	.lylist .lyli .txt {
		overflow: hidden;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		padding-bottom: 10rpx;
		/* border-bottom: 1px solid rgb(242, 242, 242); */
	}

	.lylist .lyli::after {
		content: '';
		position: absolute;
		border-top: 3rpx solid rgb(179, 179, 179);
		border-left: 3rpx solid rgb(179, 179, 179);
		width: 16rpx;
		height: 16rpx;
		right: 5rpx;
		top: 40%;
		transform: rotate(135deg);
	}
	
</style>
