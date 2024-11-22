<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- background-color: cadetblue; -->
		<view class="topback">
			<view class="topSearch">
				<u-search 
					placeholder="日照香炉生紫烟" 
					bgColor="white" 
					@custom="search" 
					@search="search"
					@change="changeData"
					v-model="keyword"
					>
				</u-search>
			</view>
		</view>
		<scroll-view scroll-y="true" v-if="show==true" style="width: 100%;height: 80vh;">
			<view class="contentExplay">
				<view v-if="isEmpty==false" class="isEmpty">
					<image src="../../static/empty.png" mode="aspectFill" style="height: 100rpx;width: 100rpx;"></image>
				</view>
				<view class="searchHistory" style="justify-content: flex-start;width: 95%;" v-if="isEmpty==true&&isAssient==true">
					联系人
				</view>
				<!--  @tap="jump(item)" v-for="(item, index) in array" :key="index" -->
				<view v-if="isEmpty==true" @tap="jump(item)" class="content1" v-for="(item, index) in array" :key="item.name+index">
					<image :src="item.imageUrl" mode="aspectFill" class="content_image" style="border-radius: 50%;" v-if="item.projectName=='点击'"></image>
					<view class="content_image" style="color: white;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20rpx;" :style="{ backgroundColor: item.colorss }" v-if="item.projectName!='点击'">{{item.projectName}}</view>
					
					
					<view v-if="item.name==''" style="padding-left: 30rpx; font-size: 30rpx;">{{item.description}}</view>
					<view v-else style="padding-left: 30rpx; font-size: 30rpx;">{{item.name}}</view>
					<view class="content_bottom"></view>
				</view>
				<view style="width: 100%;height: 20rpx;background-color: rgb(246, 246, 246);"></view>
				<view class="searchHistory" style="justify-content: flex-start;width: 95%;" v-if="isEmpty==true&&record==true">
					会话记录
				</view>
				<view v-if="isEmpty==true&&itemm.nums!=0" @tap="jump(itemm.contacts)" class="content1" v-for="(itemm, indexx) in template" :key="indexx">
					<image :src="itemm.contacts.imageUrl" mode="aspectFill" style="border-radius: 50%;height: 70rpx;width: 80rpx;" v-if="itemm.contacts.projectName=='点击'"></image>
					<view style="height: 70rpx;width: 80rpx;;color: white;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20rpx;" :style="{ backgroundColor: itemm.contacts.colorss }" v-if="itemm.contacts.projectName!='点击'">{{itemm.contacts.projectName}}</view>
					
					
					<view style="display: flex;height: 100%;width: 100%;flex-direction: column;justify-content: center;">
						<view v-if="itemm.contacts.name==''" style="padding-left: 30rpx; font-size: 30rpx;">{{itemm.contacts.description}}</view>
						<view v-else style="padding-left: 30rpx; font-size: 30rpx;">{{itemm.contacts.name}}</view>
						<view style="padding-left: 30rpx; font-size: 25rpx;opacity: 0.5;">{{itemm.nums}}条相关的聊天记录</view>
					</view>
					<view class="content_bottom"></view>
				</view>
			</view>
			
		</scroll-view>
		<view class="searchHistory" v-if="show==false" >
			<view style="display: flex;align-items: center;height: 30rpx;width: 100%;justify-content: space-between;">
				<view class="">搜索历史</view>
				<image @tap="deleteHistory" src="../../static/delete2.png" mode="" style="height: 30rpx;width: 30rpx;"></image>
			</view>
		</view>
		<view class="historyBox" v-if="show==false">
			<view @tap="againSearch(item)" class="historyBox1"  v-for="(item,index) in history" :key="index">
				<view class="historyText">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				originalArray:[],  // 被筛选的数组
				filterArray:[],  // 根据输入筛选出来的数组
				keyword: '',
				history:['交通', '交换机', '电脑'],
				show:false,
				isEmpty:true,
				array:'', // 联系人数组
				temporary:[],
				template:[]
			}
		},
		computed:{
			isAssient(){
				if (this.array.length == 0){
					return false;
				}
				return true;
			},
			record(){
				let i = 0;
				this.template.forEach(item => {
					if (item.nums != 0)i++;
				})
				if (i == 0){
					return false;
				}
				return true;
			}
		},
		onShow() {
			// plus.storage.removeItem('13')
			let index = JSON.parse(plus.storage.getItem('13'));
			console.log("历史记录是：",index);
			this.temporary = uni.getStorageSync('ChatSession');
			console.log("此时的消息是：",this.temporary);
			let history = uni.getStorageSync('history');
			if (history.length == 0){
				history = [];
			}
			console.log("此时的历史消息是：", history);
			this.history = history;
			setTimeout(()=>{
				if (!(this.template.length > 0)){
					this.temporary.forEach(item => {
						var template = {
							contacts:[],
							record:[]
						}
						template.contacts = item;
						template.record = JSON.parse(plus.storage.getItem(`${item.uuid}`));
						this.template.push(template);
						this.template = [...new Set(this.template)];
					})
					console.log("初始化记录是：", this.template);
				}
			}, 1)
		},
		onHide() {
			console.log("搜索历史页面隐藏");
			uni.setStorageSync('history', this.history);
			
		},
		onUnload() {
			console.log("搜索历史页面销毁");
			uni.setStorageSync('history', this.history)
		},
		methods: {
			search(){
				console.log("搜索");
				this.history.unshift(this.keyword);
				this.history = [...new Set(this.history)];
			},
			changeData(){
				// console.log("输入数据变化:", this.keyword);
				if (this.keyword == ''){
					this.show = false;
					return ;
				} else {
					this.show = true;
					this.handleData(this.keyword);
				}
			},
			handleData(event){
				// 先筛选对话联系人
				// 分为
				this.array = this.temporary.filter(item => item.name.includes(event) || item.description.includes(event));
				console.log("筛选出来的记录是：",this.array);
				// 后筛选对话记录
				this.template.forEach(item => {
					// 开始进行记录筛选
					let i = 0; // 用于记录
					item.record.forEach(item => {
						// 记录进行分类
						if (item.hasOwnProperty('mine')){
							// console.log("问");
							// 文字输入
							if (item.url == false){
								if (item.message1.includes(event))i++;
							}
							// 文件输入
							if (item.url == true){
								if (item.filename.includes(event))i++;
							}
						}
						if (item.hasOwnProperty('your')){
							// console.log("答");
							if (item.single_produce == true){
								if (item.informationReplication.includes(event))i++;
							}
						}
						
					})
					item.nums = i;
					// console.log("记录是：",i);
				})
				// console.log("此时的记录是：", this.template);
			},
			againSearch(event){
				console.log("重新搜索的内容是：",event);
				this.keyword = event;
				this.handleData(event)
			},
			jump(event){
				console.log("此时需要跳转的页面是：",event);
				if (this.history.length == 0)this.history = [];
				this.history.unshift(this.keyword);
				this.history = [...new Set(this.history)];
				const param = encodeURIComponent(JSON.stringify(event));
				// // 报价
				if (event.identification == 'inquiry'){
					uni.navigateTo({
						url:`/pages/CommunicationBusiness/CommunicationBusiness?param=${param}`
					})
					return ;
				}
			},
			deleteHistory(){
				this.history = '';
				uni.removeStorageSync('history')
			}
		}
	}
