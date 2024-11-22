// 该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 准备actions——用于响应组件中的动作
const actions = {
	jia(context,value){
		console.log("actions中的jia被调用了");
		context.commit('JIA', value)
	},
	autoAdd(context){
		console.log("调用了autoAdd");
	},
	showMessage(context, value){
		// console.log("actions中的showMessage被调用了，获取的数据是：",value);
		context.commit('ShOWMessage', value)
	},
	addMessage(context, value){
		context.commit('ADDMessage', value);
	},
	pating(context, value){
		context.commit('Pating', value);
	},
	// 判断 登录的状态是否是可用的
	isToken(context, value){
		context.commit('IsToken', value);
	},
	// 智能体页面标签索引
	Intelligent(context, value){
		context.commit('InTelligent', value);
	},
	updateMessage({ commit }, message) {
	    commit('setMessage', message);  // 提交 mutation 以更新状态
	}
}

// 准备mutations——用于操作数据（state）
const mutations = {
	IsToken(state, value){
		// console.log("token的值是：",value);
		uni.request({
		    url: `${state.BASE_URL}/api/Detection`,
		    method: 'POST',
		    header: {
		        satoken: value
		    },
		    success: (res) => {
		        console.log("vuex中的检测结果是：", res);
				if (res.data.status != 100){
					// uni.$u.toast('请登录');
					uni.redirectTo({
						url:'/pages/Login/Login'
					})
				} else {
				}
		    },
		    fail: (res) => {
				uni.redirectTo({
					url:'/pages/Login/Login'
				})
		        console.log("失败是：", res);
		    }
		});
	},
	InTelligent(state, value){
		state.Intelligent_index = value;
		console.log("当前选中的索引地址是：",state.Intelligent_index);
	},
	JIA(state,value){
		// console.log('mutations中的jia被调用了',state,value)
		// state.introduce += value
	},
	AUTOadd(state,value){
		state.num = value.data
		console.log("成功之后的数据是：",state.num);
	},
	ShOWMessage(state, value){
		// console.log("完成：", value);
		state.peopleMessage = value;
		// console.log("数据传输成功：",state.peopleMessage);
	},
	ADDMessage(state, value){
		console.log("数据是：",state.Intelligent);
		if (state.Intelligent == ''){
				state.Intelligent.push(value);
		} else {
			state.Intelligent.unshift(value);
		}
		console.log("添加之后的数据是：",state.Intelligent);
	},
	setMessage(state, message) {
	    state.message = message;  // 更新状态的 mutation
	},
	// 绘图中的绘画
	Pating(state, value){
		console.log("跳转得到的数据是：",value);
		let timer = setInterval(()=>{
			// waitobj.msg = '提示语上传成功，正在生成图片中，请稍后';
			uni.request({
				url:`${state.BASE_URL}/image/task?task_id=${value}`,
				method:'GET',
				success: (res) => {
					console.log("vuex查询成功之后的结果是：",res);
					if (res.data.status != 100){
						clearInterval(timer)
						// 做报错处理 
						// uni.showModal({
						// 	title: '提示',
						// 	content: '图片生成失败，请重试',
						// 	success:(res)=> {
						// 		if (res.confirm) {
						// 		} else if (res.cancel) {
						// 		}
						// 	}
						// });
					}
					if (res.data.data.includes('%') == false){
						clearInterval(timer)
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
									console.log("vuex显示地址是：",localImagePath);
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
					clearInterval(timer);
					// uni.showModal({
					// 	title: '提示',
					// 	content: '图片生成失败，请重试',
					// 	success:(res)=> {
					// 		if (res.confirm) {
					// 		} else if (res.cancel) {
					// 		}
					// 	}
					// });
				}
			})
		}, 2000)
	}
}

const getters = {
	getMessage(state) {
	    return state.message  // 获取状态的 getter
	}
}

// 准备state——用于存储数据
const state = {
	introduce:0,
	// BASE_URL:'http://192.168.2.6:8080',
	// WebSocket_URL:'ws://192.168.2.6:8080',
	WebSocket_URL:'ws://114.115.203.18:9421',
	BASE_URL:'http://114.115.203.18:9421',
	Intelligent_index:0,
	num:'',
	peopleMessage:'',
	Intelligent:[],
	istoken:'',
	message:'' // 报价界面，消息推荐点击的消息存储
}

// 创建store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})