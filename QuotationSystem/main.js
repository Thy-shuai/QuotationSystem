import App from './App'

// import uView from '@/uni_modules/uview-ui'
// #ifndef VUE3
import Vue from 'vue'

// 添加全局方法
import methods from './api/api.js';
Vue.prototype.$methods = methods;  

// 全局事件总线
// import Vue from 'vue';

import hljs from 'highlight.js'
 
Vue.directive('highlight', {
  deep: true,
  bind: function(el, binding) {
    // 获取语言类型，默认为plaintext
    let lang = binding.arg || 'plaintext';
    // 获取代码内容
    let code = binding.value;
    // 高亮显示代码
    hljs.highlightBlock(el);
  }
})

// 创建全局事件总线
Vue.prototype.$eventBus = new Vue()

import store from './store/index.js'
//  组件库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import './uni.promisify.adaptor'

// 组件库
// Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif