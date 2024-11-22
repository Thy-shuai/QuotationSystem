<template>
	<view class="youexcel" style="font-size: 26rpx;" v-if="item.url==false" @tap.stop="ViewingDocuments(item)">
		<view style="height: 69%;width: 100%;">
			<view style="display: flex;justify-content: space-around;align-items: center;height: 75%;margin-left: 28rpx;">
				<!-- text-align: justify; -->
				<view class="fileNameText" style="font-size: 26rpx; font-family: '思源黑体Regular';">
				        {{name}}
						<!-- 20240910项目报价单.xlsx -->
				</view>

				<view style="width: 30%;height: 90%;display: flex;justify-content: center;align-items: center;">
					<image lazy-load="true" src="../static/xlsx.png" mode="widthFix" style="width: 65%"></image>
					<!-- <image lazy-load="true" v-if="item.filetype=='xlsx'" src="../static/xlsx.png"  style="height: 100%;width: 75%;"></image>
					<image lazy-load="true" v-if="item.filetype=='txt'" src="../static/txt.png" mode="" style="height: 90%;width: 65%;"></image>
					<image lazy-load="true" v-if="item.filetype=='docx'||item.filetype=='doc'" src="../static/WORD.png" mode="" style="height: 90%;width: 65%;"></image> -->
				</view>
			</view>
			<view style="display: flex;align-items: center;height: 25%;margin-left: 28rpx;">
				<view v-if="item.filPath != ''">
					<text style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
				</view>
				<!-- <view v-if="item.filPath == ''">
					<text v-if="isDownload==0" style="font-size: 20rpx;opacity: 0.6;">0 / 未下载</text>
					<u-line-progress v-if="isDownload==1" :percentage="fileProgress" height="7"></u-line-progress>
					<text v-if="isDownload==2" style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
				</view> -->
			</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
  name: 'quotationDocument',
  props: ['item', 'name'],
  mounted() {
  },
  methods:{
	  ViewingDocuments(arr){
	  	// console.log("此处需要展示的链接是：",fileUrl);
	  	console.log("该对象是：",arr);
	  	var fileUrl = arr.urlAdress  //拿到要打开文件的链接
	  	uni.getFileInfo({
	  	  filePath: arr.filPath,
	  	  success: function(res) {
	  	    console.log('文件存在，文件大小:', res.size);
	  	    // 文件存在，可以执行相关操作
			uni.openDocument({
			  filePath: arr.filPath,
			  // filePath:fileUrl,
			  success: function (res) {
			    console.log('打开文档成功');
			  },
			  fail:(res)=> {
				this.document(arr);
			  }
			});
	  	  },
	  	  fail: function(err) {
	  	    console.log('文件不存在或路径错误:', err);
			this.isDownload = 1;
			const downloadTask = uni.downloadFile({
			  url: fileUrl,
			  success: (res)=> {
				// arr.filPath = res.tempFilePath;
				uni.saveFile({
					tempFilePath: res.tempFilePath,
					success: (saveRes) => {
					  console.log('文件保存成功:', saveRes.savedFilePath);
						uni.openDocument({
							filePath: saveRes.savedFilePath,
							success:(res)=> {
							  console.log('打开文档成功');
							  arr.filPath = saveRes.savedFilePath;
							  // this.$emit('updataMsg', arr);
							  // 拿到新下载好的文件之后，重新赋值到原来的位置
							  
							},
							fail(res) {
							console.log("打开文档失败",res);
							}
						});
					},
					fail: (error) => {
					  console.error('文件保存失败:', error);
					}
				});
			  },
			  fail(res) {
			  	console.log("下载失败！",res);
			  }
			});
			downloadTask.onProgressUpdate((res) => {
				this.fileProgress = res.progress;
				if (this.fileProgress == 100){
					this.isDownload = 2;
				}
				this.fileSize = `${(res.totalBytesExpectedToWrite / 1024).toFixed(2)}kb`;
				arr.fileSize = this.fileSize;  //文件大小保存到app本地中
			});
	  	  }
	  	});
	  },
  }
}
</script>

<style>
	.youexcel{
	  background-color: #f5f5f5;
	  /* background-color: blue; */
	  margin-top: 10rpx;
	  /* transform: translateY(-25rpx); */
	  margin-left: 0rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-size: 26rpx;
	  width: 450rpx;
	  border-radius: 25rpx 25rpx 25rpx 0rpx;
	  height: 160rpx;
	}
	.fileNameText {
	  display: -webkit-box;
	  line-height: 1.5;
	  text-align: left;
	  width: 70%;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 1.2; /* 限制显示2行 */
	  overflow: hidden;
	  text-overflow: ellipsis; /* 超出部分以省略号显示 */
	  white-space: normal; /* 保证换行 */
	}

</style>
