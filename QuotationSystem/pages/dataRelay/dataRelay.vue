<template>
	<page-meta :root-font-size="26.66667+'vw'"></page-meta>
	<view>
			
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- 自定义头部导航栏 -->
		<view style="display: flex;align-items: center;justify-content:center;background-color: rgb(248, 248, 248); width: 100%;height:0.46rem ;"> 
			<view style="display: flex;align-items: center; font-size: 0.16rem;width: 91%;height: 100%; ">
				<view style="height: 0.3rem;width: 0.3rem;margin-right: 0.1rem;" @tap="Jump">
					<image src="../../static/left.png" mode="aspectFill" style="height: 100%;width: 100%;"></image>
				</view>
				<view class="top_button" :style="{ backgroundColor: colors }">
					<text style="font-size: 23rpx;color: white;" @click="show = true">{{projectName}}</text>
				</view>
				<view style="margin-left: 0.1rem; height: 0.36rem;width: 50%; display: flex;flex-direction: column;justify-content: space-around;">
					<!-- <text style="font-size: 0.12rem;font-weight: 600;">请输入项目名称</text> -->
					 <!-- placeholder="点击输入项目名称" placeholder="点击输入项目名称" -->
					 <!-- style="margin-left: -20rpx;height: 30%;font-size: 2px;opacity: 0.5;" -->
					<u--input
					  :class="isFocus ? 'inputDefaultStyle' : 'inputFocusedStyle'"
					  type="text" 
					  placeholderStyle="color: red; font-size: 28rpx; font-weight: bold;"
					  maxlength="10"
					  v-model="entryname"
					  @focus="focusData"
					  @blur="blurData"
					></u--input>
					<text style="font-size: 24rpx;opacity: 0.6;">产品报价</text>
				</view>
			</view>
		</view>
		
		<view v-if="promptTitle.isTrue==true" style="position: fixed;top: 180rpx;right: 0;left: 0;z-index: 999;">
			<u-notice-bar :text="text1" mode="closable" @close="closeNotice"></u-notice-bar>
		</view>
		
		<view :class="file_explain ? 'Background_bottom_1' : 'Background_bottom'"  @tap="redisplay">
			<view style="height: 200px; width: 86%;background-color: blue;visibility: hidden; position: absolute; top: -9999px;">
				<!-- @click="toggleZoom" visibility: hidden; position: absolute; top: -9999px;-->
				<canvas canvas-id="myCanvas" style="width: 100%; height: 100%;"></canvas>
			</view>
			<!-- :scroll-with-animation="true" style="height: 96%;width: 100%;"-->
			<scroll-view :scroll-top="scrollTopHeight" :scroll-with-animation="donghua" scroll-y="true" class="mmm">
				<view id="your-view-id">
					<!-- style="margin-bottom: 20rpx;" -->
					<view class="youBox" style="margin-bottom: 20rpx;">
						<view selectable="true" style="font-size: 33rpx;letter-spacing: 4rpx;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" class="youMsg">
							{{detailedIntroduction}}
						</view>
					</view>
					<view  v-for="(item,index) in msgBox" :key="index">
						<view style="width: 100%; display: flex;justify-content: center;font-size: 20rpx;margin: 20rpx 0;">{{item.Date}}</view>
						<view class="youBox" v-if="item.isYour==true" style="margin-bottom: 20rpx;">
							<view class="youMsg" v-if="item.zhuangtai=='wait for'" style="margin-top: 20rpx;">
								<view class="bubble">
									<view class="bubble__circle"></view>
									<view class="bubble__circle"></view>
									<view class="bubble__circle"></view>
								</view>
							</view>
							<view v-if="item.isUrl==true" @tap="ViewingDocuments(item)" class="youexcel">
								<view style="height: 75%;width: 100%;">
									<view style="padding-left: 20rpx;display: flex;justify-content: space-around;align-items: center;width: 100%;height: 75%;">
										<view class="fileNameText">
											根据已有的报价信息得到的报价表格
										</view>
										<view style="width: 30%;height: 90%;">
											<image src="../../static/xlsx.png"  style="height: 100%;width: 75%;"></image>
										</view>
									</view>
									<view style="padding-left: 20rpx;;display: flex;align-items: center;height: 25%;width: 100%;">
										<view v-if="item.filPath != ''">
											<text style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
										</view>
										<view v-if="item.filPath == ''">
											<text v-if="isDownload==0" style="font-size: 20rpx;opacity: 0.6;">0 / 未下载</text>
											<u-line-progress v-if="isDownload==1" :percentage="fileProgress" height="7"></u-line-progress>
											<text v-if="isDownload==2" style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
										</view>
									</view>
								</view>
							</view>
							<!-- <view v-if="item.isUrl==false" class="youMsg" style="font-size: 27rpx;" v-html="item.msg">
							</view> -->
							<view v-if="item.isUrl==false">
								<!-- 第一种展示方式 -->
								<view v-if="item.msg==''">
									<!-- deleteMsgbox(item) -->
									<!-- <rich-text :nodes="item.msg" :selectable="true" v-if="item.isUrl==false" class="youMsg" style="font-size: 30rpx;letter-spacing: 4rpx;"></rich-text> -->
									<view class="youMsg" style="display: flex;flex-direction: column;position: relative;" @longtap="explay(item)">
										<view v-if="item.dataHandle==1" style="position: absolute;top:-50px;left: 20px ;z-index: 99;">
											<CheckboxTextVue
												direction="1" 
												:message="item.bottom_top" 
												:deletedataa="item" 
												@replydisplay="item.dataHandle=0"
												@deletemsg="deleteMsgbox"
											/>
										</view>
										<view style="font-size: 33rpx;letter-spacing: 4rpx;" class="rich-text-container" v-if="item.single_produce==true">{{item.price}}</view>
										<view v-if="item.single_produce==false">
											<text class="titleLanguage" >{{item.bottom_top}}</text>
											<!-- 具体的文件输入 -->
											<view v-if="item.little_photo!=''" class="animate__animated animate__fadeIn" style="width: 100%; height: 200px; display: flex; align-items: center; justify-content: center;padding-bottom: 20rpx;">
												<image :src="item.little_photo" @tap="enlargePhoto(item)"  style="width: 100%; height: 100%;"></image>
											</view>
											<view class="ExplanatoryLanguage" @tap="check_url(item)" @longtap.stop="saveFile(item)">
												<view class="ExplanatoryLanguage_text">{{item.bottom_bottom}}</view>
												<!-- {{item.bottom_bottom}} -->
												<!-- 时间日期 -->
												<view style="width: 20%;height: 100%;">
													<image v-if="item.isdisplayed==true" src="../../static/xlsx.png" mode="aspectFill" class="animate__animated animate__fadeIn" style="height: 100rpx;width: 100rpx;"></image>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view v-if="item.msg!=''" style="position: relative;" @longtap.stop="explay(item)">
									<view v-if="item.dataHandle==1" style="position: absolute;top:-60px;left: 20px ;z-index: 99;">
										<CheckboxTextVue
											direction="1" 
											:message="item.msg" 
											:deletedataa="item" 
											@replydisplay="item.dataHandle=0"
											@deletemsg="deleteMsgbox"
										/>
									</view>
									<rich-text :nodes="item.msg" :selectable="true" v-if="item.isUrl==false" class="youMsg" style="font-size: 30rpx;letter-spacing: 4rpx;"></rich-text>
								</view>
							</view>
							
						</view>
							
						<view class="myBox" v-if="item.isMine==true">
							<!-- @longtap="deleteMsgbox(item)" -->
							<view v-if="item.isUrl==true" @tap.stop="ViewingDocuments(item)" @longtap="deleteMsgbox(item)" class="myexcel">
								<view style="height: 75%;width: 100%;">
									<view style="display: flex;justify-content: space-around;align-items: center;height: 75%;margin-left: 20rpx;">
										<view class="fileNameText">
											{{item.filename}}
										</view>
										<view style="width: 30%;height: 90%;">
											<image v-if="item.filetype=='xlsx'" src="../../static/xlsx.png"  style="height: 100%;width: 75%;"></image>
											<image v-if="item.filetype=='txt'" src="../../static/txt.png" mode="" style="height: 90%;width: 65%;"></image>
											<image v-if="item.filetype=='docx'||item.filetype=='doc'" src="../../static/WORD.png" mode="" style="height: 90%;width: 65%;"></image>
										</view>
									</view>
									<view style="display: flex;align-items: center;height: 25%;margin-left: 22rpx;">
										<view v-if="item.filPath != ''">
											<text style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
										</view>
										<view v-if="item.filPath == ''">
											<text v-if="isDownload==0" style="font-size: 20rpx;opacity: 0.6;">0 / 未下载</text>
											<u-line-progress v-if="isDownload==1" :percentage="fileProgress" height="7"></u-line-progress>
											<text v-if="isDownload==2" style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
										</view>
									</view>
								</view>
							</view>
							<view style="font-size: 33rpx;position: relative;" @longtap.stop="explay(item)" class="myMsg" v-if="item.isUrl==false">
								<view v-if="item.dataHandle==1" style="position: absolute;top:-60px;right: 20px ;z-index: 99;">
									<CheckboxTextVue
										direction="0" 
										:message="item.message1" 
										:deletedataa="item" 
										@replydisplay="item.dataHandle=0"
										@deletemsg="deleteMsgbox"
									/>
								</view>
								<!-- <view class="rich-text-container">{{item.message1}}</view> -->
								<text>{{item.message1}}</text>
							</view>
						</view>
					</view>
				</view>
				<view id="target-id"></view>
			</scroll-view>
		</view>
		
		
		<!-- @StopReceivingData="stopData" -->
		<InputVue
			@childMessage="file_explainMessage" 
			@fileMesage="sendFile"
			@sendData="addData"
			@StopReceivingData="stopData"
			:file_explainn="file_explain" 
			:getAnswer="ImageGeneration"
			:Isdisplay="1"
			/>
		<u-picker :show="show" :columns="columns" cancelText="新增客户" cancelColor="red" @close="show=false" @cancel="addCustomer" @confirm="listName" :closeOnClickOverlay="true"></u-picker>
	</view>

