<template>
	<view>
		<!-- 头部 -->
		<!-- <view class="top"> -->
		<!-- <scroll-view class="top" style="white-space: nowrap;" scroll-x="true">
			<view class="top_content">
				<image src="../../static/dafenqi.jpeg" mode="" style="height: 100rpx;width: 100rpx;border-radius: 50%;"></image>
				<view class="top_text" style="font-size: 20rpx;">产品报价</view>
			</view>
			<view class="top_content" style="margin-left: -40rpx;" v-for="(item,index) in recommendation" :key="index">
				<image :src="item.imageUrl" mode="" style="height: 100rpx;width: 100rpx;border-radius: 50%;"></image>
				<view class="top_text" style="font-size: 20rpx;">{{item.description}}</view>
			</view>
		</scroll-view> -->
		<!-- 数据展示部分 -->
		<!-- <view class="">
			<button @tap="phoneLogin">手机号一键</button>
		</view> -->
		<ul>
			<view class="get">
				<!-- v-for="(item, index) in information" :key="index" -->
				<view v-for="(item, index) in information" :key="index">
					<uni-swipe-action>
						<uni-swipe-action-item
							v-if="item.topMark != 1"
							:right-options="options2"
							:show="item.isOpened"
							:auto-close="true"
							@change="change(index, $event)"
							@click="bindClick(index, $event)"
						>
							<view class="number" @tap="jump(item)">
								<!-- margin-left: 40rpx; -->
								<view class="number_text" style="margin-left: 0rpx;">
									<!-- 456 -->
									<image :src="item.imageUrl" mode="aspectFill" v-if="item.projectName=='点击'" style="width: 115rpx;height: 113rpx;border-radius: 50%;"></image>
									<view class="top_name_9" style="height: 115rpx;width: 115rpx;" :style="{ backgroundColor: item.colorss }" v-if="item.projectName!='点击'">{{item.projectName}}</view>
								</view>
								<!-- margin-right: 40rpx; margin-left: 40rpx; -->
								<view style="width: 75%;height: 100%;position: relative;">
								    <view class="number_text_1" v-if="item.name==''">
								        <view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 60%;">{{item.description}}</view>
								        <text class="number_text_2" style="font-size: 20rpx;">{{timestampToDate(item.date)}}</text>
								    </view>
								    <view class="number_text_1" v-if="item.name!=''">
								        <view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 60%;">{{item.name}}</view>
								        <text class="number_text_2" style="font-size: 20rpx;">{{timestampToDate(item.date)}}</text>
								    </view>
								    <view class="number_text_3" style="width: 100%;display: flex;justify-content: space-between;align-items: flex-end;">
								        <view style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 62%;">{{item.introduce}}</view>
								        <view v-if="item.price!=null && item.price!=''" style="font-size: 50rpx;display: flex;color:red;padding-bottom: 8rpx;">{{getPrice(item.price)}}</view>
								    </view>
								    <view style="margin-top: 10rpx;padding-bottom: 4rpx;display: flex;align-items: center;position: relative;">
								        <image src="../../static/V16.png" mode="" style="height: 25rpx;width: 25rpx;opacity: 0.7;opacity: 0.5;"></image>
								        <text style="font-size: 20rpx;padding-top: 9rpx;opacity: 0.7;">{{getVersion(item.version)}}</text>
								        <image src="../../static/xiaoxi.png" mode="" style="margin-left: 20rpx;opacity: 0.7;margin-top: 5rpx;height: 35rpx;width: 35rpx;"></image>
								        <text style="font-size: 20rpx;margin-left: 5rpx;padding-top: 8rpx;margin-top: 2rpx;opacity: 0.7;">{{item.nums}}</text>
								        <text style="color: rgb(0,185,168);font-size: 24rpx;text-align: left;position: absolute; right: 0;">@{{item.auther}}</text>
								    </view>
								    <view style="border-bottom: 2rpx solid black;opacity: 0.1;position: absolute;bottom: 0;width: 100%;"></view>
								</view>

							</view>
						</uni-swipe-action-item>
						<uni-swipe-action-item
							v-if="item.topMark == 1"
							:right-options="options1"
							:show="item.isOpened"
							:auto-close="true"
							@change="change(index, $event)"
							@click="bindClick(index, $event)"
						>
						<!-- @tap="jump(item)" -->
							<view class="number" style="background-color: #f7f7f7;" @tap="jump(item)">
								<!-- margin-left: 40rpx; -->
								<view class="number_text" style="margin-left: 0rpx;">
									<!-- 456 -->
									<image :src="item.imageUrl" mode="aspectFill" v-if="item.projectName=='点击'" style="width: 115rpx;height: 113rpx;border-radius: 50%;"></image>
									<view class="top_name_9" style="height: 115rpx;width: 115rpx;" :style="{ backgroundColor: item.colorss }" v-if="item.projectName!='点击'">{{item.projectName}}</view>
								</view>
								<!-- margin-right: 40rpx; margin-left: 40rpx; -->
								<view style="width: 75%;height: 100%;position: relative;">
								    <view class="number_text_1" v-if="item.name==''">
								        <view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 60%;">{{item.description}}</view>
								        <text class="number_text_2" style="font-size: 20rpx;">{{timestampToDate(item.date)}}</text>
								    </view>
								    <view class="number_text_1" v-if="item.name!=''">
								        <view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 60%;">{{item.name}}</view>
								        <text class="number_text_2" style="font-size: 20rpx;">{{timestampToDate(item.date)}}</text>
								    </view>
								    <view class="number_text_3" style="width: 100%;display: flex;justify-content: space-between;align-items: flex-end;">
								        <view style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width: 62%;">{{item.introduce}}</view>
								        <view v-if="item.price!=null && item.price!=''" style="font-size: 50rpx;display: flex;color:red;padding-bottom: 8rpx;">{{getPrice(item.price)}}</view>
								    </view>
								    <view style="margin-top: 10rpx;padding-bottom: 4rpx;display: flex;align-items: center;position: relative;">
								        <image src="../../static/V16.png" mode="" style="height: 25rpx;width: 25rpx;opacity: 0.7;opacity: 0.5;"></image>
								        <text style="font-size: 20rpx;padding-top: 9rpx;opacity: 0.7;">{{getVersion(item.version)}}</text>
								        <image src="../../static/xiaoxi.png" mode="" style="margin-left: 20rpx;opacity: 0.7;margin-top: 5rpx;height: 35rpx;width: 35rpx;"></image>
								        <text style="font-size: 20rpx;margin-left: 5rpx;padding-top: 8rpx;margin-top: 2rpx;opacity: 0.7;">{{item.nums}}</text>
								        <text style="color: rgb(0,185,168);font-size: 24rpx;text-align: left;position: absolute; right: 0;">@{{item.auther}}</text>
								    </view>
								    <view style="border-bottom: 2rpx solid black;opacity: 0.1;position: absolute;bottom: 0;width: 100%;"></view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkList: [false, false, false, false, false, false],
				fromName:'',
				datee:1729838104434,
				money:'145,037,456,46',
				open:'none',
				baseUrl:'',
				items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
				recommendation:[],
				information:[],
				isOpened: 'none',
				tempOpened:'',
				options2: [{
					text: '置顶',
					style: {
						backgroundColor: '#007aff',
						color: '#FFFFFF', // 设置文字颜色为白色
						textShadow: 'none', // 去掉文字阴影，避免变白
					}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C',
							color: '#FFFFFF', // 设置文字颜色为白色
							textShadow: 'none', // 去掉文字阴影，避免变白
						}
					}
				],
				options1: [{
					text: '取消置顶',
					style: {
						backgroundColor: '#007aff',
						color: '#FFFFFF', // 设置文字颜色为白色
						textShadow: 'none', // 去掉文字阴影，避免变白
					}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C',
							color: '#FFFFFF', // 设置文字颜色为白色
							textShadow: 'none', // 去掉文字阴影，避免变白
						}
					}
				],
			}
		},
		computed:{
			formattedMoney() {
			    return this.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		},
		onNavigationBarButtonTap(e){
			console.log("结果是：",e);
			if (e.index == 1){
				console.log("用户想搜索消息");
				uni.navigateTo({
					url:'/pages/searchChat/searchChat'
				})
			}
		},
		onPullDownRefresh(){
			console.log("开始下拉刷新"); 
			setTimeout(() => {
			  // 假设这是你更新数据的操作
			  console.log('数据更新完成');
			  // 数据更新完毕后停止下拉刷新
			  uni.stopPullDownRefresh();
			}, 1000);
		},
		mounted() {
			console.log("47895");
		},
		onShow() {
			// this.fromName = uni.getStorageSync('nickName');
			this.baseUrl = this.$store.state.BASE_URL;
			this.$store.dispatch('isToken',uni.getStorageSync('token'));
			// let event = uni.getStorageSync('ChatSession');
			let event =  JSON.parse(JSON.stringify(uni.getStorageSync('ChatSession')));
			console.log("此页面的数据是：", event);
			// console.log("原始数据是：",uni.getStorageSync('ChatSession'));
			this.information = this.dataInitialization(event);
			// console.log("展示的数据是456:",this.information);
			
		},
		onHide() {
			console.log("页面隐藏");
			// 原始数据
			console.log("此时的数据是：", this.information);
			uni.setStorageSync('ChatSession', this.information);
		},
		onUnload(){
			// console.log("页面销毁");
		},
		methods: {
			//手机号一键登录事件
			bindClick(index,e) {
				this.information[index].isOpened = 'none';
				this.$forceUpdate();
				if (e.content.text == '置顶'){
					this.topUp(index)
				}
				if (e.content.text == '删除'){
					this.deleteData(index)
				}
				if (e.content.text == '取消置顶'){
					let event = this.information[index];
					event.topMark = 0;
					this.information = this.dataInitialization(this.information);
					// console.log("数据是：",event);
					let begin = uni.getStorageSync('ChatSession');
					begin = begin.filter(item => item.uuid == event.uuid);
					// console.log("取消置顶的数据是：",begin);
					this.$methods.adjustMessage(this.$store.state.BASE_URL,begin[0])
						.then(isActive => {
							console.log("修改项目中的数据是否成功:",isActive);
						})
						.catch(Error => {
							console.log("修改失败的原因:",Error);
						})
					
				}
			},
			change(index,e) {
				// this.isOpened = e;
				this.information[index].isOpened = e;
				this.$forceUpdate()
			},
			jump(event){
				console.log("当前选择的是：",event);
				console.log("当前选的id和uuid：",event.id,event.uuid);
				const param = encodeURIComponent(JSON.stringify(event));
				if (event.identification == 'painting'){
					uni.navigateTo({
						url:`/pages/Painting/Painting?param=${param}`,
						animationType: 'slide-in-right',
						// animationDuration: 300 
					})
					return ;
				}
				if (event.identification == 'inquiry'){
					uni.navigateTo({
						url:`/pages/CommunicationBusiness/CommunicationBusiness?param=${param}`,
						animationType: 'slide-in-right',
					})
					return ;
				}
				if (event.identification == 'Agent' || event.identification == 'NetSearch'){
					console.log("联网搜索或者Agent");
					uni.navigateTo({
						url:`/pages/OnlineSearch/OnlineSearch?param=${param}`,
						animationType: 'slide-in-right',
						// animationDuration: 300 
					})
					return ;
				}
				if (event.identification == 'StoreFiles'){
					uni.navigateTo({
						url:`/pages/DatabasePersonal/DatabasePersonal?param=${param}`,
						animationType: 'slide-in-right',
						// animationDuration: 300 
					})
					return ;
				}
				if (event.identification == 'DataReport'){
					uni.navigateTo({
						url:`/pages/IntelligentReport/IntelligentReport?param=${param}`,
						animationType: 'slide-in-right', 
						// animationDuration: 300 
					  });
					  return ;
				}
				if (event.identification == 'Sales'){
					uni.navigateTo({
						url:`/pages/Category/Category?param=${param}`,
						animationType: 'slide-in-right', 
						// animationDuration: 300 
					  });
					  return ;
				}
				// e.identification != 'Character'
				if (event.identification == 'Character'){
					uni.navigateTo({
						url:`/pages/Category/Category?param=${param}`,
						animationType: 'slide-in-right', 
						// animationDuration: 300 
					  });
					  return ;
				}
				if (event.identification == 'HuaweiCloud'){
					uni.navigateTo({
						url:`/pages/huaweiCloudSales/huaweiCloudSales?param=${param}`
					})
					return ;
				}
				if (event.identification == 'Custom'){
					// this.setDialogbox(e, myUUID);
					uni.navigateTo({
						url:`/pages/knowledgeBase/knowledgeBase?param=${param}`
					})
					return ;
				}
				uni.navigateTo({
					url:`/pages/Category/Category?param=${param}`,
					animationType: 'slide-in-right', 
					// animationDuration: 300 
				  });
			},
			deleteData(index){
				// console.log("要删除的数据是",event);
				let event = this.information[index];
				console.log("删除的数据项是:",event);
				let uuid = event.uuid;
				console.log("要删除的uuid：",uuid);
				uni.showModal({
					title: '提示',
					content: '是否删除该对话框和其历史记录？',
					success:(res)=> {
						if (res.confirm) {
							// 做两个处理 1、对话框聊天记录清除 2、对话框渲染列表更新
							this.information = this.information.filter(person => person.uuid !== uuid);
							// uni.setStorageSync('ChatSession', this.information);
							plus.storage.removeItem(`${uuid}`);
							setTimeout(()=>{
								// this.deleteMessage(uuid);
								this.deleteMessage(uuid);
							}, 10)
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			check_token(){
				uni.request({
				    url: `${this.baseUrl}/api/Detection`,
				    method: 'POST',
				    header: {
				        satoken: uni.getStorageSync('token')
				    },
				    success: (res) => {
				        console.log("检测结果是：", res);
						if (res.data.status != 100){
							uni.$u.toast('请登录');
							uni.redirectTo({
								url:'/pages/Login/Login'
							})
						} else {
						}
				    },
				    fail: (res) => {
						uni.redirectTo({
							url:'/pages/Login/Login'
						})
				        console.log("失败是：", res);
				    }
				});
			},
			/**
			 * 删除选中的项
			 * @param {Object} event 需要删除的项的uuid
			 */
			deleteMessage(event){
				console.log("需要删除的数据的uuid是：",event);
				uni.request({
					url:`${this.$store.state.BASE_URL}/ver/DeleteSession?uuid=${event}`,
					method:'POST',
					header:{
						satoken:uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("组件删除成功的res的值是：",res);
					},
					fail: (res) => {
						console.log("组件加载失败的信息是：",res);
					}
				})
			},
			/**
			 * @param {Object} index 置顶数据项在数组里的下标
			 */
			topUp(index){
				// 新增一个属性，用于标记置顶数据
				let event = this.information[index];
				event.topMark = 1;
				console.log("数据是:",uni.getStorageSync('ChatSession'));
				// 存在两个问题 使用uuid判断
				let begin = uni.getStorageSync('ChatSession');
				begin = begin.filter(item => item.uuid == event.uuid);
				begin.forEach(item => {
					item.topMark = 1
				})
				this.$methods.adjustMessage(this.$store.state.BASE_URL,begin[0])
					.then(isActive => {
						console.log("修改项目中的数据是否成功:",isActive);
					})
					.catch(Error => {
						console.log("修改失败的原因:",Error);
					})
				if (index == 0){
					return ;
				}
				// 删除其中的数据项
				this.information.splice(index, 1);
				// event.topMark = 1;
				// 添加到最顶部
				this.information.unshift(event);
				console.log("最终的展示数据是：", this.information);
				// this.$forceUpdate()
			},
			dataInitialization(event){
				// 新复制的数据
				// 修改三个数据 价格取整  修改版本 时间显示
				// console.log("数据是：",event);
				let datad = this.$methods.isExistence(event);
				datad.sort((a,b)=> b.date - a.date);
				// 置顶数据项
				let top = datad.filter(item => item.topMark == 1);
				top.forEach(item => {
					item.isOpened = 'none';	
				})
				// console.log("置顶数据项：",top);
				// 正常数据项
				let bottom = datad.filter(item => item.topMark != 1);
				bottom.forEach(item => {
					item.isOpened = 'none';	
				})
				bottom.sort((a,b)=> b.date - a.date);
				console.log("底部数据是：", bottom);
				// this.recommendation = bottom;
				return [...top, ...bottom];
				// console.log("展示的数据是：",this.information);
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
			getVersion(event){
				return event.substring(1);
			},
			getPrice(event){
				console.log("具体的价格是：",event);
				if (event == 0){
					event = 0;
				} else {
					event = Math.floor(event);
				}
				
				return event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		}
	}
</script>

<style lang="scss">
	@mixin flex($layout) {
		display: flex;
		justify-content: $layout;
		align-items: $layout;
	}
	.favBtn {
		margin: 0 20rpx 20rpx 0;
	}
	ul{
		padding: 0;
		// padding-left: 40rpx;
		// padding-right: 40rpx;
		// display: flex;
		// justify-content: center;
		// background-color: blueviolet;
		
		// padding-top: 5rpx;
		padding-top: 0rpx;
	}
	.top{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 200rpx;
		// background-color: cadetblue;
	}
	.top_name_9{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		// background-color:cadetblue;
		font-weight: 600;
		// font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.top_content{
		// @include flex(center);
		display: inline-block;
		margin-top: 10rpx;
		height: 100%;
		width: 180rpx;
		text-align: center;
	}
	.top_text{
		color: rgba(16,16,16,1);
		font-size: 24rpx;
		text-align: center;
		font-family: PingFangSC-bold;
	}
	.scroll-view {
	  white-space: nowrap; /* 横向滚动 */
	}
	.number{
		display: flex;
		// flex-direction: column;
		width: 100%;
		height: 180rpx;
		// margin-left: 40rpx;
		// margin-right: 40rpx;
		// padding-left: 40rpx;
		// padding-right: 40rpx;
		// background-color: blue;
		// background-color: cadetblue;
	}
	// .get{
	// 	width: 95%;
	// 	// background-color: red;
	// }
	.get :active{
		background-color: #f0f0f0;
	}
	.number_text{
		@include flex(center)
		// margin-top: 10px ;
		// background-color: brown;
		// width: 50px;
		// height: 50px;
		width: 22%;
		height: 100%;
		font-size: 24rpx;
		// border-radius: 50%;
		// background-color: rgb(135,159,250);
		color: rgba(255,255,255,1);
		font-family: Roboto;
	}
	.number_text :active{
		// background-color: rgb(135,159,250);
		color: rgba(255,255,255,1);
	}
	.number_text_1{
		display: flex;
		justify-content:space-between;
		line-height: 40rpx;
		margin-top: 30rpx;
		width: 100%;
		color: rgb(51,51,51);
		font-size: 30rpx;
		// background-color: chocolate;
		text-align: left;
		font-family: PingFangSC-regular;
		font-weight: 600;
	}
	.number_text_2{
		color: rgba(102,102,102,1);
		width: 200rpx;
		display: flex;
		justify-content: flex-end;
		font-size: 25rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		font-weight: 500;
	}
	.number_text_3{
		display: flex;
		align-items: center;
		// justify-content: center;
		line-height: 40rpx;
		// margin-top: 5rpx;
		color: rgb(131,131,131);
		font-size: 28rpx;
		width: 78%;
		height: 55rpx;
		// background-color: blueviolet;
		text-align: left;
		font-family: PingFangSC-regular;
	}
</style>

<!-- information:[
					{
						name:'郭菲菲',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#9bbfbf'
					},
					{
						name:'刘钊',
						total:'西闲水务集团等保测评',
						time:'今天',
						message:'你必须知道的8种产品设计能力',
						color:'#879ffa'
					},
					{
						name:'杨静云',
						total:'水务局视频会议采购',
						time:'今天',
						message:'最佳产品管理书籍再次，获取职场上升秘笈',
						color:'#c0bf92'
					},
					{
						name:'王漫',
						total:'网络云后台搬迁',
						time:'3月9号',
						message:'干货|学会写简历，轻松拿offer',
						color:'#a9ddde'
					},
					{
						name:'李天泽',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#c0d99b'
					},
					{
						name:'李书易',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#7f89db'
					},
					{
						name:'段问薇',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#c0bf92'
					},
					{
						name:'郭菲菲',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#a9ddde'
					},
					{
						name:'郭菲菲',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#7f89db'
					},
					{
						name:'郭菲菲',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#a9ddde'
					},
					{
						name:'郭菲菲',
						total:'生产调度数据分析系统',
						time:'2024年4月9日',
						message:'你必须知道的8种产品设计能力提升技巧',
						color:'#c0bf92'
					},
				] -->