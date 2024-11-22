<template>
	<view>
		<view :class="file_explain ? 'input_all_1' : 'input_all'">
			<!-- box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1); min-height: 100rpx;-->
			<view :class="file_explain ? 'input_one_1' : 'input_one'" style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);" >
				<view class="input_two" >
					<!-- <image src="../static/add.png" mode="" style="height: 75%;width: 75%;opacity: 0.7;"></image> -->
					<image src="../static/yuying1.png" mode="" style="height: 80%;width: 80%;"></image>
				</view>
				<view style="width: 70%;height: 100%;display: flex;align-items: center;">
					<!-- <u--textarea 
					  v-model="input_msg"
					  placeholder="请输入内容" 
					  @confirm="sendData"
					  @focus="focusData"
					  @blur="blurData"
					  :adjustPosition="true"
					  style="font-size: 26rpx; line-height: 1.5em; max-height: calc(1.5em * 5); overflow-y: auto;"
					  clearable
					  autoHeight
					></u--textarea> -->
<!-- :focus="autofocus" -->
					<u--input
					  type="text" 
					  placeholder="请输入想要查询的内容"
					  border="surround"
					  v-model="input_msg"
					  @confirm="sendData"
					  @focus="focusData"
					  @blur="blurData"
					  
					  :adjustPosition="false"
					  clearable
					></u--input>
				</view>
				<view v-if="Isdisplay==1" class="send_icon">
					<image v-if="ImageGeneration==false && input_msg!=''" @tap="sendData" src="../static/send1.png" mode="" style="height: 80%;width: 80%;"></image>
					<image v-if="ImageGeneration==true && input_msg==''" @tap="StopReceivingData" src="../static/stop3.png" mode="" alt="Rotating Image" style="height: 65%;width: 65%;" class="rotating-image"></image>
					<image v-if="ImageGeneration==false && input_msg==''" @tap="switchState" src="../static/add.png" mode="" style="height: 80%;width: 80%;"></image>
					<!-- opacity: 0.7; -->
				</view>
				<view v-if="Isdisplay==0" class="send_icon">
					<image v-if="ImageGeneration==false && input_msg!=''" @tap="sendData" src="../static/send1.png" mode="" style="height: 80%;width: 80%;"></image>
					<image v-if="ImageGeneration==true && input_msg==''" @tap="StopReceivingData" src="../static/stop3.png" mode="" alt="Rotating Image" style="height: 65%;width: 65%;" class="rotating-image"></image>
					<image v-if="ImageGeneration==false && input_msg==''" @tap="noAdd" src="../static/add.png" mode="" style="height: 80%;width: 80%;"></image>
					<!-- opacity: 0.7; -->
				</view>
			</view>
			<!-- class="animate__animated animate__fadeInUp" -->
			<!-- v-if="file_explain == 0" -->
			<view v-if="file_explain == 0" class="animate__animated animate__fadeInUp" style="--animate-duration:200ms;height: 65%;width: 100% ;display: flex;align-items: center;justify-content: center;">
				<view style="height: 80%;width: 87%;display: flex;align-items: center;justify-content: space-around;">
					<!-- 一个数据元素 -->
					<view class="bottom_one">
						<view @tap="add" class="bottom_two">
							<image src="../static/wenjian2.png" mode="" style="height: 60%;width: 60%;"></image>
						</view>
						<view class="three_icon">文件</view>
					</view>
					<view class="bottom_one">
						<view class="bottom_two">
							<image src="../static/photo2.png" mode="" style="height: 60%;width: 60%;"></image>
						</view>
						<view class="three_icon">图片</view>
					</view>
					<view class="bottom_one">
						<view class="bottom_two">
							<image src="../static/camer2.png" mode="" style="height: 60%;width: 60%;"></image>
						</view>
						<view class="three_icon">拍照</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import index from '../uni_modules/uview-ui';
	export default {
		name:'Input',
		data() {
			return {
				file_explain:this.file_explainn,  // 是否展示文件，相册和照片等图标
				display:this.Isdisplay, // 是否展示发送功能
				ImageGeneration:this.getAnswer, // 是否已经得到回答
				input_msg:'',
				autofocus:false,
				priceAdjustment:false,
				msg:''
			};
		},
		props:['file_explainn', 'Isdisplay', 'getAnswer'],
		watch:{
			file_explainn(newVal) {
				console.log("接收到的数据是:",newVal);
				if (newVal == 0){
					this.$emit('focus', 1);
				} else {
					this.$emit('focus', 0);
				}
				this.file_explain = newVal;
			},
			getAnswer(newVal) {
				// console.log("数据是：",newVal);
				this.ImageGeneration = newVal;
			},
		},
		
		onLoad() {
			// this.KeyboardEvent();
			
		},
		mounted() {
			// console.log("最初的数据是：",this.ImageGeneration);
			this.$eventBus.$on('hello', (data)=>{
				console.log("收到了发送过来的消息：",data);
				this.input_msg = data.message;
				this.sendData(data.index);
			})
			this.$eventBus.$on('priceChange', (data)=>{
				this.autofocus = data.isTrue;
				// if (data == )
				this.msg = data.msgbox;
				this.priceAdjustment = data.isTrue;
				if (data.isTrue == true){
					this.$eventBus.$emit('isShow', false);	
				}
				// if (data == true){
				// 	this.autofocus = true;
				// }
			})
		},
		beforeDestroy() {
			this.$eventBus.$off('hello')
		},
		methods:{
			
			// KeyboardEvent(){
			// 	console.log("调用键盘上调函数是");
			// 	uni.onKeyboardHeightChange((res) => {
			// 		if (res.height > 0) { // 键盘高度大于0表示键盘可能已经弹出
			// 		    setTimeout(() => {
			// 		      // 在这里处理键盘高度变化的逻辑
			// 		      console.log('键盘高度变化:', res.height);
			// 		    }, 300); // 延迟300毫秒，确保键盘已经完全弹出
			// 		  }
			// 	});
			// },
			switchState(){
				console.log("选择", this.file_explain);
				let index = '';
				if (this.file_explain == 1){
					console.log("开始处理数据");
					index = 0;
					this.$emit('childMessage', 0);
				}
				if (this.file_explain == 0){
					// console.log("开始处理数据");
					index = 1;
					this.$emit('childMessage', 1);
				}
				if (this.file_explain != 1 && this.file_explain != 0){
					// console.log("456");
					index = 2;
					this.$emit('childMessage', 0);
				}
				this.file_explain = index;
			},
			sendData(index){
				let event = this.input_msg.trim();
				this.input_msg = event;
				console.log("选择的内容是：",index);
				console.log("价格是否进行调整：",this.priceAdjustment);
				let message = {
					message:this.input_msg,
					priceAdjustment:this.priceAdjustment,
					msg:this.msg,
					recommend_index:index
				}
				this.$emit('focus', 0);
				this.$emit('sendData', message);
				this.input_msg = '';
			},
			noAdd(){
				console.log("信息是45723：");
				this.$emit('focus', 1);
			},
			// 文件上传
			add(){
				console.log("文件选择：");
				// 存在一个判断问题，是单选还是多选
				
				const self = this;
				const lemonjkFileSelect = uni.requireNativePlugin('lemonjk-FileSelect');
				lemonjkFileSelect.showNativePicker({
				    // multi: "no", //多选，待开发，后续支持
					multi:"yes", 
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
						// fileExtension:['apk','txt','jpg','mp3','yaml','docx','xls'],
						fileExtension:['txt','docx','xls','pdf'],
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
							console.log("文件是789：",result);
							if (result.detail != '选取文件成功')return;
							this.file_explain = 1;
							self.ImageGeneration = true;
							// console.log("文件类型是：",result.files[0].fileExtension);
							this.$emit('childMessage', 1);
							this.$emit('fileMesage', result);
							// this.uploadFiles(result);
							// 拿到文件上传的名称
							// 文件页面不展示
						}
				})
			},
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
			StopReceivingData(){
				this.$emit('StopReceivingData', 1);
			},
			// 输入框聚焦时
			focusData(){
				console.log('输入框聚焦');
				this.$emit('focus', 3);
				// this.KeyboardEvent();
				// this.KeyboardEvent();
			},
			blurData(){
				// this.$emit('focus', 0)
			}
		}
	}
