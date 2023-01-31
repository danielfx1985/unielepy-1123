<template>
	<view class="login">
		<!--顶部返回按钮-->
		<text class="back-btn iconfont icon-angle-left" @tap="navBack" v-if="showBack"></text>
		<view class="login-top bg-active">
			<image class="login-pic" src="/static/unielepystatic/logo.png"></image>
		</view>
		<view class="login-type-content">
			<image class="login-bg" src="/static/login-bg.png" :style="{height: tabCurrentIndex === 1 ? '115vw' : '94vw'}"></image>
			<view class="main">
				<view class="nav-bar">
					<view
						class="nav-bar-item"
						v-for="(item, index) in typeList"
						:key="index"
						:class="tabCurrentIndex === index ? 'nav-bar-item-active text-active' : ''"
						@tap="tabClick(index)"
					>
						{{ item.text }}
					</view>
				</view>
				<block v-if="tabCurrentIndex === 0">
					<view class="login-type-form">
						<view class="input-item">
							<text class="iconfont icon-mobile"></text>
							<input
								class="login-type-input"
								type="number"
								name="mobile"
								v-model="loginParams.mobile"
								placeholder="请输入手机号码"
								maxlength="11"
							/>
						</view>
						<view class="input-item" v-if="loginByPass">
							<text class="iconfont icon-passwd"></text>
							<input
								class="login-type-input"
								type="password"
								v-model="loginParams.password"
								placeholder="请输入密码"
								maxlength="20"
							/>
						</view>
						<view class="input-item input-item-sms-code" v-if="!loginByPass">
							<text class="iconfont icon-safety-certificate"></text>
							<view class="input-wrapper">
								<view class="rf-input-wrapper">
									<input
										type="number"
										class="login-type-input"
										v-model="loginParams.code"
										placeholder="请输入验证码"
										maxlength="4"
									/>
								</view>
								<lysendsmscode ref="shortCode" :phone="registerParams.mobile" codeType="login"></lysendsmscode>
								</button>
							</view>
						</view>
					</view>
					<view class="login-type-tips">
						<view @tap="showLoginBySmsCode" class="forget-section">
							{{ loginByPass ? '验证码登录' : '密码登录' }}
						</view>
						<text @tap="navTo('/pages/login/pwdreset/pwdreset')">忘记密码？</text>
					</view>
					<button
						type="primary"
						class="confirm-btn bg-active"
						:disabled="btnLoading"
						:loading="btnLoading"
						@tap="toLogin"
					>
						登录
					</button>
				</block>
				<block v-if="tabCurrentIndex === 1">
					<view class="login-type-form">
						<view class="input-item">
							<text class="iconfont icon-mobile"></text>
							<input
								class="login-type-input"
								type="number"
								name="mobile"
								v-model="registerParams.mobile"
								placeholder="请输入手机号码"
								maxlength="11"
							/>
						</view>
						<view class="input-item input-item-sms-code">
							<text class="iconfont icon-safety-certificate"></text>
							<view class="input-wrapper">
								<view class="rf-input-wrapper">
									<input
										type="number"
										class="login-type-input"
										v-model="registerParams.code"
										placeholder="请输入验证码"
										maxlength="4"
									/>
								</view>
								<lysendsmscode ref="shortCode" :phone="registerParams.mobile" codeType="register"></lysendsmscode>
							</view>
						</view>
						<view class="input-item">
							<text class="iconfont icon-passwd"></text>
							<input
								class="login-type-input"
								type="password"
								v-model="registerParams.password"
								placeholder="请输入密码"
								maxlength="20"
							/>
						</view>
						<view class="input-item">
							<text class="iconfont icon-passwd"></text>
							<input
								class="login-type-input"
								type="password"
								v-model="registerParams.password_repetition"
								placeholder="请输入确认密码"
								maxlength="20"
							/>
						</view>
					</view>
					<button
						type="primary"
						class="confirm-btn bg-active"
						:disabled="btnLoading"
						:loading="btnLoading"
						@tap="toRegister"
					>
						注册
					</button>
				</block>
			</view>
		</view>
    <view class="login-type-bottom text-active">
      {{ appName }} 版权所有
    </view>
	</view>
