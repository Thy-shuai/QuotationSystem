<template>
	<!-- class="animate__animated animate__fadeInLeft" -->
	<view class="animate__animated animate__fadeInLeft">
		<view class="tooltop" v-if="type==0" @tap="sendData(message)">
			{{message}}
		    <!-- 这是一个较长的文本示例，它的宽度会根据文本调整 -->
		</view>
		<view class="tooltopp" v-if="type==1" @tap="sendData(message)">
			{{message}}
			<!-- 如果价格偏差较大，请告诉我更多的信息，比如品牌、产品型号、产品参数。 -->
		    <!-- 这是一个较长的文本示例，它的宽度会根据文本调整 -->
		</view>
	</view>
</template>

<script>
	// import mapActions from 'vuex';
	export default {
		name:"tooltipVue",
		data() {
			return {
				
			};
		},
		props:['message', 'type', 'index'],
		mounted() {
			// console.log("展示的信息是:", this.message);
		},
		methods:{
			// ...mapActions(['updateMessage']),  // 映射 Vuex action
			sendData(event){
				// this.updateMessage(event);
				// console.log("点击到的数据是：", event);
				// this.$emit('messageData', event);
				if (this.type == 1){
					console.log("此时数据的信息是：", event);
					return ;
				}
				let data = {
					message : event,
					index : this.index
				}
				// console.log("发送的数据是：",datas);
				this.$eventBus.$emit('hello', data)
				
			}
		}
	}
</script>

<style lang="scss">
	@import 'animate.css';
	:root {
	  --font-size: 30rpx;
	  --font--family:'思源黑体Regular'
	}
	.tooltop{
		display: flex;
		padding: 15rpx 28rpx;
		border-radius: 40rpx;
		font-size: 24rpx;
		// height: 42rpx;
		height: auto;
		width: auto;
		margin-bottom: 10rpx;
		max-width: 70vw;  /* 最大宽度，可以根据需要调整 */
		min-width: 50rpx;  /* 最小宽度，确保不太窄 */
		// border: 1px solid rgba(207, 231, 255, 1.0);
		border: 1px solid #ebebeb;
		// background-color: #f5f5f5;
		&:active{
			background-color: #ececec;
		}
	}
	.tooltopp{
		display:flex;
		align-items: center;
		white-space: pre-wrap;
		max-width: 80vw;
		word-break: break-all;
		background-color:#F6F6F6;
		margin-bottom: 10rpx;
		/* border-radius: 25rpx; */
		border-radius: 25rpx 25rpx 25rpx 0;
		/* padding: 25rpx 28rpx; */
		padding: 25rpx 28rpx 25rpx 28rpx;
		text-align: justify;
		/* padding: 25rpx;
		padding: 25rpx 28rpx; */
		line-height: 50rpx;
		font-size: var(--font-size);
		font-family: var(--font--family);
		letter-spacing: 0.8rpx;
	}
</style>