</script>

<style scoped>
	@import 'animate.css';
	.input_all{
		display: flex;
		align-items: center;
		flex-direction: column; 
		height:20vh;
		width: 100%;
		/* background-color: blueviolet; */
	}
	.input_all_1{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column; 
		height:7vh;
		width: 100%;
		/* background-color: chocolate; */
	}
	.input_one{
		display: flex;
		align-items: center;
		justify-content:space-around;
		width: 90%;
		/* height: 35%; */
		height: 32%;
		font-size: 30rpx;
		border-radius: 25rpx;
		/* background-color: aqua; */
	}
	.input_one_1{
		display: flex;
		align-items: center;
		justify-content:space-around;
		width: 90%;
		/* height: 60%; */
		height:90%;
		font-size: 30rpx;
		border-radius: 25rpx;
		/* background-color: cadetblue; */
	}
	.input_two{
		display: flex;
		align-items: center;
		justify-content: center; 
		width: 70rpx;
		height: 70rpx;
	}
	.bottom_one{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 25rpx;
		height: 150rpx;
		width: 150rpx;
		/* border-radius: 10rpx; */
	}
	.bottom_two{
		height: 100rpx;
		width: 100rpx;
		background-color:#F6F6F6;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
	}
	.send_icon{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70rpx;
		height: 70rpx;
	}
	.three_icon{
		/* font-weight: 700; */
		font-weight: 400;
		opacity: 0.8;
		font-size: 22rpx;
		margin-top: 10rpx;
	}
</style>