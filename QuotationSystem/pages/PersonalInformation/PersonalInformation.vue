<template>
	<page-meta :root-font-size="26.66667+'vw'"></page-meta>
	<!-- padding-top: 20rpx; -->
	<view style="display: flex; justify-content: center; width: 100%;height: 100%;padding-top: 0.1rem;">
		<!-- font-size: 12px -->
		<view style="width: 90%;height: 100%;">
			<view class="box">
				<text class="left_message">头像</text>
				<view class="node">
					<text style="font-size: 0.14rem;covwlor: white">{{message_person[0].name}}</text>
					<!-- <text style="font-size: 28rpx;covwlor: white">{{message_person[0].name}}</text> -->
					<!-- <image src="../../static/girl.jpeg" mode="" style="height: 100%;width: 100%;border-radius: 50%;"></image> -->
				</view>
			</view>
			<view class="box">
				<text class="left_message">姓名</text>
				<text selectable='true' user-select='true' style="font-size: 0.14rem;opacity: 0.8;">{{message_person[0].name}}</text>
			</view>
			<view class="box">
				<text class="left_message">公司</text>
				<text class="right_message">{{message_person[0].company}}</text>
			</view>
			<view class="box">
				<text class="left_message">职位</text>
				<text class="right_message">{{message_person[0].position}}</text>
			</view>
			<view class="box">
				<text selectable='true' class="left_message">微信</text>
				<text selectable='true' class="right_message">{{message_person[0].weixin}}</text>
			</view>
			<view class="box">
				<text class="left_message">手机</text>
				<text selectable='true' class="right_message">{{message_person[0].phone}}</text>
			</view>
			<view class="box">
				<text user-select='true' class="left_message">邮箱</text> 
				<text selectable='true' class="right_message">{{message_person[0].email}}</text>
			</view>
			<view class="button_box">
				<button class="button_text" @tap="ModifyData">编辑</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// message_person:[
				// 	{
				// 		src:'头像',  // 头像
				// 		name:'郭菲菲',
				// 		company:'西安来发科技有限公司',
				// 		position:'采购',
				// 		weixin:'addiss',
				// 		phone:'18933339999',
				// 		email:'18933339999@qq.com'
						
				// 	}
				// ]
				message_person:[],
				message:'',  //总的数据
				fontsize:'100px',
			}
		},
		onLoad(options) {
		  if ('param' in options) {
		    var obj = JSON.parse(decodeURIComponent(options.param));
			this.message = obj;
			this.message_person.push(obj.child);
			// console.log("传递过来的数据是：",this.message);
		  } else {
			  console.log("数据传递失败！");
		  }
		},
		methods: {
			ModifyData(){
				const param = encodeURIComponent(JSON.stringify(this.message));
				uni.navigateTo({
					url:`/pages/EditPersonalInformation/EditPersonalInformation?param=${param}`,
					animationType: 'zoom-fade-out',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss">
	@mixin flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box{
		display: flex;
		justify-content:space-between;
		align-items: center; 
		width: 100%;
		height: 0.5rem;
		/* height: 100rpx; */
		/* background-color: cadetblue; */
	}
	.left_message{
		/* font-size: 30rpx; */
		font-size: 0.15rem;
	}
	.right_message{
		opacity: 0.8;
		/* font-size: 28rpx; */
		font-size: 0.14rem;
	}
	.button_box{
		@include flex;
		height: 0.2rem;
		width: 100%;
		background-color: brown;
		margin-top: 0.3rem;
	}
	.button_text{
		@include flex; 
		background-color: cadetblue;
		color: white;
		height:0.4rem;
		width: 100%;
	}
	.node{
		@include flex;
		height: 0.45rem;
		width: 0.45rem; 
		background-color: cadetblue;
		border-radius: 50%;
	}
</style>