</template>

<script>
	/* uni.scss */
	// @import 'uview-ui/theme.scss'
	import marked from '../../api/marked.min.js'
	import MarkdownIt from 'markdown-it';
	import InputVue from '../../components/Input.vue';
	import CheckboxTextVue from '../../components/CheckboxText.vue';
	import { handleError } from "vue";
	// import calculateSum from '../../api/api.js'
	// import marked from '../../api/marked.min.js'
	export default {
		data() {
			return {
				text1: '点击输入报价的项目名称和报价对象',
				biao : 0,
				typingTimer : null,  // 定时器
				displayedText : '',  // 文本中转
				
				
				reminderInterval:null, // 定时器，用于提醒用户填写姓名和项目名称信息
				tableImagePath: '', // 存储生成的表格图片路径
				zoomed: false, // 是否放大状态
				maxCanvasWidth: 300, // Canvas 最大宽度
				maxCanvasHeight: 200, // Canvas 最大高度
				outputResolution: 2, // 输出图片的分辨率倍数
				
				choose:false,
				deviceDetails:false,  // 设备详情 
				colors:'cadetblue' , // 最初头像的颜色
				projectName:'点击', //项目的任务名称
				show: false,
				columns: [   // 选取用户姓名
					[]
					// ['中国', '美国', '日本','詹姆斯']
				],
				file_explain:1, // 文件是否展示
				isFile:'',  //上传文件或者正常交流
				socketTask:'',
				entryname:'', // 项目输入框内容
				donghua:'',  // 是否有滑动动画
				fileSize:0,  // 当前文件的大小
				isDownload:0,  // 是否处理下载的状态
				fileProgress:0,  // 文件下载进度
				filename:'', // 上传文件的名称
				fileUploaded:'',  // 判断是否有文件上传
				myUUID:'376ccc85-c515-413a-80a0-a8cacab2d1a3',  // 单个窗口的uuid
				isConnected:false, //websocket是否建立链接
				space:300,
				keybord:'10vh',
				input_msg:'',
				scrollToView:'',
				text : "45到回复就合适的借口四大皆空房价快速导航的技山东黄金开发接口上的收到回复就是的",
				scrollTopHeight:0,
				fontsize:'',  //页面基准
				yourmessage:'', // websocket接收到的信息
				ChatPainting:[],
				uuid:'',  // 进入该页面读取历史记录的唯一标识
				viewheight:'', //高度变化
				msgBox:[],
				ImageGeneration:false,  // 用于检测回答正在生成中~ 回答一致性
				baseUrl:'', // 基本链接
				detailedIntroduction:'',
				stop_message:0, // 用于检测是否点击暂停按钮
				timerData:null,
				websocketData:null, // websocket连接
				isFocus:true,
				promptTitle:{
					isTrue:false,
					index:''  // 初始设置为数据框的长度
				},
				max:5,
				jump_index:false 
			}
		},
		components:{
			InputVue,
			CheckboxTextVue
		},
		mounted() {
			console.log("设备的安卓ID是：",this.$methods.checkPermission());
			// console.log("当前结果调用:",this.$methods.login());
			console.log("当前时间是：",this.$methods.getFileDate());
			const systemInfo = uni.getSystemInfoSync();
			console.log("初始数据是：",this.entryname);
			if (this.entryname != '')return;
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
		},
		computed:{
			// 用户检测用户数据是否填写完整
			isUserComplete(){
				return this.entryname && this.projectName && this.projectName!='点击'
				// return '1'+'2'
			}
		},
		watch: {
		// 当msgbox被修改时调用scrolltoBottom函数
		  msgBox: {
		    deep: true,
		    handler: 'scrollToBottom',
		  },
		  isConnected:{
			handler(newData, oldData){
				console.log("此时的网络状况是：",newData);
				  if (newData == false){
					  this.ImageGeneration = false;
					  let max = 5;
					  let i = 0;
					  this.websocketData = setInterval(()=>{
						if (this.isConnected != true){
							this.initWebSocket();
							i++;
							console.log("开始重连ing");
							console.log("链接状态：",this.isConnected);
						} else {
							clearInterval(this.websocketData)
						}
						if (i>=max){
							clearInterval(this.websocketData)
						}
					  },1000)
				  }
			},
			immediate: true,
			deep: true
		  },
			  // websocket失败，重新连接
		entryname(newVal){
			let headDisplay = '点击输入项目名称';
			if (newVal != '' && !headDisplay.includes(newVal)){
				this.entryname = newVal;
				clearInterval(this.timerData);
			}
			}
		},
		onLoad(options) {
			console.log("token：",uni.getStorageSync('token'));
			if ('param' in options){
				this.donghua = false; // 直接渲染没有加载动画
				var obj = JSON.parse(decodeURIComponent(options.param));
				console.log("obj的值是：",obj);
				// const existence = 'name' in obj && 'projectName' in obj;
				if ('name' in obj){
					if (obj.name!=''){
						this.entryname = obj.name
					}
				}
				if ('projectName' in obj){
					if (obj.projectName!=''){
						this.projectName = obj.projectName;
					}
				}
				this.colors = obj.colorss;
				this.uuid = obj.uuid;
				this.detailedIntroduction = obj.detailedIntroduction;
				let box = JSON.parse(plus.storage.getItem(`${this.uuid}`));
				if (box == null){
					// console.log("数据是空的");
				} else {
					this.msgBox = box;
					console.log("传递过来的数据是：",this.msgBox);
				}
			}
			setTimeout(()=>{
				this.initWebSocket();
			}, 50)
			let chatSession = uni.getStorageSync('ChatSession');
			console.log("此时的项时：",chatSession);
			console.log("最开始的时候uuid的值时：",this.uuid);
			// let headDisplay = '点击输入项目名称';
			// if (headDisplay.includes(this.entryname)){
			// 	let i = 0;
			// 	this.timerData = setInterval(()=>{
			// 		if (i >= headDisplay.length){
			// 			i = 0;
			// 			this.entryname = '';
			// 		} else {
			// 			this.entryname += headDisplay[i];
			// 			i++;
			// 		}
			// 	},270)	
			// }
			// // 消息展示框数据提示
			// this.promptTitle.index = this.msgBox.length;
			
			// this.baseUrl = this.$store.state.BASE_URL;
		},
		onShow(){
			if (this.jump_index == true){
				setTimeout(()=>{
					this.initWebSocket()
				}, 50)
			}
			// let param = this.$methods.filesSame('1','1','sdf');
			console.log("页面回来的uuid：",this.uuid);
			const inputData = [
				{
					"unitPrice": "29000.0",
					"number": "1",
					"chsName": "Camera 200-C",
					"count": 29000,
				},
				{
					"unitPrice": "91606.41",
					"number": "1",
					"chsName": "华为VP9830A",
					"count": 91606.41
				},
				{
					"unitPrice": "19019.05",
					"number": "1",
					"chsName": "华为CloudLink Box 310",
					"count": 19019.05
				},
				{
					"unitPrice": "1903.25",
					"number": "1",
					"chsName": "华为CloudLink Mic 500",
					"count": 1903.25
				},
				{
					"totals":45562
				}
			];
			let headDisplay = '点击输入项目名称';
			if (headDisplay.includes(this.entryname)){
				let i = 0;
				this.timerData = setInterval(()=>{
					if (i >= headDisplay.length){
						i = 0;
						this.entryname = '';
					} else {
						this.entryname += headDisplay[i];
						i++;
					}
				},270)	
			}
			// 消息展示框数据提示
			this.promptTitle.index = this.msgBox.length;
			
			this.baseUrl = this.$store.state.BASE_URL;
			let list_name = uni.getStorageSync('itemArr');
			for (let i = 0;i<list_name.length;i++){
				this.columns[0].push(list_name[i].name)
			}
		},
		onHide() {
			console.log("初始456页面隐藏");
			console.log("隐藏时页面的uuid：",this.uuid);
			plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			// let chatSession = uni.getStorageSync('ChatSession');
			// const foundItem = chatSession.find(item => item.uuid === this.uuid);
			// if (this.msgBox.length === 0){
			// 	chatSession = chatSession.filter(item => item.uuid !== foundItem.uuid);
			// 	uni.setStorageSync('ChatSession',chatSession);
			// 	// uni.closeSocket();
			// } else {
			// 	if (foundItem){
			// 		this.newContent(foundItem);
			// 	}
			// 	// uni.closeSocket();
			// 	// this.socketTask = null;
			// 	plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			// }
		},
		onUnload() {
			// console.log("初始456页面销毁");
			if (this.isConnected == true){
				console.log("websocket451关闭");
				uni.closeSocket();
				this.isConnected = false;
			}
			clearInterval(this.timerData); // 关闭最开始的定时器
			let headDisplay = '点击输入项目名称';
			if (headDisplay.includes(this.entryname)){
				this.entryname = '';
			}
			clearInterval(this.websocketData);
			let chatSession = uni.getStorageSync('ChatSession');
			// console.log("之前写入进去的数据时：",uni.getStorageSync('ChatSession'));
			// console.log("uuid时：",chatSession.uuid);
			// console.log("此页面的uuid时：",this.uuid);
			let foundItem = chatSession.find(item => item.uuid === this.uuid);
			// console.log("需要修改的项时：",foundItem);
			if (this.msgBox.length === 0){
				// console.log("此时的消息时什么4545");
				chatSession = chatSession.filter(item => item.uuid !== foundItem.uuid);
				uni.setStorageSync('ChatSession',chatSession);
				// uni.closeSocket();
			} else {
				// console.log("文件上传的消息时431213：",foundItem);
				if (foundItem){
					this.newContent(foundItem);
				}
				// console.log("页面销毁");
				// uni.closeSocket();
				this.socketTask = null;
				plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			}
		},
		methods: {
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
			redisplay(){
				let lenght = this.msgBox.length;
				for (let i = 0; i < lenght; i++){
					if (this.msgBox[i].dataHandle != 0)this.msgBox[i].dataHandle = 0;
				}
				if (this.file_explain == 1)return;
				this.file_explain = 1;
				this.space = 500;
			},
			saveFile(event){
				
				console.log("需要保存的数据项是：",event);
			},
			deleteMsgbox(event){
				console.log("需要删除的项是：",event);
				let index = 0;
				uni.showModal({
					title: '提示',
					content: '是否要删除该消息？',
					success: (res) => {
						if (res.confirm) {
							let box = this.msgBox.filter(item => item != event);
							this.msgBox = box;
							console.log('用户点击确定');
							// index = 1;
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			focusData(){
				console.log("点击激活");
				this.entryname = '';
				this.isFocus = false;
				clearInterval(this.timerData);
			},
			blurData(){
				this.isFocus = true;
				// 还要启动定时器  判断用户是否已经输入了相关文字
				if (this.entryname == ''){
					let headDisplay = '点击输入项目名称';
					let i = 0;
					this.timerData = setInterval(()=>{
						if (i >= headDisplay.length){
							i = 0;
							this.entryname = '';
						} else {
							this.entryname += headDisplay[i];
							i++;
						}
					},270)
				}
				console.log("失去焦点之后的样式");
			},
			closeNotice(){
				this.promptTitle.isTrue = false; 
				this.promptTitle.index = this.msgBox.length - 1;
				console.log("此时的下标是：",this.promptTitle.index);
			},
			// 是否显示提示框以及显示什么内容
			explayNotice(event){
				let title = '点击输入项目名称';
				if (title.includes(event) == true || this.projectName == ''){
					if (this.msgBox.length - this.promptTitle.index >= 4){
						// 提示文字
						this.promptTitle.isTrue = true;
						if (title.includes(event) && this.projectName != '点击'){
							this.text1 = '点击输入报价的项目名称'
						}
						if (!title.includes(event) && this.projectName == '点击'){
							this.text1 = '点击最上方获取报价对象名称'
						}
						if (title.includes(event) && this.projectName == '点击'){
							this.text1 = '点击输入报价的项目名称和获取报价对象名称'
						}
					}
				}
				if (!title.includes(event) && this.projectName != '点击'){
					this.promptTitle.isTrue = false;
				}
			},
			stopData(event){
				console.log("取消");
				this.ImageGeneration = false;
				this.stop_message = 1;
				uni.closeSocket();
			},
			file_explainMessage(event){
				this.file_explain = event;
			},
			ddd(){
				this.file_explain = 1;
				this.space = 500;
			},
			//  在页面的外围添加一个点击事件，用于取消文件展示框
			ttt(){
				if (this.file_explain == 1)return;
				this.file_explain = 1;
				this.space = 500;
			},
			Jump(){
				console.log("返回原来的页面");
				// 此时存在一个问题，以什么特效进来就要以什么特效出去
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			// 检测页面高度变化，让页面刷新到底部
			scrollToBottom(){
				// console.log("变动了");
				this.$nextTick(function(){
					// 检测高度变化还未是实现
					const qquery = uni.createSelectorQuery().in(this);
					     qquery.select('.mmm').boundingClientRect((rect) => {
					       if (rect) {
					         // console.log('Scroll-view 高度:', rect.height);
								this.viewheight = rect.height;
					       }
					   }).exec();
					var query = uni.createSelectorQuery().in(this);
					      query.select('#your-view-id').boundingClientRect(data => {
					        if (data) {
							  let top = data.height - this.viewheight;
							  if (top>0){
								  this.scrollTopHeight = top;
							  }
					        }
					      }).exec();
				})
			},
			addData(event){
				this.stop_message = 0;
				this.input_msg = event;
				this.ImageGeneration = true;
				this.donghua = true;
				if (this.input_msg == ''){
					// console.log("输入为空！");
					uni.$u.toast('输入为空');
					this.ImageGeneration = false;
					return ;
				}
				console.log("websocket是否链接：", this.isConnected);
				console.log("uuid是：",this.uuid);
				if (this.isConnected == false){
					uni.$u.toast('网络未连接');
					this.ImageGeneration = false;
					return ;
				}
				let myMsg = this.input_msg;
				var myobj = {
					message1: this.input_msg,
					isMine:true,
					isUrl:false,
					// Date:this.get_Date()
					Date:this.$methods.getDate(),
					dataHandle:0
				}
				this.msgBox.push(myobj);
				// 消息输入了
				this.explayNotice(this.entryname);
				// if (this.msgBox.length - this.promptTitle.index >= 4){
				// 	this.promptTitle.isTrue = true;
				// }
				this.input_msg = '';
				var myobj = {
					msg:'',
					isYour:true,
					zhuangtai:'wait for',
					dataHandle:0
				}
				this.msgBox.push(myobj);
				
				if (this.isConnected == true){
					uni.request({
						// url:'http://192.168.2.6:8080/api/inquiry',
						// url:`${this.baseUrl}/api/inquiry`,
						url:`${this.baseUrl}/api/qianfan`,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						},
						data:{
							// prompt: myMsg,
							query:myMsg,
							uuid:this.uuid
						},
						success: (res) => {
							console.log("发送成功：",res);
							
							if (res.data.status != 100){
								this.input_msg = '';
								this.ImageGeneration = false;
								uni.$u.toast(`${res.data.message}`);
								this.msgBox.pop();
								return ;
							}
							
							this.donghua = false;
							this.choose = 2;
							this.receiveMessages();
						},
						fail: (res) => {
							this.msgBox.pop();
							console.log("发送消息失败！",res);
							this.input_msg = '';
							uni.$u.toast('网络出现故障，请重试');
							this.ImageGeneration = false;
						}
					})
				}
				  
			},
			// WebSocket预加载
			initWebSocket() {
				const self = this;
				let index = '';
				let typingTimer = null;  // 定时器
				let displayedText = '';  // 文本中转
				console.log("uuid是：",this.uuid);
				console.log("websocket地址是：",this.$store.state.WebSocket_URL);
				uni.connectSocket({
					url:`${this.$store.state.WebSocket_URL}/websocket/${this.uuid}`,
					success(res) {
						// console.log("成功：",res);
					},
					fail(res) {
						// console.log("链接失败！",res);
					}
				});
				uni.onSocketOpen((res)=>{
					this.isConnected = true;
					console.log("WebSocket连接已打开！",res);
					this.ImageGeneration = false;
				});
					
					
				uni.onSocketError((error)=>{
					console.log("WebSocket链接打开失败，请检查！",error);
					self.isConnected = false;
					// this.isConnected = false;
				})
				uni.onSocketClose(function (res) {
					console.log('WebSocket 已关闭！');
					// this.isConnected = false;
					console.log("此时的消息连接是：",self.isConnected);
					self.isConnected = false;
					self.ImageGeneration = false;
				});
			},
			receiveMessages(event){
				this.jump_index = false;
				let chatSession = uni.getStorageSync('ChatSession');
				if (this.isConnected != true){
					this.$methods.promptBox('网络未连接，请重试');
					return ;
				}
				this.donghua = true;
				var youobj = {
					msg:'',
					isYour:true,
					filPath:'', // 存储本地直接打开的地址
					isUrl:false,
					deviceDetails:false, 
					// price:produceMessage,
					price:'',
					Url:''  ,// 存储设备详情网络地址
					little_photo:'', // 存储报价数据的部分图片
					all_photo:'', // 存储报价数据的所有图片
					bottom_top:'', // 头部信息
					bottom_bottom:'', // 尾部信息
					isdisplayed:false, // 是否显示最后excel表格
					single_produce:false, // 是否是单个产品信息
					dataHandle:0
				}
				// 检验是否是异步的
				console.log("agin");
				setTimeout(()=>{
					console.log("开始接收消息：");
					this.msgBox.pop();
					this.msgBox.push(youobj);
					let bottom_top = '根据您提供的产品信息，我们提供的推荐报价如下表所示：';
					let i = 0;
					let timer =  setInterval(()=>{
						if(i>=bottom_top.length){
							clearInterval(timer);
							// resolve(); 
						} else {
							youobj.bottom_top += bottom_top[i];
							i++;
						}
					},50)
					// this.indx = 1;
				}, 3000)
				let file_uuid = '';
				uni.onSocketMessage((message)=>{
					console.log("文件收到的消息是：",message.data);
					let index = JSON.parse(message.data);
					if (this.choose == 2){
						// 属于第一次收到消息
						if (index.status == 400 || index.status == 404){
							youobj.msg = index.message;
							// this.msgBox.pop();
							// this.msgBox.push(youobj)
							this.ImageGeneration = false;
							this.choose--;
						} else {
							this.choose--;
							let produceMessage = JSON.parse(message.data);
							youobj.price = produceMessage;
							// var youobj = {
							// 	msg:'',
							// 	isYour:true,
							// 	filPath:'', // 存储本地直接打开的地址
							// 	isUrl:false,
							// 	deviceDetails:false, 
							// 	price:produceMessage,
							// 	Url:''  ,// 存储设备详情网络地址
							// 	little_photo:'', // 存储报价数据的部分图片
							// 	all_photo:'', // 存储报价数据的所有图片
							// 	bottom_top:'', // 头部信息
							// 	bottom_bottom:'', // 尾部信息
							// 	isdisplayed:false, // 是否显示最后excel表格
							// 	single_produce:false // 是否是单个产品信息
							// }
							if (produceMessage.length == 2){
								youobj.price = `型号为${produceMessage[0].chsName}的产品报价约为单个${produceMessage[0].unitPrice}元`
								// youobj.price = `1719559548737_2_1-1-001-询价标配.xlsx`
								youobj.single_produce = true;
							} else {
								// var get = this.$methods.convertData(index);
								
								var get = this.$methods.convertData_2(index)
								this.drawTable(get,0)
									.then(async isActive =>{
										youobj.little_photo = isActive;
										// 处理尾部数据实现打字机效果
										// const typeBottomWrite = () =>{
										// 	return new Promise((resolve)=>{
										// 		// let bottom_bottom = '1719559548737_2_1-1-001-询价标配.xlsx';
										// 		let bottom_bottom = `${this.$methods.getFileDate()}XXX询价文件.xlsx`;
										// 		let i = 0;
										// 		let timer =  setInterval(()=>{
										// 			if(i>=bottom_bottom.length){
										// 				clearInterval(timer);
										// 				resolve(); 
										// 			} else {
										// 				youobj.bottom_bottom += bottom_bottom[i];
										// 				i++;
										// 			}
										// 		},50)
										// 		youobj.isdisplayed = true;
										// 	})
										// }
										// await typeBottomWrite();
										return this.drawTable(get,1)
									})
									.then(async allimage =>{
										youobj.all_photo = allimage;
										const typeBottomWrite = () =>{
											return new Promise((resolve)=>{
												// let bottom_bottom = '1719559548737_2_1-1-001-询价标配.xlsx';
												let bottom_bottom = `${this.$methods.getFileDate()}XXX询价文件.xlsx`;
												let i = 0;
												let timer =  setInterval(()=>{
													if(i>=bottom_bottom.length){
														clearInterval(timer);
														resolve(); 
													} else {
														youobj.bottom_bottom += bottom_bottom[i];
														i++;
													}
												},50)
												youobj.isdisplayed = true;
											})
										}
										await typeBottomWrite();
										// this.$methods.filesSame(this.uuid,file_uuid,this.msgBox);
										let param = this.$methods.filesSame(this.uuid,file_uuid,this.msgBox);
										if (param != true){
											uni.closeSocket();
											this.jump_index = true;
											uni.navigateTo({
												url:`/pages/CommunicationBusiness/CommunicationBusiness?param=${param}`
											})
										}
									})
									.catch(error =>{
										console.error("错误信息是：",error)
									})
							}
							// this.msgBox.pop();
							// this.msgBox.push(youobj)
							this.ImageGeneration = false;
						}
					} else {
						if (this.choose == 1){
							console.log("得到的文件是否是相似的", message.data);
							file_uuid = JSON.parse(message.data).data;
							// console.log("本页面的uuid是：",this.uuid);
							this.choose --;
						}
						if (this.choose == 0){
							let indexx = JSON.parse(message.data);
							this.msgBox[this.msgBox.length-1].Url = indexx.data;
							uni.downloadFile({
								url:indexx.data,
								success: (res) => {
									// youobj.filPath = res.tempFilePath;
									 uni.saveFile({
											tempFilePath: res.tempFilePath,
											success: (saveRes) => {
											  console.log('文件保存成功:', saveRes.savedFilePath);
											  youobj.filPath = saveRes.savedFilePath;
											  // this.$methods.filesSame(this.uuid,file_uuid,this.msgBox);
											  // let param = this.$methods.filesSame(this.uuid,file_uuid,this.msgBox);
											  // uni.navigateTo({
											  // 	url:`/pages/dataRelay/dataRelay?param=${param}`
											  // })
											  // 可以在这里使用保存后的文件路径
											},
											fail: (error) => {
											  console.error('文件保存失败:', error);
											}
										  });
									// 只获取了临时文件
									// console.log("获取到的连接地址时：",youobj.filPath);
								}
							})
							// youobj.filPath = 
							// console.log("连接时：",indexx.data);
							// console.log("上传的文档时：",this.msgBox[this.msgBox.length-1]);
						}
					}
					
					
				});
			},
			send_text(){
				console.log("输入框前方的加号");
				if (this.file_explain == 0){
					this.file_explain = 1;
				} else {
					this.file_explain = 0;
				}
				// this.file_explain = 1;
				console.log("输入的文本是",this.input_msg);
			},
			check_url(event){
				console.log("展示最新的连接：",event.Url);
				// 文档下载
				if (event.filPath == ''){
					console.log("开始下载");
					const downloadTask = uni.downloadFile({
					  url: event.Url,
					  success: function (res) {
					    event.filPath = res.tempFilePath;
						console.log("是否下载成功：",res);
						if (res.statusCode != 200){
							return;
						}
					    uni.openDocument({
					      filePath: res.tempFilePath,
					      success: function (res) {
					        console.log('打开文档成功');
					      },
						  fail(res) {
						  	console.log("打开文档失败：",res);
							uni.$u.toast('文档打开失败');
						  }
					    });
					  },
					  fail(res) {
					  	console.log("下载失败！:"+res);
						uni.$u.toast('文档下载失败');
					  }
					});
					downloadTask.onProgressUpdate((res) => {
						console.log('下载进度' + res.progress);
						uni.showLoading({
							title:`下载进度 ${res.progress}%`
						});
					    if (res.progress === 100) {
							uni.hideLoading();
						}
					});
				} else {
					// 直接打开文件
					uni.openDocument({
					  filePath: event.filPath,
					  success: function (res) {
					    console.log('打开文档成功',res);
					  },
					  fail(res) {
					  	console.log("打开文档失败",res);
					  }
					});
				}
			},
			// 拍照片
			// 文件上传
			async sendFile(result){
				console.log("此时的网络状况：",this.isConnected);
				console.log("此文件的uuid是", this.uuid);
				// this.ImageGeneration = false;
				if (this.isConnected != true){
					this.ImageGeneration = false;
					this.$methods.promptBox('网络链接有问题')
					return ;
				}
				console.log("需要上传的文件是：",result);
				let leixing = result.files[0].fileExtension;
				if (leixing != 'xlsx' && leixing != 'word' && leixing != 'pdf' && leixing != 'docx' && leixing != 'txt'){
					this.$methods.promptBox(`不支持${leixing}格式的文件`);
					this.ImageGeneration = false;
					return ;
				}
				this.filename = result.files[0].fileRealName;
				// WebSocket 是否已经建立连接
				console.log("链接是否是断开的",this.isConnected);
				let size = '';
				uni.getFileInfo({
				    filePath: result.files[0].filePath,
				    success: function (info) {
				        // console.log('文件大小：' + info.size + '字节');  // 打印文件大小
						size = `${(info.size / 1024).toFixed(2)}kb`;
				    },
				    fail: function (err) {
				        console.error('获取文件信息失败', err);
				    }
				});
				uni.showLoading({
					title: '正在上传中，请稍后',
				})
				if (this.isConnected == true)
				{
					uni.uploadFile({
						// url:'http://192.168.2.6:8080/api/file',
						url:`${this.baseUrl}/api/file`,
						filePath: result.files[0].filePath,
						name: 'file',
						header:{
							satoken:uni.getStorageSync('token')
						},
						formData: {
							file:'file',
							uuid:this.uuid
						},
						success:(uploadFileRes) => {
							// console.log("文件上传是否成功：",uploadFileRes);
							this.biao = 1;
							let gett = JSON.parse(uploadFileRes.data);
							console.log("文件上传是否成功：",gett);
							if (gett.status == 100){
								console.log("上传成功",uploadFileRes.data);
								this.choose = 2;
								this.ImageGeneration = true;
								uni.hideLoading();
								var youobj = {
									msg:'',
									isMine:true,
									filPath:result.files[0].filePath, // 最初用于判断事先是否有已经下载过的文件
									filename:this.filename,
									fileSize:size,
									filetype:result.files[0].fileExtension,
									isUrl:true,
									Date:this.$methods.getDate(),
									dataHandle:0
								}
								// console.log("文件类型时：",youobj.filetype);
								this.msgBox.push(youobj)
								this.explayNotice(this.entryname);
								var myobj = {
									msg:'',
									isYour:true,
									zhuangtai:'wait for'
								}
								this.msgBox.push(myobj)
								// 接收消息
								this.receiveMessages(youobj.filPath);
								// 
								this.$methods.ReadExcel(youobj.filPath)
									.then(isActive =>{
										console.log("此时收获到的excel传递的数据时：",isActive);
										if (isActive.name != ''){
											this.projectName = isActive.name;
										}
										if (isActive.project != ''){
											this.entryname = isActive.project;
										}
										// clearInterval(timerData);
									})
							} else {
								uni.$u.toast('上传失败！');
								uni.hideLoading();
							}
							
						},
						fail(res) {
							uni.hideLoading();
							uni.$u.toast('网络开小差了,上传失败');
							console.log("上传失败：",res);
						}
					})
				} else {
					uni.hideLoading();
				}
			},
			add(){
				const lemonjkFileSelect = uni.requireNativePlugin('lemonjk-FileSelect');
				lemonjkFileSelect.showNativePicker({
				    multi: "yes", //多选，待开发，后续支持
					pathScope: "/Download/WeiXin",
					navTitle:"文件选择",
					navTextColor:'#55ff00',
					navBarBgColor:'#00aaff',  
					theme:'auto',  //auto 跟随系统  light 亮色  dark 暗色 
					showHideFile:"yes",   //是否显示隐藏的文件和文件夹      
					filterConfig:{  //对象里配置的属性要同时满足   
						fileName:['base.apk','config.txt','配置文件.yaml'],  //属性数组满足其中一项
						fileSize:String(1*1024*1024),  //byte 单位：字节
						// docx文档文件，xls表格文件
						// fileExtension:['txt'],  //属性数组满足其中一项 
						fileExtension:['apk','txt','jpg','mp3','yaml','docx','xls'],
					}
				}, result => {
					console.log("状态码是：",result.code);
					  if(result.code==1001){
							uni.showModal({
								title:"需要文件访问权限",
								content:"您还未授权本应用读取文件。为保证您可以正常上传文件，请在权限设置页面打开文件访问权限（不同手机厂商表述可能略有差异）请根据自己手机品牌设置",
								confirmText:"去授权",
								cancelText:"算了",
								success(e) {
									if(e.confirm){
										// 跳转到应用设置页
										lemonjkFileSelect.gotoSetting();        
									}
								}
							})
						}
						else {
							console.log("文件是：",result);
							// this.uploadFiles(result);
							// 拿到文件上传的名称
							// 文件页面不展示
							this.file_explain = 1;
							this.filename = result.files[0].fileRealName; 
							// WebSocket 是否已经建立连接
							console.log("链接是否是断开的",this.isConnected);
							let size = '';
							uni.getFileInfo({
							    filePath: result.files[0].filePath,
							    success: function (info) {
							        // console.log('文件大小：' + info.size + '字节');  // 打印文件大小
									size = `${(info.size / 1024).toFixed(2)}kb`;
							    },
							    fail: function (err) {
							        console.error('获取文件信息失败', err);
							    }
							});
							uni.showLoading({
								title: '正在上传中，请稍后',
							})
							if (this.isConnected == true)
							{
								uni.uploadFile({
									// url:'http://192.168.2.6:8080/api/file',
									url:`${this.baseUrl}/api/file`,
									filePath: result.files[0].filePath,
									name: 'file',
									header:{
										satoken:uni.getStorageSync('token')
									},
									formData: {
										file:'file',
										uuid:this.uuid
									},
									success: (uploadFileRes) => {
										// console.log("文件上传是否成功：",uploadFileRes);
										this.biao = 1;
										let gett = JSON.parse(uploadFileRes.data);
										console.log("文件上传是否成功：",gett);
										if (gett.status == 100){
											console.log("上传成功",uploadFileRes.data);
											this.choose = 2;
											this.ImageGeneration = true;
											uni.hideLoading();
											var youobj = {
												msg:'',
												isMine:true,
												filPath:result.files[0].filePath, // 最初用于判断事先是否有已经下载过的文件
												filename:this.filename,
												fileSize:size,
												filetype:result.files[0].fileExtension,
												isUrl:true,
												Date:this.$methods.getDate()
											}
											// console.log("文件类型时：",youobj.filetype);
											this.msgBox.push(youobj)
											var myobj = {
												msg:'',
												isYour:true,
												zhuangtai:'wait for'
											}
											this.msgBox.push(myobj)
											// 接收消息
											
											this.receiveMessages();
										} else {
											uni.$u.toast('上传失败！');
											uni.hideLoading();
										}
										
									},
									fail(res) {
										uni.hideLoading();
										uni.$u.toast('网络开小差了,上传失败');
										console.log("上传失败：",res);
									}
								})
							} else {
								uni.hideLoading();
							}
						}
				})
			},
			isURL(url){
				// console.log("拿到的链接是",url);
				var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
				return regexp.test(url);
				// console.log("判断是否是链接：",regexp.test(url));
			},
			ViewingDocuments(arr){
				// console.log("此处需要展示的链接是：",fileUrl);
				console.log("该对象是：",arr);
				var fileUrl = arr.msg  //拿到要打开文件的链接
				
				if (arr.filPath != ''){
					console.log("以下载");
					uni.openDocument({
					  filePath: arr.filPath,
					  // filePath:fileUrl,
					  success: function (res) {
					    console.log('打开文档成功');
					  },
					  fail:(res)=> {
						this.document(arr);
					  }
					});
				} else {
					console.log("未下载");
					this.isDownload = 1; 
					const downloadTask = uni.downloadFile({
					  url: fileUrl,
					  success: function (res) {
						  console.log("下载成功");
					    arr.filPath = res.tempFilePath;
						console.log("文件下载之后打开需要的东西：",res.tempFilePath);
					    uni.openDocument({
					      filePath: res.tempFilePath,
					      success: function (res) {
					        console.log('打开文档成功');
					      },
						  fail(res) {
						  	console.log("打开文档失败",res);
						  }
					    });
					  },
					  fail(res) {
					  	console.log("下载失败！",res);
					  }
					});
					downloadTask.onProgressUpdate((res) => {
						console.log('下载进度' + res.progress);
						this.fileProgress = res.progress;
						if (this.fileProgress == 100){
							this.isDownload = 2;
						}
						console.log('已经下载的数据长度' + res.totalBytesWritten);
						console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
						this.fileSize = `${(res.totalBytesExpectedToWrite / 1024).toFixed(2)}kb`;
						arr.fileSize = this.fileSize;  //文件大小保存到app本地中
					});
				}
			},
			document(arr){
				this.isDownload = 1;
				var fileUrl = arr.msg;
				const downloadTask = uni.downloadFile({
				  url: fileUrl,
				  success: function (res) {
					  console.log("下载成功");
				    arr.filPath = res.tempFilePath;
					console.log("文件下载之后打开需要的东西：",res.tempFilePath);
				    uni.openDocument({
				      filePath: res.tempFilePath,
				      showMenu: true,
				      success: function (res) {
				        console.log('打开文档成功');
				      },
					  fail(res) {
					  	console.log("打开文档失败",res);
					  }
				    });
				  },
				  fail(res) {
				  	console.log("下载失败！",res);
				  }
				});
				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					this.fileProgress = res.progress;
					if (this.fileProgress == 100){
						this.isDownload = 2;
					}
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					this.fileSize = `${(res.totalBytesExpectedToWrite / 1024).toFixed(2)}kb`;
					arr.fileSize = this.fileSize;  //文件大小保存到app本地中
				});
			},
			// 拿到链接进行展示
			LoadDisplay(event){
				console.log("展示的内容是：",event);
				let markdownContent = event;
				 
				// // 使用正则表达式匹配a标签
				let regex = /<a[^>]*href="?([^">]+)"?[^>]*>(.*?)<\/a>/gim;
				let match;
				let links = [];
				 
				while ((match = regex.exec(markdownContent)) !== null) {
				    // 这里match[0]是匹配到的整个a标签，match[1]是href属性的值，match[2]是标签内的文本
				    links.push({
				        href: match[1],
				        text: match[2]
				    });
				}
				// 输出所有链接
				console.log("正则表达式：",links);
				// 获取到链接之后根据链接的地址进行判断
				// 如果是以pdf,txt等结尾的 不跳转  https://arxiv.org/pdf/2103.10360.pdf
				const downloadTask = uni.downloadFile({
				  url: links[0].href,
				  success: function (res) {
					  console.log("下载成功");
				    var filePath = res.tempFilePath;
				    uni.openDocument({
				      filePath: '_doc/uniapp_temp_1711606925108/download/c.xlsx',
				      showMenu: true,
				      success: function (res) {
				        console.log('打开文档成功');
				      },
					  fail(res) {
					  	console.log("打开文档失败",res);
					  }
				    });
				  },
				  fail(res) {
				  	console.log("下载失败！",res);
				  }
				});
				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},
			listName(event){
				console.log("当前选中的值是：",event.value[0]);
				console.log("表中的数据是：",this.columns[0]);
				// this.columns[0].push('朝鲜');
				console.log("新增之后的数组数据是：",this.columns[0]);
				console.log("数据类型是：",typeof(this.columns[0]));
				this.projectName = event.value[0];
				this.show = false;
			},
			addCustomer(){
				console.log("新增客户");
				this.show = false;
				uni.navigateTo({
					url:'/pages/AddCustomer/AddCustomer'
				})
			},
			// 产品报价时，页面的服务人名和项目名称，还有被禁颜色的设置
			newContent(foundItemm){
				let chatSession = uni.getStorageSync('ChatSession');
				const foundItem = chatSession.find(item => item.uuid === this.uuid);
				foundItem.name = ''; // 标识当前项目是否有名字
				foundItem.projectName = '点击'; // 标识当前项目是否有名称
				// 当前显示页面新增人物名称和项目名称
				if (this.projectName != '点击'){
					foundItem.projectName = this.projectName;  // 人名
					if (!foundItem.colorss){
						const colors = ['#9bbfbf', '#879ffa', '#c0d99b', '#c0bf92', '#7f89db'];
						let randomIndex = Math.floor(Math.random() * colors.length);
						foundItem.colorss = colors[randomIndex];
					}
				}
				if (this.entryname != ''){
					foundItem.name = this.entryname;  // 项目名字
				}
				// foundItem.date = this.get_Date();
				foundItem.date = this.$methods.getDate()
				uni.setStorageSync('ChatSession',chatSession)
			},
			drawTable(event,index) {
				return new Promise((resolve, reject)=>{
					const ctx = uni.createCanvasContext('myCanvas', this);
					// const tableData = this.tableData;
					const tableData = event;
					// console.log("数据是：",tableData);
					const rowHeight = 25;
					const title = "报价单"; // Title text
					const cust_name = '客户名称：王航与';
					const post_name = '项目名称：西安交通大学指定的项目';
					const titleHeight = 50; // Space reserved for the title, including padding
					const margin = 10; // Margin around the table
					const bottomPadding = 20; // Additional padding at the bottom
							
					 // 设置标题的字体样式和大小
					ctx.font = 'bold 24px Arial';
					const titleWidth = ctx.measureText(title).width;
					
					if (index == 0){
						if (tableData.length <= 6){
							this.zoomed = true
						} else {
							this.zoomed = false;
						}
					} 
					if (index == 1){
						this.zoomed = true;
					}
					const visibleRows = this.zoomed ? tableData.length : 6; // 放大时展示所有行，否则展示前5行		
					 // 计算每列的最大宽度
					 ctx.setFontSize(14); // 重置为表格数据的字体大小
					 const columnWidths = tableData[0].map((_, colIndex) => {
					     let maxWidth = 0;
					     for (let rowIndex = 0; rowIndex < tableData.length - 1; rowIndex++) { // Ignore last row for now
					         const cellText = tableData[rowIndex][colIndex];
					         const metrics = ctx.measureText(cellText);
					         if (metrics.width > maxWidth) {
					             maxWidth = metrics.width;
					         }
					     }
					     return maxWidth + 20; // 增加一些边距
					 });
					 const contentWidth = columnWidths.reduce((sum, width) => sum + width, 0) + 2 * margin;
					 const contentHeight = visibleRows * rowHeight + titleHeight + bottomPadding; // Calculate without last row
							
					 // 缩放比例和居中调整
					 const widthScale = this.maxCanvasWidth / contentWidth;
					 const heightScale = this.maxCanvasHeight / (contentHeight + bottomPadding); // Include bottom padding in scale calculation
					 const scale = Math.min(widthScale, heightScale);
					 const offsetX = (this.maxCanvasWidth - contentWidth * scale) / 2;
					 const offsetY = (this.maxCanvasHeight - (contentHeight + bottomPadding) * scale) / 2;
							
					 ctx.clearRect(0, 0, this.maxCanvasWidth, this.maxCanvasHeight); // 清空画布
							
					 ctx.save();
					 ctx.translate(offsetX, offsetY); // Adjust origin for drawing
					 ctx.scale(scale, scale); // Scale to fit canvas
							
					 // 居中绘制标题
					ctx.fillText(title, (contentWidth - titleWidth) / 2, 15);
					ctx.font = '10px Arial';
					ctx.fillText(cust_name, margin, 30);
					ctx.fillText(post_name,  margin, 45);
					 // 重置为表格数据的字体样式
					ctx.font = '14px Arial';
							
					 // 绘制除了最后一行之外的所有行
					 let startY = titleHeight;
					 for (let i = 0; i < visibleRows - 1; i++) {
					    let x = margin;
						for (let j = 0; j < tableData[i].length; j++) {
							const y = startY + i * rowHeight;
							const columnWidth = columnWidths[j];
							const cellText = tableData[i][j];
							ctx.strokeRect(x, y, columnWidth, rowHeight);
								
							if (j === 1 || j === 4) {
								const textWidth = ctx.measureText(cellText).width;
								ctx.fillText(cellText, x + (columnWidth - textWidth - 10), y + 20);
							} else {
								ctx.fillText(cellText, x + 10, y + 20);
							}
							x += columnWidth;
						}
					 }
							
					 // 处理最后一行“合计”
					// 处理最后一行“合计”
					let totalIndex = visibleRows - 1;
					let totalRowY = startY + totalIndex * rowHeight;
					let x = margin;
					let mergedCellWidth = columnWidths.slice(0, 4).reduce((a, b) => a + b, 0);
					ctx.strokeRect(x, totalRowY, mergedCellWidth, rowHeight);
					// 居中绘制“合计”文本
					ctx.fillText('合计：', x + (mergedCellWidth / 2 - ctx.measureText('合计：').width / 2), totalRowY + 20);
					
					// 右对齐绘制最后一列的数值
					x += mergedCellWidth;
					let finalColumnWidth = columnWidths[4];
					let finalTextWidth = ctx.measureText(tableData[totalIndex][4]).width;
					ctx.strokeRect(x, totalRowY, finalColumnWidth, rowHeight);
					// 绘制靠右的文本，预留10像素边距
					ctx.fillText(tableData[totalIndex][4], x + (finalColumnWidth - finalTextWidth - 10), totalRowY + 20);
					
							
					 ctx.restore();
							
					 const outputWidth = this.maxCanvasWidth * this.outputResolution;
					 const outputHeight = this.maxCanvasHeight * this.outputResolution;
					ctx.draw(false, () => {
						uni.canvasToTempFilePath({
							canvasId: 'myCanvas',
							x: 0,
							y: 0,
							width: this.maxCanvasWidth, // 使用最大宽度
							height: this.maxCanvasHeight, // 使用最大高度
							destWidth: outputWidth, // 输出图片的宽度
							destHeight: outputHeight, // 输出图片的高度
							fileType: 'jpg',
							success: res => {
								// this.tableImagePath = res.tempFilePath; // 设置图片路径以便显示
								// console.log('Canvas image path:', this.tableImagePath);
								uni.saveFile({
									tempFilePath: res.tempFilePath,
									success: (res) => {
										console.log("最终产生的地址是：", res);
										this.tableImagePath = res.savedFilePath;
										// return res.savedFilePath;
										resolve(res.savedFilePath);
									}
								})
							},
							fail: err => {
								console.error('canvasToTempFilePath failed:', err);
							}
						});
								
					});
				})
			},
			wrapText(ctx, text, x, y, maxWidth, lineHeight) {
				const words = text.split('');
				let line = '';
			
				for (let n = 0; n < words.length; n++) {
					const testLine = line + words[n];
					const metrics = ctx.measureText(testLine);
					const testWidth = metrics.width;
					if (testWidth > maxWidth && n > 0) {
						ctx.fillText(line, x, y);
						line = words[n];
						y += lineHeight;
					} else {
						line = testLine;
					}
				}
				ctx.fillText(line, x, y);
			},
			enlargePhoto(event){
				uni.previewImage({
					urls:[event.all_photo],
					current:event.all_photo
				})
			}
		}
	}
</script>

<style>
	@import 'animate.css';
	@import '../../CSS/CommunicationBusiness.css';
</style>



// console.log("数据是：",message.data);
// if (this.choose == true){
// 	// console.log("转换之后的数据是：",JSON.parse(message.data));
// 	let index = JSON.parse(message.data);
// 	// 此类产品不存在
// 	if (index.message == '产品未找到，可能不存在这类产品信息'){
// 		var youobj = {
// 			msg:'此类产品不存在',
// 			isYour:true,
// 			filPath:'', // 存储本地直接打开的地址
// 			isUrl:false,
// 			deviceDetails:false, 
// 			Url:'http://114.115.203.18:7788/offer/c.xlsx'  // 存储设备详情网络地址
// 		}
// 		this.msgBox.pop();
// 		this.msgBox.push(youobj)
// 		this.ImageGeneration = false;
// 		this.choose = false;
// 	} else {
// 		var youobj = {
// 			msg:'',
// 			isYour:true,
// 			filPath:'', // 存储本地直接打开的地址
// 			isUrl:false,
// 			deviceDetails:false, 
// 			price:JSON.parse(message.data),
// 			Url:'http://114.115.203.18:7788/offer/c.xlsx'  // 存储设备详情网络地址
// 		}
// 		// console.log("当前数据是：",youobj);
// 		this.msgBox.pop();
// 		this.msgBox.push(youobj)
// 		this.ImageGeneration = false;
// 		this.choose = false;
// 	}
// } else {
	// let jsonString = message.data; // 假设这里是你的 JSON 字符串
	// if (jsonString.trim().startsWith('{"')) {
	// 	let indexx = JSON.parse(message.data);
	// 	if (indexx.message == '产品未找到，可能不存在这类产品信息'){
	// 		console.log("信息是：",indexx.message);
	// 		var youobj = {
	// 			msg:indexx.message,
	// 			isYour:true,
	// 			filPath:'', // 最初用于判断事先是否有已经下载过的文件
	// 			isUrl:false
	// 		}
	// 		this.msgBox.pop();
	// 		this.msgBox.push(youobj)
	// 		this.ImageGeneration = false;
	// 	}
	// 	if (indexx.message == '操作成功'){
	// 		var youobj = {
	// 			msg:indexx.data,
	// 			isYour:true,
	// 			filPath:'', // 最初用于判断事先是否有已经下载过的文件
	// 			isUrl:true
	// 		}
	// 		this.msgBox.pop();
	// 		this.msgBox.push(youobj)
	// 		this.ImageGeneration = false;
	// 	}
	// } else {
	// 	this.msgBox[this.msgBox.length - 1].zhuangtai = ''
	// 	this.msgBox[this.msgBox.length - 1].isUrl = false;
	// 	this.ImageGeneration = false;
	// 	index += message.data;
	// 	if (index.length > 2 && !typingTimer){
	// 		typingTimer = setInterval(()=>{
	// 			if (index.length > 0){
	// 				displayedText += index.charAt(0);
	// 				this.msgBox[this.msgBox.length - 1].msg = marked(displayedText);
	// 				index = index.substring(1);
					  
	// 				// })
	// 			} else {
	// 				clearInterval(typingTimer);
	// 				typingTimer = null;
	// 			}
	// 		}, 50)
	// 	}
	// }
// }

