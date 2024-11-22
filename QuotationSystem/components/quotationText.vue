<template>
	<view class="">
		<view class="youMsg" v-if="type==1&&load==false">
			{{message}}
			<!-- S5731-H48T4XC(48个10/100/1000BASE-T以太网端口,4个万兆SFP+,单子卡槽位,不含电源) -->
			<!-- 实施方案编写-"包括面向交付站点的迁移/实施需求分析、现网配置分析、迁移/实施方案撰写、业务/应用逻辑可用性验证方案撰写" -->
			<!-- 正在分析查询到的数据
			<view style="padding-top: 20rpx;">
				<LoadingDots />
			</view> -->
			<!-- 根据您提供的产品信息，我们提供的推荐报价如下表所示： -->
		</view>
		<view class="youMsg" v-if="type==1&&load==true" style="flex-direction: row;">
			{{message}}
			<!-- 正在分析查询到的数据 -->
			<view style="padding-top: 20rpx;">
				<LoadingDots size="4"/>
			</view>
			<!-- 根据您提供的产品信息，我们提供的推荐报价如下表所示： -->
		</view>
		<!-- <rich-text :nodes="message" v-if="type==0" selectable="true" class="youMsg"></rich-text> -->
		<text class="youMsgg" v-if="type==0">
			{{message}} <text style="color: blue;" v-if="price || price==0" @tap="adjustPrice">{{price}}</text>
			<!-- 最初的价格 <text style="color: blue;" @tap="adjustPrice">2513元</text> -->
		</text>
	</view>
</template>

<script>
	import LoadingDots from '../components/LoadingDots.vue'
	export default {
		name:"quotationText",
		data() {
			return {
				value:30,
				isClick:false
			};
		},
		props:['message', 'type', 'load', 'price', 'msgbox'],
		components:{
			LoadingDots
		},
		mounted() {
			// console.log("价格是：", this.price);
		},
		methods:{
			blurData(){
				console.log("输入框失去焦点");
			},
			adjustPrice(){
				console.log("调整价格", this.msgbox);
				this.$emit('adjustmentPrice', this.msgbox);
				
			}
		}
	}
</script>

<style>
	:root {
	  --font-size: 30rpx;
	  --font--family:'思源黑体Regular'
	}
	.youMsg{
		display:flex;
		flex-direction: column;
		white-space: pre-wrap;
		max-width: 80vw;
		word-wrap: break-word;
		/* width: 100vw; */
		/* font-family:Arial; */
		word-break: break-all;
		/* background-color:#F6F6F6; */
		background-color: #f5f5f5;
		border-radius: 25rpx 25rpx 0 0;
		/* padding: 25rpx 28rpx 25rpx 28rpx; */
		padding: 25rpx 28rpx 25rpx 28rpx;
		font-family: var(--font--family);
		font-size: 30rpx;
		line-height: 1.5;
		letter-spacing: 0.8rpx;
		text-align: justify;
		color: #000000;
	}
	.youMsgg{
		display:flex;
		flex-direction: column;
		white-space: pre-wrap;
		max-width: 80vw;
		word-wrap: break-word;
		/* width: 100vw; */
		/* font-family:Arial; */
		word-break: break-all;
		/* background-color:#F6F6F6; */
		background-color: #f5f5f5;
		/* border-radius: 20rpx; */
		border-radius: 25rpx 25rpx 25rpx 0;
		/* border-radius: 25rpx 25rpx 0 0; */
		padding: 25rpx 28rpx 25rpx 28rpx;
		/* padding: 25rpx 28rpx 0 28rpx; */
		font-family: var(--font--family);
		font-size: 30rpx;
		line-height: 1.5;
		letter-spacing: 0.8rpx;
		text-align: justify;
		color: #000000;
	}
	.click{
		display: flex;
		width: 100%;
		align-items: center;
		flex-direction: row;
		height: 70rpx;
	}
	.clickBegin{
		display: flex;
		width: 100%;
		align-items: center;
		flex-direction: row;
		/* height: 70rpx; */
	}
</style>