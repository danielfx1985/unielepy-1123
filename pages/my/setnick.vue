<template>
	<view>
		<view class="lygap20-bg"></view>
		<view class="info-container">
			<u--input placeholder="请输入内容" v-model="nickname" border="none"></u--input>
		</view>
		<button type="primary" class="btnSave" @click="setnickname">完成</button>
	</view>
</template>

<script>
	import {setNickname} from '@/api/api.js'
	export default{
		data(){
			return{
				bgColor:'#F6F6F6',
				nickname:"",
			}
		},
		onLoad(e) {
			this.nickname = e.nickname
		},
		methods:{
			setnickname(){
				if(this.nickname==""){
					this.$common.showToast("昵称不能为空")
					return
				}
				setNickname({nickname:this.nickname}).then(res=>{
					// //网络请求请去掉以下注释
					// if(res.code == 2000){
					// 	getApp().globalData.userinfo.nickname = this.nickname
					// 	this.$common.showToast("设置成功")
					// 	//延迟重载该页面
					// 	setTimeout(()=>{
					// 		uni.navigateBack({
					// 		    delta: 1
					// 		}); //这个是返回上级第一个页面， delta等于2的时候跳过上个页面返回再上一个页面
					// 	},2000)
					// }else{
					// 	this.$common.showToast(res.msg)
					// }
				})
			}
		}
	}
</script>

<style scoped>
	.info-container{
		background: #FFFFFF;
		height: 52rpx;
		padding: 20rpx;
		font-size: 30rpx;
	}
	.btnSave{
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