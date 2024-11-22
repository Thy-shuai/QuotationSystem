'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log("node版本时：",process.version);
	const data = await uniCloud.getPhoneNumber({
			appid: '__UNI__35A770D', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
			provider: 'univerify',
			access_token: event.access_token,
			openid: event.openid
		})
		console.log("得到的数据时：",data);
		return data//返回的data里包含手机号
	
	//返回数据给客户端
};
