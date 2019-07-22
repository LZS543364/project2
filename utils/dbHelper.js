//专门负责连接数据库
var mysql = require('mysql');
function query(sql,params = []) {
	var connect = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123',
		database: 'xiaomi'
	});
	return new Promise(function(resolve,reject) {
		connect.query(sql,params,function(err,results,fields) {
			connect.end();//关闭连接
			if(err) reject(err.message);
                else resolve(results);
		});
	});
}
module.exports = query; //导出query方法


