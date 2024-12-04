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
					<text style="font-size: 23rpx;color: white;" @click="show = true">{{isProjectName}}</text>
				</view>
				<view style="margin-left: 0.1rem; height: 0.36rem;width: 50%; display: flex;flex-direction: column;justify-content: space-around;">
					<u--input
					  :class="isFocus ? 'inputDefaultStyle' : 'inputFocusedStyle'"
					  type="text" 
					  placeholder="点击输入项目名称"
					  placeholderStyle="font-size: 30rpx;"
					  maxlength="10"
					  v-model="entryname"
					  @focus="focusData"
					  @blur="blurData"
					></u--input>
					<text style="font-size: 24rpx;opacity: 0.6;">产品报价</text>
				</view>
			</view>
		</view>
		<!-- <view v-if="promptTitle.isTrue==true" style="position: fixed;top: 180rpx;right: 0;left: 0;z-index: 999;">
			<u-notice-bar :text="text1" mode="closable" @close="closeNotice"></u-notice-bar>
		</view> -->
		<view style="visibility: hidden; position: absolute; top: -9999px;">
				  <canvas canvas-id="excelCanvas" :style="'width: 532rpx; height:' + canvasHeight + 'px; border: 1rpx solid #000000;'" id="excelCanvas"></canvas>
		</view>
		<u-overlay :show="isShowPrice" opacity="0.2">
			<adjustmentPrice 
				:msgbox="box" 
				:price="box.detailedPrice" 
				@exit="isShowPrice=false"
				@priceAdjustment="handlePriceAdjust"
				/>
		</u-overlay>
		<!-- :class="file_explain ? 'Background_bottom_1' : 'Background_bottom'" -->
		<!-- :class="file_explain == 1 ? 'Background_bottom_1' : (file_explain == 0 ? 'Background_bottom' : 'Background_bottom_3')" -->
		<view :class="file_explain == 1 ? 'Background_bottom_1' : (file_explain == 0 ? 'Background_bottom' : 'Background_bottom_3')" :style="dynamicStyle"  @tap="redisplay">
			<!-- <view style="height: 200px; width: 86%;background-color: blue;visibility: hidden; position: absolute; top: -9999px;">
				<canvas canvas-id="myCanvas" style="width: 100%; height: 100%;"></canvas>
			</view> -->
			<!-- <view style="visibility: hidden; position: absolute; top: -9999px;">
					  <canvas canvas-id="excelCanvas" :style="'width: 532rpx; height:' + canvasHeight + 'px; border: 1rpx solid #000000;'" id="excelCanvas"></canvas>
			</view> -->
			<!-- :scroll-with-animation="true" style="height: 96%;width: 100%;"-->
			<scroll-view :scroll-top="scrollTopHeight" :scroll-with-animation="donghua" scroll-y="true" class="mmm">
				<view id="your-view-id">
					<!-- style="margin-bottom: 20rpx;" -->
					<view class="youBox" style="margin-bottom: 35rpx;">
						<view selectable="true" style="padding: 25rpx 28rpx ;font-size: 30rpx;text-align: justify;line-height: 1.5;letter-spacing: 0.6px;font-family: '思源黑体Regular'" class="youMsg">
							{{detailedIntroduction}}
						</view>
					</view>
					<view  v-for="(item,index) in msgBox" :key="index">
						<!-- <view style="width: 100%; display: flex;justify-content: center;font-size: 20rpx;margin: 0 0 15rpx 0;">{{item.date}}</view> -->
						<view class="youBox" v-if="item.your==true" style="margin-bottom: 20rpx;">
							<!-- style="margin-top: 20rpx;" -->
							<view class="youMsg" style="border-radius: 25rpx 25rpx 0 0;" v-if="item.zhuangtai=='wait for'">
								<!-- 显示条 -->
								<LoadingDots size="8" v-if="item.waitingInformation ==''"/>
								<!-- 提示，这在队列中 -->
								<view v-if="item.waitingInformation !=''" style="display: flex;flex-direction: row;">
									{{item.waitingInformation}}
									<view style="padding-top: 30rpx;">
										<LoadingDots v-if="item.isShowDot==true" size="4"/>
									</view>
								</view>
								<!-- <view class="bubble">
									<view class="bubble__circle"></view>
									<view class="bubble__circle"></view>
									<view class="bubble__circle"></view>
								</view> -->
							</view>
							<view v-if="item.url==false">
								<!-- 第一种展示方式 -->
								<view v-if="item.msg==''">
									<!-- deleteMsgbox(item) -->
									<!-- @longtap="explay(item)" -->
									<!-- <rich-text :nodes="item.msg" :selectable="true" v-if="item.isUrl==false" class="youMsg" style="font-size: 30rpx;letter-spacing: 4rpx;"></rich-text> -->
									<!-- style="position: relative;" -->
									<view style="position: relative;" @touchstart="explay($event ,item)"  @touchcancel="handleTouchEnd"  @touchend="handleTouchEnd">
										<view v-if="item.dataHandle==1" :style="`position: fixed; top: ${touchY - 60}px; left: ${touchX}px; z-index: 99;`">
											<CheckboxTextVue
												direction="1" 
												price="1"
												:message="item" 
												:deletedataa="item" 
												@replydisplay="item.dataHandle=0"
												@deletemsg="deleteMsgbox"
											/>
										</view>
										<!-- 想要更准确的报价吗？请在界面上方填好项目名称和服务对象 -->
										<view v-if="item.single_produce==true">
											<!-- 存在一个单产品价格信息的交互 -->
											<quotationText 
												:message="item.price_file" 
												:price="item.detailedPrice" 
												:msgbox="item" 
												@adjustmentPrice="adjustmentPrice"
												type="0" 
												/>
											<view v-if="index===msgBox.length-1 && waitingForDisplay==true" style="margin-top: 10rpx;display: flex; flex-direction: column; align-items: flex-start;">
												<!-- item.promptContent -->
												<tooltipVueVue v-if="item.promptContent!=''" :message="item.promptContent" type="1"/>
												<!-- <tooltipVueVue v-if="entryname==''" message="为了获取更加准确的报价，请在界面上方填写项目名称和客户名称。" type="1"/> -->
												<tooltipVueVue message="价格有点高了" type="0" index="0"/>
												<tooltipVueVue message="价格有点低了" type="0" index="1"/>
												<tooltipVueVue message="有其他型号推荐吗" type="0" index="2"/>
											</view>
										</view>
										<view v-if="item.single_produce==false">
											<view style="margin-bottom: 10rpx;">
												<quotationText :message="item.bottom_top" :load="item.load" type="1"/>
											</view>
											<view class="youMsg" style="border-radius: 0 25rpx 25rpx 0;padding: 15rpx 28rpx 40rpx 28rpx ;background-color: #F6F6F6;transform: translateY(-25rpx);" v-if="item.little_photo!=''">
												<view class="animate__animated animate__fadeIn" style="width: 100%; display: flex;">
													<!-- {{item.networkAdress}} -->
													<!-- <image lazy-load="true" v-if="item.little_photo==''" :src="item.networkAdress" @tap="enlargePhoto(item.networkAdress)" mode="widthFix" style="width: 100%;"></image> -->
													<image lazy-load="true" :src="item.all_photo" @tap="enlargePhoto(item.all_photo)" @error="imageUrlfalse(item)" mode="widthFix" style="width: 100%;"></image>
												</view>
											</view>
											
											<view v-if="item.bottom_bottom!=''" style="transform: translateY(-25rpx);">
												<quotationDocument :item="item" :name="item.bottom_bottom"/>
											</view>
											<view v-if="index===msgBox.length-1&&item.bottom_bottom!=''" style="display: flex; flex-direction: column; align-items: flex-start;transform: translateY(-18rpx)">
												<tooltipVueVue v-if="item.promptContent!=''" :message="item.promptContent" type="1"/>
												<!-- <tooltipVueVue v-if="entryname==''" message="为了获取更加准确的报价，请在界面上方填写项目名称和客户名称。" type="1"/> -->
												<tooltipVueVue message="价格有点高了" type="0" index="0"/>
												<tooltipVueVue message="价格有点低了" type="0" index="1"/>
												<tooltipVueVue message="有其他型号推荐吗" type="0" index="2"/>
											</view>

										</view>
									</view>
									<!-- <view class="youMsg" style="display: flex;flex-direction: column;position: relative;" @longtap="explay(item)">
										<view v-if="item.dataHandle==1" style="position: absolute;top:-50px;left: 20px ;z-index: 99;">
											<CheckboxTextVue
												direction="1" 
												:message="item.bottom_top" 
												:deletedataa="item" 
												@replydisplay="item.dataHandle=0"
												@deletemsg="deleteMsgbox"
											/>
										</view>
										<view v-if="item.single_produce==true" style="font-size: 30rpx;letter-spacing: 0.6px;font-family: '思源黑体Regular'" class="rich-text-container">{{item.price}}</view>
										<view v-if="item.single_produce==false">
											<view class="titleLanguage">{{item.bottom_top}}</view>
											<view  v-if="item.little_photo!=''" class="animate__animated animate__fadeIn" style="width: 100%; height: 200px; display: flex; align-items: center; justify-content: center;">
												<image lazy-load="true" :src="item.little_photo" @tap="enlargePhoto(item)" mode="aspectFit" style="width: 100%; height: 100%;"></image>
											</view>
											<view style="display: flex;justify-content:space-between;align-items: center;height: 75%;width: 100%;">
												<view style="width: 66vw;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
													20240903视频会议设备交换大师傅士撒大苏打大夫撒旦.xlsx
												</view>
												<view style="width: 17%;height: 100%;display: flex;justify-content: flex-end;align-items: center;">
													<image lazy-load="true" v-if="item.isdisplayed==true" src="../../static/xlsx.png" mode="widthFix" class="animate__animated animate__fadeIn" style="height: auto;width: 80%;"></image>
												</view>
											</view>
											<view class="ExplanatoryLanguage" v-if="item.bottom_bottom!=''" @tap="check_url(item)" @longtap.stop="saveFile(item)">
												<view class="ExplanatoryLanguage_text" style="font-size: 26rpx;">
													20240903视频会议设备交换大师傅士撒大苏打大夫撒旦.xlsx
												</view>
												<view style="width: 17%;height: 100%;display: flex;justify-content: flex-end;align-items: center;">
													<image lazy-load="true" v-if="item.isdisplayed==true" src="../../static/xlsx.png" mode="widthFix" class="animate__animated animate__fadeIn" style="height: auto;width: 80%;"></image>
												</view>
											</view>
										</view>
									</view> -->
									<!-- <view v-if="index===msgBox.length-1&&item.bottom_bottom!=''" style="margin-top: 10rpx;display: flex; flex-direction: column; align-items: flex-start;">
										<tooltipVueVue message="这是一个长文本信息"/>
										<tooltipVueVue message="想要更准确的报价吗？请在上方填好项目名称和服务对象"/>
									</view> -->
								</view>
								<!-- @longtap.stop="explay(item)" -->
								<!-- style="position: relative;"  -->
								<view v-if="item.msg!=''" @longtap.stop="explay($event ,item)">
									<!-- :style="{ top: (touchY - offsetY) + 'px', left: (touchX - offsetY) + 'px' , zIndex: 99 }" -->
									<!-- style="position: absolute;top:-60px;left: 20px ;z-index: 99;" -->
									<view v-if="item.dataHandle==1" :style="`position: fixed; top: ${touchY - 60}px; left: ${touchX}px; z-index: 99;`">
										<CheckboxTextVue
											direction="1" 
											price="0"
											:message="item.msg" 
											:deletedataa="item" 
											@replydisplay="item.dataHandle=0"
											@deletemsg="deleteMsgbox"
										/>
									</view>
									<view v-if="item.url==false">
										<quotationText :message="item.msg" type="0"/>
										<!-- transform: translateY(-18rpx) -->
										<!-- <view v-if="index===msgBox.length-1 && waitingForDisplay==true" style="margin-top: 10rpx ;display: flex; flex-direction: column; align-items: flex-start;">
											<tooltipVueVue v-if="item.promptContent!=''||item.promptContent" :message="item.promptContent" type="1"/>
											<tooltipVueVue v-if="entryname==''" message="为了理解你的需求，获取更加准确的报价，请在界面上方填写项目名称和客户名称。" type="1"/>
											<tooltipVueVue message="价格有点高了" type="0" index="0"/>
											<tooltipVueVue message="价格有点低了" type="0" index="1"/>
											<tooltipVueVue message="有其他型号推荐吗" type="0" index="2"/>
										</view> -->
									</view>
									<!-- <rich-text :nodes="item.msg" :selectable="true" v-if="item.isUrl==false" class="youMsg" ></rich-text> -->
								</view>
							</view>
							
						</view>
							
						<view class="myBox" v-if="item.mine==true" >
							<view @longtap="deleteMsgbox(item)">
								<documentDisplay :item="item"/>
							</view>
							<!-- @longtap="deleteMsgbox(item)" -->
							<view v-if="item.url==true" @tap.stop="ViewingDocuments(item)" @longtap="deleteMsgbox(item)" class="myexcel">
								<view style="height: 75%;width: 100%;">
									<view style="display: flex;justify-content: space-around;align-items: center;height: 75%;margin-left: 20rpx;">
										<view class="fileNameText" style="font-size: 26rpx;font-family: '思源黑体Regular';">
											{{item.filename}}
										</view>
										<view style="width: 30%;height: 90%;">
											<image lazy-load="true" v-if="item.filetype=='xlsx'" src="../../static/xlsx.png"  style="height: 100%;width: 75%;"></image>
											<image lazy-load="true" v-if="item.filetype=='txt'" src="../../static/txt.png" mode="" style="height: 90%;width: 65%;"></image>
											<image lazy-load="true" v-if="item.filetype=='docx'||item.filetype=='doc'" src="../../static/WORD.png" mode="" style="height: 90%;width: 65%;"></image>
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
							<view style="display: flex;flex-direction: column;">
								<!-- @longtap.stop="explay(item)" -->
								<view style="font-size: 33rpx;position: relative;" @longtap.stop="explay($event ,item)" class="myMsg" v-if="item.url==false">
									<view class="animate__animated animate__slideInUp" style="--animate-duration:500ms;">
										<view v-if="item.dataHandle==1" style="position: absolute;top:-120rpx;right:5rpx ;z-index: 99;">
											<CheckboxTextVue
												direction="0" 
												price="0"
												:message="item.message1"
												:deletedataa="item" 
												@replydisplay="item.dataHandle=0"
												@deletemsg="deleteMsgbox"
											/>
										</view>
									</view>
									<!-- <view class="rich-text-container">{{item.message1}}</view> -->
									<view style="font-size: 30rpx;padding: 14rpx 15rpx;">{{item.message1}}</view>
					
								</view>
								<!-- 如果是文件上传就没有 display: flex;align-items: center;font-size: 22rpx;height: auto;width: 150rpx;background-color: blueviolet;">
									用户：收到-->
								<!-- <view style="display: flex;align-items: center;font-size: 22rpx;height: auto;width: auto;max-width: 200rpx ;background-color: blueviolet;">
									用户：收到回复即可收到看士大夫撒旦艰苦
									<view style="width: 50%;height: 100%;display: flex;align-items: center;justify-content: center;background-color: brown;">灵犀：</view>
									<view style="width: 50%;height: 100%;display: flex;align-items: center;background-color: cadetblue;">
										<image src="../../static/txt.png" mode="widthFix" style="width: 80%;height: auto;"></image>
									</view>
								</view> -->
							</view>
						</view>
					</view>
				</view>
				<view id="target-id"></view>
			</scroll-view>
		</view>
		<!-- style="position: relative;" -->
		<view style="position: relative;">
			<!-- focues==false &  -->
			<view v-if="closeFocues==false" :class="focues ? 'titleFocus' : 'titleFocus1'">
				<view class="titleBackground">
					<view class="titleNum1">
						<view style="width: 100%; height: 100%; display: flex;align-items: center">
							灵犀：
							<view v-if="isPhoto==false" style="width: 80%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
							    {{isPhoto_src}}
							</view>

							<image v-if="isPhoto==true" @tap="enlargePhoto(isPhoto_src)" :src="isPhoto_src" mode="heightFix" style="height: 60%;width: auto"></image>
						</view>
					</view>

					<view @tap="closeTitle" class="titleNum2">
						<image src="../../static/delete1.png" mode="heightFix" style="width: auto;height: 50%;"></image>
					</view>
				</view>
			</view>
				<!-- <scroll-view v-if="focues==false" scroll-x="true" scroll-with-animation="true" style="white-space: nowrap; ; position: absolute; bottom: 140rpx; font-size: 30rpx; width: 100%; height: 70rpx;">
					<view v-for="(item, index) in iconName" :key="index" style="display: inline-block;
				  		height: 100%;
						margin-left:10rpx;
						border-radius: 20rpx;
				  		width: 180rpx;background-color: #e7e7e7;
				  		text-align: center;">
						<view style="height: 100%;width: 100%;display: flex;align-items: center;justify-content: center;">
							<image src="../../static/history.png" mode="" style="height: 40rpx;width: 40rpx;"></image>
							<text style="font-size: 25rpx;padding-left: 10rpx;color:cadetblue;">{{item.name}}</text>
						</view>
					</view>
				</scroll-view> -->
			<InputVue
				@childMessage="file_explainMessage" 
				@fileMesage="sendFile"
				@sendData="addData"
				@StopReceivingData="stopData"
				@focus="focusDataa"
				@keyboardHeight="keyHeight"
				:file_explainn="file_explain" 
				:getAnswer="ImageGeneration"
				:Isdisplay="1"
				/>
		</view>
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
	import documentDisplay from '../../components/documentDisplay.vue';
	import quotationText from '../../components/quotationText.vue'
	import quotationDocument from '../../components/quotationDocument.vue'
	import tooltipVueVue from '../../components/tooltipVue.vue';
	import adjustmentPrice from '../../components/adjustmentPrice.vue'
	import LoadingDots from '../../components/LoadingDots.vue'
	// import calculateSum from '../../api/api.js'
	// import marked from '../../api/marked.min.js'
	export default {
		data() {
			return {
				touchX: 0,
				touchY: 0,
				offsetY:100,
				
				iconName:[
					{
						src:'',
						name:'项目名搜索'
					},
					{
						src:'',
						name:'内容搜索'
					}
				],
				submitArray:{
					UserA:'',
					CompanyA:'',
					PhoneA:'',
					ProjectA:'',
					ByB:uni.getStorageSync('nickName'),
					CompanyB:uni.getStorageSync('companyName'),
					PhoneB: '',
				},
				
				focues:false, // 输入框上方的引用的位置信息
				closeFocues:true, // 是否显示输入框上方的引用
				
				imageSrc:'',
				canvasHeight:'',
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
				jump_index:false,
				obj:'', // 用户搜索历史记录
				isPhoto:false,
				isPhoto_src:'', // 图片链接
				isfile:false, // 是否时文件信息
				isShowPrice:false, // 是否显示调价组件
				box:'', // 调整价格具体的价格
				timerdot:'', // 等待的时候是否展示具体信息
				socketTask:null,
				waitingForDisplay:true,
				youobj:{
					msg:'',
					your:true,
					filPath:'', // 存储本地直接打开的地址
					url:false,
					deviceDetails:false, 
					// price:produceMessage,
					price:'', // 存储传递过来的原始信息
					urlAdress:''  ,// 存储设备详情网络地址
					little_photo:'', // 存储报价数据的部分图片
					all_photo:'', // 存储报价数据的所有图片
					bottom_top:'', // 头部信息
					bottom_bottom:'', // 尾部信息
					displayedExcel:false, // 是否显示最后excel表格
					single_produce:false, // 是否是单个产品信息
					dataHandle:0,
					load:false,  // 是否显示特效
					file_id:'', // 用于调价交互
					singleProductPrice:'',  // 是否是但产品
					promptContent:'' , // 是否显示提示语
					detailedPrice:'' , // 单产品时的详细价格
					similarUuid:'', // 同类数据的Uuid 用于存储数据
				},
				foundItem_item:'', // 判断当前会话数据和之前是否有不同
				version:'', // 修改数据的版本V1,V2,V3
				timerCopy: null, // 定时器
				longPressTime: 1000, // 自定义长按时间（以毫秒为单位）
				
				keyboardHeightt:'', // 键盘弹起的高度
				
				isSingle:0  // 用于判断文件上传错误信息status是否是400
			}
		},
		components:{
			InputVue,
			CheckboxTextVue,
			documentDisplay,
			quotationText,
			quotationDocument,
			tooltipVueVue,
			adjustmentPrice,
			LoadingDots
		},
		computed:{
			// 用户检测用户数据是否填写完整
			isUserComplete(){
				return this.entryname && this.projectName && this.projectName!='点击'
			},
			// 项目对象昵称保留三位
			isProjectName(){
				return this.projectName.length > 3 ? this.projectName.slice(0, 3) : this.projectName;
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
		  isConnected:{
			handler(newData, oldData){
				console.log("此时的网络状况是：",newData);
				let max = 20;
				let i = 0;
				  if (newData == false){
					  this.ImageGeneration = false;
					  this.websocketData = setInterval(()=>{
						if (this.isConnected != true){
							this.initWebSocket();
							console.log("开始重连ing");
							console.log("链接状态：",this.isConnected);
							i++;
						} else {
							clearInterval(this.websocketData)
						}
						if (i >= max){
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
		mounted() {
			// setTimeout(()=>{
			this.$eventBus.$on('isShow', (data)=>{
				this.closeFocues = data;
			})
			
			this.$eventBus.$on('isPhoto' ,(data)=>{
				console.log("是否显示图片",data);
				// console.log("最后一项是：", data.price[data.price.length-1]);
				if ('totals' in data.price[data.price.length-1]){
					console.log("存在totals值");
					this.isPhoto = false;
					this.isPhoto_src = data.price_file
				} else {
					console.log("不存在totals值");
					this.isPhoto = true;
					this.isPhoto_src = data.all_photo;
				}
			})
				
				// 是否显示条件按钮
				
			// }, 0)
		},
		onLoad(options) {
			let height = uni.getSystemInfoSync().windowHeight;
			uni.onKeyboardHeightChange((res) => {
				this.keyboardHeightt = 90 - (res.height / height) * 100 + 2;
				console.log("此时的高度是：" , this.keyboardHeightt);
			});
			console.log("token：",uni.getStorageSync('token'));
			if ('param' in options){
				this.donghua = false; // 直接渲染没有加载动画
				var obj = JSON.parse(decodeURIComponent(options.param));
				this.obj = obj;
				// console.log("obj的值是：",obj);
				// setTimeout(()=>{
					const existence = 'name' in obj && 'projectName' in obj;
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
				// },10)
				// console.log("高度是：", obj.scrollTopHeight);
				// this.scrollTopHeight = obj.scrollTopHeight;
				this.colors = obj.colorss;
				this.uuid = obj.uuid;
				this.detailedIntroduction = obj.detailedIntroduction;
				if (obj.version.includes('V')){
					this.version = obj.version;
				} else {
					this.version = 'V'+obj.version;
				}
				// console.log("传递过来的version的值是：", obj.version);
				console.log("此时数据修改的版本是：", this.version);
				
				let box = JSON.parse(plus.storage.getItem(`${this.uuid}`));
				if (box == null){
					// console.log("数据是空的");
				} else {
					// setTimeout(()=>{
						// this.donghua = false;
						console.log("初始传输数据：",box);
						// let boxDeepCopy = JSON.parse(JSON.stringify(box));
						// console.log("深拷贝之后的数据：",boxDeepCopy);
						box.forEach(item => {
							if (item.date){
								// console.log("存在时间：",item);
								item.date = this.$methods.timestampToDate(item.date)
							}
						})
						// console.log("筛选出来存在date的项：",hasDateItems);
						this.msgBox = box;
					// }, 0)
					console.log("传递过来的数据是：",this.msgBox);
					
				}
			}
			// 消息展示框数据提示
			setTimeout(()=>{
				this.initWebSocket();
				// 模板用户数据更新
			}, 10)
		},
		onShow(){
			let chatSession = uni.getStorageSync('ChatSession');
			const foundItem = chatSession.find(item => item.uuid === this.uuid);
			this.foundItem_item = foundItem;
			
			this.$store.dispatch('isToken',uni.getStorageSync('token'));
			if (uni.getStorageSync('nickName').length == 11){
				this.submitArray.PhoneB = uni.getStorageSync('nickName');
			}
			setTimeout(()=>{
				let you = uni.getStorageSync(`${this.uuid}submit`);
				if (you.length!=0){
					this.submitArray = you;
				}
				this.submitArray.CompanyB = uni.getStorageSync('companyName');
				this.$methods.templateDataUpdate(this.$store.state.BASE_URL, this.uuid, this.submitArray);
				let list_name = uni.getStorageSync('itemArr');
				for (let i = 0;i<list_name.length;i++){
					this.columns[0].push(list_name[i].name)
				}
				this.promptTitle.index = this.msgBox.length;
				
				this.baseUrl = this.$store.state.BASE_URL;
			}, 50)
			// console.log("当前页面的标记时：",this.jump_index);
			if (this.jump_index === true){
				console.log("返回重新连接");
				setTimeout(()=>{
					this.initWebSocket();
				}, 10)
			}
			// this.isConnected = false;
		},
		onHide() {
			uni.setStorageSync(`${this.uuid}submit`, this.submitArray);
			console.log("初始页面隐藏");
			// console.log("隐藏时页面的uuid：",this.uuid);
			clearInterval(this.timerData);
			plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
		},
		onUnload() {
			uni.setStorageSync(`${this.uuid}submit`, this.submitArray);
			console.log("初始页面销毁");
			if (this.isConnected == true){
				this.socketTask.close()
				// uni.closeSocket();
				this.isConnected = false;
			}
			clearInterval(this.timerData); // 关闭最开始的定时器
			clearInterval(this.websocketData);
			let chatSession = uni.getStorageSync('ChatSession');
			let foundItem = chatSession.find(item => item.uuid === this.uuid);
			foundItem.auther = uni.getStorageSync('nickName');
			// if (this.msgBox[this.msgBox.length - 1].detailedPrice != ''){
			if (this.msgBox.length === 0){
				// 当内容为空的时候
				chatSession = chatSession.filter(item => item.uuid !== foundItem.uuid);
				setTimeout(()=>{
					this.$methods.deleteMessage(this.$store.state.BASE_URL,foundItem.uuid)
						.then(isActive => {
							console.log("删除数据是否成功:",isActive);
						})
						.catch(err => {
							console.log("删除失败的原因：", err);
						})
				}, 10)
				uni.setStorageSync('ChatSession',chatSession);
				// uni.closeSocket();
			} else {
				// foundItem.scrollTopHeight = this.scrollTopHeight;
				console.log("此时的数据是：",foundItem);
				if (foundItem){
					this.newContent(foundItem);
				}
				plus.storage.setItem(`${this.uuid}`,JSON.stringify(this.msgBox))
				
				// 是对用户搜索历史记录消息的处理
				let history = JSON.parse(plus.storage.getItem('13'));
				console.log("具体的消息是：",history);
				if (history === null){
					history = [];
					var obj = {
						category:foundItem,
						msg:this.msgBox
					}
					history.push(obj);
				} else {
					let index = history.findIndex(item => item.category.uuid === this.uuid);
					
					if (index !== -1) {
					    // 修改找到的对象
					    history[index].category = foundItem;
					    history[index].msg = this.msgBox;
					} else {
					    console.log("未找到匹配的数据");
						var obj = {
							category:foundItem,
							msg:this.msgBox
						}
						history.push(obj);
						console.log("历史数据是：",history);
					}
				}
				plus.storage.setItem('13',JSON.stringify(history));
				
			}
		},
		methods: {
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
							  // console.log("当前的页面高度是：", data);
					        if (data) {
							  let top = data.height - this.viewheight;
							  if (top>0){
								  this.scrollTopHeight = top;
								  // console.log("高度是：", this.scrollTopHeight);
							  }
					        }
					      }).exec();
				})
			},
			addData(eventt){
				console.log("传输过来要发送的数据：",eventt);
				this.file_explain = 1;
				let event = eventt.message;
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
				this.waitingForDisplay = false;  // 初始化发送的最新等待时间
				// 获取是否是同类的uuid
				let uuid = require('uuid');
				let myUuid = uuid.v4();
				var myobj = {
					message1: this.input_msg,
					msg:'',
					mine:true,
					url:false,
					date:Date.now(),
					dataHandle:0,
					filPath: '',
					filename: '',
					fileSize: '',
					filetype: '',
					similarUuid:myUuid,
					index:0,
					networkAdress:''
				}
				this.msgBox.push(myobj);
				this.explayNotice(this.entryname);
				this.input_msg = '';
				var myobj = {
					msg:'',
					your:true,
					zhuangtai:'wait for',
					dataHandle:0,
					waitingInformation:'', // 等待的详细信息
					isShowDot:false
				}
				this.msgBox.push(myobj);
				this.timerdot = setTimeout(()=>{
					let message = "当前访问人数较多，请稍等";
					let i = 0;
					let timer = setInterval(()=>{
						if (i == message.length){
							myobj.isShowDot = true;
							clearInterval(timer);
						} else {
							myobj.waitingInformation += message[i];
							i++;
						}
					},50)
				}, 6000)
				let send_message = '';
				let Pricelanguage = false;
				// this.receiveMessages1(eventt.recommend_index);
				// return ;
				if (eventt.priceAdjustment == true){
					// 正常调价之后等待的话术需要修改
					Pricelanguage = true;
					console.log("长度是：", eventt.msg.price.length);
					console.log("具体的数据是：",eventt);
					// 标记之后修改价格
					if (eventt.msg.price.length>2){
						send_message = {
							query:event,
							data:[eventt.msg.file_id],
							uuid:this.uuid,
							promptName:'file'
						}
						console.log("发送的数据时：",send_message);
					} else {
						console.log("是一段话");
						send_message = {
							query:event,
							data:eventt.msg.price,
							uuid:this.uuid,
							promptName:'data',
						}
					}
				} else {
					if (this.msgBox.length > 2){
						let index = this.msgBox[this.msgBox.length - 3];
						console.log("价格调整的信息：",index);
						if (index.price=='' || index.zhuangtai =='wait for'){
							send_message = {
								query:event,
								uuid:this.uuid,
							}
						} else {
							// 此处是点击调整按钮之后交互信息进行调整
							if (eventt.recommend_index == 0 || eventt.recommend_index ==1){
								Pricelanguage = true;
							}
							// 正常的价格交互
							let bottom = index.price[index.price.length - 1];
							if (('totals' in bottom) && index.price.length <= 2){
								// 表示是数字调价
								send_message = {
									query:event,
									data:index.price,
									uuid:this.uuid,
									promptName:'data',
								}
							} else {
								send_message = {
									query:event,
									data:[index.file_id],
									uuid:this.uuid,
									promptName:'file',
								}
							}
						}
					} else {
						send_message = {
							query:event,
							uuid:this.uuid,
						}
					}
				}
				
				console.log("上传的数据是：",send_message);
				// return ;
				this.closeFocues = true;
				if (this.isConnected == true){
					uni.request({
						// url:'http://192.168.2.6:8080/api/inquiry',
						// url:`${this.baseUrl}/api/inquiry`,
						url:`${this.baseUrl}/api/qianfan`,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						},
						data:send_message,
						success: (res) => {
							console.log("发送成功：",res);
							if (res.data.status != 100){
								this.input_msg = '';
								this.ImageGeneration = false;
								uni.$u.toast(`${res.data.message}`);
								this.msgBox.pop();
								return ;
							}
							// this.donghua = false;
							this.choose = 4;
							
							// 更新时间
							let chatSession = uni.getStorageSync('ChatSession');
							const foundItem = chatSession.find(item => item.uuid === this.uuid);
							// foundItem.date = this.$methods.getDate()
							foundItem.date = Date.now();
							foundItem.introduce = myMsg;
							uni.setStorageSync('ChatSession',chatSession);
							// 更新最新的显示数据
						
							this.donghua = true;
							this.receiveMessages(Pricelanguage);
							this.isFile = false;
						},
						fail: (res) => {
							this.msgBox.pop();
							console.log("发送消息失败！",res);
							clearTimeout(this.timerdot);
							myobj.waitingInformation = '网络出现故障，请退出重进';
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
				if (this.socketTask) {
				    this.socketTask.close();  // 在重新创建连接之前关闭旧的连接，防止重复绑定
				}
				console.log("uuid是：",this.uuid);
				console.log("websocket地址是：",this.$store.state.WebSocket_URL);
				this.socketTask = uni.connectSocket({
					url: `${this.$store.state.WebSocket_URL}/websocket/${this.uuid}`, //仅为示例，并非真实接口地址。
					complete: ()=> {}
				});
				this.socketTask.onOpen((res)=>{
					this.isConnected = true;
					console.log("WebSocket连接已打开！",res);
					this.ImageGeneration = false;
				})
				this.socketTask.onClose((res)=>{
					console.log('WebSocket 已关闭！');
					self.isConnected = false;
					console.log("此时的消息连接是：",self.isConnected);
					// self.initWebSocket();
					self.ImageGeneration = false;
				})
				this.socketTask.onError((res)=>{
					console.log("WebSocket链接打开失败，请检查！",res);
					self.ImageGeneration = false;
					self.isConnected = false;
					// this.socketTask.close()
				})
				this.socketTask.onMessage((message)=>{
				// uni.onSocketMessage((message)=>{
					console.log("websocket接收到的消息是：", message.data);
					console.log("此时的消息是：", this.choose);
					if (message.data.includes('status') && this.isSingle == 1){
						let istrue = JSON.parse(message.data);
						if (istrue.status == 400){
							this.choose = 2;
							this.isSingle = 0;
						}
					}
					let event = JSON.parse(message.data);
					switch (this.choose){
						case 4:
							this.messageReplyJudgment(event);
							// this.choose--;
							break;
						case 3:
							this.normalState(event);
							break;
						case 2:
							this.handleFirstMessage(event);
							break;
						case 1:
							this.handleSecondMessage(event);
							break;
						case 0:
							this.handleThirdMessage(event);
							// console.log("最终获取到的数据是：",this.youobj);
							break;
						case -1:
							this.handleErrorMessage(event);
							break;
						default:
							console.log("接收错误的消息", this.choose);
							// this.handleErrorMessage(event);
							break;
					}
				})
			},
			/**
			 * 处理错误或者不能报价的信息
			 * @param {Object} event 
			 */
			handleErrorMessage(event){
				console.log("此时处理的错误信息是：", event);
				let youobj = this.youobj;
				youobj.msg = '数据解析失败，请重试！';
				this.ImageGeneration = false;
			},
			/**
			 * @param {Object} event 处理接收到的消息
			 * @return {type} 返回处理的结果或者直接对choose进行处理
			 */
			normalState(event){
				console.log("此时收到的状态信息是：", event);
				if (event.status == 100){
					this.choose--;
				}
				if (event.status == 400){
					this.choose = -1;
					this.handleErrorMessage(12);
				}
			},
			receiveMessages(event){
				console.log("调节传递过来的信息是：", event);
				this.jump_index = false;
				let chatSession = uni.getStorageSync('ChatSession');
				if (this.isConnected != true){
					this.$methods.promptBox('网络未连接，请重试');
					return ;
				}
				this.donghua = true;
				console.log("等待展示的数据是：",this.msgBox);
				var youobj = {
					msg:'',
					your:true,
					filPath:'', // 存储本地直接打开的地址
					url:false,
					deviceDetails:false, 
					// price:produceMessage,
					price:'', // 存储传递过来的原始信息
					urlAdress:''  ,// 存储设备详情网络地址
					little_photo:'', // 存储报价数据的部分图片
					all_photo:'', // 存储报价数据的所有图片
					bottom_top:'', // 头部信息
					bottom_bottom:'', // 尾部信息
					displayedExcel:false, // 是否显示最后excel表格
					single_produce:false, // 是否是单个产品信息
					dataHandle:0,
					load:false,  // 是否显示特效
					file_id:'', // 用于调价交互
					singleProductPrice:'',  // 是否是但产品
					promptContent:'' , // 是否显示提示语
					detailedPrice:'' , // 单产品时的详细价格
					similarUuid:`${this.msgBox[this.msgBox.length-2].similarUuid}`,
					index:1,
					fileSize:'',
					price_file:'',
					networkAdress:'',  // 图片网络地址
				}
				// 检验是否是异步的
				this.youobj = youobj;
				console.log("agin");
				let file_uuid = '';
				let single = false;
				let produceMessage = ''; // 用户存储第一次的数据
				// this.choose = 3;
				if (event == 'price'){
					let message = {
						data:'price'
					}
					this.isSingle = 1;
					this.messageReplyJudgment(message);
				}
			},
			/**
			 * 第一次拿到的消息
			 * @param {Object} obj 消息盒子
			 * @param {Object} event 接收到的wesocket消息
			 */
			handleFirstMessage(index){
				console.log("第一次拿到的消息", youobj,index);
				let youobj = this.youobj;
				if (index.status == 400 || index.status == 404 || index.status == 100){
					// 定义一个暂时存储数据是变量
					// this.load = false;
					let msg = '';
					if (index.status == 100){
						// youobj.msg = index.data
						msg = index.data;
					} else {
						// youobj.msg = index.message;
						msg = index.message;
					}
					let i = 0;
					this.choose = -2;
					// console.log("不正常回答的时候msg的值是：",msg);
					let timer = setInterval(()=>{
						if (i >= msg.length){
							clearInterval(timer);
							setTimeout(()=>{
								this.waitingForDisplay = false;
								this.$methods.uploadRecords(this.uuid, this.$store.state.BASE_URL, this.msgBox[this.msgBox.length-2], this.youobj)
									.then(isActive => {
										console.log("记录是否上传成功：",isActive);
									})
									.catch(Error => {
										console.log("记录上传失败的原因是：",Error);
									})
								this.ImageGeneration = false;
								// this.choose--;
							}, 200)
						} else {
							if (i == 0){
								this.load = false;
							}
							youobj.msg += msg[i];
							// console.log("此时的msg的值是：",msg[i]);
							i++;
						}
					},50)
				} else {
					youobj.price = index;
					this.choose--;
					if (index.length == 2){
						// 处理单产品情况
						this.handleSingleProduct(youobj, index);
					} else {
						// 处理多产品情况
						this.handleMultipleProducts(youobj, index);
					}
					this.ImageGeneration = false;
				}
			},
			/**
			 * 第二次拿到的数据
			 * @param {Object} obj 消息盒子
			 * @param {Object} event 接收到的wesocket消息
			 */
			handleSecondMessage(index){
				let youobj = this.youobj;
				if (index.data && typeof index.data === 'object' && 'text' in index.data){
					youobj.promptContent = index.data.text;
				}
				console.log("文件调价：",youobj);
				// console.log("是否显示提示语，内容是：",youobj.produceMessage);
				this.choose--;
			},
			/**
			 * 第三次拿到的数据
			 * @param {Object} obj 消息盒子
			 * @param {Object} event 接收到的wesocket消息
			 */
			handleThirdMessage(index){
				console.log("第三次拿到的消息",youobj, index);
				let youobj = this.youobj;
				let indexx = index;
				this.msgBox[this.msgBox.length-1].urlAdress = indexx.data.url;
				this.msgBox[this.msgBox.length-1].file_id = indexx.data.id;
				setTimeout(()=>{
					uni.request({
					  url: indexx.data.url, // 文件的URL
					  method: 'HEAD', // 使用HEAD方法
					  success: (res) => {
						const fileSize = res.header['Content-Length']; // 获取文件大小
						if (fileSize) {
						  // console.log(`文件大小为: ${fileSize} 字节`);
						  youobj.fileSize = this.$methods.formatFileSize(fileSize);
						  // youobj.fileSize = fileSize;
						} else {
						  console.log('无法获取文件大小');
						}
					  },
					  fail: (err) => {
						console.error('请求失败:', err);
					  }
					});
				}, 10)
				uni.downloadFile({
					url:indexx.data.url,
					success: (res) => {
						// youobj.filPath = res.tempFilePath;
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: (saveRes) => {
							  // console.log('文件保存成功:', saveRes.savedFilePath);
							  console.log("此时我的报价单里面的历史记录是：", youobj);
							  
							  youobj.filPath = saveRes.savedFilePath;
							  // console.log("最终需要记录上传的消息是：",this.youobj);
							},
							fail: (error) => {
							  console.error('文件保存失败:', error);
							}
						});
					}
				})
			},
			/**
			 * 是正常的回复还是特殊的回复
			 * @param {Object} event websocket接收到的消息
			 */
			messageReplyJudgment(event){
				let youobj = this.youobj;
				// console.log("初次消息的类型",event);
				clearTimeout(this.timerdot);
				console.log("开始接收消息：");
				this.msgBox.pop();
				this.msgBox.push(youobj);
				// 正在搜索公司内部数据库，正在全网搜索
				// let bottom_top = '根据您提供的产品信息，我们特地为您准备了一些推荐报价，供您参考：';\
				
				// 文件处理  对话处理分开3 2 2
				let startTime = 5000;
				let fileTime = 5000;
				if (this.isFile == true){
					startTime = 5000;
					fileTime = 4000;
				} else {
					startTime = 3000;
					fileTime = 3000;
				}
				let bottom_top = '';
				// 更新价格信息
				if (event.data == 'adjust_price'){
					bottom_top = '我们正在更新价格,请稍等片刻';
					this.choose = 2;
					youobj.bottom_top = bottom_top;
					youobj.load = true;
					// 当前页面进行调价
					let str = this.version;
					let [letter, number] = str.match(/[a-zA-Z]+|[0-9]+/g);
					number = (parseInt(number) + 1).toString();
					this.version = letter+number;
				} else {
					if (event.data == 'off_topic'){
						this.choose = 2;
					} else {
						this.choose--;
					}
					this.version = 'V0'
					// 报价信息
					bottom_top = '将至少进行四个数据源的处理';
					youobj.bottom_top = bottom_top;
					youobj.load = true;
					let timer1, timer2, timer3, timer4, timer5;
					timer1 = setTimeout(() => {
						if (youobj.load == false) {
							clearTimeout(timer1); // 取消后续定时器
							return;
						}
						let bottom_top = '正在研究个体消费者的定价情况';
						youobj.bottom_top = bottom_top;
						youobj.load = true;
					
						timer2 = setTimeout(() => {
							if (youobj.load == false) {
								clearTimeout(timer2); // 取消后续定时器
								return;
							}
							let bottom_top = '分析定价策略';
							youobj.bottom_top = bottom_top;
							youobj.load = true;
					
							timer3 = setTimeout(() => {
								if (youobj.load == false) {
									clearTimeout(timer3); // 取消后续定时器
									return;
								}
								let bottom_top = '正在查看制造商的产品定价信息';
								youobj.bottom_top = bottom_top;
								youobj.load = true;
					
								timer4 = setTimeout(() => {
									if (youobj.load == false) {
										clearTimeout(timer4); // 取消后续定时器
										return;
									}
									let bottom_top = '跟踪最新市场价';
									youobj.bottom_top = bottom_top;
									youobj.load = true;
					
									timer5 = setTimeout(() => {
										if (youobj.load == false) {
											clearTimeout(timer5); // 取消后续定时器
											return;
										}
										let bottom_top = '现在进行多数据源价格分析';
										youobj.bottom_top = bottom_top;
										youobj.load = true;
										// this.ImageGeneration = false;
									}, fileTime);
					
								}, fileTime);
					
							}, fileTime);
					
						}, fileTime);
					
					}, startTime);
				}
			},
			/**
			 * 处理找到多个文件的信息
			 * @param {Object} obj 消息盒子
			 * @param {Object} event 接收到的websocket消息
			 */
			handleMultipleProducts(youobj, index){
				// console.log("多接收到的盒子消息是：", youobj);
				console.log("多websocket消息是：", index);
				// console.log("文件的时候的价格是456123：",index[index.length-1].totals);
				youobj.detailedPrice = (index[index.length-1].totals)+'元';
				// console.log("类型是：",typeof(youobj.detailedPrice));
				// console.log("金钱数是：",youobj.detailedPrice);
				let get = this.$methods.convertData_3(index);
				this.drawTable(get.nums,get.total,1)
					.then(async isActive =>{
						// youobj.little_photo = isActive;
						return this.drawTable(get.nums,get.total,1)
					})
					.then(async isActive =>{
						const typeBottomWrite =() =>{
							return new Promise((resolve)=>{
								// youobj.load = false;
								let messages1= [
									"根据您感兴趣的产品，我们精心为您挑选了一些推荐报价，希望能为您的选择提供帮助。",
									"针对您关注的产品，我们准备了一些推荐价格供您参考，希望能对您的购买决策有所帮助。",
									"我们为您筛选了一些产品的推荐报价，期待能为您提供参考，帮助您找到最合适的选择。",
									"我们已根据您感兴趣的产品整理了一些报价信息，希望这些推荐能为您提供有价值的参考。"
								];
								let randomIndex = Math.floor(Math.random() * messages1.length);
								// let bottom_top = '根据您提供的产品信息，我们特地为您准备了一些推荐报价，供您参考：';
								let bottom_top = messages1[randomIndex];
								let i = 0;
								youobj.bottom_top = '';
								let timer = setInterval(()=>{
									if (i >= bottom_top.length){
										clearInterval(timer);
										resolve(); 
									} else {
										if (i == 0){
											youobj.load = false;
										}
										youobj.bottom_top += bottom_top[i];
										i++;
									}
								}, 50)
							})
						}
						await typeBottomWrite();
						youobj.little_photo = isActive;
						return this.drawTable(get.nums,get.total,2)
					})
					.then(async allimage =>{
						youobj.all_photo = allimage;
						
						let history_baioji = uni.getStorageSync('history_bao');
						if (history_baioji.length == 0){
							history_baioji = [];
						}
						let obj = youobj;
						obj.date = Date.now();
						history_baioji.push(obj);
						uni.setStorageSync('history_bao', history_baioji);
						
						
						let bottom_bottom = '';
						if (this.entryname == ''){
							bottom_bottom = `${this.$methods.getFileDate()}项目报价单.xlsx`;	
						} else {
							bottom_bottom = `${this.$methods.getFileDate()}${this.entryname}项目报价单.xlsx`;
						}
						youobj.bottom_bottom = bottom_bottom;
						youobj.isdisplayed = true;
						setTimeout(()=>{
							// console.log("获取多产品情况");
							this.$methods.localToUrl(this.$store.state.BASE_URL, allimage, this.uuid)
								.then(isAddress => {
									// console.log("图片地址是：",isAddress);
									youobj.networkAdress = isAddress;
									return this.$methods.uploadRecords(this.uuid, this.$store.state.BASE_URL, this.msgBox[this.msgBox.length-2], this.youobj);
								})
								.then(isActive => {
									console.log("记录是否上传成功：",isActive);
								})
								.catch(Error => {
									console.log("记录上传失败的原因是：",Error);
								})
						}, 1)
						// this.$methods.filesSame(this.uuid,file_uuid,this.msgBox);
						// 判断文件是否相同
						// let param = this.$methods.filesSame(this.uuid,file_uuid,this.msgBox);
						// if (param != true){
						// 	uni.closeSocket();
						// 	this.jump_index = true;
						// 	uni.navigateTo({
						// 		url:`/pages/dataRelay/dataRelay?param=${param}`
						// 	})
						// }
					})
					.catch(error =>{
						console.error("错误信息是：",error)
					})
			},
			/**
			 * 处理但产品的情况
			 * @param {Object} youobj 消息盒子
			 * @param {Object} index 接收到的websocket消息
			 */
			handleSingleProduct(youobj, produceMessage){
				console.log("单接收到的盒子消息是：", youobj);
				console.log("单websocket消息是：", produceMessage);
				// youobj.single_produce = true;
				// this.load = false;
				let msg = '';
				// 分为两种，显示和复制之后的信息
				if (produceMessage[0].des == '' || produceMessage[0].des=='无'){
					// youobj.price_file = `${produceMessage[0].chsName}  `
					// youobj.price_file = `${this.$methods.createNickName(produceMessage[0].chsName,25)}`;
					msg = `${this.$methods.createNickName(produceMessage[0].chsName,25)}`;
					youobj.informationReplication = `${produceMessage[0].chsName}  `;
				} else {
					// youobj.price_file = `${this.$methods.createNickName(produceMessage[0].chsName,25)}  ${this.$methods.createNickName(produceMessage[0].des,80)}  `
					msg = `${this.$methods.createNickName(produceMessage[0].chsName,25)}  ${this.$methods.createNickName(produceMessage[0].des,67)}  `;
					youobj.informationReplication = `${produceMessage[0].chsName}  ${produceMessage[0].des}`;
				}
				// 打字机效果展示
				console.log("msg的值是：",msg);
				// console.log("price_file的值是：",youobj.price_file);
				// youobj.price_file = '';
				let i = 0;
				// youobj.single_produce = true;
				// this.load = false;
				let timer = setInterval(()=>{
					if (i >= msg.length){
						clearInterval(timer);
						youobj.detailedPrice = produceMessage[0].unitPrice+'元';
						this.ImageGeneration = false;
						this.waitingForDisplay = true;
						console.log("一直上传");
						// console.log("i的值是：",i);
						// console.log("msg的长度：",msg.length);
						setTimeout(()=>{
							this.waitingForDisplay = true;
							this.$methods.uploadRecords(this.uuid, this.$store.state.BASE_URL, this.msgBox[this.msgBox.length-2], this.youobj)
								.then(isActive => {
									console.log("记录是否上传成功：",isActive);
								})
								.catch(Error => {
									console.log("记录上传失败的原因是：",Error);
								})
						},10)
					} else {
						if (i == 0){
							youobj.single_produce = true;
							this.load = false;
						}
						// this.$nextTick(()=>{
						youobj.price_file += msg[i];
						// })
						// console.log("数据的值是：",youobj.price_file);
						// console.log("msg的值：",msg[i]);
						i++;
					}
				}, 50)
				// youobj.detailedPrice = produceMessage[0].unitPrice;
				// youobj.single_produce = true;
				// 但产品情况
			},
			/**
			 * 是否显示价格调整空间，被调整的具体数据
			 * @param {Object} event
			 */
			adjustmentPrice(event){
				this.box = event;
				this.isShowPrice = true;
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
			explay(e,event){
				// console.log("最开始处理：", event);
				console.log("坐标是：", e);
				if (this.timerCopy) {
				  clearTimeout(this.timerCopy);
				}
				// 启动一个新的定时器，指定时间后触发事件
				this.timerCopy = setTimeout(() => {
				  // this.triggerLongPress(); // 调用自定义的长按处理方法
						console.log("数据处理开始");
						// console.log("实际传递参数是：", event);
						let lenght = this.msgBox.length;
						for (let i = 0; i < lenght; i++){
							if (this.msgBox[i] == event){
								this.msgBox[i].dataHandle = 1;
							} else {
								this.msgBox[i].dataHandle = 0;
							}
						}
						this.touchX = e.touches[0].pageX;
						console.log("横坐标是：", this.touchX);
						this.touchY = e.touches[0].pageY;
						console.log("纵坐标是：", this.touchY);
						uni.vibrateShort({
							success: function () {
								console.log('success');
							}
						});
						
				}, this.longPressTime);
			},
			handleTouchEnd(){
				if (this.timerCopy) {
				  clearTimeout(this.timerCopy); // 用户松开手指之前，清除定时器，不会触发长按事件
				  this.timerCopy = null;
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
				let index = 0;
				uni.showModal({
					title: '提示',
					content: '是否要删除该消息？',
					success: (res) => {
						if (res.confirm) {
							let box = this.msgBox.filter(item => item != event);
							this.msgBox = box;
							console.log("删除数据：",event);
							this.$methods.deleteRecords(this.$store.state.BASE_URL,this.uuid,event.similarUuid,event.index)
								.then(isActive => {
									console.log("报价消息删除是否成功：", isActive);
								})
								.catch(Error => {
									console.log("消息删除失败");
								})
						} else if (res.cancel) {
						}
					}
				});
				
			},
			focusData(){
				this.entryname = '';
				this.isFocus = false;
				// this.file_explain = 3;
				console.log("此时的消息是456789：", this.file_explain);
				// this.file_explain = 3;
				clearInterval(this.timerData);
			},
			blurData(){
				this.isFocus = true;
				// 还要启动定时器  判断用户是否已经输入了相关文字
				if (this.entryname == ''){
				} else {
					this.submitArray.CompanyA = this.entryname;
					// console.log("提交的数据是：",this.submitArray);
				}
				// 不管输入什么数据都需要更新实际数据
				this.$methods.templateDataUpdate(this.$store.state.BASE_URL, this.uuid, this.submitArray);
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
				// uni.closeSocket();
				this.socketTask.close();
			},
			imageUrlfalse(event){
				console.log("图片加载",event);
				this.$methods.networkToLocal(event.networkAdress)
					.then(isActive => {
						console.log("转换好的图片地址是：",isActive);
						event.all_photo = isActive;
					})
					.catch(Error => {
						console.log("转换失败");
					})
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
			/**
			 * 处理调价返回的信息即：更新对应的价格
			 * @param {Object} event 收到的调价返回信息
			 */
			handlePriceAdjust(event){
				// 深拷贝
				// console.log("457821");
				// console.log("版本是：",this.version);
				let str = this.version;
				let [letter, number] = str.match(/[a-zA-Z]+|[0-9]+/g);
				number = (parseInt(number) + 1).toString();
				this.version = letter + number;
				
				let chatSession = uni.getStorageSync('ChatSession');
				const foundItem = chatSession.find(item => item.uuid === this.uuid);
				// foundItem.date = this.$methods.getDate()
				foundItem.date = Date.now();
				// foundItem.introduce = '更新';
				uni.setStorageSync('ChatSession',chatSession);
				
				// JSON.parse(JSON.stringify(originalData));
				let index = JSON.parse(JSON.stringify(event.msgbox));
				index.price[0].unitPrice = event.price;
				index.price[0].count = event.price;
				index.price[1].totals = event.price;
				index.detailedPrice = (event.price+'元').toString();
				// 备用数据
				let uuid = require('uuid');
				let myUuid = uuid.v4();
				var myobj = {
					message1: this.input_msg,
					msg:'',
					mine:true,
					url:false,
					date:Date.now(),
					dataHandle:0,
					filPath: '',
					filename: '',
					fileSize: '',
					filetype: '',
					similarUuid:myUuid,
					index:0,
					networkAdress:''
				}
				console.log("相关数据处理之后:", index);
				index.similarUuid = myUuid;
				setTimeout(()=>{
					this.$methods.uploadRecords(this.uuid, this.$store.state.BASE_URL, myobj, index)
						.then(isActive => {
							console.log("记录是否上传成功：",isActive);
							return this.$methods.deleteRecords(this.$store.state.BASE_URL, this.uuid, myobj.similarUuid, 0)
						})
						.then(isDelete => {
							console.log("答是否删除干净：", isDelete);
						})
						.catch(Error => {
							console.log("记录上传失败的原因是：",Error);
						})
				}, 10)
				// 处理调价之后的存储
				this.msgBox.push(index);
				this.isShowPrice = false;
			},
			Jump(){
				console.log("返回原来的页面");
				// 此时存在一个问题，以什么特效进来就要以什么特效出去
				uni.switchTab({
					url:'/pages/index/index'
				})
				// uni.navigateBack()
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
				// this.ImageGeneration = false;
				if (this.isConnected != true){
					// this.ImageGeneration = false;
					this.$methods.promptBox('网络链接有问题')
					return ;
				}
				let leixing = result.files[0].fileExtension;
				if (leixing != 'xlsx' && leixing != 'word' && leixing != 'pdf' && leixing != 'docx' && leixing != 'txt'){
					this.$methods.promptBox(`不支持${leixing}格式的文件`);
					return ;
				}
				uni.showLoading({
					title: '正在上传中，请稍后',
				})
				this.ImageGeneration = true;
				this.filename = result.files[0].fileName;
				// WebSocket 是否已经建立连接
				console.log("链接是否是断开的",this.isConnected);
				let size = '';
				uni.getFileInfo({
				    filePath: result.files[0].filePath,
				    success:(info)=> {
				        // console.log('文件大小：' + info.size + '字节');  // 打印文件大小
						// size = `${(info.size / 1024).toFixed(2)}kb`;
						size = this.$methods.formatFileSize(info.size);
						// console.log("文件大小是：",size);
				    },
				    fail: function (err) {
				        console.error('获取文件信息失败', err);
				    }
				});
				console.log("选取的上传文件是：",result);
				if (this.isConnected == true)
				{
					uni.uploadFile({
						// url:'http://192.168.2.6:8080/api/file',
						url:`${this.$store.state.BASE_URL}/api/file`,
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
								this.choose = 4;
								this.ImageGeneration = true;
								uni.hideLoading();
								let uuid = require('uuid');
								let myUuid = uuid.v4()
								var youobj = {
									message1:'',
									msg:'',
									mine:true,
									filPath:result.files[0].filePath, // 最初用于判断事先是否有已经下载过的文件
									filename:this.filename,
									fileSize:size,
									filetype:result.files[0].fileExtension,
									url:true,
									date:Date.now(),
									dataHandle:0,
									similarUuid:myUuid,
									networkAdress:'',
									index:0
								}
								// console.log("文件类型时：",youobj.filetype);
								this.msgBox.push(youobj)
								this.explayNotice(this.entryname);
								var myobj = {
									msg:'',
									your:true,
									zhuangtai:'wait for'
								}
								this.msgBox.push(myobj);
								// 接收消息
								console.log("接收消息：");
								
								// 更新时间
								let chatSession = uni.getStorageSync('ChatSession');
								const foundItem = chatSession.find(item => item.uuid === this.uuid);
								foundItem.date = Date.now();
								foundItem.introduce = this.filename;
								uni.setStorageSync('ChatSession',chatSession);
								
								this.receiveMessages('price');
								this.isFile = true;
								setTimeout(()=>{
									this.$methods.localToUrl(this.$store.state.BASE_URL, result.files[0].filePath, this.uuid)
										.then(isActive => {
											console.log("转换过来的地址是：", isActive);
											youobj.networkAdress = isActive
										})
										.catch(Error => {
											console.log("文件地址转换成功");
										})
									// 需要判断是否存在新的数据结果
									let headDisplay = '点击输入项目名称';
									console.log("当前的项目名称信息是：", this.entryname);
									// 都没有 可以解决
									// 当只有一个的时候 我不需要修改其中的某项
									if (this.entryname == '' || this.projectName == '点击'){
										this.$methods.ReadExcel(youobj.filPath).then(isActive =>{
											console.log("此时收获到的excel传递的数据时：",isActive);
											// 此时只需要修改项目名称
											if (this.entryname == '' & this.projectName != '点击'){
												if (isActive.project != ''){
													this.entryname = isActive.project;
													this.submitArray.ProjectA = this.entryname;
												}
											}
											// 此时只需要修改服务对象名称
											if (this.projectName != '' & this.projectName == '点击'){
												if (isActive.name != ''){
													this.projectName = isActive.name;
													this.submitArray.UserA = this.projectName
												}
											}
											if (this.projectName == '' & this.projectName == '点击'){
												if (isActive.name != ''){
													this.projectName = isActive.name;
													this.submitArray.UserA = this.projectName
												}
												if (isActive.project != ''){
													this.entryname = isActive.project;
													this.submitArray.ProjectA = this.entryname;
												}
											}
										})
									} else {
										this.submitArray.ProjectA = this.entryname;
									}
									// 更新数据
									this.$methods.templateDataUpdate(this.$store.state.BASE_URL, this.uuid, this.submitArray);
									// if (headDisplay.includes(this.entryname)){
									// 	this.$methods.ReadExcel(youobj.filPath)
									// 		.then(isActive =>{
									// 			console.log("此时收获到的excel传递的数据时：",isActive);
									// 			if (isActive.name != ''){
									// 				this.projectName = isActive.name;
									// 				this.submitArray.UserA = this.projectName
									// 			}
									// 			if (isActive.project != ''){
									// 				this.entryname = isActive.project;
									// 				this.submitArray.ProjectA = this.entryname;
									// 			}
									// 		})
									// } else {
									// 	this.submitArray.ProjectA = this.entryname;
									// }
								}, 10)
							} else {
								uni.$u.toast('上传失败！');
								uni.hideLoading();
							}
							
						},
						fail:(res)=> {
							uni.hideLoading();
							uni.$u.toast('网络开小差了,上传失败');
							this.ImageGeneration = false;
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
												mine:true,
												filPath:result.files[0].filePath, // 最初用于判断事先是否有已经下载过的文件
												filename:this.filename,
												fileSize:size,
												filetype:result.files[0].fileExtension,
												url:true,
												Date:this.$methods.getDate()
											}
											// 获取上传文件的网络地址
											// setTimeout(()=>{
												console.log("456123");
												this.$methods.localToUrl(this.$store.state.BASE_URL, result.files[0].filePath, this.uuid);
											// }, 1)
											// console.log("文件类型时：",youobj.filetype);
											this.msgBox.push(youobj)
											var myobj = {
												msg:'',
												your:true,
												zhuangtai:'wait for'
											}
											this.msgBox.push(myobj)
											// 接收消息
											
											this.receiveMessages('price');
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
				var fileUrl = arr.networkAdress;  //拿到要打开文件的链接
				uni.getFileInfo({
				  filePath: arr.filPath,
				  success: function(res) {
				    console.log('文件存在，文件大小:', res.size);
				    // 文件存在，可以执行相关操作
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
				  },
				  fail: function(err) {
				    console.log('文件不存在或路径错误:', err);
					this.isDownload = 1;
					const downloadTask = uni.downloadFile({
					  url: fileUrl,
					  success: (res)=> {
						// arr.filPath = res.tempFilePath;
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: (saveRes) => {
							  console.log('文件保存成功:', saveRes.savedFilePath);
								uni.openDocument({
									filePath: saveRes.savedFilePath,
									success:(res)=> {
									  console.log('打开文档成功');
									  arr.filPath = saveRes.savedFilePath;
									  // this.$emit('updataMsg', arr);
									  // 拿到新下载好的文件之后，重新赋值到原来的位置
									  
									},
									fail(res) {
									console.log("打开文档失败",res);
									}
								});
							},
							fail: (error) => {
							  console.error('文件保存失败:', error);
							}
						});
					  },
					  fail(res) {
					  	console.log("下载失败！",res);
					  }
					});
					downloadTask.onProgressUpdate((res) => {
						this.fileProgress = res.progress;
						if (this.fileProgress == 100){
							this.isDownload = 2;
						}
						this.fileSize = `${(res.totalBytesExpectedToWrite / 1024).toFixed(2)}kb`;
						arr.fileSize = this.fileSize;  //文件大小保存到app本地中
					});
				  }
				});
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
				this.projectName = event.value[0];
				let index = uni.getStorageSync('itemArr');
				this.submitArray.UserA = this.projectName;
				this.submitArray.PhoneA = index[0].phone;
				this.submitArray.CompanyA = index[0].company;
				// 确认之后更新样式
				this.$methods.templateDataUpdate(this.$store.state.BASE_URL, this.uuid, this.submitArray);
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
			async newContent(foundItemm){
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
				foundItem.price = this.msgBox[this.msgBox.length - 1].detailedPrice;
				foundItem.price = parseFloat(foundItem.price.replace("元", ""));
				foundItem.auther = uni.getStorageSync('nickName');
				if (this.version.length == 0)this.version = '0';
				foundItem.version = this.version;
				// foundItem.nums = Math.ceil(this.msgBox.length/2);
				// 此时所有的消息数量是
				foundItem.nums = this.msgBox.length;
				console.log("当前页面退出：", foundItem);
				console.log("修改的版本是：", this.version);
				// 到此数据初始化完成
				// 数据更新
				setTimeout(()=>{
					this.updata(foundItem);
				}, 10)
				uni.setStorageSync('ChatSession',chatSession)
			},
			drawTable(nums,event,level) {
				return new Promise((resolve, reject)=>{
					uni.getSystemInfo({
					     success: (res) => {
					       const screenWidth = res.windowWidth;
					       const canvasWidth = screenWidth - 20;
					       const scale = canvasWidth / 800;
					
					       const ctx = uni.createCanvasContext('excelCanvas', this);
					
					       ctx.scale(scale, scale);
					
					       // ctx.setFillStyle("#0c2238");
						   ctx.setFillStyle("#538dd6");
						   // ctx.setFillStyle("#0498ff");
					       ctx.fillRect(0, 0, 600, 40);
					       
					       ctx.setFontSize(20);
					       ctx.setFillStyle("white");
					       ctx.setTextAlign("center");
					       ctx.fillText("报价单", 300, 26);
					
					       ctx.setFillStyle("white");
					       ctx.setFontSize(14);
					       ctx.setTextAlign("left");
							
					       let headerDetails = [
					         ["User 用户:", `${this.submitArray.UserA}`, "By 报价:", `${this.submitArray.ByB}`],
					         ["Company 单位:", `${this.submitArray.CompanyA}`, "Company 单位:", `${this.submitArray.CompanyB}`],
					         ["Phone 电话:", `${this.submitArray.PhoneA}`, "Phone 电话:", `${this.submitArray.PhoneB}`],
					         ["Project 项目:", `${this.submitArray.ProjectA}`, "Date 日期:", `${this.$methods.getDateTime()}`]
					       ];
						   
						   headerDetails = this.$methods.truncateNickName(headerDetails, 11);
					       let maxFirstColWidth = 0;
					       let maxThirdColWidth = 0;
					       
					       for (let i = 0; i < headerDetails.length; i++) {
					         const firstColWidth = ctx.measureText(headerDetails[i][0]).width;
					         const thirdColWidth = ctx.measureText(headerDetails[i][2]).width;
					       
					         if (firstColWidth > maxFirstColWidth) {
					           maxFirstColWidth = firstColWidth;
					         }
					         if (thirdColWidth > maxThirdColWidth) {
					           maxThirdColWidth = thirdColWidth;
					         }
					       }
					       
					       maxFirstColWidth += 20;
					       maxThirdColWidth += 20;
					       
					       const remainingWidth = 600 - maxFirstColWidth - maxThirdColWidth;
					       const secondColWidth = remainingWidth / 2;
					       const fourthColWidth = secondColWidth;
					       
					       let startY = 40;
					       const cellHeight = 25;
					       
					       for (let i = 0; i < headerDetails.length; i++) {
					         const row = headerDetails[i];
					         ctx.setFillStyle("#E5E5E5");
							 // if (i == 0 || i == 2){
							 // 	ctx.setFillStyle("#E5E5E5");
							 // } else {
							 // 	ctx.setFillStyle("#626262");
							 // }
					       
					         // 绘制每个单元格的背景
					         ctx.fillRect(0, startY, maxFirstColWidth, cellHeight);
					         ctx.fillRect(maxFirstColWidth + secondColWidth, startY, maxThirdColWidth, cellHeight);
					         ctx.fillRect(maxFirstColWidth, startY, secondColWidth, cellHeight);
					         ctx.fillRect(maxFirstColWidth + secondColWidth + maxThirdColWidth, startY, fourthColWidth, cellHeight);
					       
					         ctx.setFillStyle("black");
					       
					         // 第一列：右对齐
					         ctx.setTextAlign("right");
					         ctx.fillText(row[0], maxFirstColWidth - 10, startY + 18);
					       
					         // 第二列：左对齐
					         ctx.setTextAlign("left");
					         ctx.fillText(row[1], maxFirstColWidth + 10, startY + 18);
					       
					         // 第三列：右对齐
					         ctx.setTextAlign("right");
					         ctx.fillText(row[2], maxFirstColWidth + secondColWidth + maxThirdColWidth - 10, startY + 18);
					       
					         // 第四列：左对齐
					         ctx.setTextAlign("left");
					         ctx.fillText(row[3], maxFirstColWidth + secondColWidth + maxThirdColWidth + 10, startY + 18);
					       
					         startY += cellHeight;
					       }
					
					       const tableHeaders = ["序号(Item)", "产品(Product)", "数量(QTY)", "单价(RMB)", "合计(RMB)"];
					       // startY += 10;
					       const headerWidths = [80, 240,  80, 100, 100];
					       let startX = 0;
					
					       // ctx.setFillStyle("#0c2238");
						   ctx.setFillStyle("#538dd6");
						   // ctx.setFillStyle("#0498ff")
					       ctx.fillRect(0, startY, 600, 40);
					
					       ctx.setFillStyle("white");
					       for (let i = 0; i < tableHeaders.length; i++) {
					         ctx.setTextAlign("center");
					         ctx.fillText(tableHeaders[i], startX + headerWidths[i] / 2, startY + 20);
					         startX += headerWidths[i];
					       }
							  // const products = firstArray;
							  let products = nums;
							  products = products.map(item => {
									item[3] = parseFloat(item[3]).toFixed(2);
									item[4] = parseFloat(item[4]).toFixed(2);
									return item;
								});
					
					       const productTableHeight = products.length * cellHeight;
					       startY += 30;
					
					       for (let i = 0; i < products.length; i++) {
					         const row = products[i];
					         startX = 0;
					         ctx.setFillStyle(i % 2 === 0 ? "#F5F5F5" : "white");
					         ctx.fillRect(0, startY, 600, cellHeight);
					
					         ctx.setFillStyle("black");
					         for (let j = 0; j < row.length; j++) {
					           if (j <= 2) {
					             ctx.setTextAlign("center");
					             ctx.fillText(row[j], startX + headerWidths[j] / 2, startY + 18);
					           } else if (j === 3 || j === 4) {
					             ctx.setTextAlign("right");
					             ctx.fillText(row[j], startX + headerWidths[j] - 10, startY + 18);
					           }
					           startX += headerWidths[j];
					         }
					         startY += cellHeight;
					       }
					
					       // ctx.setFillStyle("#0c2238");
						   ctx.setFillStyle("#538dd6");
						   // #0498ff
						   // ctx.setFillStyle("#0498ff")
					       ctx.fillRect(0, startY, 600, 40);
					       
					       ctx.setFillStyle("white");
					       ctx.setTextAlign("center");
					       ctx.fillText("总价：", 300, startY + 25);
					       ctx.setTextAlign("right");
							// console.log("价格是：",event);
							event = parseFloat(event).toFixed(2);
					       ctx.fillText(`${event}`, 590, startY + 25);
					
					       const initialHeight = 115;
					       const totalHeight = initialHeight + productTableHeight + 80;
					       this.canvasHeight = totalHeight * scale + 7;
					
					       ctx.draw(false, () => {
					         // this.generateImage(); // 在绘制完成后立即生成图片
								uni.canvasToTempFilePath({
								  canvasId: 'excelCanvas',
								  fileType: 'jpg',
								  // width: 600, // 画布的实际宽度
								  // height: this.canvasHeight / (600 / (uni.getSystemInfoSync().windowWidth - 20)), // 根据实际绘制比例调整高度
								  // destWidth: 600 , // 生成图片的宽度，通常乘以2保证清晰度
								  // destHeight: this.canvasHeight , // 生成图片的高度，通常乘以2保证清晰度
								  success: (res) => {
									  uni.saveFile({
									  	tempFilePath:res.tempFilePath,
										success: (res) => {
											console.log("最终的地址是：",res.savedFilePath);
											// return res.savedFilePath;
											resolve(res.savedFilePath)
										}
									  })
								  },
								  fail: (err) => {
								    console.error("生成图片失败：", err);
								  }
								}, this);
					       });
					     }
					   });
					});
			 },
			/**
			 * @param {string} event 传递过来一个链接
			 * @return {type} 无返回值
			 */
			enlargePhoto(event){
				uni.previewImage({
					urls:[event],
					current:event
				})
			},
			focusDataa(event){
				console.log("此时是否应该据叫：",event);
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
			keyHeight(event){
				// console.log("此时键盘的高度是456123:", event);
			},
			closeTitle(){
				this.closeFocues = true;
				let message = {
					msgbox:'',
					isTrue:false
				}
				this.$eventBus.$emit('priceChange', message);
				// this.focues = 
			},
			/**
			 * 更新对话界面的后台存储数据
			 */
			updata(event){
				// 相当于已经完成修改的数据
				console.log("此时的数据是：", event);
				let chatSession = uni.getStorageSync('ChatSession');
				const foundItem = chatSession.find(item => item.uuid === this.uuid);
				// foundItem.auther = uni.getStorageSync('nickName');
				// // if (this.msgBox[this.msgBox.length - 1].detailedPrice != ''){
				// 	foundItem.price = this.msgBox[this.msgBox.length - 1].detailedPrice;
				// 	foundItem.price = parseFloat(foundItem.price.replace("元", ""));
					
					event.price = this.msgBox[this.msgBox.length - 1].detailedPrice;
					event.price = parseFloat(event.price.replace("元", ""));
				// }
				console.log("数据是789123：",foundItem);
				uni.setStorageSync('ChatSession', chatSession);
				
				event.auther = uni.getStorageSync('nickName');
				// console.log("修改之前的数据是：", this.foundItem_item);
				// console.log("修改之后的数据是：", event);
				if (JSON.stringify(this.foundItem_item) === JSON.stringify(event)){
					console.log("相同的");
				} else{
					console.log("不相同");
					this.$methods.adjustMessage(this.$store.state.BASE_URL,event)
						.then(isActive => {
							console.log("修改项目中的数据是否成功:",isActive);
						})
						.catch(Error => {
							console.log("修改失败的原因:",Error);
						})
				}
			},
		}
	}
</script>

<style>
	/* @import 'animate.css'; */
	@import '../../CSS/CommunicationBusiness.css';
	
	
	.nm{
		
	}
</style>

