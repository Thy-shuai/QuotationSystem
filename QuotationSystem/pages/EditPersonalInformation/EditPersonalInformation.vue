<template>
	<page-meta :root-font-size="26.66667+'vw'"></page-meta>
	<!-- padding-top: 20rpx; -->
	<view class="all">
		<view class="get" style="margin-top: 50rpx;">
				<image src="../../static/addCustomer/rentou.png" mode="" class="icon"></image>
				<text style="color: red;font-size: 30rpx;">*</text>
				<u--input
					style="margin-left: 25rpx;"
				    placeholder="姓名(必填)"
				    v-model="name"
					maxlength="3"
					clearable
					@blur="foces"
				  ></u--input>
		</view>
		<view class="get">
				<image src="../../static/addCustomer/telephone.png" mode="" class="icon" style="opacity: 0.3;"></image>
				<text style="color: red;font-size: 30rpx;">*</text>
				<u--input
					type="tel"
					style="margin-left: 25rpx;"
				    placeholder="手机号(必填)"
				    v-model="telephone"
					clearable
					@blur="foces('手机')"
				  ></u--input>
		</view>
	<!-- 	<view class="get">
				<image src="../../static/addCustomer/leibie.png" mode="" class="icon" style="opacity: 0.3;"></image>
				<u-radio-group 
				    v-model="radiovalue1"
					style="margin-left: 25rpx;"
				    iconPlacement="left">
					<u-radio activeColor="" v-for="(item, index) in people" :key="index" :label="item.name"
      :name="item.name" @change="radioChange(item.name)"></u-radio>
				</u-radio-group>
		</view> -->
		<view class="get">
				<image src="../../static/addCustomer/company.png" mode="" class="icon"></image>
				<u--input
					type="text"
					style="margin-left: 25rpx;"
				    placeholder="公司"
				    v-model="company"
					clearable
					@blur="foces"
				  ></u--input>
		</view>
		<view class="get">
				<image src="../../static/addCustomer/career.png" mode="" class="icon"></image>
				<u--input
					type="text"
					style="margin-left: 25rpx;"
				    placeholder="职位"
				    v-model="position"
					clearable
					@blur="foces"
				  ></u--input>
		</view>
		<view class="get">
				<image src="../../static/addCustomer/wx.png" mode="" class="icon"></image>
				<u--input
					type="text"
					style="margin-left: 25rpx;"
				    placeholder="微信号"
				    v-model="weixin"
					clearable
					@blur="foces"
				  ></u--input>
		</view>
		<view class="get">
				<image src="../../static/addCustomer/youxiang.png" mode="" class="icon"></image>
				<u--input
					type="text"
					style="margin-left: 25rpx;"
				    placeholder="邮箱号"
				    v-model="email"
					clearable
					@blur="foces"
				  ></u--input>
		</view>
		<view style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100rpx;margin-top: 30rpx;">
			<u-button v-if="isActive==true" type="primary" text="保存" style="width: 90%;background-color: cadetblue;" @tap="submit"></u-button>
			<u-button v-if="isActive!=true" type="primary" text="保存" style="width: 90%;background-color: cadetblue;opacity: 0.6;" ></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				showRedBorder: false,
				telephone:'',
				company:'',
				position:'',
				weixin:'',
				email:'',
				title:'',
				show: false,
				people: [
					{
						name:'我的客户',
						disabled: false
					},
					{
						name:'共享客户',
						disabled: false
					},
					{
						name:'某人的客户',
						disabled: false
					}
				],
				radiovalue1:'我的客户',
				RecommendedBy:[
					[],
				],
				contacts:[
				],
				id:'',
				src:'',
				obj:'',
				userid: '',
				status: ''
			}
		},
		computed:{
			isActive(){
				let pattern = /^1[3-9]\d{9}$/;
				if (pattern.test(this.telephone)&&this.name!=''){
					return true
				}
				return false;
			}
		},
		onLoad(options) {
		  if ('param' in options) {
		    var obj = JSON.parse(decodeURIComponent(options.param));
			console.log("传递过来需要查看的信息是：", obj);
			this.obj = obj;
			this.name = obj.name;
			this.telephone = obj.phone;
			this.company = obj.company;
			this.position = obj.position;
			this.weixin = obj.weixin;
			this.email = obj.email;
			this.id = obj.id;
			this.src = obj.src;
			this.userid = obj.userid;
			this.status = obj.status;
			// this.message_person.push(obj);
			// console.log("传递过来的数据是：",this.message_person);
		  } else {
			  // console.log("数据传递失败！");
		  }
		},
		onShow() {
			// this.RecommendedBy[0] = uni.getStorageSync('RecommendedBy');
			// if (this.RecommendedBy[0]=='')this.RecommendedBy[0] = [];
			// console.log("输出信息时：",this.RecommendedBy[0]);
			this.contacts = uni.getStorageSync('Customer');
			if (this.contacts == '')this.contacts = []
			// console.log("contacts值时：",this.contacts);
		},
		methods: {
			radioChange(event){
				// console.log("选中的是：",event);
				this.title = event;
			},
			foces(e){
				uni.hideKeyboard();
				if(e == '手机'){
					// console.log("输入的手机号是：",this.telephone);
					 let pattern = /^1[3-9]\d{9}$/;
					 if (pattern.test(this.telephone) != true){
						uni.showModal({
							title: '提示',
							content: '手机号输入不正确！',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									this.telephone = ''
								} else if (res.cancel) {
									console.log('用户点击取消');
									this.telephone = ''
								}
							}
						});
					 }
				}
			},
			submit(){
				if (this.name != '' && this.telephone != ''){
					let nam_src = this.name[0];
					let obj = {
						src:nam_src,  // 头像
						name:this.name,
						company:this.company,
						position:this.position,
						weixin:this.weixin,
						phone:this.telephone,
						email:this.email,
					}
					if (this.company == '')obj.company='无';
					if (this.position == '')obj.position='无';
					if (this.weixin == '')obj.weixin='无';
					if (this.email == '')obj.email='无'
					console.log("职位：",obj.position);
					let message = {
						title:this.radiovalue1,
						child:obj
					}
					// uni.showToast({
					// 	title: '成功',
					// 	duration: 500
					// });
					let suiji = Math.floor(Math.random() * 14) + 1;
					var objj = {
						id:this.id,
						name:this.name,
						src:this.src,
						company:this.company,
						position:this.position,
						weixin:this.weixin,
						phone:this.telephone,
						email:this.email,
						userid:this.userid,
						status:this.status
					}
					console.log("原始数据：",this.obj);
					console.log("修改之后的数据:",objj);
					if (JSON.stringify(this.obj) === JSON.stringify(objj)){
						console.log("相似");
						uni.switchTab({
							url: '/pages/Customer/Customer'
						});
						return ;
					}
					// 存在一个问题,如果用户没有修改数据的时候不需要请求接口
					uni.showLoading({
						title:"正在修改中~"
					})
					this.$methods.adjustCustomer(this.$store.state.BASE_URL, objj)
						.then(isActive => {
							console.log("修改客户信息是否成功:", isActive);
							return this.$methods.getCustomer(this.$store.state.BASE_URL);
						})
						.then(isCustomer => {
							console.log("重新获取客户数据成功：",isCustomer);
							uni.hideLoading();
							uni.switchTab({
								url: '/pages/Customer/Customer'
							});
						})
						.catch(Error => {
							uni.hideLoading();
							console.log("修改客户信息失败:",Error);
						})
				}
			}
		}
	}
</script>

<style lang="scss">
	.all{
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #f2f3f7;
		flex-direction: column;
	}
	.get{
		width: 90%;
		height: 100rpx;
		background-color: white;
		// margin-top: 50rpx;
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
	}
	.icon{
		margin-left: 25rpx;height:70rpx;width: 70rpx;opacity: 0.5;
	}
</style>