</script>

<style>
	li{
		padding: 0;
		margin: 0;
	}
	.status_bar {
		/* display: flex; */
	    height: var(--status-bar-height);
	    width: 100%;
		background-color: rgb(246, 246, 246);
	}
	.topback{
		height: 100rpx;
		width: 100%;
		background-color: rgb(246, 246, 246);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.topSearch{
		height: 100%;
		width: 95%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.searchHistory{
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 26rpx;
		height: 30rpx;
		font-family: PingFangSC-regular;
		color: rgba(24,24,24,1);
	}
	.historyBox{
		height: 600rpx;
		width: 90%;
		/* background-color: cadetblue; */
		margin-left: 25rpx;
		margin-top: 20rpx;
		/* display: flex;
		flex-wrap: wrap; 
		white-space: normal; */
	}
	.historyBox1{
		display: inline-block ;
		padding: 10rpx 20rpx ;
		margin-right: 20rpx;
		border-radius: 40rpx;
		margin-bottom: 20rpx;
		font-size: 25rpx;
		height: 42rpx;
		width: auto;
		border: 1px solid rgba(235,235,235,1);
	}
	.historyText{
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	.contentExplay{
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: white;
		flex-direction: column;
	}
	.content1{
		height: 100rpx; 
		width: 95%; 
		display: flex; 
		align-items: center; 
		position: relative;
	}
	.content1:active{
		background-color: #d8d8d8;
	}
	.content_image{
		height: 70rpx; 
		width: 70rpx; 
		/* background-color: aqua; */
		/* border-radius: 50%; */
	}
	.content_bottom{
		position: absolute; 
		bottom: 0; 
		right: 0;
		left: 100rpx;
		height: 1px;
		background-color: #f4f4f4; 
		width: 100%;
	}
	.isEmpty{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
