<template>
	<view>
		<!-- 456 -->
		<ul>
			<view class="outline" v-for="(item, index) in dataStatistics" :key="index" :style="{ height: height, width:width }">
				<view class="outline_in" >
					<view class="charts-box" >
					 <qiun-data-charts 
						:type="item.type"
						:opts="item.opts"
						:chartData="item.chartData"
					  />
					</view>
				</view>
			</view>
		</ul>
	</view>
</template>

<script>
import get from '../api/form'
export default {
  name:'echartFrom',
  data() {
    return {
		typeChart:this.typeMap, // 图表类型
		chartData:this.chartDataa,  // 图表显示数据
		height:'',  // 数据的行高
		width:'', // 数据的列高
		dataStatistics:[]
    };
  },
  props:['typeMap', 'chartDataa', 'heightData', 'widthData'],
  watch:{
	  typeMap(newVal){
		  this.typeChart = newVal;
	  },
	  chartDataa(newVal){
		  this.chartData = newVal;
	  },
	  heightData(newVal){
		   console.log("传递过来的高度数据是：",newVal);
		  this.height = newVal;
	  },
	  widthData(newVal){
		  console.log("传递过来的宽度数据是：",newVal);
		  this.width = newVal;
	  }
  },
  mounted() {
	  this.dataProcessing();
	  if (this.typeChart == 'Histogram')this.Histogram();
	  if (this.typeChart == 'lineChart')this.lineChart();
	  if (this.typeChart == 'pieChart')this.pieChart();
  	// this.add();
  },
  methods: {
	// 柱状图
	Histogram(){
		var obj = {
			  type:'column',
			  Text:'报价单金额',
			  Introduction:'一个简单的分组柱状图',
			  // chartData:JSON.parse(JSON.stringify(get.res_2)),
			  chartData:JSON.parse(JSON.stringify(this.chartData)),
			  opts:{
				  fontSize:10,
				  xAxis:{
					fontSize:13
				  },
				  padding: [-10, 15, 10, 15],
					legend:{
						show: true,      // 是否显示图例
						position: 'top', // 图例位置
						padding:20,
						fontSize:13,
						// padding: [30, 15, 10, 15]
					},
					extra: {
					  column: {
						type: "group",
						width: 15,  //调整柱状图的宽度
						activeBgColor: "#000000",
						activeBgOpacity: 0.08,
						seriesGap:2
					  }
					},
					series: [{
					    name: '系列名称',
					    data: [10, 20, 30],
					    label: {
					      show: true,    // 是否显示柱子上的数值
					      fontSize: 5,  // 设置数值字体大小，调整此值即可改变标注的字体大小
					      color: "#000"  // 可选，设置数值颜色
					    },
					    textSize: 60  // 这个配置可以保留，但它不会影响标注数字的大小
					  }]
				}
			}
		this.dataStatistics.push(obj)
	},
	// 折线图
	lineChart(){
		var obj = {
		  type:'line',
		  Text:'报价单数量1',
		  Introduction:'一个简单的多折线图',
		  // chartData:JSON.parse(JSON.stringify(get.res_1)),
		  chartData:JSON.parse(JSON.stringify(this.chartData)),
		  opts:get.opts
		}
		this.dataStatistics.push(obj)
	},
	// 饼状图
	pieChart(){
		let res = {
		  series: [
			{
			  data: [
				{"name":"txt","value":59,"labelShow":false},
				{"name":"execl","value":24,"labelShow":false},
				{"name":"word","value":12,},
			  ]
			}
		  ]
		};
		var obj = {
		  type:'pie',
		  Text:'报价单类型',
		  Introduction:'一个简单的饼状图',
		  chartData:JSON.parse(JSON.stringify(res)),
		  opts:{
			  fontSize:10,
			  padding: [-10, 15, 10, 15],
			  legend:{
				show: true,      // 是否显示图例
				position: 'top', // 图例位置
				padding:20,
				fontSize:13,
				// padding: [30, 15, 10, 15]
			  },
			   extra: {
				pie: {
				  activeOpacity: 0.5,
				  activeRadius: 10,
				  offsetAngle: 0,
				  labelWidth: 15,
				  border: true,
				  borderWidth: 3,
				  borderColor: "#FFFFFF"
				}
			  }
		  }
		}
		this.dataStatistics.push(obj);
	},
	dataProcessing(){
		// 首先是高度
		if (this.heightData.includes('px')){
			this.height = this.heightData.substring(0, this.heightData.length - 2);
			this.height = this.height*2 +'rpx';
		}
		if (this.heightData.includes('rpx')){
			this.height = this.heightData;
		}
		// 其次是宽度
		if (this.widthData.includes('px')){
			this.width = this.widthData.substring(0, this.widthData.length - 2);
			this.width = this.width*2 + 'rpx';
		}
		if (this.widthData.includes('rpx')){
			this.width = this.widthData;
		}
		if (this.widthData.includes('%')){
			this.width = this.widthData;
		}
	},
	add(){
		setTimeout(()=>{
		  var obj = {
			  type:'line',
			  Text:'报价单数量1',
			  Introduction:'一个简单的多折线图',
			  chartData:JSON.parse(JSON.stringify(get.res_1)),
			  opts:get.opts
		  }
		  this.dataStatistics.push(obj)
		},500)
		setTimeout(()=>{
		  var obj = {
			  type:'column',
			  Text:'报价单金额',
			  Introduction:'一个简单的分组柱状图',
			  chartData:JSON.parse(JSON.stringify(get.res_2)),
			  opts:{
				  padding: [-10, 15, 10, 15],
					legend:{
					show: true,      // 是否显示图例
					position: 'top', // 图例位置
					padding:20,
					// padding: [30, 15, 10, 15]
					},
					extra: {
					  column: {
						type: "group",
						width: 20,  //调整柱状图的宽度
						activeBgColor: "#000000",
						activeBgOpacity: 0.08
					  }
					}
			  }
		  }
		  this.dataStatistics.push(obj)
		},500)
		  setTimeout(() => {
		  //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
		  let res = {
			  series: [
				{
				  data: [{"name":"txt","value":59,"labelShow":false},
				  {"name":"execl","value":24,"labelShow":false},
				  {"name":"word","value":12,}]
				}
			  ]
			};
			var obj = {
			  type:'pie',
			  Text:'报价单类型',
			  Introduction:'一个简单的饼状图',
			  chartData:JSON.parse(JSON.stringify(res)),
			  opts:{
				  padding: [-10, 15, 10, 15],
					legend:{
					show: true,      // 是否显示图例
					position: 'top', // 图例位置
					padding:20,
					// padding: [30, 15, 10, 15]
					},
				   extra: {
					pie: {
					  activeOpacity: 0.5,
					  activeRadius: 10,
					  offsetAngle: 0,
					  labelWidth: 15,
					  border: true,
					  borderWidth: 3,
					  borderColor: "#FFFFFF"
					}
				  }
			  }
			}
		  this.dataStatistics.push(obj);
		}, 500);
	},
	// 数据更新
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            // categories: ["2018","2019","2020","2021","2022","2023"],
			categories:["1月", "2月", "3月", "4月", "5月", "6月"],
            series: [
              {
				name:'活跃',
				data:[200,260,250,230,270,240]
              },
              {
				name:'新增',
				data:[140,145,130,150,149,156]
              },
              {
				name:'成交',
				data:[40,20,40,25,30,10]
              }
            ]
          };
		  this.dataStatistics[0].chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
};
</script>

<style scoped>
	
	.status_bar {
		/* display: flex; */
	    height: var(--status-bar-height);
	    width: 100%;
		background-color: rgb(246, 246, 246);
	}
	ul{
		padding: 0;
		
	}
	.outline{
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		/* margin-top: 10rpx; */
		/* background-color: cadetblue; */
	}
	.outline_in{
		width: 95%;
		/* height: 580rpx; */
		height: 100%;
		/* height: 200px; */
		/* background-color: #f0f0f0; */
		background-color: #f8f8f8;
		/* background-color: brown; */
	}
	.text{
		margin-left: 36rpx;
		margin-top: 40rpx;
		line-height: 19px;
		color: rgb(51,51,51);
		font-size: 16px;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.text_two{
		margin-top: 10rpx;
		margin-left: 36rpx;
		line-height: 19px;
		color: rgb(153,153,153);
		font-size: 12px;
		text-align: left;
		font-family: PingFangSC-regular;
	}
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 100%;
		/* height: 200px; */
		/* height: 90%; */
	}
</style>