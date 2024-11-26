<template>
  <view class="container">
    <!-- Canvas -->
    <canvas canvas-id="kewaCanvas" id="kewaCanvas" :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}"></canvas>

    <!-- 生成的图片 -->
    <view class="image-container">
      <image v-if="imagePath" :src="imagePath" class="result-image" mode="widthFix"></image>
    </view>

    <!-- 生成按钮 -->
    <button @click="generateImage">生成图片</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      canvasWidth: 0, // Canvas宽度
      canvasHeight: 0, // Canvas高度
      imagePath: '', // 保存生成的图片路径
    };
  },
  onReady() {
    // 获取屏幕宽度，动态计算 Canvas 尺寸
    const systemInfo = uni.getSystemInfoSync();
    const screenWidth = systemInfo.windowWidth;
    const designWidth = 575; // 设计稿宽度
    const designHeight = 300; // 设计稿高度

    this.canvasWidth = screenWidth;
    this.canvasHeight = (designHeight / designWidth) * screenWidth;

    // 绘制 Canvas
    setTimeout(() => {
      this.drawCanvas();
    }, 50); // 延迟，确保页面完全渲染
  },
  methods: {
    drawCanvas() {
      const ctx = uni.createCanvasContext('kewaCanvas');
      const width = this.canvasWidth;
      const height = this.canvasHeight;

      // 背景
      ctx.setFillStyle('#0054A6');
      ctx.fillRect(0, 0, width, height);

      // 顶部文字
      ctx.setFillStyle('#FFFFFF');
      ctx.setFontSize(width * 0.05);
      ctx.fillText('Canva', width * 0.05, height * 0.2);
      ctx.fillText('可瓦', width * 0.2, height * 0.2);

      // 中间文字
      ctx.setFontSize(width * 0.1);
      ctx.fillText('可瓦地产', width * 0.1, height * 0.5);

      // 英文文字
      ctx.setFontSize(width * 0.05);
      ctx.fillText('KEWA REAL ESTATE', width * 0.1, height * 0.7);

      // 底部文字
      ctx.setFontSize(width * 0.04);
      ctx.fillText('让 建 筑 歌 咏 生 命', width * 0.15, height * 0.9);

      // 必须调用 draw 方法
      ctx.draw();
    },
    generateImage() {
      // 将 Canvas 转为图片
      uni.canvasToTempFilePath({
        canvasId: 'kewaCanvas',
        success: (res) => {
          this.imagePath = res.tempFilePath;
          uni.showToast({
            title: '图片生成成功',
            icon: 'success',
          });
        },
        fail: (err) => {
          console.error('生成图片失败', err);
        },
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas {
  margin-top: 20px;
}

.image-container {
  margin-top: 20px;
  width: 100%;
}

.result-image {
  width: 100%;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0054A6;
  color: #ffffff;
  border: none;
  border-radius: 5px;
}
</style>
