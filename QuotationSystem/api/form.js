let res_1 = {
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
let res_2 = {
	categories:["1月", "2月", "3月", "4月", "5月", "6月"],
	series: [
	  {
		name:'报价',
		data:[100,140,230,100,130,100]
	  },
	  {
		name:'成交',
		data:[50,90,200,30,49,30]
	  },
	]
}
// let res_3 = {
// 	series: [
// 		data=[
// 			{"name":"一班","value":50,"labelShow":false},
// 			{"name":"二班","value":30,"labelShow":false},
// 			{"name":"三班","value":20,"labelShow":false},
// 			{"name":"四班","value":18},
// 			{"name":"五班","value":8,"labelShow":false},
// 		]
// 	]
// }
var opts = {
	fontSize:10,
	padding: [-10, 15, 10, 15],
	xAxis:{
		fontSize:13,
	},
	legend:{
		show: true,      // 是否显示图例
		position: 'top', // 图例位置
		padding:20,
		fontSize:13
	// padding: [30, 15, 10, 15]
	},
	extra:{
		line:{
			type:'straight'
		}
	}
}
module.exports = {
	res_1,
	res_2,
	// res_3,
	opts
}
  