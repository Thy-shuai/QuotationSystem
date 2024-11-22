<template>
  <view class="container">
    <view
      @longpress="handleLongPress"
      class="press-area"
      @touchstart="recordTouchPosition"
    >
      长按此区域显示内容
    </view>
    <view
      v-if="showContent"
      :style="{ top: `${0}px`, left: `${0}px` }"
      class="popup-content"
    >
      <view class="">
      	456
      </view>
    </view>
  </view>
</template>

<script>
import CheckboxTextVue from '../../components/CheckboxText.vue';

export default {
  data() {
    return {
      showContent: false,
      touchX: 0,
      touchY: 0,
      offsetY: 100, // 控制弹出内容离手指的距离
    };
  },
  components: {
    CheckboxTextVue,
  },
  methods: {
    handleLongPress() {
      // 长按时显示内容
      this.showContent = true;
    },
    recordTouchPosition(e) {
      // 记录触摸点的坐标
      this.touchX = e.touches[0].pageX;
      console.log('横坐标是：', this.touchX);
      this.touchY = e.touches[0].pageY;
      console.log('纵坐标是：', this.touchY);
    },
  },
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.press-area {
  margin-top: 200px;
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
  text-align: center;
  line-height: 200px;
  font-size: 18px;
}
.popup-content {
  position: absolute;
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
