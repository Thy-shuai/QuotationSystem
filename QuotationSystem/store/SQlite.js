openDatabase(){
				plus.sqlite.openDatabase({
					name: 'first',
					path: '_doc/test.db',
					success: function(e){
						console.log('openDatabase success!');
					},
					fail: function(e){
						console.log('openDatabase failed: '+JSON.stringify(e));
					}
				});
			},
			isOpenDatabase(){
				if (plus.sqlite.isOpenDatabase({name: 'first',path: '_doc/test.db'})){
				    console.log('已经打开数据库。');
				}else{
				    console.log('没有打开数据库！');
				}
			
			},
			executeSQL(){
				// src:require('../../static/mj18921887240777832.png'),
				// isYour:true
				// `CREATE TABLE IF NOT EXISTS ${this.uuid}('src' CHAR(110),'sYour' CHAR(100))`
				// 'create table if not exists database("where" CHAR(110),"location" CHAR(100),"age" INT(11))'
				plus.sqlite.executeSql({
						name: 'first',
						// sql: `create table if not exists ${this.uuid}("where" CHAR(110),"location" CHAR(100),"age" INT(11))`,
						sql: 'create table if not exists 绘画13("where" CHAR(110),"location" CHAR(100),"age" INT(11))',
						success: function(e){
							console.log('executeSql success!');
							plus.sqlite.executeSql({
								name: 'first',
								// sql: `insert into ${this.uuid} values('你','背景','19')`,
								sql: "insert into 绘画13 values('你','背景','19')",
								success: function(e){
									console.log('executeSql success!');
								},
								fail: function(e){
									console.log('executeSql failed: '+JSON.stringify(e));
								}
							});
						},
						fail: function(e){
							console.log('executeSql123 failed: '+JSON.stringify(e));
						}
					});
			},
			selectsql(){
				plus.sqlite.selectSql({
						name: 'first',
						// sql: `select * from ${this.uuid}`,
						sql:'select * from 绘画13',
						success: function(data){
							console.log('selectSql success: ');
							// console.log("数据是：",data);
							for(var i in data){
								console.log(data[i]);
							}
						},
						fail: function(e){
							console.log('selectSql failed: '+JSON.stringify(e));
						}
					});
			},
			closeDatabase(){
				plus.sqlite.closeDatabase({
						name: 'first',
						success: function(e){
							console.log('closeDatabase success!');
						},
						fail: function(e){
							console.log('closeDatabase failed: '+JSON.stringify(e));
						}
					});
			},