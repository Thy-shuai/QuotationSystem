<template>
	<!-- <page-meta :root-font-size="26.66667+'vw'"></page-meta> -->
	<view>
		<view class="top_out">
			<view class="top">
				<!-- border-radius: 50%; -->
				<image :src="avatarUrl" mode="aspectFill" class="asd"></image>
				<view style="margin-left: 30rpx;">
					<view class="top_name">{{nickName}}</view>
					<view class="top_style">
						<view class="top_gold">
							<image src="../../static/huang.png" mode="" style="height: 36rpx;width: 36rpx;"></image>
							<text class="top_gold_level">金牌销售</text>
						</view>
						<!-- <view class="top_job">Lv 7</view> -->
						<!-- <view class="top_job" style="background-color: rgba(255,152,5,1);border-radius: 500px;">老板</view> -->
					</view>
				</view>
				<view class="top_right" @tap="jumpUser">
					<image src="../../static/right.png" mode="" style="height: 48rpx;width: 48rpx;"></image>
				</view>
			</view>
		</view>

		<view class="middle">
			<view class="middle_text">
				<!-- <view class="middle_school">灵犀报价科技有限公司</view> -->
				<view style="display: flex;width: 60%;height: 100%;">
					<u--input placeholderStyle="color:#d5a66f " color="#d5a66f" v-model="value" maxlength="15"
						@blur="blurData" clearable></u--input>
				</view>
				<text class="middle_authentication">实名认证</text>
			</view>
		</view>
		<view class="middle" style="height: 124rpx;">
			<view class="middle_2">
				<view class="">
					<text style="font-size: 18px;font-family: SourceHanSansSC-regular;">销售合计：</text>
					<text style="font-size: 18px;color: red;">{{totalSalesPrice}}</text>
					<view class="middle_2_share">分享给好友获取佣金</view>
				</view>
				<view class="middle_2_Ranking">第一名</view>
			</view>
		</view>

		<view class="formal" v-for="(item, index) in form" :key="index" @tap="jump(item.name)">
			<view style="display: flex;align-items: center;width: 84%;height: 78rpx;">
				<image src="../../static/jianyi.png" mode="" style="height: 62rpx;width: 62rpx;"></image>
				<text class="formal_text">{{item.name}}</text>
				<view style="flex-grow: 1;display: flex;justify-content: flex-end;">
					<image src="../../static/right.png" mode="" style="height: 42rpx;width: 42rpx;"></image>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="bottom_style">
				<view class="bottmo_number">{{numberOfCustomers}}</view>
				<view class="bottom_customer">客户</view>
			</view>
			<view class="bottom_line"></view>
			<view class="bottom_style">
				<view class="bottmo_number">{{numberOfQuotations}}</view>
				<view class="bottom_customer">报价</view>
			</view>
			<view class="bottom_line"></view>
			<view class="bottom_style">
				<view class="bottmo_number">1</view>
				<view class="bottom_customer">签约</view>
			</view>
		</view>
	</view>

</template>