</template>
<script>
	import lysendsmscode from '@/components/ly-send-sms-code/ly-send-sms-code.vue'
	export default {
		components:{
			lysendsmscode,
		},
		data() {
			return {
				showBack:false,//显示返回箭头按钮
				loginParams: {
					mobile: '',
					code: '',
					password: ''
				},
				registerParams: {
					mobile: '',
					password: '',
					password_repetition: '',
					code: ''
				},
				btnLoading: false,
				reqBody: {},
				loginByPass: true,
				smsCodeBtnDisabled: true,
				userInfo: null,
				appName: 'Unielepy',
				tabCurrentIndex: 0,
				typeList: [
					{
						text: '登录'
					},
					{
						text: '注册'
					}
				]
			};
		},
		onLoad(options) {
			this.tabCurrentIndex = parseInt(options.type || 0, 10);
		},
		methods: {
			// 切换登录方式
			showLoginBySmsCode() {
				this.loginByPass = !this.loginByPass;
			},
			// 返回上一页
			navBack() {
				uni.navigateBack();
			},
			// 统一跳转路由
			navTo(url) {
				uni.navigateTo({ url });
			},
			// 提交表单
			async toLogin() {
				uni.showToast({ title: '点击了登录按钮' });
			},
			// 切换登录/注册
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			// 注册账号
			async toRegister() {
				uni.showToast({ title: '点击了注册按钮' });
			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background: #fff;
	}
	.login {
		width: 100%;
		position: relative;
    .bg-active {
		// background-color: $base-color;
		color: #fff;
    }
    .text-active, .iconfont {
      color: #2979ff;
    }
	.back-btn {
		position: absolute;
		left: 40rpx;
		z-index: 9999;
		padding-top: 20rpx;
		top: 40rpx;
		font-size: 48rpx;
		color: #2979ff;
	}
	.login-top {
		height: 460rpx;
		position: relative;
		.login-pic{
			position: absolute;
			width: 200rpx;
			height: 200rpx;
			left: calc(50% - 100rpx);//横向居中calc(50% - 元素宽度一半);
			top: 112rpx;
		}
	}
	.login-type-content {
		position: relative;
		top: -72rpx;
		.login-bg {
			width: 94vw;
			height: 94vw;
			margin: 0 3vw;
		}
		.main {
			width: 94vw;
			position: absolute;
			top: 0;
			left: 3vw;
			.nav-bar {
				display: flex;
				height: 100rpx;
				justify-content: center;
				align-items: center;
				position: relative;
				z-index: 10;
				.nav-bar-item {
					flex: 1;
					display: flex;
					height: 100%;
					line-height: 96rpx;
					font-size: 32rpx;
					display: flex;
					margin: 0 120rpx;
					justify-content: center;
				}
				.nav-bar-item-active {
					border-bottom: 5rpx solid;
				}
			}
			.login-type-form {
				width: 80%;
				margin: 50rpx auto;
				.input-item {
					border-bottom: 1rpx solid rgba(0, 0, 0, .1);
					position: relative;
					height: 90rpx;
					line-height: 90rpx;
					margin-bottom: 30rpx;
					.iconfont {
						font-size: 50rpx;
						position: absolute;
						left: 0;
					}
					.login-type-input {
						height: 90rpx;
						padding-left: 80rpx;
						// border-bottom: 1rpx solid rgba(0, 0, 0, .1);
					}
				}
			}
			.login-type-tips {
				padding: 0 50rpx;
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				color: #666;
			}
			.confirm-btn {
				margin-top: 60upx;
				width: 80%;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 45rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
			}
		}
	}
	.login-type-bottom {
		width: 100%;
		padding-bottom: 30rpx;
		text-align: center;
		font-size: 32rpx;
	}
    // 发送验证码样式
    .input-item-sms-code {
		border-bottom: 1rpx solid rgba(0, 0, 0, .1);
		.input-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.sms-code-btn {
			width: 200upx;
			background-color: #fff;
			display: flex;
			padding: 15upx 0;
			justify-content: center;
			align-items: center;
			border-radius: 12upx;
		}
    }
	}
</style>