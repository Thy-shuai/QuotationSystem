<template>
	<!-- <page-meta :root-font-size="26.66667+'vw'"></page-meta> -->
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- 自定义头部导航栏 -->
		<view style="display: flex;align-items: center;justify-content:center;background-color: rgb(248, 248, 248); width: 100%;height:46px ;"> 
			<view style="display: flex;align-items: center; font-size: 16px;width: 91%;height: 100%; ">
				<view style="height: 30px;width: 30px;margin-right: 10px;" @tap="Jump">
					<image src="../../static/left.png" mode="" style="height: 100%;width: 100%;"></image>
				</view>
				<view style="display: flex;align-items: center;border-radius: 50%; justify-content: center; height: 42px;width: 42px;background-color:cadetblue">
					<image :src="ImageUrl" mode="" style="height: 100%;width: 100%;border-radius: 50%;"></image>
				</view>
				<view style="margin-left: 10px; height: 36px;width: 50%; display: flex;flex-direction: column;justify-content: space-around;">
					<text style="font-size: 12px;font-weight: 600;">{{name}}</text>
					<text style="font-size: 0.11rem;opacity: 0.8;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{introduce}}</text>
				</view>
			</view>
		</view>
		<view class="Background_bottom">
			<!-- :scroll-with-animation="true" style="height: 96%;width: 100%;"-->
			<scroll-view  :scroll-top="scrollTopHeight" :scroll-with-animation="donghua" style="scroll-behavior: smooth;" scroll-y="true" class="mmm">
				<view id="your-view-id">
					<!-- margin-bottom: 20rpx; -->
					<view class="youBox" style="">
						<view style="font-size: 33rpx;padding-bottom: 15rpx;padding-left: 20rpx;padding-right: 20rpx;padding-top: 15rpx;" class="youMsg">
							{{yourSelf}}
						</view>
					</view>
					<view  v-for="(item,index) in msgBox" :key="index">
						<!-- <view style="width: 100%; display: flex;justify-content: center;font-size: 20rpx;margin-bottom: 20rpx;">{{item.Date}}</view> -->
						<view class="youBox" v-if="item.role=='assistant'"  style="margin-bottom: 20rpx;margin-top: 20rpx;">
							<!-- style="margin-top: 20rpx;margin-bottom: 20rpx;" -->
							<view class="youMsg" v-if="item.content=='wait for'" >
								<!-- margin-bottom: 10px; margin-top: 10px;-->
								<view class="bubble" style="height: 60rpx;">
									<view class="bubble__circle"></view>
									<view class="bubble__circle"></view>
									<view class="bubble__circle"></view>
								</view>
							</view>
							<!-- <view style="user-select: text; ;font-size: 27rpx;padding-bottom: 15rpx;padding-left: 20rpx;padding-right: 20rpx;padding-top: 15rpx;" class="youMsg" v-if="item.content!='wait for'" v-html="item.content" >
							</view> -->
							<view>
								<rich-text style="user-select: text; ;font-size: 27rpx;padding-bottom: 15rpx;padding-left: 20rpx;padding-right: 20rpx;padding-top: 15rpx;" class="youMsg" v-if="item.content!='wait for'" v-html="item.content" >
								</rich-text>
								<view v-if="item.message_from==1" style="display: flex;justify-content: flex-end;font-size: 23rpx;color: blue;" @tap="key_bian(item)">信息来源</view>
								<!-- <view class="animate__animated animate__bounceOut"> -->
									<view class="animate__animated animate__fadeIn" v-if="item.content!='wait for' && item.key ==1" v-html="item.source" 
									style="	display:flex;--animate-duration:230ms
											flex-direction: column;
											/* align-items: center; */
											white-space: pre-wrap;
											max-width: 600rpx;
											word-wrap: break-word;
											/* font-family:Arial; */
											font-family: PingFangSC-regular;
											word-break: break-all;
											background-color:#F6F6F6;
											border-radius: 20rpx;
											line-height: 50rpx;;user-select: text;
											font-size: 20rpx;padding-bottom: 15rpx;padding-left: 20rpx;padding-right: 20rpx;padding-top: 15rpx;">
									</view>
								<!-- </view> -->
								<!-- class="youMsg" -->
							</view>
						</view>
						<view class="myBox" v-if="item.role=='user'" >
							<view class="myMsg" style="font-size: 27rpx;user-select: text;">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- <view style="position:fixed;bottom: 200rpx;left: 20rpx;height: 150rpx;width: 150rpx;">
				<image src="../../static/girls.png" mode="" style="position: absolute;height: 100%;width: 100%;"></image>
		</view> -->
		<view style="display: flex;align-items: center;justify-content: center;flex-direction: column; height:8vh;width: 100%;">
			<view style="display: flex;align-items: center;justify-content:space-around; width: 90%;height: 60%;font-size: 30rpx;border: 0.5px solid black;border-radius: 25rpx;">
				<view @tap="send_text" style="display: flex;align-items: center;justify-content: center; width: 70rpx;height: 70rpx;">
					<image src="../../static/add.png" mode="" style="height: 75%;width: 75%;opacity: 0.7;"></image>
				</view>
				<view style="width: 70%;">
					<u--input
					  type="text" 
					  placeholder="请输入想要查询的内容"
					  border="surround"
					  :cursor-spacing="space"
					  v-model="input_msg"
					  clearable
					  confirmHold
					  @confirm="addData"
					></u--input>
				</view>
				<view @tap="addData" style="display: flex;align-items: center;justify-content: center; width: 70rpx;height: 70rpx;">
					<image src="../../static/send.png" mode="" style="height: 80%;width: 80%;"></image>
				</view>
			</view>
			<!-- <u-modal :show="show"  :title="title" showCancelButton >
						<view class="slot-content">
							<rich-text :nodes="content"></rich-text>
						</view>
					</u-modal> -->
		</view>
	</view>

