<template>
	<!-- <page-meta :keep-alive="true"></page-meta> -->
	<!-- <keep-alive> -->
	    <!-- 缓存的页面内容 -->
	<!-- scroll-top="{{max}}" calc(90vh - var(--status-bar-height) - 46px)-->
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
					<image :src="ImageUrl" mode="aspectFill" style="height: 100%;width: 100%;border-radius: 50%;"></image>
				</view>
				<view style="margin-left: 10px; height: 36px;width: 50%; display: flex;flex-direction: column;justify-content: space-around;">
					<text style="font-size: 30rpx;">{{name}}</text>
					<text style="font-size: 22rpx;opacity: 0.8;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{introduce}}</text>
				</view>
			</view>
		</view>
		<view :class="file_explain == 1 ? 'Background_bottom_1' : (file_explain == 0 ? 'Background_bottom' : 'Background_bottom_3')" :style="dynamicStyle">
			<scroll-view class="scroll-view-class" :scroll-with-animation="donghua" :scroll-top="scrollTopHeight" style="height: 98%;width: 100%;" scroll-y="true" >
				<view id="your-view-id" style="margin-left: 25rpx;margin-right: 25rpx;">
					<view class="youBox">
						<view style="padding: 25rpx 28rpx ;display: flex;flex-direction: column" class="youMsg">
							<view style="text-align: left;width: 100%;">把你心中的画面用语言描述下来，我们替你实现所想。下方是我们的绘画示例：</view>
							<view style="display: flex;flex-wrap: wrap;height: 400rpx;width: 400rpx;justify-content: space-between;align-items: center;">
								<image @tap="previewImage(item.src)" :src="item.src" style="width: 46%;height: 46%;" v-for="(item, index) in RandImage" :key="index"></image>
							</view>
						</view>
					</view>
					<view v-for="(item,index) in msgBox" :key="index">
						<view  class="youBBox" v-if="item.isYour==true" style="margin-top: 20rpx;">
							<image :src="item.src" mode="aspectFit" style="max-width: 100%;
									max-height: 100%;" @tap="previewImage(item.src)" @longtap="DownIImage(item.src)"></image>
						</view>
						<view class="youBox" v-if="item.wait==true" @longtap="deleteData(item)" style="margin-top: 20rpx;">
							<view class="youMsg" style="padding: 25rpx 28rpx;">
								{{item.msg}}
							</view>
						</view>
						<view class="myBox" v-if="item.isMine==true" @longtap="deleteData(item)" style="margin-top: 20rpx;">
							<view class="myMsg" style="padding: 15rpx; 20rpx">
								{{item.msg}}
							</view>	
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<InputVue
			@sendData="sendData" 
			@StopReceivingData="stopData"
			@focus="focusData"
			:getAnswer="ImageGeneration" 
			:file_explainn="1" 
			:Isdisplay="0"
			/>
		<!-- <view style="display: flex;flex-direction: row;align-items: center;justify-content:center; height: 10vh;width: 100%;">
			<view style="box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);display: flex;align-items: center;justify-content:space-around; width: 90%;height: 70%;font-size: 30rpx;border-radius: 25rpx;">
				<view style="display: flex;align-items: center;justify-content: center; width: 70rpx;height: 70rpx;">
					<image src="../../static/add.png" mode="" style="height: 75%;width: 75%;opacity: 0.7;"></image>
				</view>
				<view style="width: 70%;">
					<u--input
					  type="text" 
					  placeholder="请输入想要绘画的内容"
					  v-model="input_msg"
					  clearable
					  @confirm="addData"
					></u--input>
				</view>
				<view  style="display: flex;align-items: center;justify-content: center; width: 70rpx;height: 70rpx;">
					<image @tap="addData" v-if="ImageGeneration==false" src="../../static/send.png" mode="" alt="Rotating Image" style="height: 80%;width: 80%;"></image>
					<image v-if="ImageGeneration==true" src="../../static/painting/jiazai.png" mode="" alt="Rotating Image" style="height: 70%;width: 70%;" class="rotating-image"></image>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import InputVue from '../../components/Input.vue';
	export default {
		data() {
			return {
				ImageGeneration:'',  // 判断图片是否生成
				input_msg:'', // 输入框的内容
				msgBox:[],
				viewheight:'',
				load:0,
				scrollTopHeight:0,
				RandImage:[    // 最开始图片的展示
					{
						src:require('../../static/painting/mj16998593575246042.png')
					},
					{
						src:require('../../static/painting/yourImageName (22).jpg')
					},
					{
						src:require('../../static/painting/yourImageName (23).jpg')
					},
					{
						src:require('../../static/painting/yourImageName (24).jpg')
					},
				],
				get:'https://aiplus.pub/oldfile/mj66458506973324623.png',
				uuid:'',
				paintin_msg:'', // 用于提示绘图处在什么阶段
				donghua:'',
				ChatPainting:{   // 类别
					name:'达芬奇',
					total:'智能绘画',
					time:'2024年4月9日',
					message:'输入你的画面关键字，我将帮你完成灵感创作',
					color:'#7f89db',
					uuid:''   	// 该聊天记录唯一标识符
				},
				ChatSession:[],
				file_explain:0,
				keyboardHeightt:0,
				
				timer:null, // 绘画循环
			}
		},
		components:{
			InputVue,
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
		watch: {
		  msgBox: {
		    deep: true,
		    handler: 'scrollToBottom',
		  },
		},
		mounted() {
		},
		onLoad(options) {
			let height = uni.getSystemInfoSync().windowHeight;
			uni.onKeyboardHeightChange((res) => {
				this.keyboardHeightt = 90 - (res.height / height) * 100 - 3;
				console.log("此时的高度是：", this.keyboardHeightt);
			});
			// 接收来自已经创建的和还没有创建页面的两种方式
			if ('param' in options){
				var obj = JSON.parse(decodeURIComponent(options.param));
				// console.log("数据是：",obj);
				this.identification = obj.identification;
				this.id = obj.id;
				this.uuid = obj.uuid;
				this.name = obj.description;
				this.introduce = obj.introduce;
				this.ImageUrl = obj.imageUrl;
				
				this.donghua = false;
				this.donghua = false; // 直接渲染没有加载动画
				let box = JSON.parse(plus.storage.getItem(`${this.uuid}`));
				if (box == null){
					// console.log("数据是空的");
				} else {
					this.msgBox = box;
					console.log("绘图历史数据是：",this.msgBox);
				}
			}
		},
		onShow() {
			let Box = []
		},
		onHide() {
			setTimeout(()=>{
				console.log("页面隐藏");
			}, 1000)
		},
		onUnload() {
			console.log("数据是：",this.msgBox);
			plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			// console.log("绘画数据是：",uni.getStorageSync('ChatSession'));
			// let message = uni.getStorageSync('ChatSession');
			// let chatSession = uni.getStorageSync('ChatSession');
			// const foundItem = chatSession.find(item => item.uuid === this.uuid);
			// if (this.msgBox.length === 0){
			// 	chatSession = chatSession.filter(item => item.uuid !== foundItem.uuid);
			// 	uni.setStorageSync('ChatSession',chatSession);
			// } else {
			// 	if (foundItem){
			// 		foundItem.name = ''; // 标识当前项目是否有名字
			// 		foundItem.projectName = '点击'; // 标识当前项目是否有名称
			// 		foundItem.date = this.$methods.getDate();
			// 		uni.setStorageSync('ChatSession',chatSession)
			// 	}
			// 	plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
			// }
		  },
		methods: {
			sendData(event){
				console.log("需要发送的数据是：", event);
				// this.addData(event.message);
				this.input_msg = event.message;
				this.addData();
			},
			deleteData(event){
				uni.vibrateShort({
					success: function () {
						console.log('success');
					}
				});
				console.log("删除的信息是：", event);
				uni.showModal({
					title: '提示',
					content: '是否删除该条信息？',
					success:(res)=> {
						if (res.confirm) {
							this.msgBox = this.msgBox.filter(item => item != event)
						} else if (res.cancel) {
						}
					}
				});
			},
			stopData(){
				// this.stop_message = 1;
				// this.message_id = this.msgBox[this.msgBox.length - 1].message_id;
				// let get_message = this.msgBox[this.msgBox.length - 1].history;
				// let get_message = this.msgBox[this.msgBox.length - 1].content;
				// console.log("初始消息是：",this.msgBox[this.msgBox.length - 1].content);
				// console.log("消息是：",get_message);
				// this.msgBox[this.msgBox.length - 1].content = get_message;
				// 关闭正在生成的消息
				// uni.closeSocket();
				clearInterval(this.timer);
				console.log("此时的消息事:", this.msgBox);
				this.msgBox[this.msgBox.length-1].msg = '已取消该任务';
				// this.socketTask.close();
				this.ImageGeneration = false;
			},
			focusData(event){
				console.log("此时传递过来的数值是：", event);
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
			Jump(){
				// console.log("返回原来的页面");
				// 此时存在一个问题，以什么特效进来就要以什么特效出去
				uni.navigateBack()
			},
			addData(){
				if (this.input_msg == ''){
					uni.showModal({
						title: '提示',
						content: '数据不能为空!',
						success:(res)=> {
							if (res.confirm) {
							} else if (res.cancel) {
							}
						}
					});
					return ;
				}
				this.ImageGeneration = true;
				let that = this;
				this.donghua = true;
				var obj = {
					msg : this.input_msg,
					isMine: true,
				}
				let message = this.input_msg;
				this.input_msg = '',
				console.log("push：",obj);
				this.msgBox.push(obj);
				var waitobj = {
					msg : '上传提示语中~',
					wait: true,
				}
				this.msgBox.push(waitobj);
				let url = this.$store.state.BASE_URL; // 进行一波赋值
				// setTimeout(()=>{
				// 	waitobj.msg = '提示语上传成功，正在生成图片中，请稍后';
				// },1000)
				// this.DownloadImages('df');
				uni.request({
					url:`${url}/image/submit`,
					method:'POST',
					header:{
						satoken:uni.getStorageSync('token')
					},
					data:{
						prompt:message,
						n:1,
						style:"<anime>"
					},
					success:(res)=> {
						if (res.data.message == '操作成功'){
							console.log("操作成功返回的值是：",res);
							console.log("task_id的值是：",res.data.data.task_id);
							// 获取到任务id之后 开始查询
							let that = this;
							// this.$store.dispatch('pating',res.data.data.task_id);
							that.timer = setInterval(()=>{
								waitobj.msg = '提示语上传成功，正在生成图片中，请勿离开页面';
								uni.request({
									url:`${url}/image/task?task_id=${res.data.data.task_id}`,
									method:'GET',
									success: (res) => {
										console.log("查询成功之后的结果是：",res);
										if (res.data.status != 100){
											clearInterval(that.timer);
											this.ImageGeneration = false;
											// 做报错处理 
											uni.showModal({
												title: '提示',
												content: '图片生成失败，请重试',
												success:(res)=> {
													if (res.confirm) {
													} else if (res.cancel) {
													}
												}
											});
										}
										if (res.data.data.includes('%') == false){
											clearInterval(that.timer)
											console.log("地址是：",res.data.data[0].url);
											uni.downloadFile({
											   url: res.data.data[0].url,
											   success: (downloadResult) => {
												 if (downloadResult.statusCode === 200) {
												   console.log('Download successful:', downloadResult.tempFilePath);
													uni.saveFile({
													  tempFilePath: downloadResult.tempFilePath,
													  success: (saveResult) => {
														let localImagePath = saveResult.savedFilePath;
														console.log('Image saved to local:', localImagePath);
														console.log("显示地址是：",localImagePath);
														this.ImageGeneration = false;
														var youobj = {
															src : localImagePath,
															isYour : true,
														}
														this.msgBox.pop();
														this.msgBox.push(youobj)
													  },
													  fail: (error) => {
														this.ImageGeneration = false;
														console.error('Save file failed:', error);
													  }
													});
												 }
											   },
											   fail: (error) => {
												this.ImageGeneration = false;
												console.error('Download failed:', error);
											   }
											 });
										}
									},
									fail: (res) => {
										this.ImageGeneration = false;
										console.log("查询失败之后的结果：",res);
										clearInterval(that.timer);
										uni.showModal({
											title: '提示',
											content: '图片生成失败，请重试',
											success:(res)=> {
												if (res.confirm) {
												} else if (res.cancel) {
												}
											}
										});
									}
								})
							}, 2000)
						} else {
							this.ImageGeneration = false;
							uni.showModal({
								title: '提示',
								content: '提示语提交失败，请重试',
								success:(res)=> {
									if (res.confirm) {
									} else if (res.cancel) {
									}
								}
							});
							this.msgBox.pop();
						}
					},
					fail(res) {
						this.ImageGeneration = false;
						console.log("提交失败~",res);
						uni.showModal({
							title: '提示',
							content: '提示语提交失败，请重试',
							success:(res)=> {
								if (res.confirm) {
								} else if (res.cancel) {
								}
							}
						});
					}
				})
			},
			DownIImage(url){
				// event.stopPropagation();
				console.log("保存相册的：",url);
				    uni.saveImageToPhotosAlbum({
				        filePath: url,
				        success: () => {
				          uni.showToast({
				            title: '保存成功',
				            icon: 'success'
				          });
				        },
				        fail: (err) => {
				          console.error('保存图片失败:', err);
				          uni.showModal({
				            title: '保存失败',
				            content: '无法保存图片到相册，请检查权限或其他问题'
				          });
				        }
				      });
			},
			scrollToBottom(){
				// console.log("变动了");
				this.$nextTick(function(){
				const qquery = uni.createSelectorQuery().in(this);
				     qquery.select('.scroll-view-class').boundingClientRect((rect) => {
				       if (rect) {
				         console.log('Scroll-view 高度:', rect.height);
									  this.viewheight = rect.height;
				       }
				   }).exec();
				var query = uni.createSelectorQuery().in(this);
				      query.select('#your-view-id').boundingClientRect(data => {
				        if (data) {
						  let top = data.height - this.viewheight;
						  if (top>0){
							  console.log("上升的高度是：",top);
								this.scrollTopHeight = top;
						  }
				        }
				      }).exec();
					  })
			},
			previewImage(url){
				console.log("放大链接是：",url);
				 uni.previewImage({
						urls: [url], // 需要预览的图片链接列表
						current: url // 当前显示图片的链接
					});
					// _doc/uniapp_save/17181576452620.png
			},
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
		}
	}
</script>

<style lang="scss">
	.rotating-image{
		animation: spin 2s linear infinite;
	}
	$font-family: '思源黑体Regular';
	$line-height: 1.5;
	$letter-spacing: 0.6px;
	$font-size: 30rpx;
	
	@keyframes spin {
	  from {
	    transform: rotate(0deg);
	  }
	  to {
	    transform: rotate(360deg);
	  }
	}
	@mixin flex($layout, $layin) {
		display: flex;
		align-items: $layout;
		justify-content: $layin;
	}
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
		background-color: rgb(246, 246, 246);
	}
	.top{
		@include flex(center, center);
		// height: 90vh;
		// height: calc(90vh - var(--status-bar-height) - 46px);
		width: 100%;
		// background-color: cadetblue;
	}
	.Background_bottom{
		@include flex(center, center);
		// height: 90vh;
		// height: calc(90vh - var(--status-bar-height) - 46px);
		width: 100%;
	}
	.Background_bottom_1{
		@include flex(center, center);
		// height: 90vh;
		// height: calc(90vh - var(--status-bar-height) - 46px);
		width: 100%;
	}
	.Background_bottom_3{
		@include flex(center, center);
		// height: 90vh;
		// height: calc(90vh - var(--status-bar-height) - 46px);
		width: 100%;
	}
	.youBBox{
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		height: 400rpx;
		width: 400rpx;
	}
	.youBox{
	  display: flex;
	  justify-content: flex-start;
	  line-height: 19px;
	  }
	.youMsg{
		display:flex;
		align-items: center;
		white-space: pre-wrap;
		max-width: 80vw;
		/* font-family:Arial; */
		// font-family: '思源黑体Regular';
		font-size: $font-family;
		word-break: break-all;
		background-color:#F6F6F6;
		border-radius: 25rpx 25rpx 25rpx 0;
		// line-height: 1.5;
		line-height: $line-height;
		// letter-spacing: 0.6px;
		letter-spacing: $letter-spacing;
		// font-size: 30rpx;
		font-size: $font-size;
	}
	.myBox{
	  display: flex;
	  justify-content: flex-end;
	  align-items: flex-start;
	  // margin-right: 20rpx;
	  margin-bottom: 20rpx;
	  /* margin-top: 20rpx; */
	  /* overflow-anchor:none */
	  /* padding-top: 20rpx; */
	}
	.myMsg{
	  display: flex;
	  align-items: center;
	  // font-family: '思源黑体Regular';
	  font-family: $font-family;
	  white-space: pre-wrap;
	  max-width: 520rpx;
	  /* background-color: #95EC69; */
	  background-color:#5ECDBA;
	  border-radius: 25rpx 25rpx 0 25rpx;
	  padding: 10rpx;
	  // line-height: 1.5;
	  line-height: $line-height;
	  text-align: justify;
	  letter-spacing: $letter-spacing;
	  font-size: $font-size;
	}
</style>
