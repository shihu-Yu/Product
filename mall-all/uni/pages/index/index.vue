<template>
	<view class="content">
		<text class="iconfont icon-lock"></text>
		<image class="logo" src="/static/logo.png"></image>
		<navigator url="../list/index">去列表页</navigator>
		<navigator url="../cart/index" open-type="switchTab">去购物车</navigator>
		<image class="logo" src="../../static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button @click="gotolist">去列表页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '你好'
			}
		},
		
		
		onLoad() {
			// 生命周期函数
			// 异步发送请求 请求数据
			
		},
		methods: {
			gotolist:function(){
				uni.navigateTo({
					url:"../list/index"
				})
			}
		}
	}
</script>

<style>
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
</style>
