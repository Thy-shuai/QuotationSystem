<template>
	<view >
		<!-- v-if="directions==1&&price==0" -->
		<view class="container" >
			<!-- :class="directions == 1 ? 'rounded-box' : 'rounded-box1'" -->
		  <view :class="directions == 1 ? (price==0 ? 'rounded-box2' : 'rounded-box') : 'rounded-box1'">
			  <view class="data-box" @tap="copydata">
				  <image src="../static/copy.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">复制</view>
			  </view>
			  <view class="data-box" @tap="deleteData" style="">
				  <image src="../static/delete.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">删除</view>
			  </view>
			  <view class="data-box" @tap="priceChange" v-if="price!=0" style="">
				  <image src="../static/price.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">价格调整</view>
			  </view>
		  </view>
		</view>
		<!-- <view class="container" v-if="directions==1 && price!=0">
		  <view class="rounded-box">
			  <view class="data-box" @tap="copydata">
				  <image src="../static/copy.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">复制</view>
			  </view>
			  <view class="data-box" @tap="deleteData" style="">
				  <image src="../static/delete.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">删除</view>
			  </view>
			<view class="data-box" @tap="priceChange" style="">
				  <image src="../static/price.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">价格调整</view>
			  </view>
		  </view>
		</view>
		<view class="container" v-if="directions==0">
		  <view class="rounded-box1">
			  <view class="data-box" @tap="copydata">
				  <image src="../static/copy.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">复制</view>
			  </view>
			  <view class="data-box" @tap="deleteData">
				  <image src="../static/delete.png" mode="" style="height: 50rpx;width: 50rpx;"></image>
				  <view style="font-size: 22rpx;">删除</view>
			  </view>
		  </view>
		</view> -->
	</view>
</template>

<script>
	export default {
		name:"CheckboxText",
		data() {
			return {
				msgbox:this.message,
				directions:this.direction,
				deletedata:this.deletedataa
			};
		},
		// props:['message', 'direction', 'deletedataa', 'price'],
		props:{
			message: {
			    
			    },
			    direction: {
			    
			    },
			    deletedataa: {
			      
			    },
			    price: {
			     
			      default: 0    // 设置默认值为 0
			    }
		},
		watch:{
			message(newval){
				this.msgbox = newval;
			},
			direction(newval){
				this.directions = newval;
			},
			deletedataa(newval){
				this.deletedata = newval;
			}
		},
		mounted() {
			console.log("价格是：",this.price);
			console.log("方向是：",this.directions);
		},
		methods:{
			copydata(){
				// console.log("复制的数据是：", this.msgbox);
				let index = this.msgbox;
				if (index.single_produce == true){
					this.msgbox = index.informationReplication
				}
				uni.setClipboardData({
					data: this.msgbox,
					success:(res)=>{
						console.log('success');
						this.$emit('replydisplay', 1);
					}
				});
			},
			deleteData(){
				this.$emit('deletemsg', this.deletedata);
			},
			priceChange(){
				// console.log("调整价格");
				let message = {
					msgbox:this.msgbox,
					isTrue:true
				}
				this.$eventBus.$emit('priceChange',message);
				this.$eventBus.$emit('isPhoto', this.msgbox)
			}
		}
	}
</script>

<style scoped>
	@import 'animate.css';
	.rounded-box {
		display: flex;
		align-items: center;
		color: white;
		justify-content: space-around;
		position: relative;
		height: 120rpx;
		width: 320rpx;
		/* height: auto;
		width: auto; */
		/* width: 90px;
		height: 60px; */
		/* background-color: #007aff; */
		background-color: #484848;
		border-radius: 10px;
	}

	.rounded-box::after {
	  content: '';
	  position: absolute;
	  bottom: -7px; /* 突起位于方框下方 */
	  left: 20%;
	  transform: translateX(-50%);
	  width: 0;
	  height: 0;
	  border-left: 10px solid transparent; /* 突起的左侧 */
	  border-right: 10px solid transparent; /* 突起的右侧 */
	  /* border-top: 10px solid #007aff; */
	  border-top: 10px solid #484848;
	}
	.rounded-box1 {
		display: flex;
		align-items: center;
		color: white;
		justify-content: space-around;
		position: relative;
		width: 170rpx;
		height: 120rpx;
		/* background-color: #007aff; */
		background-color: #484848;
		border-radius: 10px;
	}
	
	.rounded-box1::after {
	  content: '';
	  position: absolute;
	  bottom: -7px; /* 突起位于方框下方 */
	  left: 80%;
	  transform: translateX(-50%);
	  width: 0;
	  height: 0;
	  border-left: 10px solid transparent; /* 突起的左侧 */
	  border-right: 10px solid transparent; /* 突起的右侧 */
	  /* border-top: 10px solid #007aff; */
	  border-top: 10px solid #484848;
	}
	.rounded-box2 {
		display: flex;
		align-items: center;
		color: white;
		justify-content: space-around;
		position: relative;
		height: 120rpx;
		width: 180rpx;
		/* height: auto;
		width: auto; */
		/* width: 90px;
		height: 60px; */
		/* background-color: #007aff; */
		background-color: #484848;
		border-radius: 10px;
	}
	
	.rounded-box2::after {
	  content: '';
	  position: absolute;
	  bottom: -7px; /* 突起位于方框下方 */
	  left: 20%;
	  transform: translateX(-50%);
	  width: 0;
	  height: 0;
	  border-left: 10px solid transparent; /* 突起的左侧 */
	  border-right: 10px solid transparent; /* 突起的右侧 */
	  /* border-top: 10px solid #007aff; */
	  border-top: 10px solid #484848;
	}
	.data-box{
		width: 40%;
		height: 80%;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		justify-content: space-around;
		flex-direction: column;
		transition: all 0.3s;
	}
	.data-box:active{
		transform: scale(0.9);
	}
</style>