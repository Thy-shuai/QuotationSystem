<template>
	<view class="all">
		<!-- <view style="height: 200px;width: 85%;background-color: blueviolet;margin-top: 30rpx;"></view> -->
		<view class="get">
			<view class="middle">
				<view class="middle_1" style="width: 20%;height: 100%;display: flex;justify-content: flex-start;align-items: center;">
					头像
					<text style="color:red;font-size: 40rpx;margin-top: 15rpx;margin-left: 5rpx;">*</text>
				</view>
				<view class="middle_2" @tap="imageSrc" style="justify-content: space-between;">
					<image :src="ImageSrc" v-if="ImageSrc!=''" mode="aspectFill" style="height: 100rpx;width: 100rpx;border-radius: 50%;"></image>
					<image src="../../static/006.png" v-if="ImageSrc==''" mode="aspectFill" style="height: 100rpx;width: 100rpx;border-radius: 50%;"></image>
					<view style="height: 40rpx;width: 40rpx;align-items: center;display: flex;">
						<image src="../../static/right.png" mode="aspectFill" style="height: 40rpx;width: 40rpx;"></image>
					</view>
				</view>
			</view>
		</view>
			
		<view class="get">
			<view class="middle">
				<view class="middle_1" style="width: 20%;height: 100%;display: flex;justify-content: flex-start;align-items: center;">
					昵称
					<text style="color:red;font-size: 40rpx;margin-top: 15rpx;margin-left: 5rpx;">*</text>
				</view>
				<view style="display: flex;flex-direction: row;width: 200rpx;">
					<view v-if="isModify==false" @tap="getNickname" style="text-align: right;width: 100%;height: 100%;font-size: 30rpx;">{{nickname}}</view>
					  <u--input
					  v-if="isModify==true"
					    placeholder="请输入新昵称"
						placeholderStyle="font-size:27rpx;"
					    v-model="nickname"
						style=""
						maxlength="5"
						@blur="nickNameHandle"
					  ></u--input>
				</view>
			</view>
		</view>
		<view class="get">
			<view class="middle">
				<text class="middle_1">性别</text>
				<view style="justify-content: center;display: flex;flex-direction: row;width: 100rpx;height: 100%;justify-content: flex-end;">
				   <u-radio-group
				     v-model="radiovalue12"
				     placement="row"
				     @change="groupChange"
				   >
				     <u-radio
				       v-for="(item, index) in radiolist1"
				       :key="index"
				       :label="item.name"
				       :name="item.name"
				       @change="radioChange"
				     >
				     </u-radio>
				   </u-radio-group>
				</view>
			</view>
		</view>
		<view class="get">
			<view class="middle">
				<text class="middle_1">职位</text>
				<!-- <label >职位</label> -->
				<view style="display: flex;flex-direction: row;width: 200rpx;">
					<!-- <view v-if="job==''" @tap="show=true" style="text-align: right;width: 100%;height: 100%;font-size: 30rpx;">无</view> -->
					<view style="text-align: right;width: 100%;height: 100%;font-size: 30rpx;color: #bfbfbf;">{{job}}</view>
				</view>
			</view>
		</view>
		<view class="get">
			<view class="middle">
				<text class="middle_1">销售等级</text>
				<view style="display: flex;flex-direction: row;width: 200rpx;">
					<view style="text-align: right;width: 100%;height: 100%;font-size: 30rpx;color: #bfbfbf;">{{level}}</view>
					<!-- <view v-if="level!=''" @tap="show1=true" style="text-align: right;width: 100%;height: 100%;font-size: 30rpx;">{{level}}</view> -->
				</view>
			</view>
		</view>
		<view class="bottmo">
			<u-button type="primary" v-if="is_sumbit==true" text="修改" @tap="submit"  style="margin-top: 40rpx;height: 100rpx;width: 85%;border-radius: 30rpx;"></u-button>
			<u-button type="primary" v-if="is_sumbit!=true" text="修改" style="margin-top: 40rpx;height: 100rpx;width: 85%;border-radius: 30rpx;opacity: 0.6;"></u-button>
		</view>
		
		<!-- <label for="">姓名 <span style="color:red;">*</span></label> -->
		<u-picker :show="show" :columns="columns" @cancel="show=false" @confirm="positionName"></u-picker>
		<u-picker :show="show1" :columns="columns1" @cancel="show1=false" @confirm="positionName1"></u-picker>
		
	</view>
