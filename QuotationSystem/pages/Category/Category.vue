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
		<!-- class="Background_bottom" @tap="redisplay" -->
			<view :class="file_explain == 1 ? 'Background_bottom_1' : (file_explain == 0 ? 'Background_bottom' : 'Background_bottom_3')" :style="dynamicStyle" @tap="redisplay">
				<!-- :scroll-with-animation="true" style="height: 96%;width: 100%;"-->
				<scroll-view  :scroll-top="scrollTopHeight" :scroll-with-animation="donghua" style="scroll-behavior: smooth;width: 100%;margin: 0 15rpx;" scroll-y="true" class="mmm">
					<view id="your-view-id">
						<!-- margin-bottom: 20rpx; -->
						<view class="youBox" style="margin-bottom: 20rpx;">
							<!-- text-align: justify; -->
							<view style="padding: 25rpx 28rpx;" class="youMsg">
								{{yourSelf}}
							</view>
						</view>
						<view  v-for="(item,index) in msgBox" :key="index">
							<!-- <view style="width: 100%; display: flex;justify-content: center;font-size: 20rpx;margin-bottom: 20rpx;">{{item.Date}}</view> -->
							<view class="youBox" v-if="item.role=='assistant'"  style="margin-bottom: 20rpx;margin-top: 20rpx;">
								<view class="animate__animated animate__slideInUp" style="--animate-duration:500ms">
									<view class="youMsg" v-if="item.content=='wait for'" >
										<view class="bubble" style="height: 60rpx;">
											<view class="bubble__circle"></view>
											<view class="bubble__circle"></view>
											<view class="bubble__circle"></view>
										</view>
									</view>
								</view>
								<!-- user-select: text; -->
								<!-- @longtap.stop="explay(item)" -->
								<view style="position: relative; ;height: 100%;width: auto;" @longtap.stop="explay($event, item)">
									<!-- style="position: absolute;top:-50px;left: 20px ;z-index: 99;" -->
									<view v-if="item.dataHandle==1" :style="{ top: (touchY - 60) + 'px', left: (touchX) + 'px' ,}" class="gggt">
										<CheckboxTextVue
											direction="1"
	
											:message="item.content" 
											:deletedataa="item" 
											@replydisplay="item.dataHandle=0"
											@deletemsg="deletemsg"
										/>
									</view>
									<!-- padding-left: 30rpx;padding-right: 25rpx; -->
									<!-- font-family: Helvetica, Arial, sans-serif; -->
									<!-- padding: 25rpx ; -->
									<rich-text style="" class="youMsg" v-if="item.content!='wait for'" v-html="item.content" >				
									</rich-text>
								</view>
							</view>
							<view class="myBox" v-if="item.role=='user'" >
								<view  @longtap.stop="explay($event, item)" style="position: relative;">
									<view v-if="item.dataHandle==1" style="position: absolute;top:-120rpx;right: 10rpx ;z-index: 99;">
										<CheckboxTextVue
											direction="0" 
											price="0"
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
					@focus="focusData"
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
	export default {
		data() {
			return {
				touchX: 0,
				touchY: 0,
				offsetY:100,
				
				dataHandle:0, // 是否显示复制删除提示框
				marginTop:0,
				title:'标题',
				content:`您好，是否选择输入基本信息`,
				show:'',
				yourSelf:'', //自我介绍
				delay:false,
				dataStorage:'',  // 暂时存储websocket收到的数据
				ImageUrl:'',
				introduce:'',  // 界面上简介
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
				websocketData:null,
				socketTask:null,
				
				biaoji : 1,
				index : '',
				indexSize : '',
				typingTimer : null,  // 定时器
				displayedText : '',  // 文本中转
				end : '',
				obbj : '',
				
				keyboardHeightt:'',
				file_explain:0
			}
		},
		components:{
			InputVue,
			CheckboxTextVue
		},
		computed:{
			dynamicStyle() {
			     const statusBarHeight = 'var(--status-bar-height)';
			     if (this.file_explain === 1) {
			       return {
			         height: `calc(86vh - ${statusBarHeight} - 0.46rem)`,
			       };
			     } else if (this.file_explain === 0) {
			       return {
			         height: `calc(86vh - ${statusBarHeight} - 0.46rem)`,
			       };
			     } else {
			       return {
			         height: `calc(${this.keyboardHeightt}vh - ${statusBarHeight} - 0.46rem)`,
			       };
			     }
							}
		},
		onShow() {
			// this.msgBox = []
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
			let height = uni.getSystemInfoSync().windowHeight;
			uni.onKeyboardHeightChange((res) => {
				this.keyboardHeightt = 90 - (res.height / height) * 100 - 3;
				console.log("此时的高度是：", this.keyboardHeightt);
			});
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
				setTimeout(()=>{
					this.baseUrl = this.$store.state.BASE_URL;
					this.initWebSocket();
				}, 10)
			}
			// console.log("websoc：",this.socketTask);
		},
		onUnload() {
			// this.msgBox = [];
			this.socketTask.close();
			let chatSession = uni.getStorageSync('ChatSession');
			const foundItem = chatSession.find(item => item.uuid === this.uuid);
			if (this.msgBox.length == 0){
				chatSession = chatSession.filter(item => item.uuid !== foundItem.uuid);
				uni.setStorageSync('ChatSession',chatSession);
				// uni.closeSocket();
				// this.socketTask.close();
				// console.log("websocket关闭！");
			} else {
				console.log("sdfhjsdh jsdf:",foundItem);
				if (foundItem){
					foundItem.name = ''; // 标识当前项目是否有名字
					foundItem.projectName = '点击'; // 标识当前项目是否有名称
					// foundItem.introduce_text = this.introde_bottom;
					let date = Date.now();
					foundItem.date = this.$methods.timestampToDate(date);
					uni.setStorageSync('ChatSession',chatSession);
				}
				// uni.closeSocket();
				// this.socketTask = null;
				// console.log("websocket关闭！");
				// this.msgBox = [];
				plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			}
			clearInterval(this.websocketData);
		},
		onReady() {
		},
		methods: {
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
								  // this.scrollTopHeight = data.height;
								  // console.log("top的值是",top);
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
				// console.log("输入的信息是：",this.input_msg);
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
				if (this.isConnected == true){
					uni.request({
						// url:'http://114.115.203.18:9421/api/scenization',
						url:`${this.baseUrl}/api/scenization`,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						},
						data:{
							query:myMsg,
						    data:this.history,
						    promptName:this.identification,
						    uuid:this.uuid,
						    id:this.id
						},
						success: (res) => {
							
							this.ImageGeneration = true;
							
							this.donghua = false;
							console.log("结果值时：",res);
							this.biaoji = 1;
							this.index = '';
							this.indexSize = '';
							this.typingTimer = null;
							this.displayedText = '';
							this.end = '';
							this.obbj = obbj;
							// let biaoji = 1;
							// let index = '';
							// let indexSize = '';
							// let typingTimer = null;  // 定时器
							// let displayedText = '';  // 文本中转
							// let end = '';
							// uni.onSocketMessage((message)=>{
							// 	if (this.stop_message == 1)return;
							// 	if (message.data != '' && biaoji ==1){
							// 		obbj.content = '';
							// 		biaoji--;
							// 	}
							// 	console.log("传递过来的数据是：",message.data);
							// 	let temporaryMessage = '';
							// 	if (message.data != `/end${this.uuid}`){
							// 		let temporaryMessage1 = JSON.parse(message.data.substring(6));
							// 		if (temporaryMessage1.message_id == this.message_id)return;
							// 		temporaryMessage = temporaryMessage1.text;
							// 		obbj.message_id = temporaryMessage1.message_id;
							// 		obbj.history += temporaryMessage;
							// 	} else {
							// 		temporaryMessage = `/end${this.uuid}`;
							// 	}
							// 	index += temporaryMessage;
							// 	indexSize = index;
							// 	// obbj.history += index;
							// 	if (index.length > 2 && !typingTimer){
							// 		typingTimer = setInterval(()=>{
							// 			if (index.length > 0){
							// 				displayedText += index.charAt(0);
							// 				this.introde_bottom = displayedText;
							// 				let highlighted = marked(displayedText);
							// 				if (index == `/end${this.uuid}`){
							// 					this.ImageGeneration = false;
							// 					clearInterval(typingTimer);
							// 					typingTimer = null;
							// 					return;
							// 				}
							// 				if (this.stop_message == 0){
							// 					obbj.content = highlighted;
							// 				} else {
							// 					this.ImageGeneration = false;
							// 					clearInterval(typingTimer);
							// 					typingTimer = null;
							// 					return;
							// 				}
							// 				// if (this.stop_message != 1)obbj.content = highlighted;
							// 				// || index == end
							// 				index = index.substring(1);
							// 			} else {
							// 				clearInterval(typingTimer);
							// 				typingTimer = null;
							// 			}
							// 		}, 50)
							// 	}
							// 	// obbj.content = marked(index);
							// });
							console.log("结束：")
						},
						fail: (res) => {
							console.log("发送消息失败！",res);
						}
					})
				} else {
					console.log("websoctke未打开");
					console.log("链接状态：",this.isConnected);
					this.isConnected = false
				}
				// },500)
				
				  
			},
			test(index, message){
				console.log("数据是：", message);
				// index = message;
				// console.log();
			},
			focusData(event){
				console.log("当前接收到的数据是：", event);
				this.scrollToBottom();
				this.donghua = true;
				if (event == 3){
					this.file_explain = 3;
					this.scrollToBottom();
				} else {
					this.scrollToBottom();
					this.file_explain = event;
					// this.scrollToBottom();
				}
			},
			// WebSocket预加载
			initWebSocket() {
				const self = this;
				// console.log("websocket");
				console.log("websocket的uuid是：",this.uuid);
				this.socketTask = uni.connectSocket({
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
				this.socketTask.onOpen((res)=>{
					this.isConnected = true;
					console.log("WebSocket连接已打开！",res);
					// this.ImageGeneration = false;
				})
				this.socketTask.onClose((res)=>{
					console.log('WebSocket 已关闭！');
					self.isConnected = false;
				})
				this.socketTask.onError((res)=>{
					console.log("WebSocket链接打开失败，请检查！",error);
					self.isConnected = false;
				})
				this.socketTask.onMessage((message)=>{
					console.log("官方得到的消息是：",message.data);
					if (this.stop_message == 1)return;
					if (message.data != '' && this.biaoji ==1){
						this.obbj.content = '';
						this.biaoji--;
					}
					// console.log("传递过来的数据是：",message.data);
					let temporaryMessage = '';
					if (message.data != `/end${this.uuid}`){
						let temporaryMessage1 = JSON.parse(message.data.substring(6));
						if (temporaryMessage1.message_id == this.message_id)return;
						temporaryMessage = temporaryMessage1.text;
						this.obbj.message_id = temporaryMessage1.message_id;
						this.obbj.history += temporaryMessage;
					} else {
						temporaryMessage = `/end${this.uuid}`;
					}
					this.index += temporaryMessage;
					this.indexSize = this.index;
					// obbj.history += index;
					if (this.index.length > 2 && !this.typingTimer){
						this.typingTimer = setInterval(()=>{
							if (this.index.length > 0){
								this.displayedText += this.index.charAt(0);
								this.introde_bottom = this.displayedText;
								let highlighted = marked(this.displayedText);
								if (this.index == `/end${this.uuid}`){
									this.ImageGeneration = false;
									clearInterval(this.typingTimer);
									this.typingTimer = null;
									return;
								}
								if (this.stop_message == 0){
									this.obbj.content = highlighted;
									// console.log("数据是：", this.obbj.content);
								} else {
									this.ImageGeneration = false;
									clearInterval(this.typingTimer);
									this.typingTimer = null;
									return;
								}
								this.index = this.index.substring(1);
							} else {
								clearInterval(this.typingTimer);
								this.typingTimer = null;
							}
						}, 50)
					}
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
				let currentTime = `${year}年${month}月${day}日 ${hours}:${minutes}`;
				// console.log("当前时间：",currentTime);
				return currentTime;
			},
			// 拿到链接进行展示
			keyboardHeightData(event){
				console.log("键盘弹起的高度时：",event);
				const self = this;
				this.$nextTick(function(){
					self.marginTop = event;
				})
			},
			redisplay(){
				// console.log("数据是：", this.file_explain);
				this.file_explain = 1;
				let lenght = this.msgBox.length;
				for (let i = 0; i < lenght; i++){
					if (this.msgBox[i].dataHandle != 0)this.msgBox[i].dataHandle = 0;
				}
			},
			explay(e,event){
				this.touchX = e.touches[0].pageX;
				this.touchY = e.touches[0].pageY;
				console.log("此时传递的数据是：", event);
				let lenght = this.msgBox.length;
				for (let i = 0; i < lenght; i++){
					if (this.msgBox[i] == event){
						this.msgBox[i].dataHandle = 1;
					} else {
						this.msgBox[i].dataHandle = 0;
					}
				}
				uni.vibrateShort({
					success: function () {
						console.log('音效成功 success');
					}
				});
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
				// uni.closeSocket();
				this.socketTask.close();
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
			
		}
	}
</script>

<style lang="less">
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
	p{
		margin-bottom: 20rpx;
	}
	
	@font-size: 30rpx;
	@line-height: 1.5;
	@letter-space: 0.4px;
	@font-family: '思源黑体Regula';
	// @font-family: 'msyh';
	
	.mmm{
		height: 98%;
		width: 100%;
		/* max-width: 550rpx; */
		/* background-color: #5ECDBA; */
	}
	.topsdingwei{
	   position: fixed;z-index: 999;left: 0;right: 0;
	}
	.gggt{
		// position: absolute;
		position: fixed;
		z-index: 99;
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
		/* height: calc(80vh - var(--status-bar-height) - 0.46rem); */
		background-color: white;
		// background-color: #0498ff;
	}
	.Background_bottom_1{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		/* height:calc(86vh - 0.46rem); */
		/* height: calc(90vh - var(--status-bar-height) - 0.46rem); */
		background-color: white;
		/* background-color: #0498ff; */
	}
	.Background_bottom_3{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		/* height:calc(45vh - 0.46rem); */
		/* height: calc(53vh - var(--status-bar-height) - 0.46rem); */
		background-color: white;
		/* background-color: blueviolet; */
	}
	// .Background_bottom{
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	width: 100%;
	// 	/* height:calc(90vh - 0.46rem); */
	// 	height: calc(90vh - var(--status-bar-height) - 46px);
	// 	background-color: white;
	// }
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
	  max-width: 550rpx;
	  /* max-width: 70%; */
	  /* background-color: #95EC69; */
	  // background-color:#5ECDBA;
	   // background-color: #49b9ff; 
	   background-color: #0498ff;
	  // color: black;
	  color: white;
	  border-radius: 25rpx 25rpx 0 25rpx;
	  // font-family:'思源黑体Regular';
	  font-family: @font-family;
	  font-size: @font-size;
	  letter-spacing: @letter-space;
	  line-height: @line-height;
	  // font-weight: 500;
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
	}
    .youMsg{
		display:flex;
		flex-direction: column;
		/* align-items: center; */
		white-space: pre-wrap;
		max-width: 80vw;
		word-wrap: break-word;
		/* width: 100vw; */
		/* font-family:Arial; */
		word-break: break-all;
		/* background-color:#F6F6F6; */
		background-color: #f5f5f5;
		/* border-radius: 20rpx; */
		border-radius: 25rpx 25rpx 25rpx 0;
		line-height: 50rpx;
		padding: 25rpx 28rpx 10rpx 28rpx;
		font-family: @font-family;
		font-size: @font-size;
		line-height: @line-height;
		letter-spacing: @letter-space;
		text-align: justify;
		color: #000000;
		
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


