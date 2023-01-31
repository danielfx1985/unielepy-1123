<template>
	<view class="short-code-btn" hover-class="hover" @click="start">
		<text :class="reverseNumber==0?'inner-text-active':'inner-text'">{{codeName}}</text>
	</view>
</template>

<script>
	import { sendSMS} from "@/api/api.js"
	function debounce(func, wait) {
		let timer;
		wait = wait || 500;
		return function() {
			let context = this;
			let args = arguments;
			if (timer) clearTimeout(timer);
			let callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait)
			if (callNow) func.apply(context, args);
		}
	}
	export default {
		name: "LySendSmsCode",
		props: {
			/**
			 * 倒计时时长 s
			 */
			count: {
				type: [String, Number],
				default: 60
			},
			/**
			 * 手机号码
			 */
			phone: {
				type: [String, Number],
				default: ''
			},
			/*
				验证码类型，用于防止不同功能的验证码混用，目前支持的类型login登录、register注册、bind绑定手机、unbind解绑手机
			*/
			codeType:{
				type: String,
				default(){
					return 'login'
				}
			}
		},
		data() {
			return {
				reverseNumber: 0,
				reverseTimer: null,
				codeName:"获取验证码"
			};
		},
		computed: {
			innerText:{
				get() {
					if (this.reverseNumber == 0){
						this.codeName = "获取验证码"
						return this.codeName
					}
					this.codeName = "重新发送"+ '('+this.reverseNumber+'s)'
					return this.codeName
				},
				set(value) {
					this.codeName = value
					return this.codeName
				}
			}
		},
		created() {
			this.initClick();
		},
		methods: {
			initClick() {
				this.start = debounce(() => {
					if (this.reverseNumber != 0) return;
					this.sendMsg();
				})
			},
			sendMsg() {
				this.$common.showLoading("正在获取验证码")
				let reg_phone = /^1\d{10}$/;
				if(!reg_phone.test(this.phone)){
					uni.hideLoading();
					return uni.showToast({
						title: "手机号格式错误",
						icon: 'none'
					});
				}
				let params = {
					"mobile": this.phone,
					"type": this.codeType
				}
				this.reverseNumber = Number(this.count);
				this.getCode();
				this.$emit('getCode');
				let that = this
				sendSMS(params).then(res=>{
					uni.hideLoading();
					if(res.code===2000){
						uni.showToast({
							title: "验证码发送成功",
							icon: 'none'
						});
					}else if(res.code===4000 || res.code===400){
						that.resetCode()
						uni.showToast({
							content: res.msg,
							showCancel: false
						});
					}else{
						that.resetCode()
						uni.showModal({
							content: "未知错误",
							showCancel: false
						});
					}
				})
			},
			resetCode(){
				if(this.reverseTimer) {
					clearInterval(this.reverseTimer)
					this.reverseTimer = null
				}
				this.innerText = "获取验证码"
				this.reverseNumber =0
			},
			getCode() {
				if (this.reverseNumber == 0) {
					clearTimeout(this.reverseTimer);
					this.reverseTimer = null;
					return;
				}
				this.reverseNumber--;
				this.reverseTimer = setTimeout(() => {
					this.getCode();
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
view{
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
}
/* #endif */
	.short-code-btn {
		width: 200rpx;
		height: 54rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		background-color: #007aff;
		border-radius: 27rpx;
	}
	.inner-text {
		font-size: 26rpx;
		color: #AAAAAA;
	}
	.inner-text-active {
		font-size: 26rpx;
		color: #FFFFFF;
	}
</style>