</template>


<script>
	export default {
		data() {
			return {
				job:'', // 工作职位
				show: false,
				columns: [
					['员工', '主管', '经理']
				],
				level:'', // 销售等级
				show1: false,
				columns1: [
					['青铜' ,'白银', '黄金', '铂金']
				],
				
				nickname:'梦年',
				ImageSrc:'',
				isModify:false,
				 radiolist1: [{
					 name: '男',
					 disabled: false
				   },
					 {
					   name: '女',
					   disabled: false
					 },
				   ],
				   // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				   radiovalue12: '',
				  sex:'', // 性别
				  imageId:''
			}
		},
		computed:{
			is_sumbit(){
				return this.ImageSrc!='' && this.nickname!=''
			}
		},
		onShow() {
			// 头像
			let avatarUrl = uni.getStorageSync('avatarUrl');
			console.log("头像：", avatarUrl);
			this.ImageSrc = avatarUrl;
			
			// 名字
			let name = uni.getStorageSync('nickName');
			console.log("昵称：", name);
			this.nickname = name;
			
			// 性别
			let sex = uni.getStorageSync('sex');
			console.log("性别是：", sex);
			if (sex == 0)this.radiovalue12 = '女';
			else this.radiovalue12 = '男';
			console.log("radiovalue1的值是：",this.radiovalue1);
			if (sex.length != 0)this.radiovalue1 = sex;
			
			// 职位
			let jobb = uni.getStorageSync('job');
			this.job = (this.columns[0])[jobb-1];
			console.log("职位：", jobb);
			
			// 销售等级
			let levell = uni.getStorageSync('level');
			this.level = (this.columns1[0])[levell - 1];
		},
		methods: {
			async submit(){
				try{
					console.log("id是：",this.imageId);
					uni.showLoading({
						title: '正在提交'
					})
					let res = await uni.request({
						url:`${this.$store.state.BASE_URL}/info/UpdataInfo`,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						},
						data:{
							username:this.nickname,
							id:uni.getStorageSync('imageId'),
							sex:this.sex,
							level:uni.getStorageSync('job'),
							rank:uni.getStorageSync('level'),
						}
					})
					if (res.data.status != 100){
						// 没有获取成功 直接抛出异常
						throw new Error(res.data.message);
					}
					console.log("成功的数据是：",res);
					let res2 = await uni.request({
						url:`${this.$store.state.BASE_URL}/info/userInfo`,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						}
					})
					if (res2.data.status != 100){
						throw new Error(res2.data.message);
					}
					console.log("获取的头像是:",res2);
					uni.setStorageSync('nickName', res2.data.data.username);
					uni.setStorageSync('avatarUrl', res2.data.data.avatar);
					console.log("获取的头像是：", res2.data.data.avatar);
					uni.setStorageSync('sex', res2.data.data.sex);
					// 职位
					uni.setStorageSync('job', res2.data.data.level);
					// 销售等级
					uni.setStorageSync('level', res2.data.data.rank);
					uni.$u.toast('修改成功');
				}catch(e){
					//TODO handle the exception
					uni.hideLoading();
					if (err.message === undefined){
						// 断网状态
						uni.$u.toast('网络开小差了~');
					} else {
						// 处理抛出的错误
						uni.$u.toast(`${e.message}`);
					}
				}
				// uni.request({
				// 	url:`${this.$store.state.BASE_URL}/info/UpdataInfo`,
				// 	method:'post',
				// 	header:{
				// 	  satoken:uni.getStorageSync('token')
				// 	},
				// 	data:{
				// 		username:this.nickname,
				// 		Id:this.imageId,
				// 		sex:this.sex,
				// 		level:uni.getStorageSync('job'),
				// 		rank:uni.getStorageSync('level'),
				// 	},
				// 	success: (res) => {
				// 		uni.hideLoading();
				// 		console.log("上传成功：",res);
				// 		if (res.data.status == 100){
				// 			uni.$u.toast('修改成功');
				// 		}
				// 	},
				// 	fail: (res) => {
				// 		uni.hideLoading();
				// 		console.log("上传失败",res);
				// 	}
				// })
			},
			nickNameHandle(){
				let index = this.nickname;
				this.nickname = index.trim();
				console.log("需要处理的名字是：",this.nickname);
				if (this.nickname.length != 0){
					this.isModify = false;
				}
				// this.isModify = false;
			},
			groupChange(n) {
				console.log('groupChange', n);
				this.radiovalue1 = n;
				if (n == '男'){
					this.sex = 1;
				}
				if (n == '女'){
					this.sex = 0;
				}
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			positionName(e){
				this.show = false;
				console.log("当前数据是：",e);
				console.log("数据下标是：",e.indexs[0]);
				console.log("具体数据是：",(this.columns[0])[e.indexs[0]]);
				this.job = (this.columns[0])[e.indexs[0]];
			},
			positionName1(e){
				this.show1 = false;
				this.level = (this.columns1[0])[e.indexs[0]];
			},
			getNickname(){
				this.isModify = true;
				this.nickname = '';
			},
			imageSrc(){
				console.log("修改头像");
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res.tempFilePaths);
						console.log("选取的头像是：",res.tempFilePaths[0]);
						// uni.setStorageSync('avatarUrl', this.ImageSrc);
						uni.showLoading({
							title: '头像修改中~'
						})
						uni.uploadFile({
							url: `${this.$store.state.BASE_URL}/info/UploadAvatar`, // 你的上传地址
							name:'files',
							filePath:res.tempFilePaths[0],
							header:{
							  satoken:uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								uni.hideLoading();
								console.log("上传成功：", uploadFileRes);
								let index = JSON.parse(uploadFileRes.data);
								if (index.status == 100){
									this.ImageSrc = res.tempFilePaths[0];
									// uni.$u.toast('修改成功');
									this.imageId = Object.keys(index.data)[0];
									uni.setStorageSync('imageId', this.imageId);
								} else {
									uni.$u.toast('修改失败，请重试');
								}
								// this.images.push(Object.keys(index.data)[0]);
							},
							fail: (error) => {
								uni.hideLoading();
								uni.$u.toast('网络异常');
								console.error(error);
							}
						});
						// uni.setStorageSync('avatarUrl', this.ImageSrc);
					}
				});
			}
		}
	}
