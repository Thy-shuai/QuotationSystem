export default {
	storage(addr, data) {
		plus.io.requestFileSystem(
			plus.io.PRIVATE_DOC, // 程序私有文档目录常量
			fs => {
				// 创建或打开文件, fs.root是根目录操作对象,直接fs表示当前操作对象
				fs.root.getFile(
					addr, {
						create: true // 文件不存在则创建
					},
					fileEntry => {
						// 文件在手机中的路径
						fileEntry.createWriter(writer => {
							// 写入文件成功完成的回调函数
							writer.onwrite = e => {
								console.log('写入成功');
							};
							// 向文件中写入数据
							writer.write(
								JSON.stringify(data)
							);
						});
					},
					e => {
						console.log('getFile failed: ' + e.message);
					}
				);
			},
			e => {
				console.log(e.message);
			}
		);
	},
	read(addr) {
		let that = this;
		return new Promise((resolve, reject) => {
			plus.io.requestFileSystem(
				plus.io.PRIVATE_DOC,
				fs => {
					fs.root.getFile(
						addr, {
							create: false
						},
						fileEntry => {
							fileEntry.file(function(file) {
								console.log('文件大小:' + file.size + '-- 文件名:' + file.name);
								//创建读取文件对象
								let fileReader = new plus.io.FileReader();
								//以文本格式读取文件数据内容
								fileReader.readAsText(file, 'utf-8');
								//文件读取操作完成时的回调函数
								fileReader.onloadend = function(evt) {
									resolve(evt.target.result)
								};
							});
						},
						e => {
							reject(e)
							console.log(e)
						}
					);
				},
				e => {
					reject(e);
					console.log(e.message);
				}
			);
		})
 
	}
}