<script>
	export default {
		methods:{
			 navigateToServiceAgreement() {
				 console.log("456");
			    uni.navigateTo({
			      url: '/pages/Category/Category' // 这里是你的组件地址
			    });
			  },
		},
		onLaunch: function() {
			console.log('App Launch')
			setTimeout(() => {
				plus.navigator.closeSplashscreen();
			}, 500);
		},
		onShow: function() {
			// console.log('App Show')
		},
		// onHide: function() {
		// 	console.log('App Hide')
		// }
	}
</script>

<style>
	/*每个页面公共css */
	/* NotoSansCJK-Regular-1.otf */
	@font-face {
		font-family: '思源黑体Regular';
		src: url('~@/static/fonts/NotoSansCJK-Regular-1.otf') format('truetype');
		font-weight: normal;
		font-style: normal;
		/* font-display: swap; */
		 font-display: optional;
	}
	/* NotoSansCJK-Medium-5.otf */
	
	/* PingFangSC-Regular3.ttf */
</style>
