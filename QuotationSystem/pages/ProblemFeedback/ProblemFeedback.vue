<template>
  <view>
		<view style="visibility: hidden; position: absolute; top: -9999px;">
			<canvas canvas-id="myCanvas" style="width: 350px; height: 200px;"></canvas>
		</view>
		<image :src="imageSrc" mode="widthFix" style="width: 300px;height: auto;"></image>
		<!-- <businessCardVue></businessCardVue> -->
  </view>
</template>
 
<script>
	import businessCardVue from '../../components/businessCard.vue';
	export default {
	  data() {
		return {
		  imgUrl: 'http://114.115.203.18:7788/avatar/card.png', // 替换为你的图片地址
		  imageSrc:''
		};
	  },
	  components:{
		  businessCardVue
	  },
	  mounted() {
		this.loadImageToCanvas(this.imgUrl);
		// 在uniapp中获取屏幕宽度
	  },
	  methods: {
		loadImageToCanvas(url) {
		  const ctx = uni.createCanvasContext('myCanvas', this);
		  uni.downloadFile({
			url: url,
			success: (res) => {
				// 下载图片成功后，绘制图片
				ctx.drawImage(res.tempFilePath, 0, 0, 370, 200);

				// 设置字体和文字样式
				ctx.setFontSize(18);
				ctx.setFillStyle('#000000'); // 设置文字颜色

				// 确保文字在画布内绘制，调整 y 坐标
				ctx.fillText('李 shu', 25, 50); // 在图片上绘制文字
				
				ctx.setFontSize(12);
				ctx.setFillStyle('#2C405A');
				ctx.fillText('专业医学顾问', 25, 70);
				
				// 绘制圆形
				// 圆形半径
				let radius = 9;
				let introduce = ['电话：18352868816','邮箱：cnsupport@canva.com','地址：深圳市南山区金色商业街001号', '官网：www.canva.com'];
				let icon = ['/static/telephone2.png', '/static/email.png', '/static/address.png', '/static/internet.png']
				
				for (let i = 0; i < introduce.length ;i++){
					ctx.beginPath();
					ctx.arc(25+radius, 95 + i * 20, radius, 0, Math.PI * 2); // x=200, y=200, 半径=100
					ctx.fillStyle = '#0a7d94'; // 圆形背景颜色
					ctx.fill();
					ctx.closePath();
					
					ctx.drawImage(icon[i], 25 + radius / 2, 95 + i *20 -radius / 2, radius, radius); 
					
					ctx.setFontSize(10);
					ctx.setFillStyle('#2C405A');
					ctx.fillText(introduce[i], 25+3*radius-4, 95 + i * 20+4);
				}
				// 完成绘制并刷新画布
				ctx.draw(true, () => {
					// 可以将画布内容转为图片并输出
					uni.canvasToTempFilePath({
					  canvasId: 'myCanvas',
					  success: (tempFileRes) => {
						console.log(tempFileRes.tempFilePath); // 输出生成的图片路径
						uni.saveFile({
							tempFilePath:tempFileRes.tempFilePath,
							success: (res) => {
								console.log("地址是：" ,res);
								this.imageSrc = res.savedFilePath;
							}
						})
						// this.imageSrc = tempFileRes.tempFilePath;
					  },
					  fail: (err) => {
						console.error('生成图片失败:', err);
					  }
				});
			  });
			},
			fail: (err) => {
			  console.error('下载图片失败:', err);
			}
		  });
		}
	  }
};
</script>
