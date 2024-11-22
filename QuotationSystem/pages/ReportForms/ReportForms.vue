<template>
	<view>
		<ul>
			<!-- 柱状图 -->
			<view style="margin: 10px 0;">
				<echartFromVue typeMap="Histogram" :chartDataa="chartData" heightData="400rpx" widthData="100%"/>
			</view>
			
			<view style="margin: 10px 0;">
				<echartFromVue typeMap="lineChart" :chartDataa="chartData2" heightData="400rpx" widthData="100%"/>
			</view>
			
			<view style="margin: 10px 0;">
				<echartFromVue typeMap="pieChart" :chartDataa="chartData" heightData="400rpx" widthData="100%"/>
			</view>
		</ul>
	</view>
</template>

<script>
import get from '../../api/form'
import echartFromVue from '../../components/echartFrom.vue';
export default {
  data() {
    return {
		list:[
			{name:'全部'},
			{name:'个人'}
		],
		chartData:get.res_2,
		chartData2:get.res_1,
		Histogram:'Histogram',
		dataStatistics:[
		]
    };
  },
  components:{
	echartFromVue,
  },
  onPullDownRefresh(){
  	console.log("开始下拉刷新"); 
  	setTimeout(() => {
  	      // 假设这是你更新数据的操作
  	      console.log('数据更新完成');
		  // this.add();
		  // this.getServerData();
  	      // 数据更新完毕后停止下拉刷新
  	      uni.stopPullDownRefresh();
  	    }, 1000);
  },
  onShow() {
  	this.$store.dispatch('isToken',uni.getStorageSync('token'));
  },
};
</script>

<style>
	ul{
		padding: 0;	
	}
</style>