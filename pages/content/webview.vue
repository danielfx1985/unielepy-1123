<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="weburl"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#ff6a6c'
					}
				},
				// 路径地址
				weburl: '',
				title: 'unielepy',
			}
		},
		onLoad(e) {
			if (e.title) {
				uni.setNavigationBarTitle({
					title: e.title
				});
			}
			if (e.url) {
				this.weburl = e.url;
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
</style>