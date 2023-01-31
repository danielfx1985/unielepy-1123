<template>
	<view class="content">
		<view style="height: 20rpx;"></view>
		<view class="forms">
			<view class="myinput">
				<text class="iconfont icon-mobile"></text>
				<!-- <u-icon name="phone" color="#2979ff" size="26"></u-icon> -->
				<input class="passinput" :disabled="lock" placeholder="请输入手机号" placeholder-style="color:#A1A1A1;font-size:30rpx" type="number" v-model="formData.phone" maxlength="11"/>
			</view>
			<view  class="myinput" style="justify-content: space-between;margin-top: 10rpx;">
				<view style="display: flex;align-items: ">
					<text class="iconfont icon-safety-certificate"></text>
					<!-- <u-icon name="error-circle" color="#2979ff" size="25"></u-icon> -->
					<input class="passinput" placeholder="请输入验证码" type="number" placeholder-style="color:#A1A1A1;font-size:30rpx" v-model="formData.code" maxlength="6"/>
				</view>
				<lysendsmscode ref="shortCode" :phone="formData.phone" codeType="resetpass"></lysendsmscode>
			</view>
			<view  class="myinput" style="margin-top: 20rpx;">
				<text class="iconfont icon-passwd"></text>
				<!-- <u-icon name="lock" color="#2979ff" size="26"></u-icon> -->
				<input class="passinput" placeholder="请输入新密码" type="password" placeholder-style="color:#A1A1A1;font-size:30rpx" v-model="formData.pwd" />
			</view>
			<view  class="myinput" style="margin-top: 20rpx;">
				<text class="iconfont icon-passwd"></text>
				<!-- <u-icon name="lock" color="#2979ff" size="26"></u-icon> -->
				<input class="passinput" placeholder="请确认新密码" type="password" placeholder-style="color:#A1A1A1;font-size:30rpx" v-model="formData.pwd2" />
			</view>
		</view>
		<button class="send-btn-box" type="primary" @click="$stopRepeatClick(submit,'')">确认</button>
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
				lock:false,
				noClick:true,
				formData: {
					"phone": "",
					"code":"",
					'pwd': '',
					'pwd2': ''
				},
			}
		},
		computed: {
			canSubmit() {
				return this.isPhone && this.isPwd && this.isCode;
			},
			isPhone() {
				let reg_phone = /^1\d{10}$/;
				let isPhone = reg_phone.test(this.formData.phone);
				return isPhone;
			},
			isPwd() {
				let reg_pwd = /^.{6,20}$/;
				let isPwd = reg_pwd.test(this.formData.pwd);
				return isPwd;
			},
			isCode() {
				let reg_code = /^\d{6}$/;
				let isCode = reg_code.test(this.formData.code);
				return isCode;
			}
		},
		onLoad(event) {
			if (event && event.phoneNumber) {
				this.formData.phone = event.phoneNumber;
				this.lock = true
			}
		},
		onReady() {
			if (this.formData.phone) {
				this.$refs.shortCode.start();
			}
		},
		methods: {
			/**
			 * 完成并提交
			 */
			submit() {
				console.log("formData",this.formData);
				if(!this.isPhone){
					this.$common.showToast("手机号格式错误")
					return
				}
				if(!this.isCode){
					this.$common.showToast("请输入6位验证码")
					return
				}
				if(!this.isPwd){
					this.$common.showToast("密码为6 - 20位")
					return
				}
				if(this.formData.pwd != this.formData.pwd2){
					this.$common.showToast("两次输入密码不一致")
					return
				}
				let params={
					"mobile": this.formData.phone,
					"code": this.formData.code,
					"password": this.formData.pwd
				}
				//请求重置密码处理
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #F6F8F8;
	}
	.iconfont {
	  color: #2979ff;
	  font-size:35rpx;
	}
	.content{
		/* margin-top: 20rpx; */
		font-size: 30rpx;
	}
	.forms{
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		padding: 40rpx;
		height: 430rpx;
	}
	.myinput{
		display: flex;
		align-items: center;
		padding: 18rpx 0 18rpx 0;
		border-bottom: #E5E5E5 solid 2rpx;
	}
	.passinput{
		margin-left: 20rpx;
	}
	.send-btn-box{
		/* background: #58968A; */
		border-radius: 45rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin: 130rpx 40rpx 0 40rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
