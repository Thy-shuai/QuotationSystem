<template>
	<!-- <page-meta :root-font-size="26.66667+'vw'"></page-meta> -->
	<view>
		<view class="topsdingwei" :style="{ marginTop: marginTop + 'px' }">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<!-- 自定义头部导航栏 -->
			<view style="display: flex ;align-items: center;justify-content:center;background-color: rgb(248, 248, 248); width: 100%;height:46px ;"> 
				<view style="display: flex;align-items: center; font-size: 16px;width: 91%;height: 100%; ">
					<view style="height: 30px;width: 30px;margin-right: 10px;" @tap="Jump">
						<image src="../../static/left.png" mode="" style="height: 100%;width: 100%;"></image>
					</view>
					<view style="display: flex;align-items: center;border-radius: 50%; justify-content: center; height: 42px;width: 42px;background-color:cadetblue">
						<image :src="ImageUrl" mode="aspectFill" style="height: 100%;width: 100%;border-radius: 50%;"></image>
					</view>
					<view style="margin-left: 10px; height: 36px;width: 50%; display: flex;flex-direction: column;justify-content: space-around;">
						<text style="font-size: 30rpx;">{{name}}</text>
						<text style="font-size: 22rpx;opacity: 0.8;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{introduce}}</text>
					</view>
				</view>
			</view>
		</view>
		<view style="height:170rpx">
			
		</view>
			<view class="Background_bottom" @tap="redisplay">
				<!-- :scroll-with-animation="true" style="height: 96%;width: 100%;"-->
				<scroll-view  :scroll-top="scrollTopHeight" :scroll-with-animation="donghua" style="scroll-behavior: smooth;width: 96%; margin: 0 20rpx;" scroll-y="true" class="mmm">
					<view id="your-view-id">
						<!-- margin-bottom: 20rpx; -->
						<view class="youBox" style="margin-bottom: 20rpx;">
							<view style="padding: 25rpx 28rpx;" class="youMsg">
								{{yourSelf}}
							</view>
						</view>
						<view  v-for="(item,index) in msgBox" :key="index">
							
							<view class="youBox" v-if="item.role=='assistant'"  style="margin-bottom: 20rpx;margin-top: 20rpx;">
								<view >
									<view class="youMsg" v-if="item.content=='wait for'" >
										<view class="bubble" style="height: 60rpx;">
											<view class="bubble__circle"></view>
											<view class="bubble__circle"></view>
											<view class="bubble__circle"></view>
										</view>
									</view>
								</view>
								<view style="position: relative;" @longtap.stop="explay(item)">
									<view v-if="item.dataHandle==1" style="position: absolute;top:-50px;left: 20px ;z-index: 99;">
										<CheckboxTextVue
											direction="1" 
											:message="item.content" 
											:deletedataa="item" 
											@replydisplay="item.dataHandle=0"
											@deletemsg="deletemsg"
										/>
									</view>
									<view v-if="item.content!='wait for'" style="height: 400rpx;width: 900rpx;margin-left: 0;">
										<echartFromVue v-if="item.types=='Histogram'" typeMap="Histogram" :chartDataa="item.content" heightData="400rpx" widthData="600rpx"/>
										<echartFromVue v-if="item.types=='lineChart'" typeMap="lineChart" :chartDataa="item.content" heightData="400rpx" widthData="600rpx"/>
										<echartFromVue v-if="item.types=='pieChart'" typeMap="pieChart" :chartDataa="item.content" heightData="400rpx" widthData="600rpx"/>
									</view>
									<!-- <rich-text style="padding: 30rpx ;font-family: Helvetica, Arial, sans-serif;;font-size: 36rpx;line-height: 1.5;letter-spacing: 1px;text-align: justify;" class="youMsg" v-if="item.content!='wait for'" v-html="item.content" >				
									</rich-text> -->
								</view>
							</view>
							<view class="myBox" v-if="item.role=='user'" >
								<view @longtap.stop="explay(item)" style="position: relative;">
									<view v-if="item.dataHandle==1" style="position: absolute;top:-120rpx;right: 10rpx ;z-index: 99;">
										<CheckboxTextVue
											direction="0" 
											:message="item.content" 
											:deletedataa="item" 
											@replydisplay="item.dataHandle=0"
											@deletemsg="deletemsg"
										/>
									</view>
									<!-- padding-left: 25rpx;padding-right: 25rpx; -->
									<view class="myMsg" style="padding: 15rpx 20rpx;">
										{{item.content}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<InputVue
				@sendData="sendData" 
				@StopReceivingData="stopData"
				@keyboardHeight="keyboardHeightData"
				:getAnswer="ImageGeneration" 
				:file_explainn="1" 
				:Isdisplay="0"
				/>
	</view>

</template>

<script>
	import marked from '../../api/marked.min.js'
	import MarkdownIt from 'markdown-it';
	import { throttle } from '../../store/get.js'
	import hljs from 'highlight.js';
	import InputVue from '../../components/Input.vue';
	import CheckboxTextVue from '../../components/CheckboxText.vue';
	import echartFromVue from '../../components/echartFrom.vue';
	import get from '../../api/form'
	export default {
		data() {
			return {
				chartData:get.res_2, // 报表
				chartData2:get.res_1, //报表
				dataHandle:0, // 是否显示复制删除提示框
				marginTop:0,
				title:'标题',
				content:`您好，是否选择输入基本信息`,
				show:'',
				yourSelf:'', //自我介绍
				delay:false,
				dataStorage:'',  // 暂时存储websocket收到的数据
				ImageUrl:'',
				introduce:'',
				name:'',
				history:[],
				id:'',
				identification:'',
				socketTask:'',
				entryname:'',
				donghua:'',  // 是否有滑动动画
				isConnected:false, //websocket是否建立链接
				space:'',
				keybord:'10vh',
				input_msg:'',
				scrollToView:'',
				scrollTopHeight:0,
				fontsize:'',  //页面基准
				ChatPainting:[],
				uuid:'',  // 进入该页面读取历史记录的唯一标识
				viewheight:'', //高度变化
				load:0,
				msgBox:[],
				baseUrl:'',
				detailedIntroduction:'', // 初始介绍
				introde_bottom:'无' ,// 存放在介绍最下方
				ImageGeneration:false,
				message_id:'',  //用于标识可能接收到的错乱的消息
				stop_message:0,
				hearHeight:'',
				websocketData:null
			}
		},
		components:{
			InputVue,
			CheckboxTextVue,
			echartFromVue
		},
		onShow() {
			
			let jsonString = '{"text": "可以帮助你的吗？", "message_id": "ec594c887ee4449daec72928a5872c4a"}';
			console.log("转化之后的格式时：",JSON.parse(jsonString));
			console.log("页面的token:", uni.getStorageSync('token'));
			this.$store.dispatch('isToken',uni.getStorageSync('token'));
			// 用于拉起键盘时，三个图标和键盘之间的距离
			const rpxValue = 200; // 200rpx
			const systemInfo = uni.getSystemInfoSync();
			const designWidth = systemInfo.windowWidth; // 设计稿宽度，通常是750px
			// 转换为px
			const pxValue = uni.upx2px(rpxValue, designWidth);
			console.log("数据是：",this.msgBox);
			this.space = pxValue;
			this.show = true;
		},
		watch: {
		  msgBox: {
		    deep: true,
		    handler: 'scrollToBottom',
		  },
		  isConnected(newData, oldData){
			  if (newData == false){
				  this.websocketData = setInterval(()=>{
					if (this.isConnected != true){
						this.initWebSocket();
						console.log("开始重连ing");
					} else {
						clearInterval(this.websocketData)
					}
				  },1000)
			  }
		  }
		},
		mounted(options) {
			const query = uni.createSelectorQuery().in(this);
			     query.select('.mmm').boundingClientRect((rect) => {
			       if (rect) {
						console.log('Scroll-view 高度:', rect.height);
						this.viewheight = rect.height;

			       }
			   }).exec();
		},
		onLoad(options) {
			if ('param' in options){
				var obj = JSON.parse(decodeURIComponent(options.param));
				console.log("传递过来的数据是：",obj);
				this.introde_bottom = obj.introduce;
				this.yourSelf = obj.detailedIntroduction;
				this.identification = obj.identification;
				this.id = obj.id;
				this.uuid = obj.uuid;
				console.log("加载时的uuid",this.uuid);
				this.name = obj.description;
				this.introduce = obj.introduce;
				this.ImageUrl = obj.imageUrl;
				// console.log("三个数据是：",this.identification,this.id,this.uuid);
				this.donghua = false; // 直接渲染没有加载动画
				let box = JSON.parse(plus.storage.getItem(`${this.uuid}`));
				if (box == null){
					// console.log("数据是空的");
				} else {
					this.msgBox = box;
				}
			}
			// console.log("websoc：",this.socketTask);
			this.initWebSocket();
			this.baseUrl = this.$store.state.BASE_URL;
		},
		onUnload() {
			// this.msgBox = [];
			let chatSession = uni.getStorageSync('ChatSession');
			const foundItem = chatSession.find(item => item.uuid === this.uuid);
			if (this.msgBox.length == 0){
				chatSession = chatSession.filter(item => item.uuid !== foundItem.uuid);
				uni.setStorageSync('ChatSession',chatSession);
				uni.closeSocket();
				console.log("websocket关闭！");
			} else {
				console.log("sdfhjsdh jsdf:",foundItem);
				if (foundItem){
					foundItem.name = ''; // 标识当前项目是否有名字
					foundItem.projectName = '点击'; // 标识当前项目是否有名称
					foundItem.introduce = this.introde_bottom;
					foundItem.date = this.get_Date();
					uni.setStorageSync('ChatSession',chatSession)
				}
				uni.closeSocket();
				// this.socketTask = null;
				console.log("websocket关闭！");
				plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			}
			clearInterval(this.websocketData);
		},
		onReady() {
		},
		methods: {
			keyboardHeightData(event){
				console.log("键盘弹起的高度时：",event);
				const self = this;
				this.$nextTick(function(){
					self.marginTop = event;
				})
			},
			redisplay(){
				let lenght = this.msgBox.length;
				for (let i = 0; i < lenght; i++){
					if (this.msgBox[i].dataHandle != 0)this.msgBox[i].dataHandle = 0;
				}
			},
			explay(event){
				let lenght = this.msgBox.length;
				for (let i = 0; i < lenght; i++){
					if (this.msgBox[i] == event){
						this.msgBox[i].dataHandle = 1;
					} else {
						this.msgBox[i].dataHandle = 0;
					}
				}
			},
			deletemsg(event){
				console.log("删除信息", event);
				uni.showModal({
					title: '提示',
					content: '是否删除该条信息？',
					success:(res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							this.msgBox = this.msgBox.filter(item => item != event);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			stopData(event){
				this.stop_message = 1;
				this.message_id = this.msgBox[this.msgBox.length - 1].message_id;
				// let get_message = this.msgBox[this.msgBox.length - 1].history;
				let get_message = this.msgBox[this.msgBox.length - 1].content;
				console.log("初始消息是：",this.msgBox[this.msgBox.length - 1].content);
				console.log("消息是：",get_message);
				this.msgBox[this.msgBox.length - 1].content = get_message;
				// 关闭正在生成的消息
				uni.closeSocket();
				this.ImageGeneration = false;
				// this.initWebSocket();
			},
			sendData(event){
				console.log("需要输出的数据是：",event);
				this.input_msg = event;
				this.addData();
			},
			Jump(){
				// console.log("返回原来的页面");
				// 此时存在一个问题，以什么特效进来就要以什么特效出去
				uni.navigateBack()
			},
			// 检测页面高度变化，让页面刷新到底部
			scrollToBottom(){
				// console.log("信息的高度：",this.load);
				this.$nextTick(function(){
					// setTimeout(()=>{
						// let heightt="600";
						const qquery = uni.createSelectorQuery().in(this);
						     qquery.select('.mmm').boundingClientRect((rect) => {
						       if (rect) {
						         // console.log('Scroll-view 高度:', rect.height);
											  this.viewheight = rect.height;
						       }
						   }).exec();
						let heightt = this.viewheight;
						var query = uni.createSelectorQuery().in(this);
						      query.select('#your-view-id').boundingClientRect(data => {
						        if (data) {
								  let top = data.height - this.viewheight;
								  if (top>0 & top > this.load){
									  console.log("top的值",top);
										this.load = top;
										this.scrollTopHeight = top;
								  }
						        }
						      }).exec();
					// },20)
					// 检测高度变化还未是实现
				})
			},
			addData(){
				this.input_msg = this.input_msg.message;
				this.stop_message = 0;
				this.donghua = true;
				if (this.input_msg == ''){
					console.log("输入为空！");
					return ;
				}
				if (this.isConnected == false){
					uni.$u.toast('网络未连接');
					return ;
				}
				let myMsg = this.input_msg;
				// this.history = this.msgBox;
				this.history = JSON.parse(JSON.stringify(this.msgBox));
				this.history.forEach(obj => {
				    if ('history' in obj) {  // 检查对象是否包含 'history' 属性
						obj.content = obj.history;
				        delete obj.history;  // 删除 'history' 属性
				    }
				});
				// console.log("发送的历史记录是：",this.history);
				// 正常的输入
				var myobj = {
					role:'user',
					content: this.input_msg,
					dataHandle:0
					// Date:this.get_Date()
				}
				this.msgBox.push(myobj);
				this.introde_bottom = myMsg;
				let obbj = {
					role: 'assistant',
					content: 'wait for',
					history:'',
					message_id:'',
					dataHandle:0
				}
				this.msgBox.push(obbj);
				
				this.input_msg = '';
				let myMessage = '';
				const md = new MarkdownIt();
				// this.donghua = false;
				setTimeout(()=>{
					const array = [this.chartData, this.chartData2];
					const type = ['lineChart', 'Histogram', 'pieChart']
					// 使用 Math.random() 和 Math.floor() 随机选取数组中的一个元素
					const randomElement = array[Math.floor(Math.random() * array.length)];
					const randType = type[Math.floor(Math.random() * type.length)];
					obbj.content = randomElement;
					// Histogram
					// lineChart
					// pieChart
					obbj.types = randType
				}, 1000)
				
				  
			},
			test(index, message){
				console.log("数据是：", message);
				// index = message;
				// console.log();
			},
			// WebSocket预加载
			initWebSocket() {
				const self = this;
				// console.log("websocket");
				console.log("websocket的uuid是：",this.uuid);
				uni.connectSocket({
					url:`${this.$store.state.WebSocket_URL}/websocket/${this.uuid}`,
					// method:'GET',
					success(res) {
						console.log("成功：",res);
						console.log("是否链接：", self.isConnected);
					},
					fail(res) {
						console.log("链接失败！",res);
					}
				});
				uni.onSocketOpen((res)=>{
					this.isConnected = true;
					console.log("WebSocket连接已打开！",res);
					// uni.$u.toast('连接正常');
				});
					
				uni.onSocketMessage((message)=>{
					// console.log("初始化服务器的内容：",message.data);
					// this.yourmessage = this.yourmessage + message.data;
				});
				uni.onSocketMessage((message)=>{
					console.log("初始化服务器的内容：",message.data);
					var obj = {
						// message1 :message ,
						message1 :'所发生的',
						isMine : true,
						isUrl:true,
						URL:message.data, //直接存放链接
						filPath:'',
					}
				});
					
				uni.onSocketError((error)=>{
					console.log("WebSocket链接打开失败，请检查！",error);
					// this.isConnected = false;
					self.isConnected = false;
				})
				uni.onSocketClose(function (res) {
					console.log('WebSocket 已关闭！');
					// this.isConnected = false;
					self.isConnected = false;
				});
				
			    },
			send_text(){
				console.log("上传文本");
				console.log("输入的文本是",this.input_msg);
			},
			// 获取当前时间
			get_Date(){
				const date = new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				const hours = date.getHours();
				const minutes = date.getMinutes();
				const seconds = date.getSeconds();
				let currentTime = `${year}年${month}月${day}日 ${hours}:${minutes}`;
				// console.log("当前时间：",currentTime);
				return currentTime;
			},
			// 拿到链接进行展示
			
		}
	}
</script>

<style >
	@import 'animate.css';
	/* @import hljs from 'highlight.js'; */
	@import 'highlight.js/styles/github.css';
/* 	code {
	  white-space: pre;
	} */
	pre, code {
		font-size: 22rpx;
	    white-space: pre-wrap;       /* CSS 3 */
	    white-space: -moz-pre-wrap;  /* Firefox */
	    white-space: -pre-wrap;      /* Opera <7 */
	    white-space: -o-pre-wrap;    /* Opera 7 */
	    word-wrap: break-word;       /* IE */
	}
	
	:root {
	  --font-size: 30rpx;
	  --font-family:'思源黑体Regular';
	  --line-height: 1.5;
	  --letter-spacing: 0.6px;
	}
	.mmm{
		height: 98%;
		width: 100%;
		/* background-color: #5ECDBA; */
	}
	.topsdingwei{
	   position: fixed;z-index: 999;left: 0;right: 0;
	}
	.status_bar {
		/* display: flex; */
        height: var(--status-bar-height);
        width: 100%;
		background-color: rgb(246, 246, 246);
    }
	.Background_bottom{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		/* height:calc(90vh - 0.46rem); */
		height: calc(90vh - var(--status-bar-height) - 46px);
		background-color: white;
	}
	.myBox{
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
	  /* margin-right: 40rpx; */
	  /* margin-bottom: 20rpx; */
	  /* margin-top: 20rpx; */
	  /* overflow-anchor:none */
      /* padding-top: 20rpx; */
	}
	.myMsg{
	  display: flex;
	  align-items: center;
	  /* 只对中文进行换行 */
	  white-space: pre-wrap;
	  /* 在限制长度下的强制换行 */
	  max-width: 520rpx;
	  /* max-width: 70%; */
	  /* background-color: #95EC69; */
	  background-color:#5ECDBA;
	  /* background-color: #109cfe; */
	  color: black;
	  /* color: white; */
	  /* border-radius: 20rpx; */
	  border-radius: 25rpx 25rpx 0 25rpx;
	  font-size: var(--font-size);
	  font-family: var(--font--family);
	  line-height: var(--line-height);
	  letter-spacing: var(--letter-spacing);
	  /* line-height: 1.5;
	  letter-spacing: 0.6px; */
	}
	.myexcel{
		border-radius: 10rpx;
		background-color:#F6F6F6;
		margin-left: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 27rpx;
		width: 450rpx;
		height: 200rpx;

	}
	.myexcel:active{
		background-color: #bcbcbc;
	}
	.youBox{
	  display: flex;
	  justify-content: flex-start;
	  /* flex-direction: column; */
	  /* flex-direction: column; */
	  /* margin-bottom: 10rpx; */
	  /* margin-top: 20rpx; */
	  /* margin-left: 40rpx; */
	  /* overflow-anchor:none */
	  /* padding-top: 20rpx; */
	  /* padding-top: 20rpx; */
	  /* padding-left: 40rpx;
	  padding-right: 40rpx;
	  padding-top: 20rpx;
	  padding-bottom: 20rpx; */
	  line-height: 19px;
	  }
    .youMsg{
		display:flex;
		flex-direction: column;
		/* align-items: center; */
		white-space: pre-wrap;
		max-width: 80vw;
		word-wrap: break-word;
		/* font-family:Arial; */
		word-break: break-all;
		/* background-color:#F6F6F6; */
		background-color: #f5f5f5;
		/* border-radius: 20rpx; */
		border-radius: 25rpx 25rpx 25rpx 0;
		line-height: var(--line-height);
		letter-spacing: var(--letter-spacing);
		/* line-height: 1.5; */
		font-family: var(--font--family);
		font-size: var(--font-size);
		text-align: justify;
	}
	.fileNameText{
		display: -webkit-box;
		line-height: 1.6;
		text-align:left;
		width: 70%;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.u-button{
		border-style: none;
		outline: none;border:none;
	}
	button {
	  border: none;
	  outline: none;
	}
	.bubble {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: space-around;
		gap: 10rpx;
	}
	.bubble__circle {
		width: 35rpx;
		height: 35rpx;
		border-radius: 100%;
		background-color: #bbb;
		-webkit-animation: fade_in_out 1.5s infinite;
		animation: fade_in_out 1.5s infinite;
		-webkit-animation-delay: 0.25s;
		animation-delay: 0.25s;
	}
	
	.bubble__circle:first-of-type {
		margin-left: 20.8333333333px;
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
	}
	
	.bubble__circle:last-of-type {
		margin-right: 20.8333333333px;
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	}
	
	@-webkit-keyframes fade_in_out {
		0% {
				opacity: 1;
		}
	
		50% {
				opacity: 0.25;
		}
	
		100% {
				opacity: 1;
		}
	}
	
	@keyframes fade_in_out {
		0% {
				opacity: 1;
		}
	
		50% {
				opacity: 0.25;
		}
	
		100% {
				opacity: 1;
		}
	}
</style>


