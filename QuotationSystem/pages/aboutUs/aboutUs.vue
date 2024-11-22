<template>
	<view class="get">
		<view class="content">
			<view class="head">灵犀报价</view>
			<view class="context">
				灵犀报价，贴心为您提供最新市场价格参考，帮助您轻松做出更明智的采购决策。随着人工智能技术的不断发展，它已经深刻地改变了商业模式和生产方式，并带来了全新的商业机会和新兴产业。通过应用人工智能技术，企业可以更好地理解客户需求、提高生产效率、优化营销策略等，从而取得商业竞争优势。我们是一支AI创新团队，致力于为客户提供最先进的人工智能解决方案。通过深入了解客户需求和商业挑战，并运用最新的技术手段，我们帮助客户实现业务增长、降低成本和提升效率等目标。无论您在哪个行业，AI都将带来转型和创新的机会，而我们的使命就是帮助客户抓住这些机会并取得成功。
			</view>
			<!-- “人工智能引领商业新生”（英文：AI Agent Business，简称Alabn）是指人工智能技术在商业中的重要作用。 -->
			<view style="height: 30%;width: 100%;display: flex;justify-content:space-around;align-items: center;flex-direction: row;">
				<image src="http://114.115.203.18:7788/aiabnimage/qunliaoerweima.png" mode="aspectFill" style="height: 300rpx;width: 300rpx;"></image>
				<image src="http://114.115.203.18:19000/aiabnimage/gongzhonghao.jpg" @tap="search" mode="aspectFill" style="height: 300rpx;width: 300rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			search(event){
				let path = 'http://114.115.203.18:19000/aiabnimage/gongzhonghao.jpg';
				plus.gallery.pick((path) => {
					// 调用原生 API 识别二维码
					plus.barcode.scan(path, (result) => {
					  // 识别成功后的处理逻辑
					  uni.showToast({
						title: '识别成功: ' + result,
						icon: 'none'
					  });
					}, (error) => {
					  // 识别失败后的处理逻辑
					  uni.showToast({
						title: '识别失败，请重试',
						icon: 'none'
					  });
					});
				  }, (error) => {
					console.log('选择图片失败: ' + JSON.stringify(error));
				  }, {
					filter: 'image',
					multiple: false
				  });
			}
		}
	}
</script>

<style>
	.get{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background-color: #f5f5f5;
	}
	.content{
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
		height: 90%;
		width: 80%;
		background-color: #ffffff;
	}
	.head{
		height: 10%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		font-weight: 600;
	}
	.context{
		height: 60%;width: 90%; padding: 15rpx 40rpx; text-align: justify;
		font-size: 28rpx;
		line-height: 50rpx;
		text-indent: 2em; 
		font-family:'Segoe UI', Tahoma, Geneva, Verdana,sans-serif
	}
</style>
