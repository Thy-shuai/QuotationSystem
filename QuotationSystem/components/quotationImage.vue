<template>
	<!-- v-if="item.little_photo!=''" -->
	<view  class="animate__animated animate__fadeIn" style="width: 100%; height: 200px; display: flex; align-items: center; justify-content: center;">
		<image lazy-load="true" :src="item.little_photo" @tap="enlargePhoto(item)" mode="aspectFit" style="width: 100%; height: 100%;"></image>
	</view>
</template>

<script>
	export default {
		name:"quotationImage",
		data() {
			return {
				
			};
		},
		methods:{
			enlargePhoto(event){
				uni.previewImage({
					urls:[event.all_photo],
					current:event.all_photo
				})
			},
		}
	}
</script>

<style>
	@import 'animate.css';
</style>