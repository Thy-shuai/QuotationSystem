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
				<view style="display: flex;align-items: center;border-radius: 50%; justify-content: center; height: 42px;width: 42px;background-color:cadetblue">
					<image :src="ImageUrl" mode="aspectFill" style="height: 100%;width: 100%;border-radius: 50%;"></image>
				</view>
				<view style="margin-left: 10px; height: 36px;width: 50%; display: flex;flex-direction: column;justify-content: space-around;">
					<text style="font-size: 30rpx;font-weight: 600;">{{name}}</text>
					<text style="font-size: 22rpx;opacity: 0.8;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{introduce}}</text>
				</view>
			</view>
		</view>
		
		<!-- :class="file_explain ? 'Background_bottom_1' : 'Background_bottom'" -->
		<view :class="file_explain == 1 ? 'Background_bottom_1' : (file_explain == 0 ? 'Background_bottom' : 'Background_bottom_3')" :style="dynamicStyle" @tap="ttt">
			<view style="height: 200px; width: 86%;background-color: blue;visibility: hidden; position: absolute; top: -9999px;">
				<!-- @click="toggleZoom" visibility: hidden; position: absolute; top: -9999px;-->
				<canvas canvas-id="myCanvas" style="width: 100%; height: 100%;"></canvas>
			</view>
			<!-- :scroll-with-animation="true" style="height: 96%;width: 100%;"-->
			<scroll-view :scroll-top="scrollTopHeight" :scroll-with-animation="donghua" scroll-y="true" class="mmm">
				<view id="your-view-id">
					<view class="youBox" style="margin-bottom: 20rpx;">
						<view selectable="true" class="youMsg" style="padding: 25rpx 28rpx;">
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
									<!-- <rich-text :nodes="item.msg" :selectable="true" v-if="item.isUrl==false" class="youMsg" style="font-size: 30rpx;letter-spacing: 4rpx;"></rich-text> -->
									<view class="youMsg" style="display: flex;flex-direction: column;" >
										<view style="font-size: 30rpx;letter-spacing: 0.6rpx;" class="rich-text-container" v-if="item.single_produce==true">{{item.price}}</view>
										<view v-if="item.single_produce==false" class="rich-text-container">
											<text class="titleLanguage" style="text-align: justify;line-height: 1.8;letter-spacing: 1px;">{{item.bottom_top}}</text>
											<!-- 具体的文件输入 -->
											<view v-if="item.little_photo!=''" class="animate__animated animate__fadeIn" style="width: 100%; height: 200px; display: flex; align-items: center; justify-content: center;padding-bottom: 20rpx;">
												<image :src="item.little_photo" @tap="enlargePhoto(item)"  style="width: 100%; height: 100%;"></image>
											</view>
											<view class="ExplanatoryLanguage">
												<view class="ExplanatoryLanguage_text">1719559548737_2_1-1-001-询价标配.xlsx</view>
												<!-- {{item.bottom_bottom}} -->
												<!-- 时间日期 -->
												<view style="width: 20%;height: 100%;">
													<image v-if="item.isdisplayed==true" src="../../static/xlsx.png" @tap="check_url(item)" mode="aspectFill" class="animate__animated animate__fadeIn" style="height: 100rpx;width: 100rpx;"></image>
												</view>
												
											</view>
										</view>
									</view>
								</view>
								<view v-if="item.msg!=''" @longtap="explay(item)" style="position: relative;">
									<view v-if="item.dataHandle==1" style="position: absolute;top:-50px;left: 20px ;z-index: 99;">
										<CheckboxTextVue
											direction="1"
											:message="item.history" 
											:deletedataa="item" 
											@replydisplay="item.dataHandle=0"
											@deletemsg="deletemsg"
										/>
									</view>
									<rich-text :nodes="item.msg" v-if="item.isUrl==false" class="youMsg" style="padding-bottom: 0;"></rich-text>
									<!-- <view style="font-size: 33rpx;width: 560rpx;text-align: right;">数据来源</view> -->
								</view>
							</view>
							
						</view>
						
						<view class="myBox" v-if="item.isMine==true">
							<view v-if="item.isDownload==3" style="display: flex;height: 100%;width: 50rpx;" @tap="AgainUpload(item)">
								<image src="../../static/fileup.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
							</view>
							<view v-if="item.isUrl==true" @tap="ViewingDocuments(item)" @longtap.stop="deleteMessage(item)" class="myexcel">
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
									<view style="display: flex;align-items: center;height: 25%;width: 84%; margin-left: 22rpx;">
										<view v-if="item.progress == 100">
											<text style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / {{item.titleOfpeople}}</text>
										</view>
										<view v-if="item.progress!= 100" style="width: 100%;">
											<text v-if="item.isDownload==0" style="font-size: 20rpx;opacity: 0.6;">0 / 未上传</text>
											<u-line-progress v-if="item.isDownload==1" :percentage="item.progress" height="7"></u-line-progress>
											<text v-if="item.isDownload==2" style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已上传</text>
											<text v-if="item.isDownload==3" style="font-size: 20rpx;opacity: 0.6;">{{item.uploadfalse}}</text>
											<!-- <text v-if="item.isDownload==3" style="font-size: 20rpx;opacity: 0.6;">上传失败请重试</text> -->
										</view>
									</view>
								</view>
							</view>
							<view style="font-size: 33rpx;position: relative;" @longtap.stop="explay(item)" class="myMsg" v-if="item.isUrl==false">
								<view v-if="item.dataHandle==1" style="position: absolute;top:-120rpx;right: 10rpx ;z-index: 99;">
									<CheckboxTextVue
										direction="0" 
										:message="item.message1" 
										:deletedataa="item" 
										@replydisplay="item.dataHandle=0"
										@deletemsg="deletemsg"
									/>
								</view>
								<view class="rich-text-container" style="padding: 15rpx 20rpx;font-size: 30rpx;letter-spacing: 0.6px;line-height: 1.5;">{{item.message1}}</view>
							</view>
						</view>
					</view>
				</view>
				<view id="target-id"></view>
			</scroll-view>
		</view>
		
		<!-- <view style="position:fixed;bottom: 200rpx;left: 20rpx;height: 150rpx;width: 150rpx;">
				<image src="../../static/girls.png" mode="" style="position: absolute;height: 100%;width: 100%;"></image>
		</view> -->
		<!-- @fileMesage="sendFile" -->
		<InputVue
			@childMessage="file_explainMessage" 
			@sendData="addData" 
			@fileMesage="sendFile"
			@StopReceivingData="stopData"
			@focus="focusDataa"
			:getAnswer="ImageGeneration" 
			:file_explainn="file_explain" 
			:Isdisplay="1"
			/>
		<!-- <view style="position: absolute;z-index: 99;bottom: 10px;height: 100px;width: 100px;font-size: 30rpx;">你好</view> -->
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
	// import calculateSum from '../../api/api.js'
	// import marked from '../../api/marked.min.js'
	export default {
		data() {
			return {
				history:[], // 历史及记录
				
				stop_message:0, 
				typingTimer : null,  // 定时器
				displayedText : '',  // 文本中转
				
				ImageUrl:'', // 头像
				name:'', // 名字
				introduce:'', // 介绍
				
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
				entryname:'', // 
				donghua:'',  // 是否有滑动动画
				fileSize:0,  // 当前文件的大小
				isDownload:0,  // 是否处理下载的状态
				fileProgress:0,  // 文件下载进度
				filename:'', // 上传文件的名称
				fileUploaded:'',  // 判断是否有文件上传
				myUUID:'376ccc85-c515-413a-80a0-a8cacab2d1a3',  // 单个窗口的uuid
				isConnected:'', //websocket是否建立链接
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
				ImageGeneration:'',  // 用于检测回答正在生成中~ 回答一致性
				baseUrl:'', // 基本链接
				detailedIntroduction:'',
				socketTask:null,
				Istextanswer:false,
				
				biaoji : 1,
				index : '',
				indexSize : '',
				typingTimer : null,  // 定时器
				displayedText : '',  // 文本中转
				end : '',
				is_doc : false,   // 获取的值是否是doc
				historyy : '', // 用于记录历史数据
				obbj:'',
				getMsg:'',
				
				keyboardHeightt:''
			}
		},
		components:{
			InputVue,
			CheckboxTextVue
		},
		mounted() {
			console.log("设备的安卓ID是：",this.$methods.checkPermission());
			// console.log("当前结果调用:",this.$methods.login());
			// console.log("当前时间是：",this.$methods.getDate());
			const systemInfo = uni.getSystemInfoSync();
			// console.log("手机设备的唯一标识符：",systemInfo.deviceId); // 这是设备的唯一标识符
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
			},
			dynamicStyle() {
			     const statusBarHeight = 'var(--status-bar-height)';
			     if (this.file_explain === 1) {
			       return {
			         height: `calc(90vh - ${statusBarHeight} - 0.46rem)`,
			       };
			     } else if (this.file_explain === 0) {
			       return {
			         height: `calc(80vh - ${statusBarHeight} - 0.46rem)`,
			       };
			     } else {
			       return {
			         height: `calc(${this.keyboardHeightt}vh - ${statusBarHeight} - 0.46rem)`,
			       };
			     }
			}
		},
		watch: {
		// 当msgbox被修改时调用scrolltoBottom函数
		  msgBox: {
		    deep: true,
		    handler: 'scrollToBottom',
		  },
		  isConnected(newData, oldData){
			  // websocket失败，重新连接
			  console.log("websocket链接变化：",newData);
			  if (newData == false){
				  this.isConnected = false;
				  let timer = setInterval(()=>{
					if (this.isConnected != true){
						this.initWebSocket();
						console.log("开始重连ing");
					} else {
						clearInterval(timer)
					}
				  },2000)
			  }
		  },
		},
		onLoad(options) {
			console.log("token：",uni.getStorageSync('token'));
			let height = uni.getSystemInfoSync().windowHeight;
			uni.onKeyboardHeightChange((res) => {
				this.keyboardHeightt = 90 - (res.height / height) * 100 + 3;
				// this.keyboardHeightt = 90 - (res.height / height) * 100 + 3;
				console.log("此时的高度是：" , this.keyboardHeightt);
			});
			if ('param' in options){
				var obj = JSON.parse(decodeURIComponent(options.param));
				console.log("obj的值是：",obj);
				this.ImageUrl = obj.imageUrl;
				this.name = obj.description;
				this.introduce = obj.introduce;
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
				this.donghua = false; // 直接渲染没有加载动画
				let box = JSON.parse(plus.storage.getItem(`${this.uuid}`));
				if (box == null){
					// console.log("数据是空的");
				} else {
					this.msgBox = box;
					console.log("传递过来的数据是：",this.msgBox);
				}
			}
			this.baseUrl = this.$store.state.BASE_URL;
			setTimeout(()=>{
				this.initWebSocket();
			}, 1)
		},
		onShow(){
			// console.log("转换后的数据是：",this.$methods.convertData(inputData));
			// this.$methods.ReadExcel();
			// console.log("token的值是：",uni.getStorageSync('token'));
			// this.$methods.ReadExcel('http://114.115.203.18:7788/offer/c.xlsx');
			let list_name = uni.getStorageSync('itemArr');
			for (let i = 0;i<list_name.length;i++){
				this.columns[0].push(list_name[i].name)
			}
		},
		onUnload() {
			// this.isConnected = true;
			this.socketTask.close();
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
			// 	console.log("页面销毁");
			// 	uni.closeSocket();
			// 	this.socketTask = null;
			// 	plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			// }
		},
		methods: {
			showToastAtTouchPosition(e){
				console.log("手指点击的地方：",e);
				const touch = e.touches[0]; // 获取触摸点信息
				const x = touch.clientX; // 触摸点的X坐标
				const y = touch.clientY; // 触摸点的Y坐标
			},
			// redisplay(){
			// 	let lenght = this.msgBox.length;
			// 	for (let i = 0; i < lenght; i++){
			// 		if (this.msgBox[i].dataHandle != 0)this.msgBox[i].dataHandle = 0;
			// 	}
			// },
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
			focusDataa(event){
				console.log("此时传递过来需要修改的消息是：", event);
				this.scrollToBottom();
				this.donghua = true;
				if (event == 3){
					this.file_explain = 3;
					this.scrollToBottom();
					setTimeout(()=>{
						this.focues = true;
					}, 5)
				}
				if (event == 1){
					this.scrollToBottom();
					// this.file_explain = 3;
					setTimeout(()=>{
						this.focues = true;
					}, 5)
				}
				if (event == 0){
					this.scrollToBottom();
					setTimeout(()=>{
						this.focues = false;
					}, 5)
				}
			},
			addData(event){
				console.log("输入内容是：",event);
				// 目前支持的内容
				this.file_explain = 1;
				// this.$methods.promptBox('目前只支持文件上传功能');
				// this.input_msg = '';
				// return ;
				this.stop_message = 0;
				this.input_msg = event.message;
				this.donghua = true;
				if (this.input_msg == ''){
					// console.log("输入为空！");
					uni.$u.toast('输入为空');
					return ;
				}
				if (this.isConnected == false){
					uni.$u.toast('网络未连接');
					return ;
				}
				let myMsg = this.input_msg;
				this.getMsg = myMsg;
				console.log("历史记录是：", this.history);
				console.log("输入的信息是：",myMsg);
				this.ImageGeneration = true;
				// 正常的输入
				var myobj = {
					message1: this.input_msg,
					isMine:true,
					isUrl:false,
					dataHandle:0,
					// Date:this.get_Date()
					Date:this.$methods.getDate()
				}
				this.msgBox.push(myobj)
				this.input_msg = '';
				var myobj = {
					msg:'',
					isYour:true,
					zhuangtai:'wait for',
					dataHandle:0
				}
				this.msgBox.push(myobj);
				// let indexxx = [];
				if (this.isConnected == true){

					uni.request({
						url:`${this.baseUrl}/api/knowledge_base_chat`,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						},
						data:{
							query:myMsg,
							data:this.history,
							uuid:this.uuid
						},
						success: (res) => {
							console.log("成功：",res);
							if (res.data.status != 100){
								this.ImageGeneration = false;
								uni.$u.toast('请重试');
								return ;
							}
							this.donghua = false;
							// this.choose = 2;
							this.Istextanswer = true; // 是文字回答
							var obbj = {
								msg:'',
								isYour:true,
								isUrl:false,
								zhuangtai:'',
								history:'',
								dataHandle:0
							}
							this.obbj = obbj;
							this.biaoji = 1;
							this.ImageGeneration = true;
							this.index = '';
							this.indexSize = '';
							this.typingTimer = null;
							this.end = '';
							this.is_doc = false;
							this.historyy = '';
							// let biaoji = 1;
							// let index = '';
							// let indexSize = '';
							// let typingTimer = null;  // 定时器
							// let displayedText = '';  // 文本中转
							// let end = '';
							// let is_doc = false;   // 获取的值是否是doc
							// let history = ''; // 用于记录历史数据
							// this.socketTask.onMessage((message)=>{
							// 	console.log("传递过来的数据是：",message.data);
							// 	if (this.stop_message == 1)return;
							// 	if (message.data != '' && biaoji ==1){
							// 		// obbj.content = '';
							// 		this.msgBox.pop();
							// 		this.msgBox.push(obbj);
							// 		biaoji--;
							// 	}
							// 	let temporaryMessage = '';
							// 	if (!message.data.includes('data')){
							// 		console.log("结尾时：",message.data);
							// 		if (message.data == `/end${this.uuid}`){
							// 			temporaryMessage = message.data;
							// 			is_doc = false;
							// 		}
							// 		if (is_doc == true){
							// 			obbj.from_data = obbj.from_data+message.data;
							// 		}
							// 	} else {
							// 		let name = JSON.parse(message.data.split('data:')[1]);
							// 		console.log("关键之是：", Object.keys(name)[0]);
							// 		if (Object.keys(name)[0] == 'answer'){
							// 			temporaryMessage = name.answer;
							// 		} else {
							// 			// temporaryMessage = name.docs;
							// 			is_doc = true;
							// 			obbj.from_data = name.docs;
							// 			// temporaryMessage = '';
							// 		}
							// 	}
							// 	obbj.history += temporaryMessage;
							// 	history += temporaryMessage;
							// 	index += temporaryMessage;
							// 	indexSize = index;
							// 	// obbj.history += index;
							// 	if (index.length > 2 && !typingTimer){
							// 		typingTimer = setInterval(()=>{
							// 			if (index.length > 0){
							// 				displayedText += index.charAt(0);
							// 				this.introde_bottom = displayedText;
							// 				// const regex = /<pre><code class="(\w+)">([\s\S]*?)<\/code><\/pre>/gi;
							// 				// let match;
							// 				let highlighted = marked(displayedText);
							// 				// console.log("index的值是：",index);
							// 				// console.log("终止的值是：",`/end${this.uuid}`);
							// 				if (index == `/end${this.uuid}`){
							// 					let newData = {
							// 						role: "user",
							// 						content: myMsg,
							// 					}
							// 					let oldData = {
							// 						role: "assistant",
							// 						content: history,
							// 					}
							// 					this.history.push(newData);
							// 					this.history.push(oldData);
							// 					console.log("最后的历史记录是：",this.history);
							// 					this.ImageGeneration = false;
							// 					clearInterval(typingTimer);
							// 					typingTimer = null;
							// 					return;
							// 				}
							// 				if (this.stop_message == 0){
							// 					obbj.msg = highlighted;
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
							// uni.onSocketMessage((message)=>{
							// 	console.log("拿到的处理数据是",message.data);
								
							// });
						},
						fail: (res) => {
							console.log("发送消息失败！",res);
							this.ImageGeneration = false;
							uni.$u.toast('请重试');
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
				this.socketTask = uni.connectSocket({
					url:`${this.$store.state.WebSocket_URL}/websocket/${this.uuid}`,
					success(res) {
						// console.log("成功：",res);
					},
					fail(res) {
						// console.log("链接失败！",res);
					}
				});
				this.socketTask.onOpen((res)=>{
					self.isConnected = true;
					console.log("WebSocket连接已打开！",res);
				});
					
				this.socketTask.onMessage((message)=>{
					console.log("websocket收到的数据是：",message.data);
					// 文字询问的回答
					if (this.Istextanswer == true){
						if (this.stop_message == 1)return;
						if (message.data != '' && this.biaoji == 1){
							// obbj.content = '';
							this.msgBox.pop();
							// console.log("上传信息：", this.obbj);
							this.msgBox.push(this.obbj);
							console.log("最终呈现的数据是：", this.msgBox);
							this.biaoji--;
						}
						let temporaryMessage = '';
						// console.log("数据是：",this.msgBox[this.msgBox.length-1].msg);
						if (!message.data.includes('data')){
							// console.log("结尾时：",message.data);
							if (message.data == `/end${this.uuid}`){
								temporaryMessage = message.data;
								this.is_doc = false;
							}
							if (this.is_doc == true){
								this.msgBox[this.msgBox.length-1].from_data = this.msgBox[this.msgBox.length-1].from_data+message.data;
							}
						} else {
							let name = JSON.parse(message.data.split('data:')[1]);
							// console.log("关键之是：", Object.keys(name)[0]);
							if (Object.keys(name)[0] == 'answer'){
								temporaryMessage = name.answer;
							} else {
								// temporaryMessage = name.docs;
								this.is_doc = true;
								this.msgBox[this.msgBox.length-1].from_data = name.docs;
								// temporaryMessage = '';
							}
						}
						this.msgBox[this.msgBox.length-1].history += temporaryMessage;
						this.historyy += temporaryMessage;
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
										let newData = {
											role: "user",
											content: this.getMsg,
										}
										let oldData = {
											role: "assistant",
											content: this.historyy,
										}
										this.history.push(newData);
										this.history.push(oldData);
										console.log("最后的历史记录是：",this.history);
										this.ImageGeneration = false;
										clearInterval(this.typingTimer);
										this.typingTimer = null;
										return;
									}
									if (this.stop_message == 0){
										this.msgBox[this.msgBox.length-1].msg = highlighted;
										console.log("上传的数据是：", highlighted);
									} else {
										this.ImageGeneration = false;
										clearInterval(this.typingTimer);
										this.typingTimer = null;
										return;
									}
									// if (this.stop_message != 1)obbj.content = highlighted;
									// || index == end
									this.index = this.index.substring(1);
								} else {
									clearInterval(this.typingTimer);
									this.typingTimer = null;
								}
							}, 50)
						}
					}
					// 上传文件的回答
					if (this.Istextanswer == false){
						let index = JSON.parse(message.data);
						console.log("得到的数据是：",index);
						this.ImageGeneration = false;
						if (index.status == 200){
							let indexx = JSON.parse(index.message);
							this.msgBox.forEach(item => {
								if (item.uuid == indexx.index){
									item.titleOfpeople = indexx.msg;
								}
							})
						} else {
							let indexx = JSON.parse(index.message);
							this.msgBox.forEach(item => {
								if (item.uuid == indexx.index){
									item.progress = 0;
									item.isDownload = 3;
									item.success = false;
									console.log("数据是：",indexx.msg);
									item.uploadfalse = indexx.msg;
								}
							})
						}
					}
				});
				this.socketTask.onError((error)=>{
					console.log("WebSocket链接打开失败，请检查！",error);
					// this.isConnected = false;
					self.isConnected = false;
				})
				this.socketTask.onClose(function (res) {
					console.log('WebSocket 已关闭！');
					self.isConnected = false;
					// this.isConnected = false;
					console.log("此时websocket的链接是：",self.isConnected);
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
			photo_camer(){
				console.log("直接拍照片");
				uni.$u.toast('暂未开通此功能');
				// uni.chooseImage({
				// 	count:1,
				// 	sizeType:['original'],
				// 	sourceType:['album'],
				// 	success: (chooseImageRes) => {
				// 		const tempFilePaths = chooseImageRes.tempFilePaths;
				// 		console.log("图片是：",tempFilePaths);
				// 	}
				// })
			},
			// 文件上传
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
							// this.isConnected = false;
							// this.uploadFiles(result);
							// 拿到文件上传的名称
							
							result.files.forEach(File => {
								this.uploadFiles(File)
									.then(isActive => {
										console.log("文件上传是否成功:",isActive);
									})
									.catch(Error =>{
										console.log("文件上传失败原因：",Error);
										this.$methods.promptBox(Error)
									})
							})
							// 文件页面不展示
							this.file_explain = 1;
							this.filename = result.files[0].fileRealName; 
							// WebSocket 是否已经建立连接
							// console.log("链接是否是断开的",this.isConnected);
							let size = '';
						}
				})
			},
			uploadFiles(event){
				return new Promise((resolve, reject) => {
					// 是否支持该文件格式
					if (event.fileExtension != 'txt' && event.fileExtension != 'xlsx' && event.fileExtension != 'docx' && event.fileExtension != 'doc'){
						reject('不支持此格式');
						uni.$u.toast(`不支持${event.fileExtension}格式文件`);
						return;
					}
					this.ImageGeneration = true;
					if (event.fileSize > 0 && event.fileSize<1024){
						event.fileSize = `${event.fileSize}B`;
					}
					if (event.fileSize > 1024 && event.fileSize < 1024*1024){
						event.fileSize = `${(event.fileSize / 1024).toFixed(2)}KB`  // 保留两位小数
					}
					if (event.fileSize > 1024*1024){
						event.fileSize = `${(event.fileSize / (1024*1024)).toFixed(2)}MB`  // 保留两位小数
					}
					let uuid = require('uuid');
					let myUUID = uuid.v4();  // 生成一个新的uuid
					var youobj = {
						isMine:true,
						filPath:event.filePath, // 最初用于判断事先是否有已经下载过的文件
						filename:event.fileName,
						fileSize:event.fileSize,
						filetype:event.fileExtension,
						isUrl:true,
						progress:0,
						isDownload:'',
						success:'',  // 用来防止上传失败之后执行onProgressUpdate函数
						uuid:myUUID, // 用于标记是第几个文件
						titleOfpeople:'', // 用于显示文件处理的状态
						uploadfalse:'' //
					}
					youobj.success = true;
					this.msgBox.push(youobj);
					youobj.isDownload = 0;
					console.log("文件是：",event);
					// /api/KnowledgeUpload  post   参数  file   uuid  知识库文件上传
					
					const uploadTask = uni.uploadFile({
						// url: `${this.baseUrl}/team/BaseKnowledgeUpload`,
						url: `${this.baseUrl}/api/KnowledgeUpload`,
						filePath: event.filePath,
						name: 'file',
						header: {
							satoken: uni.getStorageSync('token')
						},
						formData: {
							index: youobj.uuid,  // 用于唯一标识文件
							file: 'file',
							uuid: this.uuid
						},
						success: (res) => {
							console.log("上传成功", res);
							let ress = JSON.parse(res.data);
							console.log("转码之后的数据时：",ress);
							if (ress.status == 100){
								youobj.progress = 100;
								youobj.isDownload = 2;
								youobj.success = true;
								youobj.titleOfpeople = ress.data;
								this.ImageGeneration = true;
								this.Istextanswer = false;
								resolve('成功');
								// uni.onSocketMessage((message)=>{
								// 	console.log("拿到的文件处理数据是：",message.data);
								// 	let index = JSON.parse(message.data);
								// 	console.log("得到的数据是：",index);
								// 	if (index.status == 200){
								// 		let indexx = JSON.parse(index.message);
								// 		youobj.titleOfpeople = indexx.msg;
								// 		// this.msgBox.forEach(item => {
								// 		// 	if (item.uuid == indexx.index){
								// 				// item.titleOfpeople = indexx.msg;
								// 		// 	}
								// 		// })
								// 	} else {
								// 		let indexx = JSON.parse(index.message);
								// 		youobj.uploadfalse = indexx.msg;
								// 		// this.msgBox.forEach(item => {
								// 		// 	if (item.uuid == indexx.index){
								// 		// 		item.progress = 0;
								// 		// 		item.isDownload = 3;
								// 		// 		item.success = false;
								// 		// 		console.log("数据是：",indexx.msg);
								// 		// 		item.uploadfalse = indexx.msg;
								// 		// 	}
								// 		// })
								// 	}
								// });
							} else {
								// console.log("失败1：",ress);
								// // console.log("此时下载：",youobj.isDownload);
								youobj.progress = 0;
								youobj.isDownload = 3;
								youobj.success = false;
								youobj.uploadfalse = '上传失败请重试';
								reject('文件不存在');
								// reject(ress);
							}
						},
						fail: (res) => {
							console.log("失败2：",event.fileName);
							// uni.$u.toast('文件上传失败');
							youobj.progress = 0; // 上传失败，进度条设置未0
							youobj.isDownload = 3;
							youobj.success = false;
							youobj.uploadfalse = '上传失败请重试';
							if (res.errMsg !== 'abort') { // 仅在非手动终止上传时输出错误原因
								console.log("上传失败原因：", res.errMsg);
							}
							reject(res.errMsg);
							// reject(res);
						}
					});
					
					// const uploadTask = uni.uploadFile({
					// 	// url: `${this.baseUrl}/team/BaseKnowledgeUpload`,
					// 	url: `${this.baseUrl}/team/FixPriceUpload`,
					// 	filePath: event.filePath,
					// 	name: 'file',
					// 	header: {
					// 		satoken: uni.getStorageSync('token')
					// 	},
					// 	formData: {
					// 		index: youobj.uuid,  // 用于唯一标识文件
					// 		file: 'file',
					// 		uuid: this.uuid
					// 	},
					// 	success: (res) => {
					// 		console.log("上传成功", res);
					// 		let ress = JSON.parse(res.data);
					// 		console.log("转码之后的数据时：",ress);
					// 		if (ress.status == 100){
					// 			youobj.progress = 100;
					// 			youobj.isDownload = 2;
					// 			youobj.success = true;
					// 			youobj.titleOfpeople = ress.data;
					// 			resolve('成功');
					// 		} else {
					// 			// console.log("失败1：",ress);
					// 			// // console.log("此时下载：",youobj.isDownload);
					// 			youobj.progress = 0;
					// 			youobj.isDownload = 3;
					// 			youobj.success = false;
					// 			youobj.uploadfalse = '上传失败请重试';
					// 			reject('文件不存在');
					// 			// reject(ress);
					// 		}
					// 	},
					// 	fail: (res) => {
					// 		console.log("失败2：",event.fileName);
					// 		// uni.$u.toast('文件上传失败');
					// 		youobj.progress = 0; // 上传失败，进度条设置未0
					// 		youobj.isDownload = 3;
					// 		youobj.success = false;
					// 		youobj.uploadfalse = '上传失败请重试';
					// 		if (res.errMsg !== 'abort') { // 仅在非手动终止上传时输出错误原因
					// 			console.log("上传失败原因：", res.errMsg);
					// 		}
					// 		reject(res.errMsg);
					// 		// reject(res);
					// 	}
					// });
					
					uploadTask.onProgressUpdate((res) => {
						if (youobj.success == false)return;
						// this.isDownload = 1;
						youobj.isDownload = 1;
						// console.log("上传进度：", res.progress);
						youobj.progress = res.progress;
						// console.log("isdown:",youobj.isDownload);
						// console.log("上传进度是：",youobj.progress);
						if (res.progress === 100) {
							// this.isDownload = 2;
							// youobj.isDownload = 2;
							// console.log("文件上传完成度为100%");
							return ;
						}
					});
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
					this.isDownload = 1; 
					const downloadTask = uni.downloadFile({
					  url: fileUrl,
					  success: function (res) {
					    arr.filPath = res.tempFilePath;
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
						console.log("此时的颜色是：",colors[randomIndex]);
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
			// 重新上传
			AgainUpload(event){
				console.log("重新上传的文件是：",event);
				event.success = true;
				event.isDownload = 0;
				const uploadTask = uni.uploadFile({
					url: `${this.baseUrl}/api/KnowledgeUpload`,
					filePath: event.filPath,
					name: 'file',
					header: {
						satoken: uni.getStorageSync('token')
					},
					formData: { 
						index: event.uuid,
						file: 'file',
						uuid: this.uuid
					},
					success: (res) => {
						console.log("上传成功", res);
						let ress = JSON.parse(res.data);
						console.log("转码之后的数据时：",ress);
						if (ress.status == 100){
							event.progress = 100;
							event.isDownload = 2;
							event.success = true;
							// resolve('成功');
						} else {
							// console.log("重新上传失败原因：",ress.message);
							event.progress = 0;
							event.isDownload = 3;
							event.success = false;
							this.$methods.promptBox(ress.message);
						}
					},
					fail: (res) => {
						this.$methods.promptBox(res.errMsg);
						// uni.$u.toast('文件重新上传失败');
						event.progress = 0; // 上传失败，进度条设置未0
						event.isDownload = 3;
						event.success = false;
						if (res.errMsg !== 'abort') { // 仅在非手动终止上传时输出错误原因
							console.log("上传失败原因：", res.errMsg);
						}
					}
				});
				uploadTask.onProgressUpdate((res) => {
					if (event.success == false)return ;
					// this.isDownload = 1;
					event.isDownload = 1;
					// console.log("上传进度：", res.progress);
					event.progress = res.progress;
					console.log("上传进度是：",event.progress);
					if (event.progress === 100) {
						// this.isDownload = 2;
						// youobj.isDownload = 2;
						// console.log("文件上传完成度为100%");
						return ;
					}
				});
			},
			deleteMessage(event){
				console.log("需要删除的元素是：",event);
				const self = this;
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: function (res) {
						if (res.confirm) {
							self.msgBox = self.msgBox.filter(item => item!=event)
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			sendFile(result){
				if (result.files[0].fileExtension != 'xlsx'){
					this.$methods.promptBox('定价文件上传暂时只支持excel表格');
					return ;
				}
				result.files.forEach(File => {
					this.uploadFiles(File)
						.then(isActive => {
							console.log("文件上传是否成功:",isActive);
						})
						.catch(Error =>{
							console.log("文件上传失败原因：",Error);
							this.$methods.promptBox(Error)
						})
				})
				this.ImageGeneration = false;
				// 文件页面不展示
				this.file_explain = 1;
				this.filename = result.files[0].fileRealName; 
				// WebSocket 是否已经建立连接
				// console.log("链接是否是断开的",this.isConnected);
				let size = '';
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
			file_explainMessage(event){
				this.file_explain = event;
			},
			ddd(){
				this.file_explain = 1;
				this.space = 500;
			},
			//  在页面的外围添加一个点击事件，用于取消文件展示框
			ttt(){
				let lenght = this.msgBox.length;
				for (let i = 0; i < lenght; i++){
					if (this.msgBox[i].dataHandle != 0)this.msgBox[i].dataHandle = 0;
				}
				if (this.file_explain == 1)return;
				this.file_explain = 1;
				this.space = 500;
			},
			Jump(){
				console.log("返回原来的页面");
				// 此时存在一个问题，以什么特效进来就要以什么特效出去
				uni.navigateBack()
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

