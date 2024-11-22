<template>
	<view class="">
		<!-- <view class="loading-dots" v-if="size==0">
		  <view class="dot"></view>
		  <view class="dot"></view>
		  <view class="dot"></view>
		</view> -->
		<view class="loading-dots" >
		  <view class="dot" :style="'height:'+size+'px;width:'+size+'px'"></view>
		  <view class="dot" :style="'height:'+size+'px;width:'+size+'px'"></view>
		  <view class="dot" :style="'height:'+size+'px;width:'+size+'px'"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"LoadingDots",
		data() {
			return {
				
			};
		},
		props:['size'],
		mounted() {
			// console.log("此时的消息是：", this.size);
		}
	}
</script>

<style scoped>
.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #565656;
  border-radius: 50%;
  animation: dot-blink 1.4s infinite both;
}
.dot1 {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #565656;
  border-radius: 50%;
  animation: dot-blink 1.4s infinite both;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-blink {
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>