<script>
	/* uni.scss */
	// @import 'uview-ui/theme.scss'
	import marked from '../../api/marked.min.js'
	import {
		plus
	} from '../../uni_modules/uview-ui/libs/function/digit.js';
	export default {
		data() {
			return {
				form: [{
						name: '我的报价单'
					},
					{
						name: '关于我们'
					},
					{
						name: '意见反馈'
					},
					{
						name: '退出登录'
					}
				],
				nickName: '未登录撒发射点', // 头像
				avatarUrl: require('../../static/renwu.png'), // 昵称
				value: '灵犀报价科技有限公司',
				totalSalesPrice: 0, // 销售总价
				numberOfCustomers: 0, // 客户数量
				numberOfQuotations: 0 // 报价总数
			}
		},
		onLoad() {
		},
		onShow() {
			this.mineInit();
		},
		onPullDownRefresh() {
			console.log("开始下拉刷新");
			this.getUserInformation()
				.then(isActive => {
					console.log("数据是：", isActive);
					if (isActive == true) {
						uni.stopPullDownRefresh();
					}
				})
				.catch(Error => {
					console.log("失败原因：", Error);
					uni.stopPullDownRefresh();
				})
		},
		onLoad() {
			this.mineInit();
		},
		methods: {
			formatTime(timestamp) {
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

				if (nowYear === targetYear && nowMonth === targetMonth && nowDate === targetDate) {
					const hours = targetTime.getHours().toString().padStart(2, '0');
					const minutes = targetTime.getMinutes().toString().padStart(2, '0');
					return `${hours}:${minutes}`;
				}

				if (nowYear === targetYear && nowMonth === targetMonth && timeDifference === 1) {
					return "昨天";
				}

				return `${targetMonth}月${targetDate}日`;
			},
			truncateNickName(nickName) {
				if (nickName.length <= 13) {
					return nickName; 
				}
				return nickName.slice(0, 13) + "...";
			},
			jump(event) {
				if (event == '我的报价单') {
					uni.navigateTo({
						url: '/pages/myQuotation/myQuotation',
					})
					return;
				}
				if (event == '意见反馈') {
					uni.navigateTo({
						url: '/pages/ProblemFeedback/ProblemFeedback'
					})
					return;
				}
				if (event == '关于我们') {
					uni.navigateTo({
						url: '/pages/VersionInformation/VersionInformation'
					})
					return;
				}
				if (event == '退出登录') {
					uni.showModal({
						title: '提示',
						content: `${event}`,
						success: (res) => {
							if (res.confirm) {
								uni.showLoading({
									title: '登录中~',
								})
								uni.request({
									url: 'http://114.115.203.18:9421/auth/logout',
									method: 'post',
									header: {
										satoken: uni.getStorageSync('token')
									},
									success: (res) => {
										uni.hideLoading();
										if (res.data.status == 100) {
											uni.$u.toast('退出登录成功！');
											uni.removeStorageSync('token');
											let event = uni.getStorageSync('ChatSession');
											uni.removeStorageSync('ChatSession');
											uni.removeStorageSync('itemArr');
											uni.removeStorageSync('objj');
											uni.removeStorageSync('abbreviation');
											uni.removeStorageSync('companyName');
											uni.redirectTo({
												url: '/pages/Login/Login'
											})
										} else {
											uni.$u.toast('退出登录失败！');
										}
									},
									fail: (res) => {
										uni.hideLoading();
										uni.$u.toast('网络问题，退出登录失败！');
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			async getUserInformation() {
				try {
					let res = await uni.request({
						url: `${this.$store.state.BASE_URL}/info/userInfo`,
						method: 'POST',
						header: {
							satoken: uni.getStorageSync('token')
						}
					})
					if (res.data.status != 100) {
						throw new Error(res.data.message);
					}
					uni.setStorageSync('imageId', res.data.data.id);
					uni.setStorageSync('nickName', res.data.data.username);
					// uni.setStorageSync('nickName', '18352868816');
					uni.setStorageSync('avatarUrl', res.data.data.avatar);
					uni.setStorageSync('sex', res.data.data.sex);
					uni.setStorageSync('job', res.data.data.level);
					uni.setStorageSync('level', res.data.data.rank);

					this.mineInit();
					return true;
				} catch (err) {
					return false;
				}
			},
			mineInit() {
				this.initData();
				this.avatarUrl = uni.getStorageSync('avatarUrl');
				if (this.avatarUrl.startsWith('http://') || this.avatarUrl.startsWith('https://')) {
					this.$methods.networkToLocal(this.avatarUrl)
						.then(isActive => {
							uni.setStorageSync('avatarUrl', isActive);
						})
				}
				let index = uni.getStorageSync('nickName');
				index = index.replace(/(\d{3})\d{4}(\d{4})/, '$1 **** $2');
				this.nickName = this.truncateNickName(index);
				let name = uni.getStorageSync('companyName');
				if (name.length != this.value) {
					this.value = name;
				}
			},
			jumpUser() {
				uni.navigateTo({
					url: '/pages/userForm/userForm'
				})
			},
			blurData() {
				this.value = this.value.trim();
				let index = this.$methods.createNickName(this.value, 10);
			},
			initData() {
				let event = uni.getStorageSync('ChatSession');
				let name = uni.getStorageSync('itemArr');
				this.numberOfCustomers = name.length || 0;
				this.numberOfQuotations = event.length || 0;
				if (event.length > 0) {
					let price = event.reduce((total, item) => total + item.price, 0);
					if (price.length == 0){
						this.totalSalesPrice = 0;
						return ;
					}
					this.totalSalesPrice = price.toFixed(2);
				} else {
					this.totalSalesPrice = 0;
				}
			}
		}
	}
</script>

<style lang="scss">
	.asd {
		height: 138rpx;
		width: 138rpx;
		clip-path: circle(50% at 50% 50%);
	}

	@mixin flex($layout) {
		display: flex;
		align-items: $layout;
		justify-content: $layout;
	}

	.top_out {
		@include flex(center);
		height: 138rpx;
		width: 100%;
		// background-color: blueviolet;
		margin-top: 15rpx;
	}

	.top_style {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		height: 48rpx;
	}

	.top {
		display: flex;
		flex-direction: row;
		width: 86%;
		height: 100%;
		// background-color: cadetblue;
	}

	.top_name {
		margin-top: 20rpx;
		line-height: 36rpx;
		color: rgb(51, 51, 51);
		font-size: 35rpx;
		text-align: left;
		font-family: PingFangSC-bold;
		font-weight: 600;
	}

	.top_gold {
		@include flex(center);
		// margin-top: 20rpx;
		// height: 48rpx;
		height: 100%;
		width: 178rpx;
		background-color: chocolate;
		line-height: 40rpx;
		border-radius: 12rpx;
		background-color: rgba(16, 16, 16, 0.9);
		color: rgba(16, 16, 16, 0.9);
		font-size: 28rpx;
		font-family: Roboto;
	}

	.top_gold_level {
		line-height: 36rpx;
		color: rgba(197, 136, 76, 1);
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular
	}

	.top_job {
		// @include flex(center);
		text-align: center;
		margin-left: 20rpx;
		height: 30rpx;
		width: 66rpx;
		background-color: rgba(0, 173, 255, 1);
		color: rgba(255, 255, 255, 1);
		font-size: 20rpx;
	}

	.top_right {
		display: flex;
		align-items: center;
		flex-grow: 1;
		// background-color: blue;
		justify-content: flex-end;
	}

	.middle {
		@include flex(center);
		height: 92rpx;
		width: 100%;
		margin-top: 40rpx;
		// background-color: brown;
	}

	.middle_text {
		@include flex(center);
		justify-content: space-around;
		width: 86%;
		height: 100%;
		background-color: blueviolet;
		line-height: 40rpx;
		border-radius: 24rpx;
		// background-color: rgba(242,215,150,0.68);
		background-color: #f6e4b8;
		color: rgba(16, 16, 16, 1);
		font-size: 28rpx;
		text-align: center;
		font-family: Roboto;
		border: 2rpx solid rgba(197, 136, 76, 1);
	}

	.middle_authentication {
		@include flex(center) height: 56rpx;
		width: 156rpx;
		border-radius: 13px;
		background-color: rgba(242, 215, 150, 1);
		color: #C5884C;
		font-size: 28rpx;
		font-family: Roboto;
		border: 1px solid rgba(197, 136, 76, 0.7);
	}

	.middle_school {
		line-height: 36rpx;
		color: #d5a66f;
		font-size: 32rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}

	.middle_2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
		width: 80%;
		justify-content: space-between;
	}

	.middle_2_share {
		line-height: 36rpx;
		margin-top: 10rpx;
		color: #a8a8a8;
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-light;
	}

	.middle_2_Ranking {
		@include flex(center) height: 60rpx;
		width: 156rpx;
		border-radius: 26rpx;
		background-color: rgba(16, 16, 16, 0.9);
		color: #C5884C;
		font-size: 28rpx;
		text-align: center;
		font-family: Roboto;
		// margin-left: 170rpx;
	}

	.formal {
		display: flex;
		justify-content: center;
		// flex-direction: column;
		width: 100%;
		height: 78rpx;
		margin-top: 40rpx;
		transition: all 1.5s;
	}

	.formal:active {
		transform: scale(0.9);
	}

	.formal_text {
		color: rgb(0, 0, 0);
		font-size: 30rpx;
		margin-left: 20rpx;
		font-family: PingFangSC-regular;
	}

	.bottom {
		// margin-left: 78rpx;
		// margin-right: ;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		bottom: 120rpx;
		height: 150rpx;
		left: 78rpx;
		right: 78rpx;
		text-align: center;
	}

	.bottom_style {
		flex-direction: column;
		width: 100rpx;
		height: 100rpx;
		// background-color: burlywood;
		display: flex;
		align-items: center;
		// justify-content: center;
		justify-content: space-around;
	}

	.bottmo_number {
		line-height: 28rpx;
		color: rgb(51, 51, 51);
		font-size: 35rpx;
		text-align: center;
		font-family: PingFangSC-bold;
	}

	.bottom_customer {
		line-height: 28rpx;
		margin-top: 15rpx;
		color: rgb(131, 131, 131);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.bottom_line {
		height: 50%;
		width: 0;
		background-color: black;
		background-color: rgba(255, 255, 255, 1);
		border: 2rpx solid rgba(187, 187, 187, 1);
	}
</style>