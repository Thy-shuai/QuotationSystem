<template>
	<view>
		<!-- <view style="display: flex;align-items: center;justify-content: center;height: 7vh;width: 70%;margin-left: 20rpx;">
		<u-tabs :list="list1" @tap="click"></u-tabs>
	</view> -->
		<ul>
			<view class="top_text">
				<u-tabs :list="list1" @tap="click" current="0"></u-tabs>
			</view>
			<view style="margin-top: 100rpx;"></view>
			<view class="back" v-for="(item, index) in Rendering" :key="index" @tap="Jump(item)">
				<view class="backImage">
					<image :src="item.imageUrl" mode="aspectFill"
						style="width: 115rpx;height: 113rpx;border-radius: 50%;"></image>
				</view>
				<view class="backText">
					<view class="backName">{{item.description}}</view>
					<view class="backInterview">
						<!-- <view class="explay">{{item.briefIntroduction}}</view> -->
						<view class="explay">{{item.introduce}}</view>
						<!-- <view class="explay">收到回复就是收到回复即可收到撒旦发射点发射点撒旦发射点</view> -->
					</view>
					<view style="margin-top: 15rpx;padding-bottom: 4rpx;">
						<image src="../../static/renwu.png" mode="" style="height: 24rpx;width: 24rpx;"></image>
						<text class="backFire">{{item.hot}}</text>
						<text class="backTotal">@{{nameCompany}}</text>
					</view>
					<view style="border-bottom: 1rpx solid black;opacity: 0.1;"></view>
				</view>
			</view>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatSession: [

				],
				// 报价 2  工具 0  绘画 1  知识库 3
				list1: [{
					name: '配置报价',
					index: 0
				}, {
					name: '工具',
					index: 0
				}, {
					name: '专属',
					index: 0
				}],
				// 初始数组"category": 0 配置报价    "category": 1, 是工具  "category": 2,  专属
				IntelligentData: [{
						"id": 1,
						"identification": "default",
						"hot": 0,
						"introduce": "你的智能灵犀百科，回答你的所有问题",
						"status": 0,
						"category": 1,
						"description": "百科全书",
						"imageUrl": require('../../static/Intelligent2/2-1.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我既能写文案、想点子，又能陪你聊天，答疑解惑。提出你的问题，我将为你答疑解惑。",
						"uuid": 'b406a112-7445-43dd-b1e0-f76df215aa81'
					},
					{
						"id": 2,
						"identification": "Custom",
						"hot": 0,
						"introduce": "上传文件，制作专属于自己的知识库",
						"status": 1,
						"category": 1,
						"description": "知识库",
						"imageUrl": require('../../static/Intelligent2/2-2.jpg'),
						"detailedIntroduction": "嗨，作为你的智能助手，我专责制作和管理你的专属知识库。只需上传文件，我便能为你分析和整理这些资料。当你查询这些文件中的信息时，我将迅速且准确地为你提供所需的帮助。",
						"uuid": 'b7597555-2688-4238-b272-d34c34e0f0a9'
					},
					{
						"id": 3,
						"identification": "painting",
						"hot": 0,
						"introduce": "用语言描述所想，我们帮你完成创作",
						"status": 1,
						"category": 1,
						"description": "趣味绘画",
						"imageUrl": require('../../static/Intelligent1/2-3.png'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我专门负责智能绘画。只需向我描述你心中的场景，我们就可以帮你将其描绘出来。快来体验看看吧！",
						"uuid": '9d6bacd0-a2d7-4544-b4d7-c221f5fcb6ae'
					},
					{
						"id": 5,
						"identification": "Character",
						"hot": 0,
						"introduce": "你喜欢的角色，就是我的身份",
						"status": 0,
						"category": 1,
						"description": "角色扮演",
						"imageUrl": require('../../static/Intelligent2/2-5.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我负责角色扮演，请告诉我你想让我扮演的角色。我将全身心地投入到这个角色中，与你进行对话，为你提供一个真实的互动体验。",
						"uuid": '7f6934fd-a120-4ef7-a3b9-df355066a06b'
					},
					{
						"id": 6,
						"identification": "ComputerRental",
						"hot": 0,
						"introduce": "提供常见服务的使用权",
						"status": 0,
						"category": 1,
						"description": "电脑租凭",
						"imageUrl": require('../../static/Intelligent2/2-6.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我们提供市面上常见服务的使用权，适用于临时的项目和特殊活动等等。为用户提供了一种灵活、成本效益高的方式来满足临时或长期的计算需求，避免了购买、维护和升级设备的繁琐和昂贵。快来体验一下吧。",
						"uuid": '4928d657-d11c-4952-95e6-2f083ce32d56'
					},
					{
						"id": 7,
						"identification": "TecherEnglishHelper",
						"hot": 0,
						"introduce": "提供常见系统授权账号，用户直接使用",
						"status": 0,
						"category": 1,
						"description": "差旅系统",
						"imageUrl": require('../../static/Intelligent2/2-7.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我们提供市面上常见系统的授权账号。直接使用，免去繁琐的注册流程。快来体验一下吧！",
						"uuid": '5971a9d4-dc65-4e57-a528-8ec255a24ce6'
					},
					{
						"id": 8,
						"identification": "inquiry",
						"hot": 0,
						// "introduce": "灵活报价，根据客户、项目、发展阶段生成个性化报价单",
						"introduce": "根据客户和项目阶段生成个性化报价单",
						"status": 1,
						"category": 0,
						"description": "产品报价",
						"imageUrl": require('../../static/Intelligent2/1-1.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我负责产品报价。请问给那位客户报价，项目名称是什么？请通过上方添加告诉我。"
					},
					{
						"id": 9,
						"identification": "equipment",
						"hot": 0,
						"introduce": "根据产品或需求给出通用、专属参数",
						"status": 1,
						"category": 0,
						"description": "招标参数",
						"imageUrl": require('../../static/Intelligent2/1-2.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，设备参数，性能和功能指标我一清二楚。请说出你想要了解的产品型号。",
						"uuid": '9425eba5-2ecf-4ad3-92d6-e4294ce1bf80'
					},
					{
						"id": 10,
						"identification": "customerManagement",
						"hot": 0,
						"introduce": "管理所有客户，新增，修改，查询等",
						"status": 1,
						"category": 0,
						"description": "客户管理",
						"imageUrl": require('../../static/Intelligent2/1-3.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我能高效地管理客户信息，包括新增客户、修改客户资料和查询等功能，让管理变得简单便捷。快来体验一下吧！",
						"uuid": 'bfc5dd35-4193-42a9-8e0d-a06cca70e924'
					},
					{
						"id": 11,
						"identification": "DataReport",
						"hot": 0,
						"introduce": "数据报表精准输出，需要统计的数据都有",
						"status": 1,
						"category": 0,
						"description": "智能报表",
						"imageUrl": require('../../static/Intelligent2/1-4.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我负责管理和整理数据，并通过折线图、柱状图、饼图等形式直观地展示这些信息给你。快来体验看看吧。",
						"uuid": '11ed0565-d1ae-4e2e-acf1-18f12c1e27f8'
					},
					{
						"id": 12,
						"identification": "Sales",
						"hot": 0,
						"introduce": "提供最好，最近精准的产品销售策略",
						"status": 1,
						"category": 0,
						"description": "销售策略",
						"imageUrl": require('../../static/Intelligent2/1-5.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我能提供相关产品的详细信息及最优销售策略。快来体验一下吧！",
						"uuid": '150bdd60-cea3-4c65-a773-22cdfdd62d5c'
					},
					{
						"id": 13,
						"identification": "HuaweiCloud",
						"hot": 0,
						"introduce": "提供华为云售后服务和技术支撑",
						"status": 1,
						"category": 0,
						"description": "华为云售后",
						"imageUrl": require('../../static/Intelligent2/1-6.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我们提供华为云的售后服务全面的技术支持和客户服务，以确保用户能够有效利用其云计算资源。快来试试吧。",
						"uuid": '067561ef-4573-4fbc-a499-5688798a29ec'
					},
					{
						"id": 14,
						"identification": "BeautyAvatar",
						"hot": 0,
						"introduce": "图片多风格转换，快速实现视觉多样化",
						"status": 1,
						"category": 2,
						"description": "美颜头像",
						"imageUrl": require('../../static/Intelligent2/3-1.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，只需上传一张图片，我就能帮你转换成多种风格，如职业化、卡通化、抽象化等。快来体验一下吧！",
						"uuid": '22db27cd-0083-453c-9df5-0d9579b29c28'
					},
					{
						"id": 15,
						"identification": "BusinessCard",
						"hot": 0,
						"introduce": "一键生成个人名片",
						"status": 1,
						"category": 2,
						"description": "普通名片",
						"imageUrl": require('../../static/Intelligent2/3-2.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，只需提供基本信息，我便可一键生成多种风格的个人名片供你选择。快来尝试看看吧！",
						"uuid": '37c4568d-c335-40b6-8fc8-2fbff81cf32e'
					},
					{
						"id": 16,
						"identification": "DigitalCard",
						"hot": 0,
						"introduce": "制作会说话的数字人名片",
						"status": 1,
						"category": 2,
						"description": "数字名片",
						"imageUrl": require('../../static/Intelligent2/3-3.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，想要一张会自我介绍的个人名片吗？只需提供一张正面人脸照片和名片所需的个人信息，我就能帮你实现这一需求。快来试试看吧！",
						"uuid": '220c629b-36ed-4537-bfd8-77aa728ce825'
					},
					{
						"id": 17,
						"identification": "DigitalPeople",
						"hot": 0,
						"introduce": "你提供照片，我们帮你生成数字人",
						"status": 1,
						"category": 2,
						"description": "数字人",
						"imageUrl": require('../../static/Intelligent2/3-4.jpg'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我能以最低成本帮你创造数字化的自我表现。只需提供一张正面照片和你想表达的话语，就可以轻松实现。快来体验一下吧！",
						"uuid": '3602f3ea-73a9-40ee-943d-6f03ed9d3fac'
					},
					{
						"id": 18,
						"identification": "AccountPassword",
						"hot": 0,
						"introduce": "防止账号密码过多而遗忘和混淆",
						"status": 1,
						"category": 2,
						"description": "密码管家",
						"imageUrl": require('../../static/Intelligent1/3-5.png'),
						"detailedIntroduction": "嗨，作为你的智能伙伴，我在确保隐私和安全的前提下，帮助客户安全存储账号和密码。这样做可以防止客户因密码众多而遗忘或混淆。需要时，我们会安全地返还给客户。",
						"uuid": 'b37e668b-66af-47bd-91ce-7d945b68670f'
					},
					{
						"id": 19,
						"identification": "StoreFiles",
						"hot": 0,
						"introduce": "请上传定价文件，便于我们报价",
						"status": 1,
						"category": 2,
						"description": "产品定价",
						"imageUrl": require('../../static/Intelligent2/3-6.jpg'),
						"detailedIntroduction": "嗨，作为您的智能伙伴，我能在确保隐私和安全的前提下，帮助用户进行产品定价。当您上传定价文件后，我们的系统将参考这些文件，为您提供精准的产品报价。",
						"uuid": 'afb25ca5-fc1e-4ea3-88de-bfec8b10172b'
					},

				],
				Rendering: [],
				baseUrl: '',
				nameCompany: ''
			};
		},
		onReachBottom() {
			// console.log("已经滚动到底部");  
		},
		onPullDownRefresh() {
			console.log("开始下拉刷新");
			setTimeout(() => {
				// 假设这是你更新数据的操作
				console.log('数据更新完成');
				// 数据更新完毕后停止下拉刷新
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onPageScroll() {
			// console.log("监听页面滚动");  
		},
		onShow() {
			// let name = '中航工业西飞顺达座椅公司';
			this.instanceInitialization(); // 报价单信息初始化
			this.customInitialization(); // 客户信息初始化
			let name = uni.getStorageSync('abbreviation');
			console.log("此时默认的名字是：", name);
			// uni.removeStorageSync('abbreviation');
			if (name.length > 0) {
				this.nameCompany = name;
			} else {
				if (uni.getStorageSync('companyName').length == 0) {
					uni.setStorageSync('companyName', '灵犀报价科技有限公司');
				}
				name = uni.getStorageSync('companyName');
				// console.log("提交的姓名是：", name);
				uni.request({
					url: `${this.$store.state.BASE_URL}/api/Compress?FullName=${name}`,
					method: 'GET',
					header: {
						satoken: uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("获取", res);
						if (res.data.status == 100) {
							uni.setStorageSync('abbreviation', JSON.parse(res.data.data).value);
							this.nameCompany = JSON.parse(res.data.data).value;
							// console.log("此时获取的名称是", this.nameCompany);
						} else {
							// 此时分为两种情况
							this.nameCompany = name;
						}
					},
					fail: (res) => {
						this.nameCompany = name;
						console.log("简称获取失败的原因是：", res);
					}
				})
			}
			if (uni.getStorageSync('companyName').length == 0) {
				uni.setStorageSync('companyName', '灵犀报价科技有限公司');
			}
			this.$store.dispatch('isToken', uni.getStorageSync('token'));
			// console.log("数据是：",this);
			this.baseUrl = this.$store.state.BASE_URL;
			setTimeout(() => {
				this.test();
			}, 0)
		},
		onUnload() {
			console.log('Page Unloaded');
		},
		methods: {
			async test() {
				try {
					const res = await uni.request({
						url: `${this.baseUrl}/api/prompt`,
						method: 'GET',
						header: {
							satoken: uni.getStorageSync('token')
						},
					})
					// console.log("try获取的数据是：",res);
					if (res.data.status == 100) {
						// 是否需要删除此块代码需要考虑
						// if (uni.getStorageSync('IntelligentData') != ''){
						// 	this.IntelligentData = uni.getStorageSync('IntelligentData');
						// }
						const filteredData = this.IntelligentData.filter(item => item.category === this.$store.state
							.Intelligent_index);
						this.Rendering = filteredData;
						// throw new Error('获取数据失败');
					}
					if (res.data.status != 100) {
						throw new Error('获取失败' + res)
					}
				} catch (e) {
					//TODO handle the exception
					console.log("try捕获的失败信息是：", e);
				}
			},
			click(event) {
				// console.log("标题点击的是：",event);
				// console.log("此时该切换的是：",event.name);

				// 报价 2  工具 0  绘画 1  知识库 3  历史
				// 标价 0  工具 1 知识库 2
				if (event.name == '推荐') {
					this.Rendering = this.IntelligentData;
					return;
				}
				console.log("当前点击的下标是：", event.index);
				// let get = event.index - 1;
				// 报价
				if (event.index == 0) {
					const filteredData = this.IntelligentData.filter(item => item.category === 0);
					this.Rendering = filteredData;
					this.$store.dispatch('Intelligent', 0)
					return;
				}
				// 工具
				if (event.index == 1) {
					const filteredData = this.IntelligentData.filter(item => item.category === 1);
					this.Rendering = filteredData;
					this.$store.dispatch('Intelligent', 1)
					return;
				}
				// 知识库
				if (event.index == 2) {
					const filteredData = this.IntelligentData.filter(item => item.category === 2);
					this.Rendering = filteredData;
					this.$store.dispatch('Intelligent', 2)
					return;
				}
			},
			Jump(e) {
				console.log("需要跳转的页面是：", e);
				// 固定存储的位置
				// const param = encodeURIComponent(JSON.stringify(e));
				// Character HuaweiCloud Custom
				// if (e.identification != 'inquiry' && e.identification != 'Custom' && e.identification != 'HuaweiCloud' && e.identification != 'Character' && e.identification != 'Sales' && e.identification != 'DataReport' && e.identification != 'painting' && e.identification != 'default' && e.identification != 'StoreFiles'){
				// 	uni.$u.toast('功能尚未开通');
				// 	return ;
				// }
				if (e.identification == 'AccountPassword'){
					const param = encodeURIComponent(JSON.stringify(e));
					uni.navigateTo({
						url:`/pages/passwordCollection/passwordCollection?param=${param}`
					})
					this.hotNumber(e.identification)
					return ;
				}
				if (e.identification == 'BusinessCard') {
					const param = encodeURIComponent(JSON.stringify(e));
					uni.navigateTo({
						url: `/pages/businessCard/businessCard?param=${param}`
					})
					this.hotNumber(e.identification);
					return;
				}
				if (e.identification == 'BeautyAvatar') {
					const param = encodeURIComponent(JSON.stringify(e));
					uni.navigateTo({
						url: `/pages/beautySize/beautySize?param=${param}`
					})
					// uni.navigateTo({
					// 	url: `/pages/beautyCamera/beautyCamera?param=${param}`
					// })
					this.hotNumber(e.identification);
					return;
				}
				if (e.identification == 'Custom') {
					// this.setDialogbox(e, myUUID);
					const param = encodeURIComponent(JSON.stringify(e));
					uni.navigateTo({
						url: `/pages/knowledgeBase/knowledgeBase?param=${param}`
					})
					this.hotNumber(e.identification);
					return;
				}

				if (e.identification == 'HuaweiCloud') {
					const param = encodeURIComponent(JSON.stringify(e));
					this.hotNumber(e.identification);
					uni.navigateTo({
						url: `/pages/huaweiCloudSales/huaweiCloudSales?param=${param}`
					})
					return;
				}

				if (e.identification == 'Character') {
					const param = encodeURIComponent(JSON.stringify(e));
					this.hotNumber(e.identification);
					uni.navigateTo({
						url: `/pages/Category/Category?param=${param}`
					})
					return;
				}

				if (e.identification == 'Sales') {
					const param = encodeURIComponent(JSON.stringify(e));
					this.hotNumber(e.identification);
					uni.navigateTo({
						url: `/pages/Category/Category?param=${param}`
					})
					return;
				}

				// if (e.identification == 'DataReport'){
				// 	const param = encodeURIComponent(JSON.stringify(e));
				// 	this.hotNumber(e.identification);
				// 	uni.navigateTo({
				// 		url:`/pages/IntelligentReport/IntelligentReport?param=${param}`,
				// 		// animationDuration:100
				// 	})
				// 	return ;
				// }

				if (e.identification == 'painting') {
					// this.setDialogbox(e, myUUID);
					const param = encodeURIComponent(JSON.stringify(e));
					uni.navigateTo({
						url: `/pages/Painting/Painting?param=${param}`
					})
					this.hotNumber(e.identification);
					return;
				}

				if (e.identification == 'default') {
					// this.setDialogbox(e, myUUID);
					const param = encodeURIComponent(JSON.stringify(e));
					uni.navigateTo({
						url: `/pages/Category/Category?param=${param}`
					})
					this.hotNumber(e.identification);
					return;
				}
				if (e.identification == 'StoreFiles') {
					// this.setDialogbox(e, myUUID);
					const param = encodeURIComponent(JSON.stringify(e));
					uni.navigateTo({
						url: `/pages/DatabasePersonal/DatabasePersonal?param=${param}`
					})
					this.hotNumber(e.identification);
					return;
				}
				let uuid = require('uuid');
				let myUUID = uuid.v4(); // 生成一个新的uuid
				e.uuid = myUUID;
				console.log("新建项目是：", e);
				// this.setDialogbox(e, myUUID);
				if (e.identification == 'inquiry') {
					e.name = '';
					e.projectName = '点击';
					e.date = null;
					e.colorss = null;
					e.topMark = 0;
					e.version = 'V0';
					e.nums = '0'
					console.log("产品报价：", e);
					setTimeout(() => {
						this.$methods.addMessage(this.$store.state.BASE_URL, e)
							.then(isActive => {
								console.log("新数据是否添加成功:", isActive);
							})
					}, 10)
				}
				if (e.identification == 'inquiry') {
					if (uni.getStorageSync('ChatSession') == '') {
						// 是否有信息的会话

						this.chatSession.push(e);
						uni.setStorageSync('ChatSession', this.chatSession);
						this.chatSession = []
					} else {
						// 如果新建项是产品报价
						if (e.identification == 'inquiry') {
							this.chatSession = uni.getStorageSync('ChatSession');
							this.chatSession.unshift(e);
							uni.setStorageSync('ChatSession', this.chatSession)
							this.chatSession = [];
						} else {
							// 判断数组中是否已经存在该数据
							this.chatSession = uni.getStorageSync('ChatSession');
							const index = this.chatSession.findIndex(item => item.id === e.id);
							if (index != -1) {
								// 有相同的uuid  从数组中去除该项
								e.uuid = this.chatSession[index].uuid;
								this.chatSession.splice(index, 1);
							}
							// 把新增的项放到数组最顶部的位置
							this.chatSession.unshift(e);
							uni.setStorageSync('ChatSession', this.chatSession)
							this.chatSession = []
						}
					}
				}
				const param = encodeURIComponent(JSON.stringify(e));
				if (e.identification == 'inquiry') {
					// this.setDialogbox(e, myUUID);
					this.hotNumber(e.identification);
					uni.navigateTo({
						url: `/pages/CommunicationBusiness/CommunicationBusiness?param=${param}`,
						// animationDuration:100
					})
					return;
				}
				uni.$u.toast('功能尚未开通');
			},
			// 用于记录
			hotNumber(event) {
				this.IntelligentData.forEach(item => {
					if (item.identification == event) {
						item.hot++;
					}
				})
				uni.setStorageSync('IntelligentData', this.IntelligentData);
			},
			setDialogbox(e, uuid) {
				e.uuid = uuid;
				if (uni.getStorageSync('ChatSession') == '') {
					this.chatSession.push(e);
					uni.setStorageSync('ChatSession', this.chatSession);
					this.chatSession = []
				} else {
					// 如果新建项是产品报价
					if (e.identification == 'inquiry') {
						this.chatSession = uni.getStorageSync('ChatSession');
						this.chatSession.unshift(e);
						uni.setStorageSync('ChatSession', this.chatSession)
						this.chatSession = [];
					} else {
						// 判断数组中是否已经存在该数据
						this.chatSession = uni.getStorageSync('ChatSession');
						const index = this.chatSession.findIndex(item => item.id === e.id);
						if (index != -1) {
							// 有相同的uuid  从数组中去除该项
							e.uuid = this.chatSession[index].uuid;
							this.chatSession.splice(index, 1);
						}
						// 把新增的项放到数组最顶部的位置
						this.chatSession.unshift(e);
						uni.setStorageSync('ChatSession', this.chatSession)
						this.chatSession = []
					}
				}
			},
			instanceInitialization() {
				let chatSession = uni.getStorageSync('ChatSession');
				// console.log("界面显示的数据是：", chatSession);
				if (chatSession.length != 0) return;
				let event = [{
						"message1": "华为s7706",
						"msg": "",
						"mine": true,
						"url": false,
						"date": "14:40",
						"dataHandle": 0,
						"filPath": "",
						"filename": "",
						"fileSize": "",
						"filetype": "",
						"similarUuid": "379b9dd1-2957-4276-8275-016d874cdc55",
						"index": 0,
						"networkAdress": ""
					},
					{
						"msg": "",
						"your": true,
						"filPath": "_doc/uniapp_save/17303568555420.xlsx",
						"url": false,
						"deviceDetails": false,
						"price": [{
								"unitPrice": 5181,
								"number": 1,
								"chsName": "S7706S",
								"des": "交换容量：76.8/336Tbps\n包转发率：57600Mpps\n主控板槽位：2\n交换网槽位：2（主控集成）\n业务槽位：6\n冗余设计：主控、电源、监控板、风扇框\nCAPWAP：支持 L2/L3 网络的数据直接转发模式\n支持 L2/L3 网络的数据隧道转发模式\n支持 CAPWAP 隧道双链路负载均衡\n支持 CAPWAP 隧道加密\nWLAN QoS：支持用户无线优先级到有线优先级的映射\n支持用户无线优先级到 CAPWAP 隧道优先级的映射\n支持基于 VAP 的空口上下行流量限速\n支持基于用户的空口上下行流量限速\n支持基于 SSID 的 CAR 功能\n支持 WLAN 用户 CAR 功能\nVLAN：支持 4K 个 VLAN\n支持 Access、Trunk、Hybrid 方式，支持 LNP 链路类型自协商\n支持 default VLAN\n支持 VLAN 交换\n支持 QinQ、增强型灵活 QinQ\n支持基于 MAC 的动态 VLAN 分配\nARP：支持 ARP Snooping\nMAC 地址功能：支持 MAC 地址自动学习和老化\n支持静态、动态、黑洞 MAC 表项\n支持源 MAC 地址过滤\n支持基于端口和 VLAN 的 MAC 地址学习限制\n环网保护技术：支持 STP（IEEE 802.1d），RSTP（IEEE 802.1w）和 MSTP（IEEE 802.1s）\n支持 SEP 智能保护协议\n支持 BPDU 保护、Root 保护、环路保护\n支持 BPDU Tunnel\n支持 ERPS 以太环保护协议（G.8032）\nIP 路由：支持 RIP、OSPF、ISIS、BGP 等 IPv4 动态路由协议\n支持 RIPng、OSPFv3、ISISv6、BGP4+等 IPv6 动态路由协议\n组播：支持 IGMPv1/v2/v3、IGMP v1/v2/v3 Snooping\n支持 PIM DM、PIM SM、PIM SSM\n支持 MSDP、MBGP\n支持用户快速离开机制\n支持组播流量控制\n支持组播查询器\n支持组播协议报文抑制功能\n支持组播 CAC\n支持组播 ACL\nMPLS：支持 MPLS 基本功能\n支持 MPLS OAM\n支持 MPLS TE\n支持 MPLS VPN/VLL/VPLS\n可靠性：支持 LACP、支持跨设备 E-Trunk\n支持 VRRP、BFD for VRRP\n支持 BFD for BGP/IS-IS/OSPF/静态路由\n支持 NSF、GR for BGP/IS-IS/OSPF/LDP\n支持 TE FRR、IP FRR\n支持以太网 OAM 802.3ah 和 802.1ag\n支持快速自愈保护技术 HSR\n支持 ITU-Y.1731\n支持 DLDP\n支持运行中软件升级 ISSU\n支持流遥感（Streaming Telemetry）技术\nQoS：支持基于 Layer2 协议头、Layer3 协议、Layer4 协议、802.1p 优先级等的组合流分类\n支持 ACL、CAR、Remark、Schedule 等动作\n支持 PQ、WRR、DRR、PQ+WRR、PQ+DRR 等队列调度方式\n支持 WRED、尾丢弃等拥塞避免机制\n支持 5 级 HQoS\n支持流量整形\n配置与维护：支持敏捷零配置部署\n支持 Console、Telnet、SSH 等终端服务\n支持 SNMP v1/v2c/v3 等网络管理协议\n支持通过 FTP、TFTP 方式上载、下载文件\n支持 BootROM 升级和远程在线升级\n支持热补丁\n支持用户操作日志\n支持 OPS\n安全和管理：802.1x 认证，Portal 认证\nMACSec\n支持 NAC\n支持 RADIUS 和 HWTACACS 用户登录认证\n命令行分级保护，未授权用户无法侵入\n支持防范 DoS 攻击、TCP 的 SYN Flood 攻击、UDP Flood 攻击、广播风暴攻击、大流量攻击\n支持 1K CPU 通道队列保护\n支持 ICMP 实现 Ping 和 Traceroute 功能\n支持 RMON\n支持 Service Chain\n支持安全启动（需使用支持安全启动的主控板）\n时间同步：支持 1588v2\n支持同步以太\n增值业务能力：支持 Firewall 功能\n支持 NAT 功能\n支持 NetStream 功能\n支持 IPSec 功能\n支持负载均衡功能\n支持 IPS 入侵防御系统\n互通性：VBST 基于 VLAN 生成树协议（和 PVST/PVST+/RPVST 互通）\nLNP 链路类型协商协议（和 DTP 相似功能）\nVCMP VLAN 集中管理协议（和 VTP 相似功能）\n绿色节能：支持 802.3az 能效以太网\n机箱尺寸 mm（宽×深×高）：442×517.4×441.7，10U\n机箱重量（空配）：15kg\n环境要求：工作温度：0-45℃\n存储温度：-40°C～+70°C\n相对湿度：5%～95%（无凝露）\n工作电压：DC：–40V～–72V\nAC：90V～290V\n",
								"count": 5181
							},
							{
								"totals": 5181
							}
						],
						"urlAdress": "http://114.115.203.18:7788/offer/606968575940497408.xlsx",
						"little_photo": "",
						"all_photo": "",
						"bottom_top": "现在进行多数据源价格分析",
						"bottom_bottom": "",
						"displayedExcel": false,
						"single_produce": true,
						"dataHandle": 0,
						"load": true,
						"file_id": 1540,
						"singleProductPrice": "",
						"promptContent": "如果价格偏差较大，请告诉我更多的信息，比如品牌、产品型号、产品参数。",
						"detailedPrice": "5181元",
						"similarUuid": "379b9dd1-2957-4276-8275-016d874cdc55",
						"index": 1,
						"fileSize": "6.75 KB",
						"price_file": "S7706S  交换容量：76.8/336Tbps包转发率：57600Mpps主控板槽位：2交换网槽位：2（主控集成）业务槽位：6冗余设计：主控、电源...  ",
						"networkAdress": "",
						"informationReplication": "S7706S  交换容量：76.8/336Tbps\n包转发率：57600Mpps\n主控板槽位：2\n交换网槽位：2（主控集成）\n业务槽位：6\n冗余设计：主控、电源、监控板、风扇框\nCAPWAP：支持 L2/L3 网络的数据直接转发模式\n支持 L2/L3 网络的数据隧道转发模式\n支持 CAPWAP 隧道双链路负载均衡\n支持 CAPWAP 隧道加密\nWLAN QoS：支持用户无线优先级到有线优先级的映射\n支持用户无线优先级到 CAPWAP 隧道优先级的映射\n支持基于 VAP 的空口上下行流量限速\n支持基于用户的空口上下行流量限速\n支持基于 SSID 的 CAR 功能\n支持 WLAN 用户 CAR 功能\nVLAN：支持 4K 个 VLAN\n支持 Access、Trunk、Hybrid 方式，支持 LNP 链路类型自协商\n支持 default VLAN\n支持 VLAN 交换\n支持 QinQ、增强型灵活 QinQ\n支持基于 MAC 的动态 VLAN 分配\nARP：支持 ARP Snooping\nMAC 地址功能：支持 MAC 地址自动学习和老化\n支持静态、动态、黑洞 MAC 表项\n支持源 MAC 地址过滤\n支持基于端口和 VLAN 的 MAC 地址学习限制\n环网保护技术：支持 STP（IEEE 802.1d），RSTP（IEEE 802.1w）和 MSTP（IEEE 802.1s）\n支持 SEP 智能保护协议\n支持 BPDU 保护、Root 保护、环路保护\n支持 BPDU Tunnel\n支持 ERPS 以太环保护协议（G.8032）\nIP 路由：支持 RIP、OSPF、ISIS、BGP 等 IPv4 动态路由协议\n支持 RIPng、OSPFv3、ISISv6、BGP4+等 IPv6 动态路由协议\n组播：支持 IGMPv1/v2/v3、IGMP v1/v2/v3 Snooping\n支持 PIM DM、PIM SM、PIM SSM\n支持 MSDP、MBGP\n支持用户快速离开机制\n支持组播流量控制\n支持组播查询器\n支持组播协议报文抑制功能\n支持组播 CAC\n支持组播 ACL\nMPLS：支持 MPLS 基本功能\n支持 MPLS OAM\n支持 MPLS TE\n支持 MPLS VPN/VLL/VPLS\n可靠性：支持 LACP、支持跨设备 E-Trunk\n支持 VRRP、BFD for VRRP\n支持 BFD for BGP/IS-IS/OSPF/静态路由\n支持 NSF、GR for BGP/IS-IS/OSPF/LDP\n支持 TE FRR、IP FRR\n支持以太网 OAM 802.3ah 和 802.1ag\n支持快速自愈保护技术 HSR\n支持 ITU-Y.1731\n支持 DLDP\n支持运行中软件升级 ISSU\n支持流遥感（Streaming Telemetry）技术\nQoS：支持基于 Layer2 协议头、Layer3 协议、Layer4 协议、802.1p 优先级等的组合流分类\n支持 ACL、CAR、Remark、Schedule 等动作\n支持 PQ、WRR、DRR、PQ+WRR、PQ+DRR 等队列调度方式\n支持 WRED、尾丢弃等拥塞避免机制\n支持 5 级 HQoS\n支持流量整形\n配置与维护：支持敏捷零配置部署\n支持 Console、Telnet、SSH 等终端服务\n支持 SNMP v1/v2c/v3 等网络管理协议\n支持通过 FTP、TFTP 方式上载、下载文件\n支持 BootROM 升级和远程在线升级\n支持热补丁\n支持用户操作日志\n支持 OPS\n安全和管理：802.1x 认证，Portal 认证\nMACSec\n支持 NAC\n支持 RADIUS 和 HWTACACS 用户登录认证\n命令行分级保护，未授权用户无法侵入\n支持防范 DoS 攻击、TCP 的 SYN Flood 攻击、UDP Flood 攻击、广播风暴攻击、大流量攻击\n支持 1K CPU 通道队列保护\n支持 ICMP 实现 Ping 和 Traceroute 功能\n支持 RMON\n支持 Service Chain\n支持安全启动（需使用支持安全启动的主控板）\n时间同步：支持 1588v2\n支持同步以太\n增值业务能力：支持 Firewall 功能\n支持 NAT 功能\n支持 NetStream 功能\n支持 IPSec 功能\n支持负载均衡功能\n支持 IPS 入侵防御系统\n互通性：VBST 基于 VLAN 生成树协议（和 PVST/PVST+/RPVST 互通）\nLNP 链路类型协商协议（和 DTP 相似功能）\nVCMP VLAN 集中管理协议（和 VTP 相似功能）\n绿色节能：支持 802.3az 能效以太网\n机箱尺寸 mm（宽×深×高）：442×517.4×441.7，10U\n机箱重量（空配）：15kg\n环境要求：工作温度：0-45℃\n存储温度：-40°C～+70°C\n相对湿度：5%～95%（无凝露）\n工作电压：DC：–40V～–72V\nAC：90V～290V\n"
					},
				]
				let chat = {
					"id": 8,
					"identification": "inquiry",
					"hot": 1,
					"introduce": "华为s7706",
					"status": 1,
					"category": 0,
					"description": "产品报价",
					"imageUrl": "/static/Intelligent2/1-1.jpg",
					"detailedIntroduction": "嗨，作为你的智能伙伴，我负责产品报价。请问给那位客户报价，项目名称是什么？请通过上方添加告诉我。",
					"uuid": "13b4fba7-bb0f-49bf-b224-e87e33b8e6f6",
					"name": "示例",
					"projectName": "示例项",
					"date": 1730356821616,
					"colorss": "#879ffa",
					"topMark": 0,
					"auther": "梦年",
					"price": 5181,
					"version": "V0",
					"nums": 0
				}
				// 存储初始化客户信息数据


				plus.storage.setItem(`${chat.uuid}`, JSON.stringify(event));
				chatSession = [];
				chatSession.push(chat);
				uni.setStorageSync('ChatSession', chatSession)
			},
			customInitialization() {
				let event = uni.getStorageSync('itemArr');
				console.log("客户信息是：", event);
				if (event.length == 0) {
					let custom = {
						"src": "/static/Customer/4.jpg",
						"name": "示例项",
						"company": "",
						"position": "",
						"weixin": "",
						"phone": "18352861163",
						"email": "",
						"id": 34
					}
					event = [];
					event.push(custom);
					uni.setStorageSync('itemArr', event);
					console.log("最新的客户信息是：", uni.getStorageSync('itemArr'));
				}
			}
		},
	};
</script>

<style>
	/* view{
		font-size: 20px;
	} */
	ul {
		padding: 0;
	}

	.top_text {
		position: fixed;
		top: 0;
		right: 10px;
		left: 8px;
		height: 100rpx;
		width: 95%;
		background-color: white;
		z-index: 99;
	}

	.top {
		position: fixed;
		top: 0;
		left: 20rpx;
		width: 100%;
		height: 100rpx;
		z-index: 100;
		background-color: white;
		/* background-color: cadetblue; */
	}

	.back {
		display: flex;
		width: 100%;
		height: 200rpx;
		line-height: 40rpx;
		/* background-color: rgba(255,255,255,1); */
		/* background-color: cadetblue; */
		color: rgba(16, 16, 16, 1);
		font-size: 28rpx;
		text-align: center;
		font-family: Roboto;
		border: 1px solid rgba(255, 0, 0, 0);
		border: none;
	}

	.back:active {
		background-color: #f0f0f0;
	}

	.backImage {
		display: flex;
		align-items: center;
		justify-content: center;
		/* width: 180rpx; */
		width: 22%;
		height: 100%;
		/* background-color: chocolate; */
	}

	.backText {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 78%;
		text-align: left;
	}

	.backName {
		margin-top: 30rpx;
		font-weight: 600;
		/* width: 168rpx; */
		width: 78%;
		height: 36rpx;
		line-height: 36rpx;
		color: rgb(51, 51, 51);
		font-size: 30rpx;
		text-align: left;
		font-family: PingFangSC-bold;
	}

	.backInterview {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
		height: 66rpx;
		margin-top: 12rpx;
		line-height: 40rpx;
		color: rgb(131, 131, 131);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.backFire {
		margin-left: 8rpx;
		color: rgb(131, 131, 131);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.backTotal {
		color: rgb(0, 185, 168);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		position: absolute;
		right: 50rpx;
	}

	/* 去除黑边框 */
	.u-button::after {
		border-bottom: none;
		border-top: none;
	}

	.explay {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>

<!--  {
                "id": 1,
                "identification": "default",
                "hot": 8900,
                "introduce": "你的智能灵犀百科，回答你的所有问题。",
                "status": 0,
                "category": 0,
                "description": "百科全书",
                "imageUrl": "https://img1.baidu.com/it/u=3085314127,1349810891&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "detailedIntroduction": "作为你的智能伙伴，我既能写文案、想点子，又能陪你聊天、答疑解惑。提出你的问题，我将为你答疑解惑。"
            },
            {
                "id": 8,
                "identification": "TecherEnglishHelper",
                "hot": 90,
                "introduce": "口语不好？来这里 修改你的口语坏习惯。",
                "status": 0,
                "category": 0,
                "description": "英语口语老师",
                "imageUrl": "https://n.sinaimg.cn/sinacn10102/223/w470h553/20190719/bc6f-hzxsvnp6597706.jpg",
                "detailedIntroduction": "作为你的智能英语老师伙伴。我具有具有丰富的语言知识，不仅掌握英语语言的基本语法和词汇,而且还能够流利地使用英语进行听、说、写。我们能够为学生提供准确的语言指导和反馈,帮助学生更好地掌握英语语言技能"
            },
            {
                "id": 10,
                "identification": "Character",
                "hot": 120,
                "introduce": "请告诉我我是什么故事中的角色，进行角色互动吧。",
                "status": 0,
                "category": 0,
                "description": "角色扮演",
                "imageUrl": "https://n.sinaimg.cn/sinacn/w587h451/20180301/6d47-fwnpcns6281081.png",
                "detailedIntroduction": "作为你的智能角色扮演伙伴，请告诉我我是什么故事中的角色。我将扮演相对应的角色和你进行对话，给你最真实的体验。"
            },
            {
                "id": 11,
                "identification": "NetSearch",
                "hot": 10,
                "introduce": "根据你隐含的意思，比其它浏览器更理解你。",
                "status": 1,
                "category": 0,
                "description": "联网搜素",
                "imageUrl": "http://114.115.203.18:7788/aiabnimage/java.png",
                "detailedIntroduction": "提出你的问题，我将比浏览器更加理解你"
            },
            {
                "id": 12,
                "identification": "Agent",
                "hot": 0,
                "introduce": "大模型+记忆+主动规划+函数调用",
                "status": 1,
                "category": 0,
                "description": "联想搜索",
                "imageUrl": "https://bpic.588ku.com/element_origin_min_pic/20/12/14/36a531254aa34a34957d92b2e7747d04.jpg",
                "detailedIntroduction": "AI Agent（也称人工智能代理）是一种能够感知环境、进行决策和执行动作的智能实体。智能体像人一样，它有记忆、有逻辑分析能力、有任务的拆解能力、问题的拆解能力和最后综合回来统一解决问题的能力"
            },
            {
                "id": 13,
                "identification": "painting",
                "hot": 0,
                "introduce": "用语言描述所想，我们帮你完成创作",
                "status": 1,
                "category": 1,
                "description": "AI绘画",
                "imageUrl": "https://p4.itc.cn/q_70/images03/20220905/01a98cf4d9d546d7b9a0601b32ad2337.jpeg",
                "detailedIntroduction": "用文字描述所想，我将为您完成灵感创作"
            },
           {
                "id": 15,
                "identification": "Custom",
                "hot": 0,
                "introduce": "上传文件，制作专属于自己的知识库",
                "status": 1,
                "category": 3,
                "description": "知识库",
                "imageUrl": "https://p1.bdxiguaimg.com/img/mosaic-legacy/6ed30005bd2e309a4463~0x0.image",
                "detailedIntroduction": "上传你的文件"
            }，
            {
                "id": 14,
                "identification": "inquiry",
                "hot": 0,
                "introduce": "设备参数、性能和价格我一清二楚\"",
                "status": 1,
                "category": 2,
                "description": "AI报价",
                "imageUrl": "https://t11.baidu.com/it/u=489967194,178696525&fm=30&app=106&f=JPEG?w=350&h=360&s=41043D723CB157AFD4CC51E30300B0A0",
                "detailedIntroduction": "我负责分销产品报价。请问给哪位客户报价，项目名称是什么？通过上方添加告诉我。"
            },
            {
                "id": 16,
                "identification": "customerManagement",
                "hot": 0,
                "introduce": "管理所有客户，新增，修改，查询等\"",
                "status": 1,
                "category": 2,
                "description": "客户管理",
                "imageUrl": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%AE%A2%E6%88%B7%E7%AE%A1%E7%90%86%E5%8A%A8%E6%BC%AB%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=1&spn=0&di=7355526631391232001&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2306005094%2C2652860278&os=1863508975%2C4012802235&simid=3377154112%2C150551756&adpicid=0&lpn=0&ln=1661&fr=&fmq=1716358718859_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Ft10.baidu.com%2Fit%2Fu%3D1644133336%2C210973900%26fm%3D30%26app%3D106%26f%3DJPEG%3Fw%3D640%26h%3D641%26s%3DBAA0E506883357AD7C84A1DB030080A0&fromurl=ippr_z2C%24qAzdH3FAzdH3Fkwt3twiw5_z%26e3Bkwt17_z%26e3Bv54AzdH3Ff%3Ft1%3D800n80dml0nlbamamb8%26ou6%3Dfrt1j6%26u56%3Drv&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDEsMiw2LDQsNSw3LDgsOQ%3D%3D&lid=4188898086463708529",
                "detailedIntroduction": "我负责分销产品报价。请问给哪位客户报价，项目名称是什么？通过上方添加告诉我。"
            },
            {
                "id": 17,
                "identification": "DataReport",
                "hot": 0,
                "introduce": "数据报表精准输出，需要统计的数据都有\"",
                "status": 1,
                "category": 2,
                "description": "数据报表",
                "imageUrl": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%95%B0%E6%8D%AE%E6%8A%A5%E8%A1%A8%E5%8A%A8%E6%BC%AB%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=74&spn=0&di=7355526631454146561&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2235237524%2C873066425&os=2530088080%2C3538337205&simid=2235237524%2C873066425&adpicid=0&lpn=0&ln=1727&fr=&fmq=1716359164858_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=15&oriquery=&objurl=https%3A%2F%2Fimg.shangyexinzhi.com%2Fxztest-image%2Farticle%2F3987ea1d5dc87d2c492eb710db56ea52.jpeg%3Fx-oss-process%3Dimage%2Fresize%2Cw_670&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bfiwg2yjxtgzit_z%26e3Bv54AzdH3Fw6ptvsjAzdH3F9m8b00b_z%26e3Bip4s&gsm=3c&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDEsMiw2LDQsNSw3LDgsOQ%3D%3D&lid=4444254473782310277",
                "detailedIntroduction": "亲量圭尺，躬察仪漏，目尽毫厘，心穷筹策。数据报表精准输出，需要统计的数据都有。你可以问"
            },
            {
                "id": 18,
                "identification": "equipment",
                "hot": 0,
                "introduce": "设备参数、性能和功能指标我一清二楚\"",
                "status": 1,
                "category": 2,
                "description": "设备详情",
                "imageUrl": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E8%AE%BE%E5%A4%87%E8%AF%A6%E6%83%85%E5%8A%A8%E6%BC%AB%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=9&spn=0&di=46137345&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=274330949%2C2552109864&os=2375647597%2C646638438&simid=274330949%2C2552109864&adpicid=0&lpn=0&ln=1706&fr=&fmq=1716360214214_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=https%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0415%2F93fe095dj00sbzipi00e3d000iy00dwp.jpg%26thumbnail%3D660x2147483647%26quality%3D80%26type%3Djpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mn_z%26e3Bv54AzdH3F1yAzdH3Fw6ptvsjAzdH3FIVLQVCc0accm0DRF_z%26e3Bip4s&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDEsMiw2LDQsNSw3LDgsOQ%3D%3D&lid=3958409074735253318",
                "detailedIntroduction": "设备参数，性能和功能指标我一清二楚。请说出你想要了解的参数名称。"
            },
            {
                "id": 19,
                "identification": "sales",
                "hot": 20,
                "introduce": "薄利多销，无敢巨贵，务万物，无息币\"",
                "status": 1,
                "category": 2,
                "description": "销售策略",
                "imageUrl": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E9%94%80%E5%94%AE%E5%8A%A8%E6%BC%AB%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=14&spn=0&di=7355526631391232001&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2742736740%2C2031146680&os=3124162962%2C1054148882&simid=2742736740%2C2031146680&adpicid=0&lpn=0&ln=1764&fr=&fmq=1716361037653_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fimg.crcz.com%2Fallimg%2F201809%2F28%2F1538072414118307.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4_z%26e3Bv6vz_z%26e3Bv54AzdH3Fp57xtwg2AzdH3Fq7gAzdH3Fda8bAzdH3F8a9b_z%26e3Bip4s&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDEsMiw2LDQsNSw3LDgsOQ%3D%3D&lid=4193451597769701231",
                "detailedIntroduction": "经商之道，人取我予。薄利多销，无敢巨贵，务万物，无息币。"
            }, -->

<!-- 第二个系列 -->
<!-- 	IntelligentData:[
				{
				                "id": 1,
				                "identification": "default",
				                "hot": 8900,
				                "introduce": "你的智能灵犀百科，回答你的所有问题",
				                "status": 0,
				                "category": 1,
				                "description": "百科全书",
				                "imageUrl": "https://img1.baidu.com/it/u=3085314127,1349810891&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
				                "detailedIntroduction": "嗨，作为你的智能伙伴，我既能写文案、想点子，又能陪你聊天，答疑解惑。提出你的问题，我将为你答疑解惑。"
				            },
							{
							     "id": 2,
							     "identification": "Custom",
							     "hot": 0,
							     "introduce": "上传文件，制作专属于自己的知识库",
							     "status": 1,
							     "category": 1,
							     "description": "知识库",
							     "imageUrl": "https://p1.bdxiguaimg.com/img/mosaic-legacy/6ed30005bd2e309a4463~0x0.image",
							     "detailedIntroduction": "嗨，作为你的智能助手，我专责制作和管理你的专属知识库。只需上传文件，我便能为你分析和整理这些资料。当你查询这些文件中的信息时，我将迅速且准确地为你提供所需的帮助。"
							 },
							 {
							     "id": 3,
							     "identification": "painting",
							     "hot": 0,
							     "introduce": "用语言描述所想，我们帮你完成创作",
							     "status": 1,
							     "category": 1,
							     "description": "趣味绘画",
							     "imageUrl": "https://p4.itc.cn/q_70/images03/20220905/01a98cf4d9d546d7b9a0601b32ad2337.jpeg",
							     "detailedIntroduction": "嗨，作为你的智能伙伴，我专门负责智能绘画。只需向我描述你心中的场景，我们就可以帮你将其描绘出来。快来体验看看吧！"
							 },
							 {
							     "id": 4,
							     "identification": "JuniorSister",
							     "hot": 0,
							     "introduce": "直接连线随时聊天，倾诉压力和烦恼",
							     "status": 1,
							     "category": 1,
							     "description": "知心学妹",
							     "imageUrl": require('../../static/Intelligent/xvemei.jpeg'),
							     "detailedIntroduction": "嗨，作为你的智能伙伴，我在这里成为你最亲密的朋友。无论是生活中的小烦恼还是工作上的压力，你都可以向我倾诉。我会仔细聆听，并为你提供最贴心的安慰和支持。"
							 },
							 {
							     "id": 5,
							     "identification": "Character",
							     "hot": 120,
							     "introduce": "你喜欢的角色，就是我的身份",
							     "status": 0,
							     "category": 1,
							     "description": "角色扮演",
							     "imageUrl": "https://n.sinaimg.cn/sinacn/w587h451/20180301/6d47-fwnpcns6281081.png",
							     "detailedIntroduction": "嗨，作为你的智能伙伴，我负责角色扮演，请告诉我你想让我扮演的角色。我将全身心地投入到这个角色中，与你进行对话，为你提供一个真实的互动体验。"
							 },
				            {
				                "id": 6,
				                "identification": "ComputerRental",
				                "hot": 90,
				                "introduce": "提供常见服务的使用权",
				                "status": 0,
				                "category": 1,
				                "description": "电脑租凭",
				                "imageUrl": require('../../static/Intelligent/diannao.jpeg'),
				                "detailedIntroduction": "嗨，作为你的智能伙伴，我们提供市面上常见服务的使用权，适用于临时的项目和特殊活动等等。为用户提供了一种灵活、成本效益高的方式来满足临时或长期的计算需求，避免了购买、维护和升级设备的繁琐和昂贵。快来体验一下吧。"
				            },
							{
							    "id": 7,
							    "identification": "TecherEnglishHelper",
							    "hot": 90,
							    "introduce": "提供常见系统授权账号，用户直接使用",
							    "status": 0,
							    "category": 1,
							    "description": "差旅系统",
							    "imageUrl": require('../../static/Intelligent/buss.jpeg'),
							    "detailedIntroduction": "嗨，作为你的智能伙伴，我们提供市面上常见系统的授权账号。直接使用，免去繁琐的注册流程。快来体验一下吧！"
							},
				            {
				                "id": 8,
				                "identification": "inquiry",
				                "hot": 0,
				                // "introduce": "灵活报价，根据客户、项目、发展阶段生成个性化报价单",
								"introduce": "根据客户和项目阶段生成个性化报价单",
				                "status": 1,
				                "category": 0,
				                "description": "产品报价",
				                "imageUrl": "https://t11.baidu.com/it/u=489967194,178696525&fm=30&app=106&f=JPEG?w=350&h=360&s=41043D723CB157AFD4CC51E30300B0A0",
				                "detailedIntroduction": "嗨，作为你的智能伙伴，我负责产品报价。请问给那位客户报价，项目名称是什么？请通过上方添加告诉我。"
				            },
							{
							    "id": 9,
							    "identification": "equipment",
							    "hot": 0,
							    "introduce": "根据产品或需求给出通用、专属参数",
							    "status": 1,
							    "category": 0,
							    "description": "招标参数",
							    "imageUrl": "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0415%2F93fe095dj00sbzipi00e3d000iy00dwp.jpg&thumbnail=660x2147483647&quality=80&type=jpg",
							    "detailedIntroduction": "嗨，作为你的智能伙伴，设备参数，性能和功能指标我一清二楚。请说出你想要了解的产品型号。"
							},
				            {
				                "id": 10,
				                "identification": "customerManagement",
				                "hot": 0,
				                "introduce": "管理所有客户，新增，修改，查询等",
				                "status": 1,
				                "category": 0,
				                "description": "客户管理",
				                "imageUrl": "https://t10.baidu.com/it/u=1644133336,210973900&fm=30&app=106&f=JPEG?w=640&h=641&s=BAA0E506883357AD7C84A1DB030080A0",
				                "detailedIntroduction": "嗨，作为你的智能伙伴，我能高效地管理客户信息，包括新增客户、修改客户资料和查询等功能，让管理变得简单便捷。快来体验一下吧！"
				            },
				            {
				                "id": 11,
				                "identification": "DataReport",
				                "hot": 0,
				                "introduce": "数据报表精准输出，需要统计的数据都有",
				                "status": 1,
				                "category": 0,
				                "description": "智能报表",
				                "imageUrl": "https://img.shangyexinzhi.com/xztest-image/article/3987ea1d5dc87d2c492eb710db56ea52.jpeg?x-oss-process=image/resize,w_670",
				                "detailedIntroduction": "嗨，作为你的智能伙伴，我负责管理和整理数据，并通过折线图、柱状图、饼图等形式直观地展示这些信息给你。快来体验看看吧。"
				            },
							{
							    "id": 12,
							    "identification": "sales",
							    "hot": 20,
							    "introduce": "提供最好，最近精准的产品销售策略",
							    "status": 1,
							    "category": 0,
							    "description": "销售策略",
							    "imageUrl": "https://img0.baidu.com/it/u=2808964227,3371613293&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380",
							    "detailedIntroduction": "嗨，作为你的智能伙伴，我能提供相关产品的详细信息及最优销售策略。快来体验一下吧！"
							},
							{
							    "id": 13,
							    "identification": "HuaweiCloud",
							    "hot": 20,
							    "introduce": "提供华为云售后服务和技术支撑",
							    "status": 1,
							    "category": 0,
							    "description": "华为云售后",
							    "imageUrl": require('../../static/Intelligent/huawei.gif'),
							    "detailedIntroduction": "嗨，作为你的智能伙伴，我们提供华为云的售后服务全面的技术支持和客户服务，以确保用户能够有效利用其云计算资源。快来试试吧。"
							},
							{
							    "id": 14,
							    "identification": "BeautyAvatar",
							    "hot": 20,
							    "introduce": "图片多风格转换，快速实现视觉多样化",
							    "status": 1,
							    "category": 2,
							    "description": "美颜头像",
							    "imageUrl": require('../../static/Intelligent/huanzhuang.png'),
							    "detailedIntroduction": "嗨，作为你的智能伙伴，只需上传一张图片，我就能帮你转换成多种风格，如职业化、卡通化、抽象化等。快来体验一下吧！"
							},
							{
							    "id": 15,
							    "identification": "BusinessCard",
							    "hot": 20,
							    "introduce": "一键生成个人名片",
							    "status": 1,
							    "category": 2,
							    "description": "普通名片",
							    "imageUrl": require('../../static/Intelligent/mingpian.jpg'),
							    "detailedIntroduction": "嗨，作为你的智能伙伴，只需提供基本信息，我便可一键生成多种风格的个人名片供你选择。快来尝试看看吧！"
							},
							{
							    "id": 16,
							    "identification": "DigitalCard",
							    "hot": 20,
							    "introduce": "制作会说话的数字人名片",
							    "status": 1,
							    "category": 2,
							    "description": "数字名片",
							    "imageUrl":  require('../../static/Intelligent/shuziren.jpg'),
							    "detailedIntroduction": "嗨，作为你的智能伙伴，想要一张会自我介绍的个人名片吗？只需提供一张正面人脸照片和名片所需的个人信息，我就能帮你实现这一需求。快来试试看吧！"
							},
							{
							    "id": 17,
							    "identification": "DigitalPeople",
							    "hot": 20,
							    "introduce": "你提供照片，我们帮你生成数字人",
							    "status": 1,
							    "category": 2,
							    "description": "数字人",
							    "imageUrl": require('../../static/Intelligent/shuzi.jpeg'),
							    "detailedIntroduction": "嗨，作为你的智能伙伴，我能以最低成本帮你创造数字化的自我表现。只需提供一张正面照片和你想表达的话语，就可以轻松实现。快来体验一下吧！"
							},
							{
							    "id": 18,
							    "identification": "AccountPassword",
							    "hot": 20,
							    "introduce": "防止账号密码过多而遗忘和混淆",
							    "status": 1,
							    "category": 2,
							    "description": "密码管家",
							    "imageUrl":  require('../../static/Intelligent/mima.jpg'),
							    "detailedIntroduction": "嗨，作为你的智能伙伴，我在确保隐私和安全的前提下，帮助客户安全存储账号和密码。这样做可以防止客户因密码众多而遗忘或混淆。需要时，我们会安全地返还给客户。"
							},
							{
							    "id": 19,
							    "identification": "StoreFiles",
							    "hot": 20,
							    "introduce": "请上传定价文件，便于我们报价",
							    "status": 1,
							    "category": 2,
							    "description": "产品定价",
							    "imageUrl": require('../../static/Intelligent/wenjian.jpeg'),
							    "detailedIntroduction": "嗨，作为您的智能伙伴，我能在确保隐私和安全的前提下，帮助用户进行产品定价。当您上传定价文件后，我们的系统将参考这些文件，为您提供精准的产品报价。"
							},
							
			], -->