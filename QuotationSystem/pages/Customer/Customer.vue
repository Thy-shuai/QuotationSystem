<template>
	<view class="">
		<!-- <u-index-list> -->
		<!-- <u-index-item> -->
		<!-- <u-index-anchor text="我的企业及企业联系人"></u-index-anchor> -->
		<!-- <view class="top">我的企业及企业联系人</view> -->
		<view class="list-cell">
			<view style="height: 70rpx;width: 100%;display: flex;align-items: center;">
				<image src="../../static/006.png" style="height: 60rpx;width: 60rpx;margin-right: 30rpx;"></image>
				品耀科技
			</view>
		</view>
		<view class="list-cell">
			<view style="height: 70rpx;width: 100%;display: flex;align-items: center;">
				<image src="../../static/people.png" mode="aspectFill"
					style="height: 70rpx;width: 70rpx;margin-right: 30rpx;"></image>
				公众号
			</view>
		</view>
		<view class="list-cell" @tap="addcustmoerr">
			<view style="height: 70rpx;width: 100%;display: flex;align-items: center;">
				<image src="../../static/friends.png" mode="aspectFill"
					style="height: 70rpx;width: 70rpx;margin-right: 30rpx;"></image>
				新的朋友
			</view>
		</view>
		<!-- </u-index-item> -->
		<!-- </u-index-list> -->
		<u-index-list :index-list="filteredIndexList">
			<view v-for="(item, index) in filteredItemArr" :key="index">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="filteredIndexList[index]"></u-index-anchor>
				<!-- #endif -->
				<u-index-item>
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="filteredIndexList[index]" bgColor="#f8f8f8"></u-index-anchor>
					<!-- #endif -->
					<view class="list-cell" v-for="(cell, cellIndex) in item" :key="cellIndex" @tap="checkMessage(cell)"
						@longtap="deleteData(cell)">
						<!-- {{ cell.telephone }} {{ cell.name }} -->
						<view style="height: 70rpx;width: 100%;display: flex;align-items: center;">
							<image :src="cell.src" mode="aspectFill"
								style="height: 70rpx;width: 70rpx;margin-right: 30rpx;"></image>
							{{ cell.name }}
						</view>
					</view>
				</u-index-item>
			</view>
		</u-index-list>
		<!-- bottom:5vh;right: 6vw;z-index: 99; -->
		<view style="position: fixed;top: 1250rpx;left: 600rpx;z-index: 99;">
			<view class="addCustrom" @tap="addcustmoerr">
				<!-- @tap="addcustmoerr" -->
				<image src="../../static/jia.png" mode="aspectFill" class="nn"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import PinyinUtils from '../../api/pingyinUtils.js'
	export default {
		data() {
			return {
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U", "V", "W", "X", "Y", "Z"
				],
				itemArr: new Array(26).fill([]),
				name: '',
			}
		},
		computed: {
			filteredIndexList() {
				return this.indexList.filter((_, i) => this.itemArr[i].length > 0);
			},
			filteredItemArr() {
				return this.itemArr.filter(item => item.length > 0);
			}
		},
		mounted() {
			this.activate(uni.getStorageSync('itemArr'))
		},
		onPullDownRefresh() {
			console.log("开始下拉刷新");
			setTimeout(() => {
				// 假设这是你更新数据的操作
				console.log('数据更新完成');
				// 数据更新完毕后停止下拉刷新
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			// 存在重复情况
			let updates = uni.getStorageSync('itemArr');
			console.log("客户数据状况是：", uni.getStorageSync('itemArr'));
			let data = this.itemArr;
			data = data.map(subArray => {
				return subArray.map(item => {
					// 查找是否有匹配的更新项
					let updateItem = updates.find(update => update.id === item.id);
					// 如果找到匹配项，则返回更新后的对象，否则返回原始对象
					return updateItem ? {
						...item,
						...updateItem
					} : item;
				});
			});
			this.itemArr = data;
			if (uni.getStorageSync('objj') != '') {
				this.addcustomer(uni.getStorageSync('objj'))
			}
		},
		onHide() {
			uni.setStorageSync('objj', '');
		},

		methods: {
			// weizhi(e){
			//   const systemInfo = uni.getSystemInfoSync();
			//        const screenWidth = systemInfo.screenWidth;
			//        const screenHeight = systemInfo.screenHeight;
			// 	console.log("屏幕宽度：", screenWidth);
			// 	console.log("屏幕高度：", screenHeight);
			//        const x = (e.touches[0].pageX / screenWidth) * screenWidth;
			//        const y = (e.touches[0].pageY / screenHeight) * screenHeight;

			//        console.log('适配后的点击坐标:', x, y);
			// },
			deleteData(event) {
				console.log("删除的用户信息是：", event);
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
				uni.showModal({
					title: '提示',
					content: `是否删除联系人！`,
					success: (res) => {
						if (res.confirm) {
							this.$methods.deleteCustomer(this.$store.state.BASE_URL, event.id)
								.then(isActive => {
									// 客户信息删除成功
									console.log("客户信息是否删除失败：", isActive);
									this.itemArr = this.itemArr.map(subArray => {
										return subArray.filter(item => !(item.name === event
											.name && item.telephone === event.telephone));
									})
									let data = uni.getStorageSync('itemArr');
									data = data.filter(item => {
										// 如果当前项的"name"和"body"中的"telephone"不匹配要删除的值，则保留它  
										return item.name !== event.name || item.telephone !== event
											.telephone;
									});
									uni.setStorageSync('itemArr', data);
								})
								.catch(Error => {
									// 客户信息删除失败
									uni.$u.toast(Error);
								})
							// console.log("s");
						} else if (res.cancel) {}
					}
				})
				// this.itemArr = this.itemArr.map(subArray =>{
				// 	return subArray.filter(item => !(item.name === event.name && item.telephone === event.telephone));
				// })
			},
			// 历史客户
			activate(name) {
				for (let j = 0; j < name.length; j++) {
					this.name = name[j].name;
					// 获取拼音
					// console.log(PinyinUtils.chineseToPinYin(this.name.charAt(0)))
					// 获取首字母
					// console.log(PinyinUtils.chineseToPinYinFirst(this.name.charAt(0)));
					let index = PinyinUtils.chineseToPinYinFirst(this.name.charAt(0));
					for (let i = 0; i < this.indexList.length; i++) {
						if (this.indexList[i] === index) {
							let obj = name[j];
							this.$set(this.itemArr, i, [...this.itemArr[i], obj]);
						}
					}
				}
			},
			// 新增客户
			addcustomer(name) {
				// let namee = name.name;
				let namee = name.name;
				// this.name = name;
				// 获取拼音
				// console.log(PinyinUtils.chineseToPinYin(this.name.charAt(0)))
				// 获取首字母
				// console.log(PinyinUtils.chineseToPinYinFirst(this.name.charAt(0)));
				let index = PinyinUtils.chineseToPinYinFirst(namee.charAt(0));
				for (let i = 0; i < this.indexList.length; i++) {
					if (this.indexList[i] === index) {
						let obj = name;
						this.$set(this.itemArr, i, [...this.itemArr[i], obj]);
					}
				}
			},
			checkMessage(event) {
				const param = encodeURIComponent(JSON.stringify(event));
				uni.navigateTo({
					url: `/pages/EditPersonalInformation/EditPersonalInformation?param=${param}`
				})
			},
			addcustmoerr() {
				console.log("添加客户");
				uni.navigateTo({
					url: '/pages/AddCustomer/AddCustomer'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		font-size: 25rpx;
		color: #333;
		// background-color: #d9d9d9;
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 5px;
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		// background-color: #f8f8f8;
		transition: all 0.3s;
	}

	.list-cell:active {
		// background-color: #ceced1;
		background-color: #f8f8f8;
		transform: scale(1.1);
	}

	.addCustrom {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 70rpx;
		width: 100rpx;
	}

	.nn {
		height: 120rpx;
		width: 120rpx;
		transition: all 0.3s;
	}

	.nn:active {
		transform: scale(0.9);
		/* 将图片放大为原来的 1.2 倍 */
	}
</style>