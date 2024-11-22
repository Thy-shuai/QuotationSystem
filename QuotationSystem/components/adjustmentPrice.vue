<template>
	<view>
		<view style="height: 100vh;width: 100%;display: flex;align-items: center;justify-content: center;flex-direction: column;">
			<view class="total" style="position: relative;">
				<!-- <image src="../static/qvxiao.png" mode="" @tap="exit" style="height: 50rpx;width: 50rpx;position: absolute;right: 10rpx;top: 10rpx;"></image> -->
				<view class="top" style="margin-top: 20rpx;">
					<view style="font-size: 30rpx;display: flex;width: 45%;height: 100%;align-items: center;justify-content: center;">
						<!-- <view style="font-size: 20rpx">原价：</view> -->
						<!-- {{first_money}} -->
						<view :style="'font-size:' + fontSize + 'rpx'">{{first_money}}</view>
					</view>
					<view style="font-size: 30rpx;display: flex;width: 10%;height: 100%;align-items: center;justify-content: center;">
						<image src="../static/dan.png" mode="widthFix" style="transform: rotate(90deg); height: auto;width: 60%;"></image>
					</view>
					<view style="font-size: 30rpx;display: flex;width: 45%;height: 100%;align-items: center;justify-content: center;">
						<!-- <view style="font-size: 20rpx"></view> -->
						<!-- {{money}} -->
						<view :style="'font-size:' + fontSizeLeft + 'rpx'">{{money}}</view>
					</view>
				</view>
				<view class="bottom" style="">
					<!-- {{reduce}}%- -->
					<view style="width: 15%;;text-align: right;font-size: 30rpx;">{{reduce}}%-</view>
					<slider 
						v-model="value" 
						:max="100"
						:min="0"
						activeColor="#a71d5d"
						backgroundColor="#0086b3"
						style="width: 70%;" 
						block-width="16"
						@changing="change"
						@change="sliderChange" 
						@touchmove="onSliderTouchMove" 
					/>
					<!-- +{{add}}% -->
					<view style="width: 15%;font-size: 30rpx;text-align: left;">+{{add}}%</view>
				</view>
				<view style="display: flex;width: 100%;height: 20%;font-size: 30rpx;align-items: center;justify-content: space-around;">
					<view class="">
						<image src="../static/cha.png" @tap="exit" mode="heightFix" style="height: 60rpx;width: 60rpx;"></image>
					</view>
					<view class="">
						<image src="../static/duigou.png" @tap="save" mode="heightFix" style="height: 60rpx;width: 60rpx;"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
	<!-- 突发高峰期 -->
