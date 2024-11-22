<template>
	<view class="youexcel" style="font-size: 26rpx;" v-if="item.isUrl==true" @tap.stop="ViewingDocuments(item)">
		<view style="height: 69%;width: 100%;">
			<view style="display: flex;justify-content: space-around;align-items: center;height: 75%;margin-left: 28rpx;">
				<view class="fileNameText" style="font-size: 26rpx;font-family: '思源黑体Regular';text-align: justify;">
					{{item.filename}}
					<!-- <view style="display: flex;justify-content: center;align-items: center;height: 100%;width: 100%;"> -->
						<!-- {{item.filename}} -->
						<!-- 撒旦发射点电风扇电机收到回复就是的话士大夫精神.xlsx -->
					<!-- </view> -->
				</view>
				<view style="width: 30%;height: 90%;display: flex;justify-content: center;align-items: center;">
					<!-- height: 100%; -->
					<image lazy-load="true" v-if="item.filetype=='xlsx'" src="../static/xlsx.png"  mode="widthFix" style="width: 65%;"></image>
					<image lazy-load="true" v-if="item.filetype=='txt'" src="../static/txt.png" mode="widthFix" style="width: 65%;"></image>
					<image lazy-load="true" v-if="item.filetype=='docx'||item.filetype=='doc'" src="../static/WORD.png" mode="widthFix" style="width: 65%;"></image>
				</view>
			</view>
			<view style="display: flex;align-items: center;height: 25%;margin-left: 28rpx;">
				<view v-if="item.filPath != ''">
					<text style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
				</view>
				<view v-if="item.filPath == ''">
					<text v-if="isDownload==0" style="font-size: 20rpx;opacity: 0.6;">0 / 未下载</text>
					<u-line-progress v-if="isDownload==1" :percentage="fileProgress" height="7"></u-line-progress>
					<text v-if="isDownload==2" style="font-size: 20rpx;opacity: 0.6;">{{item.fileSize}} / 已下载</text>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
  name: 'documentDisplay',
  props: ['item'],
  mounted() {
    // console.log("传递过来的数据是：", this.item);
  },
  methods:{
	  ViewingDocuments(arr){
	  	// console.log("此处需要展示的链接是：",fileUrl);
	  	console.log("该对象是：",arr);
	  	var fileUrl = arr.msg  //拿到要打开文件的链接
	  	
	  	if (arr.filPath != ''){
	  		console.log("以下载");
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
	  	} else {
	  		console.log("未下载");
	  		this.isDownload = 1; 
	  		const downloadTask = uni.downloadFile({
	  		  url: fileUrl,
	  		  success: function (res) {
	  			  console.log("下载成功");
	  		    arr.filPath = res.tempFilePath;
	  			console.log("文件下载之后打开需要的东西：",res.tempFilePath);
	  		    uni.openDocument({
	  		      filePath: res.tempFilePath,
	  		      success: function (res) {
	  		        console.log('打开文档成功');
	  		      },
	  			  fail(res) {
	  			  	console.log("打开文档失败",res);
	  			  }
	  		    });
	  		  },
	  		  fail(res) {
	  		  	console.log("下载失败！",res);
	  		  }
	  		});
	  		downloadTask.onProgressUpdate((res) => {
	  			console.log('下载进度' + res.progress);
	  			this.fileProgress = res.progress;
	  			if (this.fileProgress == 100){
	  				this.isDownload = 2;
	  			}
	  			console.log('已经下载的数据长度' + res.totalBytesWritten);
	  			console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
	  			this.fileSize = `${(res.totalBytesExpectedToWrite / 1024).toFixed(2)}kb`;
	  			arr.fileSize = this.fileSize;  //文件大小保存到app本地中
	  		});
	  	}
	  },
  }
}
</script>

<style>
.youexcel{
  background-color: #f5f5f5;
  /* background-color: blue; */
  margin-top: 10rpx;
  margin-left: 0rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26rpx;
  width: 450rpx;
  border-radius: 25rpx 25rpx 0 25rpx;
  height: 160rpx;
}
.fileNameText{
  display: -webkit-box;
  line-height: 1.5;
  /* text-align:left; */
  text-align: left;
  /* height: 92%; */
  width: 70%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