</template>

<script>
	import marked from '../../api/marked.min.js'
	import MarkdownIt from 'markdown-it';
	import { throttle } from '../../store/get.js'
	import hljs from 'highlight.js';
	export default {
		data() {
			return {
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
				isConnected:'', //websocket是否建立链接
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
				category_index:'', // 用于区分是Agent还是联网搜索
				message_from:'', // 用于判断是否加载完成数据
				introde_bottom:'无'
			}
		},
		onShow() {
			 this.$store.dispatch('isToken',uni.getStorageSync('token'));
			// 用于拉起键盘时，三个图标和键盘之间的距离
			const rpxValue = 200; // 200rpx
			const systemInfo = uni.getSystemInfoSync();
			const designWidth = systemInfo.windowWidth; // 设计稿宽度，通常是750px
			// 转换为px
			const pxValue = uni.upx2px(rpxValue, designWidth);
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
				  let timer = setInterval(()=>{
					if (this.isConnected != true){
						this.initWebSocket();
						console.log("开始重连ing");
					} else {
						clearInterval(timer)
					}
				  },1000)
			  }
		  }
		},
		mounted(options) {
			const query = uni.createSelectorQuery().in(this);
			     query.select('.mmm').boundingClientRect((rect) => {
			       if (rect) {
						this.viewheight = rect.height;
			       }
			   }).exec();
		},
		onLoad(options) {
			if ('param' in options){
				var obj = JSON.parse(decodeURIComponent(options.param));
				// console.log("联网搜索页面传递过来的数据是：",obj);
				if (obj.description == 'Agent联想'){
					this.category_index = 1;
					// console.log("是联想");
				} else {
					this.category_index = 0;
					// console.log("是联网搜索");
				}
				this.introde_bottom = obj.introduce;
				this.yourSelf = obj.detailedIntroduction;
				this.identification = obj.identification;
				this.id = obj.id;
				this.uuid = obj.uuid;
				this.name = obj.description;
				this.introduce = obj.introduce;
				this.ImageUrl = obj.imageUrl;
				// console.log("三个数据是：",this.identification,this.id,this.uuid);
				this.donghua = false; // 直接渲染没有加载动画
				// console.log("历史记录展示：",plus.storage.getItem(`${this.uuid}`));
				let box = JSON.parse(plus.storage.getItem(`${this.uuid}`));
				if (box == null){
					// console.log("数据是空的");
				} else {
					this.msgBox = box;
					// console.log("加载的数据是：",this.msgBox);
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
			console.log("找到的项是：",foundItem);
			console.log("展示的数据是：",this.msgBox);
			if (foundItem){
				foundItem.introduce = this.introde_bottom;
				foundItem.date = this.get_Date();
				console.log("修改之后：",chatSession);
				uni.setStorageSync('ChatSession',chatSession)
			}
			uni.closeSocket();
			this.socketTask = null;
			console.log("websocket关闭！");
			plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
		},
		onReady() {
		},
		methods: {
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
								  console.log("top的值时：",top);
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
				this.donghua = true;
				if (this.input_msg == ''){
					console.log("输入为空！");
					return ;
				}
				let myMsg = this.input_msg;
				// this.history = this.msgBox;
				this.history = JSON.parse(JSON.stringify(this.msgBox));
				this.history.forEach(obj => {
				    if ('history' in obj) {  // 检查对象是否包含 'history' 属性
						obj.content = obj.history;
				        delete obj.history;  // 删除 'history' 属性
						delete obj.source;
						delete obj.key;
						delete obj.message_from;
				    }
				});
				console.log("发送的历史记录是：",this.history);
				// 正常的输入
				var myobj = {
					role:'user',
					content: this.input_msg,
					// Date:this.get_Date()
				}
				this.msgBox.push(myobj);
				this.introde_bottom = myMsg;
				// console.log("信息：",uni.getStorageSync('code'));
				let obbj = {
					role: 'assistant',
					content: 'wait for',
					// content:``,
					history:'',
					source:'',
					key:0,
					message_from:''
				}
				this.msgBox.push(obbj);
				this.input_msg = '';
				// console.log("websocket是否是链接状态:",this.isConnected);
				let myMessage = '';
				const md = new MarkdownIt();
				// console.log("发送的信息是：",myMsg);
				// console.log("历史数据是：",this.history);
				if (this.isConnected == true){
					let urll = '';
					if (this.category_index == 1){
						urll = `${this.baseUrl}/api/AgentChat`
					} else {
						urll = `${this.baseUrl}/api/NetWorkSearch`
					}
					uni.request({
						// url:'http://114.115.203.18:9421/api/scenization',
						url:urll,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						},
						data:{
							query:myMsg,
						    data:this.history,
						    promptName:"default",
						    uuid:this.uuid,
						    id:1
						},
						success: (res) => {
							console.log("结果值时：",res);
							let biaoji = 1;
							let xinxi = 1;
							let index = '';
							let message_biaoji ='';
							let typingTimer = null;  // 定时器
							let displayedText = '';  // 文本中转
							if (this.category_index == 1){
								uni.onSocketMessage((message)=>{
									// console.log("信息时：",message.data);
									if (message.data.includes("tools:")){
										let ooo = message.data.substring(17,message.data.length-14).replace(/\\n/g, '<br>');;
										obbj.source = ooo;
									}
									if (message.data.includes("final")){
										let ooo = message.data.substring(6,message.data.length-1).replace(/\\n/g, '<br>');
										obbj.content = ooo;
										obbj.message_from = 1;
										this.introde_bottom = ooo;
									}
								});
							} else {
								uni.onSocketMessage((message)=>{
									if (!message.data.includes("data: {") && xinxi==1){
										// console.log("数据时：",message.data);
										index += message.data.replace(/"/g, '');
										this.FileTranscoding(index).then(isActive =>{
											index = isActive;
										})
										obbj.history += index;
										if (index.length > 2 && !typingTimer){
											typingTimer = setInterval(()=>{
												if (index.length > 0){
													// setTimeout(()=>{
														displayedText += index.charAt(0);
														this.introde_bottom = displayedText;
														const regex = /<pre><code class="(\w+)">([\s\S]*?)<\/code><\/pre>/gi;
														let match;
														let highlighted = marked(displayedText);
														obbj.content = highlighted;
														index = index.substring(1);
													// },50)
												} else {
													clearInterval(typingTimer);
													typingTimer = null;
												}
											}, 50)
										}
									}
									// if (message.data != '' ){
									// 	obbj.content = '';
									// 	biaoji--;
									// }
									if (xinxi!=1){
										this.FileTranscoding(message.data).then(isAacive =>{
											let ooo = isAacive.replace(/\\n/g, '<br>');
											message_biaoji += ooo;
											obbj.source = marked(message_biaoji)
											console.log("第二次接收数据：",high);
											obbj.message_from = 1;
										})
									}
									if (message.data.includes("data: {")){
										xinxi = 0;
										this.FileTranscoding(message.data).then(isActive =>{
											let ooo = isActive.replace(/\\n/g, '<br>');
											message_biaoji = ooo;
											obbj.source = marked(ooo);
											obbj.message_from = 1;
										})
									}
									// if (!message.data.includes("data: {") && xinxi==1){
										// if (message.data != '' ){
										// 	obbj.content = '';
										// 	biaoji--;
										// }
										// console.log("数据时：",message.data);
										// index += message.data.replace(/"/g, '');
										// obbj.history += index;
										// if (index.length > 2 && !typingTimer){
										// 	typingTimer = setInterval(()=>{
										// 		if (index.length > 0){
										// 			// setTimeout(()=>{
										// 				displayedText += index.charAt(0);
										// 				const regex = /<pre><code class="(\w+)">([\s\S]*?)<\/code><\/pre>/gi;
										// 				let match;
										// 				let highlighted = marked(displayedText);
										// 				obbj.content = highlighted;
										// 				index = index.substring(1);
										// 			// },50)
										// 		} else {
										// 			clearInterval(typingTimer);
										// 			typingTimer = null;
										// 		}
										// 	}, 50)
										// }
									// }
									// obbj.content = marked(index);
								});
							}
							// console.log("结束：")
						},
						fail: (res) => {
							// 接口调用失败执行的函数
							console.log("发送消息失败！",res);
						},
						complete: (res) => {
							// 接口调用结束执行的函数（成功、失败都会执行）
							console.log("complete函数回调：",res);
						}
					})
				}
				  
			},
			FileTranscoding(message){
				return new Promise((resolve, reject) =>{
					let codd = JSON.parse(message);
					let codee = '';
					for (let i = 0;i<codd.length;i++){
						// \n\n
						if (codd[i]=="\u005C"&&codd[i+1]=='n'&&codd[i+2]=="\u005C"&&codd[i+3]=='n'){
							i++;
							i++;
							i++;
							codee=codee+'\n';
							continue;
						}
						if (codd[i]=='"'& codd[i+1]==','){
							i++;
							i++;
							continue;
						}
						if (codd[i]=='['&&codd[i+1]=='"'){
							i++;
							continue;
						}
						if (codd[i]=='"'&&codd[i+1]==']'){
							i++;
							i++;
							continue;
						}
						codee = codee + codd[i];
					}
					// console.log("去除反斜杠之后：",codee);
					resolve(codee);
					
				})
			},
			test(index, message){
				console.log("数据是：", message);
				// index = message;
				// console.log();
			},
			key_bian(event){
				console.log("变化信息时：",event);
				event.key = !event.key;
			},
			// WebSocket预加载
			initWebSocket() {
				if (this.socketTask){
					uni.closeSocket();
					this.socketTask = null;
				}
				this.socketTask = uni.connectSocket({
					url:`${this.$store.state.WebSocket_URL}/websocket/${this.uuid}`,
					// method:'GET',
					success(res) {
						console.log("成功：",res);
					},
					fail(res) {
						console.log("链接失败！",res);
					}
				});
				uni.onSocketOpen((res)=>{
					this.isConnected = true;
					console.log("WebSocket连接已打开！",res);
				});
					
				uni.onSocketMessage((message)=>{
					console.log("初始化服务器的内容：",message.data);
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
					this.isConnected = false;
				})
				
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
				let currentTime = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
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

	.mmm{
		height: 98%;
		width: 100%;
	}
	.status_bar {
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
	  margin-right: 20rpx;
	  /* margin-bottom: 20rpx; */
	  /* margin-top: 20rpx; */
	  /* overflow-anchor:none */
      /* padding-top: 20rpx; */
	}
	.myMsg{
	  display: flex;
	  align-items: center;
	  /* 只对中文进行换行 */
	  font-family:Arial;
	  white-space: pre-wrap;
	  /* 在限制长度下的强制换行 */
	  max-width: 520rpx;
	  /* background-color: #95EC69; */
	  background-color:#5ECDBA;
	  border-radius: 20rpx;
	  padding: 10rpx;
	  line-height: 50rpx;
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
	  margin-left: 20rpx;
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
		max-width: 600rpx;
		word-wrap: break-word;
		/* font-family:Arial; */
		font-family: PingFangSC-regular;
		word-break: break-all;
		background-color:#F6F6F6;
		border-radius: 20rpx;
		line-height: 50rpx;
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


