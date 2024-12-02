<template>
	<view class="all">
		<view class="Image_icon">
			<image src="../../static/006.png" mode="widthFix" style="width: 40%;"></image>
		</view>
		<view style="height: 40%;width: 90%;--animate-duration:500ms;" v-if="auth_login == false" class="animate__animated animate__fadeInLeft">
			<view style="width: 100%;display: flex;justify-content: center;" class="zi_style">手机号码登录</view>
		  <u--input
				placeholder="请输入您的电话号码"
				type="number"
				prefixIcon="phone"
				v-model="iphone"
				prefixIconStyle="font-size: 25px;color: #909399"
				class="get"
				style="height: 80rpx;"
				:adjustPosition="true"
				clearable
			></u--input>
			<view style="display: flex;height: 80rpx;align-items: center;" class="get">
				<u--input
					placeholder="请输入短信验证码"
					prefixIcon="lock"
					v-model="code"
					prefixIconStyle="font-size: 25px;color: #909399"
					style="height: 100%;width: 60%;"
					@blur="check_code(code)"
				></u--input>
				<view class="ziti" v-if="cout_true==false&&all" @tap="$u.debounce(getCode,250)">获取验证码</view>
				<view v-if="cout_true==false&&!all" style="color: black;opacity: 0.3;font-size: 25rpx;">获取验证码</view>
				<view style="color:royalblue;font-size: 25rpx;" v-if="cout_true==true">倒计时：{{cout}}</view>
			</view>
			<u-button type="primary" v-if="!allValuesExist" text="登录" style="margin-top: 80rpx;opacity: 0.3;"></u-button>
			<u-button type="primary" v-if="allValuesExist"  text="登录" @tap="$u.debounce(login,250)" style="margin-top: 80rpx;"></u-button>
		</view>
		
		
		<!-- <view class="bottmo">
			<view class="bottmo_one" @tap="jump(item.name)" v-for="(item, index) in list_message" :key="index" >
				<view class="bottmo_two">
					<image :src="item.src" mode="aspectFit" style="height: 100rpx;width: 100rpx;"></image>
				</view>
				<view style="font-size: 20rpx;margin-top: 20rpx;opacity: 0.6;">{{item.name}}</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 新的登录方式
				canCallLogin:true,
				base_url:'',
				
				auth_login:false,
				iphone:'',  // 手机号验证码登录 手机号
				code:'',    // 手机号验证码登录 短信验证码
				cout_true:false,
				// refCode: null,
				cout: 60,
				base_url:'',
				textColor:'#616367',
				image:'',  // 图片验证码显示图片
				image_key:'',  //图片验证码key
				iphone1:'', // 账号密码登录 手机号
				password:'', // 账号密码登录 密码
				VerificationCode:'', // 账号密码登录 图片验证码
				list_message:[
					{
						name:'手机号码一键登录',
						src:require('../../static/phone.png'),
						now:true
					},
					{
						name:'微信登录',
						src:require('../../static/weixin.png'),
						now:false
					}
				],
				isWeixin:false  // 是否点击微信登录
			}
		},
		computed: {
			// 手机号验证码电话号码
			all() {
				let reg = /^1[3-9]\d{9}$/;
				return reg.test(this.iphone);
			},
			allValuesExist() {
				return this.iphone && this.code;
			},
			allValuesExistt() {
				return this.iphone1 && this.password && this.VerificationCode;
			}
		},
		onLoad() {
			// this.phoneLogin();
			// uni.navigateTo({
			// 	url:'/pages/LoginImage/LoginImage'
			// })
		},
		onShow() {
			// console.log("手机号码验证码登录45612");
			this.base_url = this.$store.state.BASE_URL;
			console.log("地址是：",this.base_url);
			this.test();
			// uni.request({
			// 	url:`${this.base_url}/auth/validate`,
			// 	method:'POST',
			// 	success: (res) => {
			// 		console.log("图片验证码：",res);
			// 		this.image = 'data:image/png;base64,' + res.data.data.imageBase64;
			// 		this.image_key = res.data.data.key;
			// 	},
			// 	fail: (res) => {
			// 		console.log("图片验证码失败：",res);
			// 		uni.$u.toast('网络开小差了~');
			// 	}
			// })
		},
		methods: {
			// 获取验证码
			async test() {
			    try {
			        const response = await uni.request({
			            url:`${this.base_url}/auth/validate`,
			            method:'POST',
			        });
			        console.log("获取到的数据是：", response);
			        if (response.data.status === 100) {
			            this.image = 'data:image/png;base64,' + response.data.data.imageBase64;
			            this.image_key = response.data.data.key;
			        } else {
			            throw new Error('验证码获取异常');
			        }
			    } catch (e) {
					if (e.message === undefined){
						uni.$u.toast('网络开小差了~');
					} else {
						uni.$u.toast(`${e.message}`);
					}
			        console.error("try捕获的数据是：", e.message);
			    }
			},

			// 最基本的跳转
			bian(index){
				for (let i = 0;i<this.list_message.length;i++){
					this.list_message[i].now = false;
					
				}
				for (let i = 0;i<this.list_message.length;i++){
					if (this.list_message[i].name == index){
						// console.log("更改的是：",this.list_message[i].name,index);
						this.list_message[i].now = true;
						console.log(this.list_message);
					}
				}
			},
			jump(event){
				console.log("此时点击的是：",event);
				if (event == '手机号码一键登录'){
					// 调起手机号
					this.phoneLogin()
				}
				if (event == '微信登录'){
					// 调起微信登录
					this.weixinLogin()
				}
			},
			check_iphone(event,index){
				if (event == '')return;
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
					if (index == 1){
						this.iphone = ''
					} else {
						this.iphone1 = ''
					}
				}
			},
			check_code(event){
				if (this.code == '')return;
			},
			getCode() {
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
					uni.showLoading({
						title: '正在获取验证码'
					})
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
										this.cout_true = false
									} else {
										this.cout--
									}
								},1000)
							}else {
								uni.hideLoading();
								uni.$u.toast('验证码获取失败');
								if (res.data.message == '未激活用户'){
									console.log("实际是未激活用户");
									uni.navigateTo({
										url:'/pages/LoginImage/LoginImage'
									})
								}
								this.cout_true = false
							}
						},
						fail: (res) => {
							uni.hideLoading();
							uni.$u.toast('网络开小差了~');
							this.cout_true = false
						}
					})
				}
			},
			async login(){
				const self = this;
				// console.log("节流");
				uni.showLoading({
					title: '正在登录',
				})
				uni.request({
					url:`${this.base_url}/auth/test_Login`,
					method:'GET',
					success: (res) => {
						console.log("登录成功:",res);
						if (res.data.status == 100){
							uni.hideLoading();
							// 存储token值
							uni.$u.toast('登录成功');
							let token = res.data.data.satoken;
							console.log("token的值是：",token);
							uni.setStorageSync('token',token)
							self.getUserInformation(); // 获取头像信息
							// this.initializedData();
							this.initializedData();
							uni.switchTab({
								url: '/pages/Intelligent/Intelligent'
							});
							// this.check_activation(token).then(isActive => {
							//     console.log("是否是未激活用户：", isActive);
							//     if (isActive) {
							//         // 执行未激活时的逻辑
							// 		const param = encodeURIComponent(JSON.stringify(token));
							// 		uni.navigateTo({
							// 			url:`/pages/LoginImage/LoginImage?param=${param}`
							// 		})
							//     } else {
							// 		uni.setStorageSync('token',token)
							// 		uni.switchTab({
							// 			url: '/pages/Intelligent/Intelligent'
							// 		});
							// 	}
							// 	// 跳转到正常使用页面
								
								
							// }).catch(error => {
							//     console.error("检测激活状态失败：", error);
							// });
						} else {
							uni.hideLoading();
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
						console.log("登录失败：", res);
					}
				})
				
				// uni.request({
				// 	url:`${this.base_url}/auth/One_vslidata_login`,
				// 	method:'POST',
				// 	data:{
				// 		// iphone:this.iphone,
				// 		code:this.code,
				// 		phoneNumber:this.iphone
				// 	},
				// 	success: (res) => {
				// 		// console.log("登录是否成功：",res);
				// 		if (res.data.status == 100){
				// 			uni.hideLoading();
				// 			// 存储token值
				// 			uni.$u.toast('登录成功');
				// 			let token = res.data.data.satoken;
				// 			console.log("token的值是：",token);
				// 			uni.setStorageSync('token',token)
				// 			self.getUserInformation();
				// 			uni.switchTab({
				// 				url: '/pages/Intelligent/Intelligent'
				// 			});
				// 			// this.check_activation(token).then(isActive => {
				// 			//     console.log("是否是未激活用户：", isActive);
				// 			//     if (isActive) {
				// 			//         // 执行未激活时的逻辑
				// 			// 		const param = encodeURIComponent(JSON.stringify(token));
				// 			// 		uni.navigateTo({
				// 			// 			url:`/pages/LoginImage/LoginImage?param=${param}`
				// 			// 		})
				// 			//     } else {
				// 			// 		uni.setStorageSync('token',token)
				// 			// 		uni.switchTab({
				// 			// 			url: '/pages/Intelligent/Intelligent'
				// 			// 		});
				// 			// 	}
				// 			// 	// 跳转到正常使用页面
								
								
				// 			// }).catch(error => {
				// 			//     console.error("检测激活状态失败：", error);
				// 			// });
				// 		} else {
				// 			uni.hideLoading();
				// 			uni.showModal({
				// 				title: '提示',
				// 				content: `${res.data.message}`,
				// 				success: function (res) {
				// 					if (res.confirm) {
				// 					} else if (res.cancel) {
				// 					}
				// 				}
				// 			})
				// 		}
				// 	},
				// 	fail: (res) => {
				// 		uni.hideLoading();
				// 		uni.$u.toast('网络开小差了~');
				// 	}
				// })
			},
			async initializedData(){
				try{
					// 加载会话数据
					let res1 = await uni.request({
						url:`${this.$store.state.BASE_URL}/ver/LoadSession`,
						// url:
						method:'GET',
						header:{
							satoken:uni.getStorageSync('token')
						}
					})
					console.log("res1的值是：",res1);
					if (res1.data.status != 100){
						console.log("456");
						// 抛出异常的错误
						throw new Error(`${res1.data.message}`);
					}
					if (res1.data.data.length > 0){
						// uni.getStorageSync('ChatSession');
						// 对话控件进行赋值
						console.log("从后端获取的会话组件的值是：",res1.data.data);
						// res1.data.data.forEach(item => {
						// 	item.date = this.$methods.timestampToDate(item.date);
						// 	console.log("时间是:",item.date);
						// })
						// console.log("修改完之后会话组件的值是：", res1.data.data);
						uni.setStorageSync('ChatSession', res1.data.data);
						res1.data.data.forEach(item => {
							this.$methods.getRecords(this.$store.state.BASE_URL, item.uuid, 0)
								.then(isActive => {
									console.log("报价记录获取成功:",isActive);
									return this.$methods.getCustomer(this.$store.state.BASE_URL)
								})
								.then(isCustomer => {
									console.log("客户信息获取成功");
								})
								.catch(Error => {
									console.log("记录获取失败:", Error);
									// return false;
								})
						})
					}
					// console.log("此时会话的消息记录是：",res1.data.data);
					// res1.data.data.forEach(item => {
					// 	this.$methods.getRecords(this.$store.state.BASE_URL, item.uuid, 0)
					// 		.then(isActive => {
					// 			console.log("报价记录获取成功:",isActive);
					// 			return this.$methods.getCustomer(this.$store.state.BASE_URL)
					// 		})
					// 		.then(isCustomer => {
					// 			console.log("客户信息获取成功");
					// 		})
					// 		.catch(Error => {
					// 			console.log("记录获取失败:", Error);
					// 			// return false;
					// 		})
					// })
					return true;  // 正常逻辑下返回
					
				}catch(err){
					console.log("错误信息是：",err);
					//TODO handle the exception
					return false;  // 异常逻辑下返回
					// uni.hideLoading();
					// this.phoneLogin();
					// if (err.message === undefined){
					// 	// 断网状态
					// 	uni.$u.toast('网络开小差了~');
					// } else {
					// 	// 处理抛出的错误
					// 	uni.$u.toast(`${err.message}`);
					// }
				}
			},
			replace_image(){
				uni.showLoading({
					title: '正在获取图片',
				})
				uni.request({
					url:`${this.base_url}/auth/validate`,
					method:'POST',
					success: (res) => {
						if (res.data.status == 100){
							uni.hideLoading();
							uni.$u.toast('获取成功！');
							console.log("获取的图片验证码是：",res);
							this.image = 'data:image/png;base64,'+res.data.data.imageBase64;
							this.image_key = res.data.data.key;
						} else {
							uni.hideLoading();
							uni.$u.toast('获取失败！');
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
					fail(res) {
						uni.hideLoading();
						uni.$u.toast('网络开小差了~');
					}
				})
			},
			check_password(event){
				console.log(event.length);
				if (event == '')return ;
				if (event.length<6 || event.length>12){
					uni.showModal({
						title: '提示',
						content: '密码必须为6位到12位！',
						success: function (res) {
							if (res.confirm) {
							} else if (res.cancel) {
							}
						}
					})
					this.password = '';
				}
			},
			login_image(){
				uni.showLoading({
					title: '正在登录',
				})
				uni.request({
					url:`${this.base_url}/auth/login`,
					method:'POST',
					data:{
						iphone:this.iphone1,
						password:this.password,
						key:this.image_key,
						code:this.VerificationCode
					},
					success: (res) => {
						if (res.data.status == 100){
							uni.hideLoading();
							uni.$u.toast('登录成功');
							let token = res.data.data.satoken;
							console.log("token的值是：",token);
							this.check_activation(token).then(isActive => {
							    console.log("是否是未激活用户：", isActive);
							    if (isActive) {
							        // 执行未激活时的逻辑
									const param = encodeURIComponent(JSON.stringify(token));
									uni.navigateTo({
										url:`/pages/LoginImage/LoginImage?param=${param}`
									})
							    } else {
									uni.setStorageSync('token',token)
									uni.switchTab({
										url: '/pages/index/index'
									});
								}
								
							}).catch(error => {
							    console.error("检测激活状态失败：", error);
							});
							// 信息存储
						} else {
							uni.hideLoading();
							console.log("失败：",res);
							uni.$u.toast('登录失败');
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
						uni.hideLoading();
					}
				})
			},
			check_activation(token) {
			    return new Promise((resolve, reject) => {
			        uni.request({
			            url: `${this.base_url}/api/Detection`,
			            method: 'POST',
			            header: {
			                satoken: token
			            },
			            success: (res) => {
			                console.log("检测结果是：", res);
			                if (res.data.status == 401) {
			                    resolve(true);
			                } else {
			                    resolve(false);
			                }
			            },
			            fail: (res) => {
			                uni.$u.toast('网络开小差了~');
			                reject(res);
			            }
			        });
			    });
			},
			phoneLogin() {
				this.base_url = this.$store.state.BASE_URL;
				console.log("地址是：",`${this.base_url}/auth/One_Click_login`);
				let urll = `${this.base_url}/auth/One_Click_login`;
				if (!this.canCallLogin) return;
				  this.canCallLogin = false;
				  setTimeout(() => { this.canCallLogin = true; }, 1000); // 设置3秒钟的防抖时间
				let self = this;
				uni.login({
					provider: 'univerify',
					univerifyStyle: { // 自定义登录框样式
						//参考`univerifyStyle 数据结构`
						"fullScreen": true, // 是否全屏显示，默认值： false
						"title": '快速登录',
						"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff
						"icon": {
							"path": "../../static/my/头像.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
						},
						"phoneNum": {
							"color": "#000000", // 手机号文字颜色 默认值：#000000
							"fontSize": "18" // 手机号字体大小 默认值：18
						},
						"slogan": {
							"color": "#8a8b90", //  slogan 字体颜色 默认值：#8a8b90
							"fontSize": "12" // slogan 字体大小 默认值：12
						},
						// 一键登录
						"authButton": {
							"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5
							"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
							"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
							"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
							"title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”
						},
						// 其他登录方式
						// "otherLoginButton": {
						// 	"visible": "true", // 是否显示其他登录按钮，默认值：true
						// 	"normalColor": "#f8f8f8", // 其他登录按钮正常状态背景颜色 默认值：#f8f8f8
						// 	"highlightColor": "#dedede", // 其他登录按钮按下状态背景颜色 默认值：#dedede
						// 	"textColor": "#000000", // 其他登录按钮文字颜色 默认值：#000000
						// 	"title": "密码登录", // 其他登录方式按钮文字 默认值：“其他登录方式”
						// 	"borderWidth": "1px", // 边框宽度 默认值：1px（仅ios支持）
						// 	"borderColor": "#c5c5c5" //边框颜色 默认值： #c5c5c5（仅ios支持）
						// },
						// 自定义按钮登录方式
						"buttons": { // 仅全屏模式生效，配置页面下方按钮  （3.1.14+ 版本支持）  
							"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px  
							"list": [
								{
									"provider": "weixin",
									"iconPath": "/static/weixin.png",
								}
							]
						},
						"privacyTerms": {
							"defaultCheckBoxState": "true", // 条款勾选框初始状态 默认值： true
							"textColor": "#8a8b90", // 文字颜色 默认值：#8a8b90
							"termsColor": "#1d4788", //  协议文字颜色 默认值： #1d4788
							"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”
							"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”
							"fontSize": "12", // 字体大小 默认值：12,
							"privacyItems": [
								// 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
								{
									"url": "https://", // 点击跳转的协议详情页面
									"title": "用户服务协议" // 协议名称
								}
							]
						}
					},
					success(res) { // 登录成功
						let openid = res.authResult.openid; //拿到openid
						let access_token = res.authResult.access_token; //拿到access_token
						// 在得到access_token和openid后，通过callfunction调用云函数
						uniCloud.callFunction({
							name: "getPhoneNumber",
							data: {
								access_token:access_token , // 客户端一键登录接口返回的access_token
								openid: openid // 客户端一键登录接口返回的openid
							}
						}).then(res1 => {
							console.log("号码获取成功：",res1.result.phoneNumber);
							uni.request({
								// url:'http://114.115.203.18:9421/auth/One_Click_login',
								url:urll,
								method:'POST',
								data:{
									phoneNumber:res1.result.phoneNumber
								},
								success: (res) => {
									console.log("登录返回的数据是：",res);
									if (res.data.status == 100){
										uni.setStorageSync('token',res.data.data.satoken)
										self.getUserInformation();
										uni.closeAuthView()
										uni.switchTab({
											url: '/pages/Intelligent/Intelligent'
										});
										// uni.redirectTo({
										// 	url: '/pages/Intelligent/Intelligent'
										// });
									} else {
										uni.showModal({
											title: '提示',
											content: '服务器繁忙，请重试~',
											success: function (res) {
												if (res.confirm) {
													// this.correct = false
												} else if (res.cancel) {
													// this.correct = false
												}
											}
										})
									}
								},
								fail: (res) => {
									console.log("失败的原因是：",res);
									uni.closeAuthView()
									uni.showModal({
										title: '提示',
										content: '网络开小差，请重试~',
										success: function (res) {
											if (res.confirm) {
												// this.correct = false
											} else if (res.cancel) {
												// this.correct = false
											}
										}
									})
								},
							})
						}).catch((err) => {
							// 执行失败后的操作
							console.log("云函数失败：",err);
							uni.closeAuthView();
							uni.showModal({
								title: '提示',
								content: `云函数获取号码失败`,
								success: function (res) {
									if (res.confirm) {
										// this.correct = false
									} else if (res.cancel) {
										// this.correct = false
									}
								}
							})
							//...
							//...
						})
					},
					// 当用户点击自定义按钮时，会触发uni.login的fail回调[点击其他登录方式，可以跳转页面，或执行事件]
					fail:(res)=> { // 登录失败
						console.log("res:",res);
						// 30003 用户点击左上角取消按钮
						// 30008 用户点击微信登录按钮
						if (res.code === "30008"){
							this.weixinLogin();
							console.log("微信登录");
							this.isWeixin = true;
							uni.closeAuthView();
						}
						// 用户点击了其他登录方式
						if (res.code == 30002){
							uni.closeAuthView();
						}
						if (res.code != 30003 & res.code != 30006 & res.code != "30008"){
							uni.closeAuthView();
							// uni.showModal({
							// 	title: '提示',
							// 	content: `${res.errMsg}`,
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 			// this.correct = false
							// 		} else if (res.cancel) {
							// 			// this.correct = false
							// 		}
							// 	}
							// })
						}
					}
				})
			},
			HandlingErrors(err){
				return new Promise((resolve,reject) => {
					console.log("错误信息是：",err);
					// 一键登录失败
					if (err.code == 30006){
						this.phoneLogin()
					}
					if (err.code == 30008){
						console.log("开启微信登录");
					}
					resolve(err.errMsg);
				})
			},
			async weixinLogin(){
				console.log("456456");
				try{
					console.log("456");
					this.base_url = this.$store.state.BASE_URL;
					let urll = `${this.base_url}/auth/One_Click_login`;
					let res1 = await uni.login({
						provider:'weixin',
						scopes:'auth_user',
					})
					uni.showLoading({
						title:"正在登陆中~"
					})
					console.log("4");
					let res2 = await uni.getUserInfo({
						provider:'weixin',
					})
					console.log("3",res2);
					// 获取微信头像和昵称
					let res3 = await uni.request({
						url:urll,
						method:'POST',
						data:{
							phoneNumber:null,
							openid:res2.userInfo.openId,
							avatarUr1:res2.userInfo.avatarUrl,
							nickName:res2.userInfo.nickName
						},
					})
					if (res3.data.status != 100){
						throw new Error(res3.data.message);
					}
					uni.setStorageSync('token',res3.data.data.satoken)
					let res4 = await this.getUserInformation()
					if (res4 == false){
						throw new Error('信息获取失败')
					}
					uni.hideLoading();
					uni.switchTab({
						url: '/pages/Intelligent/Intelligent'
					});
				}catch(err){
					console.log("访问是否进去：",err);
					uni.hideLoading();
					if (err.message === undefined){
						// 断网状态
						uni.$u.toast('网络开小差了~');
					} else {
						// 处理抛出的错误
						uni.$u.toast(`${err.message}`);
					}
				}
			},
			async getUserInformation(){	
				try{
					let res = await uni.request({
						url:`${this.$store.state.BASE_URL}/info/userInfo`,
						method:'POST',
						header:{
							satoken:uni.getStorageSync('token')
						}
					})
					if (res.data.status != 100){
						throw new Error(res.data.message);
					}
					console.log("获取的头像是:",res);
					uni.setStorageSync('nickName', res.data.data.username.replace(/(\d{3})\d{4}(\d{4})/, '$1 **** $2'));
					uni.setStorageSync('avatarUrl', res.data.data.avatar);
					return true;
				}catch(err){
					return false;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import 'animate.css';
	// .zi_style{
	// 	font-size: 40rpx;
	// 	opacity: 0.6;
	// 	margin-bottom: 80rpx;
	// 	animation: blank 1s linear infinite
	// }
	// @keyframes blank {
	// 	0%{
	// 		opacity: 1;
	// 	}
	// 	100% {
	// 		opacity: 0;
	// 	}
	// }
	.zi_style {
		font-size: 50rpx;
		opacity: 0.6;
		margin-bottom: 80rpx;
	    background-image: -webkit-linear-gradient(left, #e9a5a5, #b8c1c0 10%, #65c0e0 20%, #aea2db 30%, #81c1d9 40%, #e9a5a5 50%, #b8c1c0 60%, #65c0e0 70%, #aea2db 80%, #81c1d9 90%, #e9a5a5);
	    color: transparent;
	
	    /* 将背景裁剪为文字 */
	    -webkit-background-clip: text;
	
	    /* 背景放大一倍，动画才有移动的空间 */
	    background-size: 50% 100%;
	
	    /* 动画 规定四秒执行完 无限循环 匀速播放 */
	    animation: a 5s infinite linear;
	}
	
	@keyframes a {
	    0% {
	        background-position: 0 0;
	    }
	
	    100% {
	        background-position: -100% 0;
	    }
	}
	.all{
		display: flex;
		align-items: center;
		width: 100%;
		height: 100vh;
		flex-direction: column;
	}
	.Image_icon{
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding-top: 500rpx; */
		width: 90%;
		height: 30%;
		/* background-color: cadetblue; */
	}
	.get{
		// margin-top: 20rpx;
		border: 1px solid #ccc;
		border-radius: 5px; /* 可选：添加圆角 */
		padding: 5px; /* 可选：添加内边距 */
		transition: 0.5s;
	}
	.get:hover{
		border: 1px solid blue;
	}
	.wrap {
		padding-top: 24rpx;
			/* padding: 24rpx; */
		}
	.ziti{
		color:royalblue;
		font-size: 25rpx;
		transition: all 0.3s;
	}
	.ziti:active{
		transform: scale(1.2);
	}
	.bottmo_one{
		font-size: 25rpx;
		display: flex;
		// color: brown;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		transition: all 0.3s;
	}
	.bottmo_one:hover{
		transform: scale(1.1);
		// color: blue;
	}
	.bottmo_two{
		opacity: 0.8;
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		// border: 1px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bottmo_two:hover{
		// border: 1px solid blue;
	}
	.bottmo{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 200rpx;
		width: 100%;
		// position: absolute;
		// bottom: 150rpx;
		// display: flex;
		// width: 100% ;
		// flex-direction: row;
		// justify-content: space-around;
	}
</style>
