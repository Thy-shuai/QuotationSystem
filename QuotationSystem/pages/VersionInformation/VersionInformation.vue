<template>
	<view class="all">
		<view class="top" style="flex-direction: column;">
			<view class="topImage">
				<image src="../../static/006.png" mode="aspectFill" style="height: 90rpx;width: 90rpx;"></image>
			</view>
			<view class="top_text">灵犀报价</view>
		</view>
		<!-- <view style="height: 200px;width: 85%;background-color: blueviolet;margin-top: 30rpx;"></view> -->
		<view class="get">
			<view v-for="(item, index) in introduce" :key="index" class="middle">
				<text class="middle_1">{{item.name}}</text>
				<view style="display: flex;flex-direction: row;">
					<text class="middle_2">{{item.data}}</text>
					<image src="../../static/right.png" mode="" style="height: 40rpx;width: 40rpx;"></image>
				</view>
			</view>
		</view>
			
		<view class="get">
			<view v-for="(item, index) in Privacy" :key="index" class="middle" @tap="jump(item)">
				<text class="middle_1">{{item.name}}</text>
				<view style="display: flex;flex-direction: row;">
					<image src="../../static/right.png" mode="" style="height: 40rpx;width: 40rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				introduce:[
					{
						name:'版本号',
						data:'V1.0.0'
					},
					{
						name:'联系电话',
						data:'18352868816'
					},
				],
				Privacy:[
					{
						name:'隐私政策',
					},
					{
						name:'服务协议'
					},
					{
						name:'关于我们'
					}
				]
			}
		},
		onShow() {
			let index = uni.getStorageSync('token');
			console.log("长度时：",index.length);
		},
		methods: {
			openLocalHtml() {
			  // 使用 plus.webview API 来加载本地 HTML 文件
			  const webview = plus.webview.create('/static/service.html', 'localWebview');
			  webview.show('pop-in');
			},
			jump(item){
				console.log("跳转", item);
				if (item.name == '服务协议'){
					uni.navigateTo({
					  url: '/pages/userAgreement/userAgreement' // 这里是你的组件地址
					});
				}
				if (item.name == '隐私政策'){
					uni.navigateTo({
					  url: '/pages/privacyAgreement/privacyAgreement' // 这里是你的组件地址
					});
				}
				if (item.name == '关于我们'){
					uni.navigateTo({
					  url: '/pages/aboutUs/aboutUs' // 这里是你的组件地址
					});
				}
			}
		}
	}
</script>

<style>
	.all{
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		background-color: #f4f6f7;
	}
	.top{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200px;
		width: 85%;
		/* background-color: blueviolet; */
		margin-top: 30rpx;
	}
	.topImage{
		height: 180rpx;
		width: 180rpx;
		background-color: #f0f0f0;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.top_text{
		margin-top: 50rpx;color: rgb(0,0,0);
		font-size: 32rpx;
		font-weight: 700;
		text-align: left;
		font-family: PingFangSC-bold
	}
	.get{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 85%;
		/* height: 224rpx; */
		height: auto;
		line-height: 40rpx;
		border-radius: 20rpx;
		background-color: rgba(255,255,255,1);
		color: rgba(16,16,16,1);
		font-size: 36rpx;
		text-align: center;
		font-family: Roboto;
		border: 1px solid rgba(255,255,255,1);
		margin-top: 30rpx;
	}
	.get :active{
		background-color: #f0f0f0;
	}
	.middle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 112rpx;
		width: 95%;
	}
	.middle_1{
		color: rgb(0,0,0);
		font-size: 34rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.middle_2{
		line-height: 24px;
		color: rgb(0,0,0);
		font-size: 34rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-right: 10rpx;
	}
</style>
