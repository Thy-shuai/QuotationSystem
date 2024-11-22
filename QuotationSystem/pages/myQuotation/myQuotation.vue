<template>
	<view class="all">
		<image v-if="isEmpty==true" src="../../static/empty.png" mode="" style="height: 100rpx;width: 140rpx;"></image>
		<scroll-view class="explay" :scroll-y="true" v-if="isEmpty!=true">
			<view v-for="(item, index) in msgbox" :key="index" style="width: 100%;height: auto;margin-bottom: 50rpx;">
				<view class="title" style="margin-bottom: 10rpx;">
					<text class="title_time">报价时间:{{timestampToDate(item.date)}}</text>
					<view class="title_body">
						<view class="">详细信息：</view>
						<image lazy-load="true" src="../../static/xlsx.png" @tap="open(item.filPath)" mode="" style="height: 50rpx;width: 50rpx;"></image>
					</view>
				</view>
				<view style="height: 90%;width: 100%;">
					<image lazy-load="true" @tap="bigphoto(item.all_photo)" :src="item.all_photo" mode="widthFix" style="height: auto;width: 100%;"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmpty:false,
				msgbox:''
			}
		},
		onShow() {
			// 报价单的历史记录
			// 签约成功的报价单的历史记录
			let box = uni.getStorageSync('history_bao');
			console.log("历史记录是：", box);
			console.log("时间是：", this.timestampToDate(1731321177287));
			if (box != ''){
				box.sort((a, b) => b.date - a.date);
				this.msgbox = box;
				return ;
			}
			this.isEmpty = true;
		},
		methods: {
			open(event){
				uni.openDocument({
					filePath:event,
					success: (res) => {
						console.log("文件打开成功");
					},
					fail: (res) => {
						console.log("文件打开失败");
					}
				})
			},
			bigphoto(event){
				uni.previewImage({
					urls:[event],
					current:event
				})
			},
			timestampToDate(timestamp){
				if (isNaN(timestamp))return timestamp;
				const now = new Date();
				const targetTime = new Date(timestamp);
				
				// 获取当前的年月日
				const nowYear = now.getFullYear();
				const nowMonth = now.getMonth() + 1;
				const nowDate = now.getDate();
				
				// 获取目标时间的年月日
				const targetYear = targetTime.getFullYear();
				const targetMonth = targetTime.getMonth() + 1;
				const targetDate = targetTime.getDate();
				
				// 计算时间差（以天为单位）
				const timeDifference = nowDate - targetDate;
							
				// 如果是今天，显示小时和分钟
				if (nowYear === targetYear && nowMonth === targetMonth && nowDate === targetDate) {
				    const hours = targetTime.getHours().toString().padStart(2, '0');
				    const minutes = targetTime.getMinutes().toString().padStart(2, '0');
				    return `${hours}:${minutes}`;
				}
							
				// 如果是昨天，显示“昨天”
				if (nowYear === targetYear && nowMonth === targetMonth && timeDifference === 1) {
				    return "昨天";
				}
							
				// 如果是更早的日期，显示具体的月和日
				return `${targetMonth}月${targetDate}日`;
			},
		}
	}
</script>

<style>
	.all{
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
	}
	.explay{
		height: 97%;
		width: 90%;
		/* background-color: cadetblue; */
	}
	.title{
		font-size: 30rpx;
		width: 100%;
		height: 10%;
		display: flex;
		/* justify-content: space-around; */
		justify-content: space-between;
		align-items: center;
	}
	.title_time{
		font-size: 25rpx;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.title_body{
		display: flex;
		flex-direction: row;
		height: 100%;
		align-items: center;
		transition: all 0.3s;
	}
	.title_body:active{
		transform: scale(0.9);
	}
</style>
