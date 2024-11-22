
// src/utils/utils.js
import * as XLSX from 'xlsx';
// 定义一个公共方法
export default{
	/**
	 * 判断index页面展示内容的属性中是否存在name和projectName
	 * @param {Object} event 页面展示对象数据
	 * @return {Object} 返回处理过后的数据
	 */
	isExistence(event){
		if (event.length == 0)return event;
		event.forEach(item => {
			if ('name' in item){
				// console.log("该数据项里面由name属性");
			} else {
				item.name = ""
			}
			if ('projectName' in item){
				// console.log("该数据项里面有projectName属性");
			} else {
				item.projectName = "点击"
			}
		})
		// event = event.filter(item => item.date != undefined);
		return event;
	},
	
    login(){
        // console.log("1111111");
		console.log("勒布朗詹姆斯");
		return '111'
    },
	/**
	 * 获取当前时间 格式：年 月 日 时：分
	 * @license MIT
	 */
	getDate(){
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		if (minutes >= '0' && minutes < '10'){
			return `${year}年${month}月${day}日 ${hours}:0${minutes}`;
		} 
		let currentTime = `${year}年${month}月${day}日 ${hours}:${minutes}`;
		// console.log("当前时间：",currentTime);
		return currentTime;
	},
	/**
	 * 获取当前时间 年 月 日
	 */
	getDateTime(){
		const date = new Date();
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		if (month > '0' && month < '10'){
			month = `0${month}`
		}
		let day = date.getDate();
		if (day > '0' && day < '10'){
			day = `0${day}`
		}
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		let currentTime = `${year}年${month}月${day}日`;
		return currentTime;
	},
	// 文件获取时间
	getFileDate(){
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		let day = date.getDate();
		if (day > '0' && day < '10')day = `0${day}`;
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		if (month > '0' && month < '10'){
			return `${year}0${month}${day}`;
		} 
		let currentTime = `${year}${month}${day}`;
		// console.log("当前时间：",currentTime);
		return currentTime;
	},
	/**
	 * 时间戳转换为年月日
	 * @param {Object} event 时间戳
	 * @return {type} 返回xx年xx月xx日
	 */
	timestampToDate(timestamp){
		if (isNaN(timestamp))return timestamp;
		const now = new Date();
		const targetTime = new Date(timestamp);
		
		// 获取当前的年月日
		const nowYear = now.getFullYear();
		const nowMonth = now.getMonth() + 1;
		const nowDate = now.getDate();
		
		// 获取目标时间的年月日
		const targetYear = targetTime.getFullYear();
		const targetMonth = targetTime.getMonth() + 1;
		const targetDate = targetTime.getDate();
		
		// 计算时间差（以天为单位）
		const timeDifference = nowDate - targetDate;
					
		// 如果是今天，显示小时和分钟
		if (nowYear === targetYear && nowMonth === targetMonth && nowDate === targetDate) {
		    const hours = targetTime.getHours().toString().padStart(2, '0');
		    const minutes = targetTime.getMinutes().toString().padStart(2, '0');
		    return `${hours}:${minutes}`;
		}
					
		// 如果是昨天，显示“昨天”
		if (nowYear === targetYear && nowMonth === targetMonth && timeDifference === 1) {
		    return "昨天";
		}
					
		// 如果是更早的日期，显示具体的月和日
		return `${targetMonth}月${targetDate}日`;
	},
	// 读取excel文件内容
	ReadExcel(event){
		return new Promise((resolve, reject)=>{
			// _doc/uniapp_save/17217910720700.xlsx
				const main = plus.android.runtimeMainActivity();
			    const Context = plus.android.importClass("android.content.Context");
			    const PackageManager = plus.android.importClass("android.content.pm.PackageManager");
			    const Manifest = plus.android.importClass("android.Manifest");
			    const ActivityCompat = plus.android.importClass("androidx.core.app.ActivityCompat");
			
			    // 检查是否已经拥有读取文件权限
			    const hasPermission = (ActivityCompat.checkSelfPermission(main, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED);
			
			    if (hasPermission) {
			        console.log("已拥有读取文件权限");
			        // 已经拥有权限，可以直接进行文件读取操作
			        // readExcelFile();
			    } else {
			        console.log("没有读取文件权限，正在请求权限");
			
			        // 请求读取文件权限
			        const requestCode = 1; // 请求码，可以自定义
			        ActivityCompat.requestPermissions(main, [Manifest.permission.READ_EXTERNAL_STORAGE], requestCode);
			
			        // 添加权限请求结果监听
			        document.addEventListener("plusready", function() {
			            plus.android.importClass(main);
			            const onRequestPermissionsResult = function(requestCode, permissions, grantResults) {
			                if (requestCode === 1) {
			                    if (grantResults.length > 0 && grantResults[0] === PackageManager.PERMISSION_GRANTED) {
			                        console.log("读取文件权限请求成功");
			                        // 权限请求成功，可以进行文件读取操作
			                        readExcelFile();
			                    } else {
			                        console.log("读取文件权限请求被拒绝");
			                    }
			                }
			            };
			            main.onRequestPermissionsResult = onRequestPermissionsResult;
			        });
			    }
			    // 读取文件为ArrayBuffer
			    // const filePath = '_doc/uniapp_save/17218068706960.xlsx';
				const filePath = event;
				const self = this;
				let total = '';
				// const filePath = '/storage/emulated/0/Android/data/uni.UNI35A770D/cache/1721805356377_2_XXX公司-XXX软件-华为云伙伴软件基础技术审核（FTR）测试报告模板 (2).docx';
			        // 读取文件为ArrayBuffer
			     plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
			            entry.file(function(file) {
							// console.log("本地文件是：",file);
			                const reader = new plus.io.FileReader();
							reader.readAsDataURL(file);
			                reader.onloadend = function(e) {
								// console.log("78531");
			                     if (reader.readyState === plus.io.FileReader.DONE) { // DONE
									// console.log("File read completed");
									var dataURL = reader.result;
									var base64 = dataURL.split(',')[1];
									var binary = atob(base64);
									var array = new Uint8Array(binary.length);
									for (var i = 0; i < binary.length; i++) {
										array[i] = binary.charCodeAt(i);
									}
									var workbook = XLSX.read(array, {type: 'array'});
									var firstSheetName = workbook.SheetNames[0];
									var worksheet = workbook.Sheets[firstSheetName];
									var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
									// console.log("从excel中读取到的数据是：", jsonData);
									// console.log("最终处理得到的数据是：", self.getNameAndProject(jsonData));
									total = self.getNameAndProject(jsonData);
									// console.log("通过还是得到的结果时：",total);
									resolve(total);
									// return total;
									// self.getNameAndProject(jsonData);
								}
			                };
							reader.onloadstart = function(e){
								console.log("开始读取");
							};
							reader.onabort = function(e){
								console.log("开始读取");
							};
			                reader.onerror = function(e) {
			                    console.log('读取文件失败:', e.target.error);
			                };
			            }, function(error) {
			                console.log('获取文件失败:', error.message);
			            });
			        }, function(error) {
			            console.log('解析本地文件路径失败:', error.message);
			        });
		})
		
	},
	getNameAndProject(event){
		let projectKeyword = '';
		let nameKeyword = '';
		let searchProject = ['项目名称', '项目'];
		let searchName = ['名字', '用户名称', 'name'];
		let result_project = [];
		let result_Name = [];
		let total = {
			name:'',
			project:''
		}// 用于记录搜索到的值
		// let project = '';
		// let name = '';
		searchName.forEach(item => {
			// console.log("具体的数据是：", item);
			let result1 = event.filter(row => {
			    return row.some(value => value && value.toString().includes(item));
			});
			// console.log("循环得到的数据是：",result1);
			if (result1.length != 0){
				result_Name.push(result1);
				nameKeyword = item;
			}
		})
		searchProject.forEach(item => {
			// console.log("具体的数据是：", item);
			let result1 = event.filter(row => {
			    return row.some(value => value && value.toString().includes(item));
			});
			// console.log("循环得到的数据是：",result1);
			if (result1.length != 0){
				result_project.push(result1);
				projectKeyword = item;
			}
		})
		
		// console.log("名字搜索的结果是：",result_Name);
		// console.log("项目的搜索的结果是：", result_project);
		if (result_project.length != 0){
			let name_result = (result_project[0])[0];
			for (let i = 0;i < name_result.length; i++){
				// console.log("需要的数据时：", (result[0])[i]);
				let index = (name_result)[i].toString();
				if (index.includes(projectKeyword)){
					// 两种可能性
					// console.log("项目名称是：",(name_result)[i+1]);
					
					total.project = (name_result)[i+1];
					break;
				}
			}
		} else {
			// project = '';
			// total.project = ''
			total.project = (event[0])[0];
		}
		if (result_Name.length != 0){
			let name_result = (result_Name[0])[0];
			for (let i = 0;i < name_result.length; i++){
				let index = (name_result)[i].toString();
				if (index.includes(nameKeyword)){
					// console.log("项目名称是：",(name_result)[i+1]);
					total.name = (name_result)[i+1];
					break;
				}
			}
		} else {
			// name = '';
			total.name = '';
		}
		// console.log("最终的结果时：",total);
		return total;
	},
	// 获取设别的IM
	checkPermission(){
		var context = plus.android.importClass("android.content.Context");
		var Settings = plus.android.importClass("android.provider.Settings");
		var main = plus.android.runtimeMainActivity();
		var androidId = Settings.Secure.getString(main.getContentResolver(), Settings.Secure.ANDROID_ID);
		return androidId;
		// console.log('Android ID：' + androidId);
	},
	// 报价数据转换
	convertData(dataArray) {
		// 获取属性名称
		const totalsIndex = dataArray.findIndex(item => item.hasOwnProperty('totals'));
		let money = dataArray[totalsIndex].totals;
		if (totalsIndex !== -1) {
		    dataArray[0].totals = dataArray[totalsIndex].totals;
		    dataArray.splice(totalsIndex, 1);
		}
	    // 定义表头
		const tableHeader = Object.getOwnPropertyNames(dataArray[0]);  // 获取第一个数据的内容
		console.log("表头内容：",tableHeader);
		
		let headerMapping = {
		    "unitPrice": "产品价格",
		    "number": "产品数量",
		    "chsName": "产品名称",
		    "count": "产品总价",
		    "totals": "总价"
		};
		console.log("此时的键值对的值是：",headerMapping['unitPrice']);
		let mappedTableHeader = tableHeader.map(Header => headerMapping[Header]);
		// let mappedTableHeader = tableHeader.map(header => headerMapping[header]);
	    // 转换数据
	    const tableData = dataArray.map(data => [
			data.unitPrice,
			data.number,
	        data.chsName,
	        data.count.toString(), // 确保所有元素都是字符串
	    ]);
	    // 将表头添加到数据的开头
	    // tableData.unshift(tableHeader);
		tableData.unshift(mappedTableHeader);
		tableData[1].push(money.toString());
	    return tableData;
	},
	convertData_2(dataArray) {
		// 获取属性名称
		const totalsIndex = dataArray.findIndex(item => item.hasOwnProperty('totals'));
		let money = dataArray[totalsIndex].totals;
		if (totalsIndex !== -1) {
		    // dataArray[0].totals = dataArray[totalsIndex].totals;
		    dataArray.splice(totalsIndex, 1);
		}
	    // 定义表头
		let tableHeader = Object.getOwnPropertyNames(dataArray[0]);  // 获取第一个数据的内容
		tableHeader.unshift('序号');
		console.log("表头内容：",tableHeader); // 表头内容
		
		let headerMapping = {
			"序号":"序号",
		    "unitPrice": "产品价格",
		    "number": "产品数量",
		    "chsName": "产品名称",
		    "count": "产品总价",
		};
		console.log("此时的键值对的值是：",headerMapping['unitPrice']);
		let mappedTableHeader = tableHeader.map(Header => headerMapping[Header]);
		// let mappedTableHeader = tableHeader.map(header => headerMapping[header]);
	    // 转换数据
	    const tableData = dataArray.map(data => [
			data.unitPrice,
			data.number,
	        data.chsName,
	        data.count.toString(), // 确保所有元素都是字符串
	    ]);
		let get = tableData.map((item, index) => {
		    return [(index + 1).toString(), ...item];
		});
		let emptyFieldsCount = get[0].length - 2;
		let emptyFields = Array(emptyFieldsCount).fill('');
		get.push([...emptyFields, '合计：',  money.toString()]);
	    // 将表头添加到数据的开头
	    // get.unshift(tableHeader);
		get.unshift(mappedTableHeader);
		// tableDa[1].push(money.toString());
		console.log("此时的数据是:",get);
	    return get;
	},
	/**
	 * 返回处理过后的数据
	 * @param {Object} dataArray 要处理的报价信息
	 * @return {Object} 返回处理过后的数据
	 */
	convertData_3(dataArray) {
		console.log("传递过来的处理的数据是：", dataArray);
		// 获取属性名称
		const totalsIndex = dataArray.findIndex(item => item.hasOwnProperty('totals'));
		let money = dataArray[totalsIndex].totals;
		if (totalsIndex !== -1) {
		    // dataArray[0].totals = dataArray[totalsIndex].totals;
		    dataArray.splice(totalsIndex, 1);
		}
	    // 定义表头
		let tableHeader = Object.getOwnPropertyNames(dataArray[0]);  // 获取第一个数据的内容
		tableHeader.unshift('序号');
		console.log("表头内容：",tableHeader); // 表头内容
		
		
		let headerMapping = {
			"序号":"序号",
		    "unitPrice": "产品价格",
		    "number": "产品数量",
		    "chsName": "产品名称",
		    "count": "产品总价",
		};
		console.log("此时的键值对的值是：",headerMapping['unitPrice']);
		let mappedTableHeader = tableHeader.map(Header => headerMapping[Header]);
		// let mappedTableHeader = tableHeader.map(header => headerMapping[header]);
	    // 转换数据
	    const tableData = dataArray.map(data => [
			data.unitPrice,
			data.number,
	        data.chsName,
	        data.count.toString(), // 确保所有元素都是字符串
	    ]);
		let get = tableData.map((item, index) => {
		    return [(index + 1).toString(), ...item];
		});
		let emptyFieldsCount = get[0].length - 2;
		let emptyFields = Array(emptyFieldsCount).fill('');
		// get.push([...emptyFields, '合计：',  money.toString()]);
	    // 将表头添加到数据的开头
	    // get.unshift(tableHeader);
		// get.unshift(mappedTableHeader);
		// tableDa[1].push(money.toString());
		// console.log("此时的数据是测试:",get);
		let dataArrayy = get;
		for (let i = 0; i < dataArrayy.length; i++) {
		    let temp = dataArrayy[i][1];  // 暂存第二个数据
		    dataArrayy[i][1] = dataArrayy[i][3];  // 第四个数据放到第二个位置
		    dataArrayy[i][3] = temp;  // 暂存的数据放到第四个位置
		}
		console.log("此时需要绘制图片的数据是:",dataArray);
		var obj = {
			nums:dataArrayy,
			total:money.toString()
		}
	    return obj;
	},
	/**
	 * 提示框展示
	 * @param {string} event 提示框的内容
	 */
	promptBox(event){
		uni.showModal({
			title: '提示',
			content: `${event}`,
			success: function (res) {
				if (res.confirm) {
					console.log('用户点击确定');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	},
	// 此上传的文件是否有历史遗留  数据然后的是const param = encodeURIComponent(JSON.stringify(e));之后的数据
	filesSame(dialogbox, fileuuid, event){
		console.log("对话框的uuid：",dialogbox);
		console.log("文件返回的uuid：",fileuuid);
		console.log("文件是：",event);
		if (dialogbox == fileuuid){
			return true;
			console.log("没有相似的文件");
			// 没有相似文件直接新建一个对话窗
			let index = {
				"id": 8,
				"identification": "inquiry",
				"hot": 0,
				"introduce": "根据客户和项目阶段生成个性化报价单",
				"status": 1,
				"category": 0,
				"description": "产品报价",
				"imageUrl": "/static/Intelligent2/1-1.jpg",
				"detailedIntroduction": "嗨，作为你的智能伙伴，我负责产品报价。请问给那位客户报价，项目名称是什么？请通过上方添加告诉我。"
			}
			let uuid = require('uuid');
			let myUUID = uuid.v4();  // 生成一个新的uuid
			index.uuid = myUUID;
			let chatSession = uni.getStorageSync('ChatSession');
			chatSession.unshift(index);
			uni.setStorageSync('ChatSession', chatSession)
			chatSession = [];
			const param = encodeURIComponent(JSON.stringify(index));
			// 处理历史数据
			let user = event[event.length - 2];
			let answer = event[event.length - 1];;
			let msg = [];
			msg.push(user);
			msg.push(answer);
			// console.log("数据是：",msg);
			plus.storage.setItem(index.uuid,JSON.stringify(msg))
			return param;
			// console.log("新建的数据项是：",index);
		} else {
			// 需要查阅历史记录进行数据转移
			console.log("有相似的文件");
			
			// 处理文档中的历史数据
			let box = [];
			box = JSON.parse(plus.storage.getItem(fileuuid));
			if (box == null){
				console.log("是否有历史数据：", box);
				return true;
			}
			console.log("文件返回的历史数据是：",box);
			let user = event[event.length - 2];
			let answer = event[event.length - 1];
			box.push(user);
			box.push(answer);
			plus.storage.setItem(fileuuid,JSON.stringify(box));
			
			// 跳转的页面是
			let index = uni.getStorageSync('ChatSession');
			let e = '';
			index.forEach(item => {
				if (item.uuid == fileuuid){
					e = item;
				}
			})
			const param = encodeURIComponent(JSON.stringify(e));
			return param;
		}
	},
	templateDataUpdate(event, index, array){
		// console.log("地址是：", event);
		// console.log("uuid是：", index);
		// console.log("传递的数据是：", array);
		//  {"username","company","iphone","project","uuid"}
		let obj = {};
		if (array.UserA != ''){
			obj.username = array.UserA
		}
		if (array.CompanyA != ''){
			obj.company = array.CompanyA
		}
		if (array.PhoneA != ''){
			obj.iphone = array.PhoneA
		}
		if (array.ProjectA != ''){
			obj.project = array.ProjectA
		}
		obj.uuid = index;
		console.log("要传递的数据是：", obj);
		uni.request({
			url:`${event}/api/ParttA`,
			method:'POST',
			header:{
				satoken:uni.getStorageSync('token')
			},
			data:obj,
			success: (res) => {
				console.log("数据更新情况");
				if (res.data.status == 100){
					console.log("数据更新成功：",res);
				}
			},
			fail: (res) => {
				console.log("数据更新失败：",res);
			}
		})
	},
	truncateNickName(nickName, nums) {
		nickName.map(item => {
			item[1] = this.createNickName(item[1], nums);
			// console.log("数据是：",item[1]);
			return item;
		}) 
		return nickName;
	},
	/**
	 * 字符串过长，显示一部分剩下的用省略号代替
	 * @param {string} nickName 具体的字符串
	 * @param {Number} nums 保留的最大位数
	 * @return {string} 返回处理过后的字符串
	 */
	createNickName(nickName, nums){
		nickName = nickName.replace(/\n/g, '');
		if (nickName.length <= nums) {
		    return nickName; 
		}
		return nickName.slice(0, nums) + "..."; 
	},
	/**
	 * 进行文件大小的简化B,Kb,MB
	 * @param {Number} size 传递一个文件的大小 
	 */
	formatFileSize(size) {
	    if (size < 1024) {
	        // 文件大小小于1KB，显示为B
	        return size + ' B';
	    } else if (size < 1024 * 1024) {
	        // 文件大小小于1MB，显示为KB
	        return (size / 1024).toFixed(2) + ' KB';
	    } else if (size < 1024 * 1024 * 1024) {
	        // 文件大小小于1GB，显示为MB
	        return (size / (1024 * 1024)).toFixed(2) + ' MB';
	    } else {
	        // 文件大小大于或等于1GB，显示为GB
	        return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
	    }
	},
	/**
	 * @param {Object} event 传递过来一个对象
	 */
	detailedInformation(event){
		// uni.request({
		// 	url:'http://114.115.203.18:9421/api/des',
		// 	method:'POST',
		// 	header:{
		// 		satoken:uni.getStorageSync('token')
		// 	},
		// 	data:[event],
		// 	success: (res) => {
		// 		console.log("返回的详细信息是：",res);
		// 		return res.data
		// 	},
		// 	fail: (res) => {
		// 		console.log("失败的原因是456：",res);
		// 	}
		// })
	},
	/**
	 * 判断素数
	 * @author Liu <2503325800@qq.com>
	 * @param {Number} n 判断的具体数据
	 * @return {Boolean} 返回的具体类型
	 */
	isPrime(n){
		
	},
	/**
	 * 放大图片
	 * @param {string} event 传递过来一个链接
	 * @return {type} 无返回值
	 */
	enlargePhoto(event){
		uni.previewImage({
			urls:[event],
			current:event
		})
	},
	/**
	 * 查阅后端存储的数据，并作对应的初始化
	 * @param {Object} url 请求的地址
	 */
	obtainMessage(url) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: `${url}/ver/LoadSession`,
				method: 'GET',
				header: {
					satoken: uni.getStorageSync('token'),
				},
				success: (res) => {
					// console.log("加载的res的值是：", res);
					if (res.data.status == 100) {
						resolve(res.data.data);  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					console.log("加载失败的信息是：", res);
					reject(new Error("Request failed"));
				},
			});
		});
	},
	/**
	 * 删除对话界面的后端数据存储信息
	 * @param {Object} url 请求的地址 
	 * @param {Object} event 删除对应项的uuid
	 */
	deleteMessage(url,event){
		return new Promise((resolve, reject) => {
			uni.request({
				url:`${url}/ver/DeleteSession?uuid=${event}`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				success: (res) => {
					console.log("删除指定项目:",res);
					if (res.data.status == 100) {
						resolve('成功');  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					console.log("加载失败的信息是：", res);
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 新增对话界面的项目数据 
	 * @param {Object} url 请求的地址 
	 * @param {Object} event 删除对应项的uuid
	 */
	addMessage(url,event){
		console.log("新添加的数据是：",event);
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/ver/InsertSession`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				data:event,
				success: (res) => {
					if (res.data.status == 100) {
						resolve('成功');  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * @param {Object} url 请求的地址
	 * @param {Object} event 修改数据的  对象数据  而不是数组
 	 */
	adjustMessage(url,event){
		console.log("新添加的数据是45641231：",event);
		console.log("地址是：", url);
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/ver/UpdataSession`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				data:event,
				success: (res) => {
					console.log("修改之后的回应：",res);
					if (res.data.status == 100) {
						resolve('成功');  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * @param {object} uuid 上传记录的唯一标识
	 * @param {Object} url 请求地址
	 * @param {Object} ask 记录的提问
	 * @param {Object} answer 记录的回答
	 */
	uploadRecords(uuid ,url, ask, answer){
		let event = {
			uuid:uuid,
			askAdditionDTO:ask,
			answerAdditionDTO:answer
		}
		console.log("上传的记录配置信息是：",event);
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/ver/InsertChatRecords`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				data:event,
				success: (res) => {
					console.log("记录上传结果是：",res);
					if (res.data.status == 100) {
						resolve('成功');  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 请求每个会话的对话记录
	 * @param {Object} url 请求的地址
	 * @param {Object} uuid 请求记录的唯一标识
	 * @param {Object} size 请求记录的组数 初始默认值为0
	 */
	getRecords(url, uuid, size){
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/ver/LoadChatRecords?uuid=${uuid}&size=${size}`,
				method:'GET',
				header:{
					satoken:uni.getStorageSync('token')
				},
				success: (res) => {
					console.log("记录上传结果是：",res);
					if (res.statusCode == 200) {
						resolve('成功');
						console.log("456789此时的消息是：",res.data);
						plus.storage.setItem(`${uuid}`,JSON.stringify(res.data));
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 删除指定的报价消息
	 * @param {Object} url 请求地址
	 * @param {Object} uuid 页面的uuid
	 * @param {Object} similarUuid 同一组消息的uuid
	 * @param {Object} index 0 问  1 答
	 */
	deleteRecords(url, uuid, similarUuid, index){
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/ver/DeleteChatRecords`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				data:{
					uuid:uuid,
					similarUuid:similarUuid,
					index:index
				},
				success: (res) => {
					console.log("删除报价消息的结果是：",res);
					if (res.statusCode == 200) {
						resolve('成功');
						// console.log("456789此时的消息是：",res.data);
						// plus.storage.setItem(`${uuid}`,JSON.stringify(res.data));
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 添加客户信息
	 * @param {Object} url 请求的地址
	 * @param {Object} event 添加客户信息
	 * @return {number} 返回值是客户信息标识id值
	 */
	addCustomer(url, event){
		console.log("添加的客户信息是：", event);
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/Contact/InfoInsert`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				data:event,
				success: (res) => {
					console.log("客户信息上传结果是：",res);
					if (res.data.id != -1) {
						resolve(res.data.id);  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + '已存在该手机号码用户'));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 删除指定的客户信息
	 * @param {Object} url 请求地址
	 * @param {Object} id  客户信息的id值
	 */
	deleteCustomer(url, id){
		// console.log("");
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/Contact/InfoDelete?id=${id}`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				success: (res) => {
					console.log("客户信息删除的结果是：",res);
					if (res.data.status == 100) {
						resolve('成功');  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.message));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 查找所有客户
	 * @param {Object} url 请求的地址
	 */
	getCustomer(url){
		console.log("地址是：",url);
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/Contact/InfoSelect`,
				method:'GET',
				header:{
					satoken:uni.getStorageSync('token')
				},
				success: (res) => {
					console.log("查找到的所有的客户信息是：",res);
					if (res.data.length > 0) {
						uni.setStorageSync('itemArr', res.data);
						// uni.setStorageSync('objj', res.data);
						resolve('成功');  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * @param {Object} url 接口请求的地址
	 * @param {Object} event 修改好的客户信息
	 */
	adjustCustomer(url, event){
		return new Promise((resolve, reject) =>{
			uni.request({
				url:`${url}/Contact/InfoUpdata`,
				method:'POST',
				header:{
					satoken:uni.getStorageSync('token')
				},
				data:event,
				success: (res) => {
					console.log("修改之后的客户信息是：",res);
					if (res.statusCode == 200) {
						// uni.setStorageSync('itemArr', res.data);
						// uni.setStorageSync('objj', res.data);
						resolve('成功');  // Resolve the promise with the data
					} else {
						reject(new Error("Failed to load data: " + res.data.status));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 上传文件本地地址转换为网络地址
	 * @param {Object} url 请求地址
	 * @param {Object} filepath 上传文件地址
	 * @param {Object} uuid 当前页面的uuid
	 */
	localToUrl(url, filepath, uuid){
		console.log("总的文件开始上传");
		return new Promise((resolve, reject) =>{
			uni.uploadFile({
				url:`${url}/ver/AskFileUpload`,
				filePath: filepath,
				name: 'file',
				header:{
					satoken:uni.getStorageSync('token')
				},
				formData: {
					file:'file',
					uuid:uuid
				},
				success: (res) => {
					let res1 = JSON.parse(res.data);
					if (res1.status == 100){
						console.log("转换成功的地址是：", res1.data.uri);
						resolve(res1.data.uri);
					} else {
						console.log("转换失败");
						reject(new Error("Failed to load data"));
					}
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			})
		})
	},
	/**
	 * 下载网络资源为本地资源，包含图片、文件等
	 * @param {Object} Url 资源下载的网络地址
	 * @return {type} 返回本地资源地址
	 */
	networkToLocal(Url){
		return new Promise((resolve, reject) =>{
			uni.downloadFile({
				url: Url, //仅为示例，并非真实的资源
				success: (res) => {
					console.log('下载成功');
					console.log("得到的临时路径是：", res);
					// 保存临时路径为永久路径
					uni.saveFile({
						tempFilePath: res.tempFilePath,
						success: function (res) {
							// savedFilePath = res.savedFilePath;
							console.log("得到的永久路径是：",res.savedFilePath);
							resolve(res.savedFilePath);
						}
					});
				},
				fail: (res) => {
					reject(new Error("Request failed"));
				}
			});
		})
	},
	// computingTime(old, newData){
	// 	console.log("类型是：",typeof(parseInt(old)));
	// 	console.log("类型2：",typeof(newData));
	// 	console.log("数据是：",(parseInt(old)*newData).toFixed(2));
	// 	return old*newData
	// }
}