</script>


<style>
	.all{
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		background-color: #f4f6f7;
	}
	.top{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200px;
		width: 85%;
		/* background-color: blueviolet; */
		margin-top: 30rpx;
	}
	.topImage{
		height: 180rpx;
		width: 180rpx;
		background-color: #f0f0f0;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.top_text{
		margin-top: 50rpx;color: rgb(0,0,0);
		font-size: 32rpx;
		font-weight: 700;
		text-align: left;
		font-family: PingFangSC-bold
	}
	.get{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 85%;
		/* height: 224rpx; */
		height: auto;
		line-height: 40rpx;
		border-radius: 20rpx;
		background-color: rgba(255,255,255,1);
		color: rgba(16,16,16,1);
		font-size: 36rpx;
		text-align: center;
		font-family: Roboto;
		border: 1px solid rgba(255,255,255,1);
		margin-top: 30rpx;
	}
	/* .get :active{
		background-color: #f0f0f0;
	} */
	.middle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 112rpx;
		width: 95%;
	}
	.middle_1{
		color: rgb(0,0,0);
		font-size: 34rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.middle_2{
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 150rpx;
		display: flex;
		align-items: center;
		transition: all 0.3s;
	}
	.middle_2:active{
		transform: scale(0.9);
	}
	.bottmo{
		display: flex;
		width: 100%;
		height: 100px;
		align-items: center;
		justify-content: center;
	}
	.bottom_button{
		margin-top: 40rpx;
		height: 100rpx;
		width: 85%;
		border-radius: 30rpx;
	}
</style>