<script>
	export default {
		name:'adjustmentPrice',
		data() {	
			return {
				value: 50,
				add:0,
				reduce:0,
				money:1200,
				first_money:1200,
				show:true,
				size:60,
				size1:60,
				// number:4561234456212,
				// number1:4561234656
			}
		},
		props:['msgbox','price'],
		computed: {
		    // 计算 input 的宽度，基于 money 的值动态设置
		    dynamicInputWidth() {
		      // 根据 money 的值计算宽度，假设每个数字占用 10px
		      const baseWidth = 36;  // 最小宽度
		      const additionalWidth = (this.money.toString().length - 1) * 10; // 根据长度动态调整
		      return baseWidth + additionalWidth; 
		    },
			stepMoney(){
				if (this.money > 0){
					return this.money*(1+0.5);
				} else {
					return 1;
				}
			},
			fontSize(){
				// const containerWidth = uni.getSystemInfoSync().windowWidth * 0.5;
				const containerWidth = uni.getSystemInfoSync().windowWidth * 0.45;
				const characterWidth = this.size;
				const maxCharacters = Math.floor(containerWidth / characterWidth);
				this.size = (containerWidth / String(this.first_money).length) * 3.0;
				if (this.size >= 60){
					return 60;
				} else {
					return this.size;
				}
			},
			fontSizeLeft(){
				// const containerWidth = uni.getSystemInfoSync().windowWidth * 0.5;
				const containerWidth = uni.getSystemInfoSync().windowWidth * 0.45;
				
					// 假设每个字符默认宽度大约为字体大小的0.6倍（视字体而定）
				const characterWidth = this.size1;
						
					// 根据数字的长度动态调整字体大小
				const maxCharacters = Math.floor(containerWidth / characterWidth);
				this.size1 = (containerWidth / String(this.money).length) * 3.0;
				if (this.size1 >= 60){
					return 60;
				} else {
					return this.size1;
				}
			}
			
		  },
		mounted() {
			// console.log("价格是：", this.price);
			this.money = this.price.replace('元', '');
			this.first_money = this.price.replace('元', '');
		},
		methods:{
			oo(){
				console.log("123");
			},
			onSliderTouchMove(event) {
			      // 阻止默认的触摸行为
			    event.preventDefault();
			},
			change(event){
				this.value = event.target.value;
				if (this.value > 50){
					this.reduce = 0;
					this.add = 0;
					this.add = (this.value - 50)*2;
					let i = 2;
					let j = 10;
					// console.log("结果是:",i*j);
					// let index = this.add.toString().length;
					// console.log("价格12是：",typeof(Number(this.first_money)));
					// let mm = Number(this.first_money);
					// const number = this.first_money * ((1+this.add / 100));
					let get = (parseInt(this.first_money)*(1+this.add / 100)).toFixed(2)
					// let get =  this.$methods.computingTime(this.first_money,1+this.add / 100)
					// console.log("价格是：", get);
					this.money = parseFloat(get);
				}
				if (this.value < 50){
					this.add = 0;
					this.reduce = (50 - this.value)*2;
					let index = this.reduce.toString().length;
					// console.log("此时的数据是：",index);
					// console.log("比例是：", 1-this.reduce / 100);
					// let number = this.first_money * (1-this.reduce / 100);
					let get = (parseInt(this.first_money)*(1-this.reduce / 100)).toFixed(2)
					// console.log("价格是：", get);
					this.money = parseFloat(get);
				}
				if (this.value == 50){
					this.money = this.first_money;
					this.add = 0;
					this.reduce = 0;
				}
			},
			sliderChange(){
			},
			focusData(event){
				console.log("获得焦点时得到的信息：", event);
				this.value = 50;
				this.add = 0;
				this.reduce = 0;
			},
			blurData(event){
				console.log("失去焦点时得到的信息：", event);
				// 显示修改的初始值是
				this.first_money = event.value;
				this.money = event.value;
			},
			exit(){
				console.log("退出");
				this.$emit('exit',1)
			},
			save(){
				let message = {
					msgbox:this.msgbox,
					price:'',
				}
				if (this.money == this.price){
					message.price = this.price
				} else{
					message.price = this.money
				}
				this.$emit('priceAdjustment', message);
			}
		}
	}
</script>

<style lang="scss">
	@mixin flex($layout, $layin) {
		display: flex;
		justify-content: $layout;
		align-items: $layin;
	}
	.total{
		// @include flex(center, center);
		height: 700rpx;
		width: 95%;
		flex-direction: column;
		background-color: white;
		border-radius: 25rpx;
	}
	.top{
		@include flex(space-around, center);
		height: 50%;
		width: 100%;
		font-size: 40rpx;
		// background-color: blue;
		// background-color:rgba(255,255,255,0.8);
	}
	.bottom{
		@include flex(center, center);
		position: relative; 
		height: 20%;
		width: 100%;
		// background-color:rgba(255,255,255,0.8);
		// background-color: cadetblue;
	}
	.thick-slider ::v-deep .u-slider-track {
	    height: 20px; /* 这里设置滑块轨道的高度 */
	}
	
	.thick-slider ::v-deep .u-slider-thumb {
	    height: 30px; /* 这里设置滑块手柄的高度 */
	    width: 30px;  /* 这里设置滑块手柄的宽度 */
	}
</style>