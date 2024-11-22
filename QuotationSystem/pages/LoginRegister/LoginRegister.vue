<template>
	<view class="all">
		<view style="display: flex;height: 90%;width: 80%;flex-direction: column;">
			<view style="height: 90rpx;width: 100%;margin-bottom: 50rpx;">
				<u--input
					placeholder="请输入您的电话号码(必填)"
					type="number"
					prefixIcon="phone"
					v-model="iphone"
					:adjustPosition="false"
					prefixIconStyle="font-size: 30px;color: #909399"
					@blur="check(iphone)"
					class="get"
					clearable
				></u--input>
			</view>
			<view style="height: 90rpx;width: 100%;margin-bottom: 50rpx;">
				<u--input
					placeholder="账号密码(必填且6位到12位)"
					type="password"
					prefixIcon="lock"
					v-model="password"
					:adjustPosition="false"
					prefixIconStyle="font-size: 30px;color: #909399"
					@blur="foces(password)"
					class="get"
					clearable
				></u--input>
			</view>
			<view style="height: 90rpx;width: 100%;margin-bottom: 50rpx;">
				<u--input
					placeholder="请确认你的账号密码(必填)"
					type="password"
					prefixIcon="lock"
					:adjustPosition="false"
					v-model="verify_password"
					prefixIconStyle="font-size: 30px;color: #909399"
					@blur="aginefoces(verify_password)"
					class="get"
					clearable
				></u--input>
			</view>
			<view style="height: 90rpx;width: 100%;margin-bottom: 20rpx;">
				<view style="display: flex;align-items: center;" class="get">
					<u--input
						placeholder="请输入短信验证码(必填)"
						prefixIcon="lock-open"
						type="password"
						v-model="code"
						prefixIconStyle="font-size: 30px;color: #909399"
						style="height: 100%;width: 60%;"
						@blur="check_code(code)"
						:adjustPosition="false"
					></u--input>
					<view class="ziti" v-if="cout_true==false" @tap="getCode">获取验证码</view>
					<view class="ziti" v-if="cout_true==true" >倒计时：{{cout}}</view>
				</view>
			</view>
			<u-button type="primary" v-if="!allValuesExist" text="注册" style="margin-top: 80rpx;opacity: 0.3;"></u-button>
			<u-button type="primary" v-if="allValuesExist" @tap="$u.debounce(register,250)" text="注册" style="margin-top: 80rpx;"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iphone:'',
				correct:'',
			    password:'',
			    verify_password:'',
			    code:'',
				submit:false,
				base_url:'',
				cout:60,
				cout_true:false,
				url_message:''
				
			}
		},
		computed: {
			allValuesExist() {
				return this.iphone && this.password && this.verify_password && this.code;
			}
		},
		onLoad(options) {
			if ('param' in options){
				var obj = JSON.parse(decodeURIComponent(options.param));
				console.log("传输的数据是：",obj);
				this.base_url = this.$store.state.BASE_URL;
				if (obj == '注册'){
					this.url_message = `${this.base_url}/auth/register`
				} else {
					this.url_message = `${this.base_url}/auth/lose`
				}
			}
		},
		onShow() {
			this.base_url = this.$store.state.BASE_URL;
			console.log("链接是：",this.base_url);
		},
		methods: {
		   checkAllValues() {
				// 如果所有值都存在，则设置submit为true，否则为false
				console.log("开始判断");
				this.submit = this.allValuesExist;
			},
			check_code(){
				// uni.showModal({
				// 	title: '提示',
				// 	content: '验证码不能为空',
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 		} else if (res.cancel) {
				// 		}
				// 	}
				// })
			},
			check(event){
				if (this.iphone == '')return;
				let reg = /^1[3-9]\d{9}$/;
				if (!reg.test(event)){
					uni.showModal({
						title: '提示',
						content: '手机号格式错误，请输入正确的手机号',
						success: function (res) {
							if (res.confirm) {
								// this.correct = false
							} else if (res.cancel) {
								// this.correct = false
							}
						}
					})
					this.iphone = '';
				} else {
					
				}
				
			},
			foces(event){
				uni.hideKeyboard();
				if (this.password == '')return;
				if (this.password.length < 6 || this.password.length > 12){
					uni.showModal({
						title: '提示',
						content: '密码必须处于6位到12位之间！',
						success: function (res) {
							if (res.confirm) {
							} else if (res.cancel) {
							}
						}
					})
					this.password = '';
				} else {
					
				}
			},
			aginefoces(event){
				if (event != this.password){
					uni.showModal({
						title: '提示',
						content: '两次密码输入不一致，请重新输入！',
						success: function (res) {
							if (res.confirm) {
							} else if (res.cancel) {
							}
						}
					})
					this.password = '',
					this.verify_password = ''
				} else {
					
				}
			},
			getCode(){
				if (this.iphone == ''){
					uni.showModal({
						title: '提示',
						content: '电话号码不能为空！',
						success: function (res) {
							if (res.confirm) {
							} else if (res.cancel) {
							}
						}
					})
				} else {
					// uni.showLoading({
					// 	title: '正在获取验证码'
					// })
					uni.request({
						url:`${this.base_url}/auth/sendMessage?iphone=${this.iphone}`,
						method:'GET',
						success: (res) => {
							console.log("验证码是：",res);
							if (res.data.status == 100){
								uni.hideLoading();
								uni.$u.toast('验证码已发送');
								this.cout_true = true;
								let timer = setInterval(()=>{
									if (this.cout<=0){
										clearInterval(timer)
										this.cout = 60;
										this.cout_true = false;
									} else {
										// console.log("数据是：",this.cout);
										this.cout--
									}
								},1000)
							}else {
								uni.$u.toast('验证码获取失败');
							}
						},
						fail: (res) => {
							this.cout_true = false;
							uni.$u.toast('网络开小差了~');
							// console.log("验证码获取失败！",res);
						}
					})
				}
				
			},
			register(){
				if (this.iphone!='' & this.password!='' & this.verify_password!='' & this.code!=''){
					console.log("开始提交");
					console.log("发送的链接是：",this.url_message);
					uni.request({
						url:this.url_message,
						method:'POST',
						data:{
							iphone:this.iphone,
							password:this.password,
							verify_password:this.verify_password,
							code:this.code
						},
						success: (res) => {
							console.log("注册成功:",res);
							if (res.data.status == 100){
								uni.$u.toast('注册成功');
								uni.navigateTo({
									url:'/pages/Login/Login'
								})
							} else {
								uni.showModal({
									title: '提示',
									content: `${res.data.message}`,
									success: function (res) {
										if (res.confirm) {
										} else if (res.cancel) {
										}
									}
								})
							}
						},
						fail: (res) => {
							uni.$u.toast('网络开小差了~');
							console.log("注册失败：",res);
						}
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '请补全基本信息！',
						success: function (res) {
							if (res.confirm) {
							} else if (res.cancel) {
							}
						}
					})
				}
			},
		}
	}
</script>

<style>
	.all{
		display: flex;
		justify-content: center;
		align-items: center;
		/* justify-content: center; */
		width: 100%;
		height: 100vh;
		background-color: #f0f0f0;
	}
	.get{
		margin-top: 20rpx;
		border: 1px solid #ccc;
		border-radius: 10rpx; /* 可选：添加圆角 */
		padding: 5px; /* 可选：添加内边距 */
		height: 100%;
		background-color: white;
		transition: 0.3s;
	}
	.get:focus-within{
		border: 1px solid blue;
	}
	.ziti{
		color:royalblue;
		font-size: 25rpx;
		transition: all 0.3s;
	}
	.ziti:active{
		transform: scale(1.2);
	}
</style>
