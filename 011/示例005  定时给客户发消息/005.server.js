var config = {											// 配置文件
	db: {
		host	: 'localhost',							// 数据库连接地址
		user	: 'root',								// 数据库用户名
		password: 'root',								// 数据库密码
		database: 'html5'								// 数据库名
	},
	port: 8000											// 服务端口号
};
var http = require('http');								// HTTP模块
var sys = require('sys');								// 系统模块
var fs = require('fs');									// 文件系统模块
var mysql = require('mysql');							// 数据库连接模块
var url = require('url');								// URL解析模块
var connection = mysql.createConnection(config.db);		// 创建数据库连接
connection.connect();									// 连接数据库
http.createServer(function(req, res) {					// 创建http server
	if (req.headers.accept && req.headers.accept == 'text/event-stream') {
		if (req.url == '/notice') {						// 判断请求的URL
			res.writeHead(200, {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive'
			});
			loop(req, res);
		} else {
			console.log('404');
			res.writeHead(404);
			res.end();
		}
	} else if(req.url == '/admin'){									// 后台模拟添加消息
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(fs.readFileSync(__dirname + '/005.admin.html'));	// 载入admin.html文件
		res.end();
	} else if(req.url.indexOf('/addmsg') !== -1 ){					// 添加消息处理
		var url_parts = url.parse(req.url, true);					// URL解析
		var query = url_parts.query;								// 获取参数
		res.writeHead(200, {'Content-Type': 'text/html'});
		if(query.msg){
			var msg = {msg: query.msg};								// 获取消息内容
			// 插入数据到数据库中
			connection.query("insert into demo_12_5 set ?", msg, function(err, result){
				console.log(result);
				res.write("添加成功， <a href='/'>返回首页</a> 或者 <a href='/admin'>继续添加</a>");
				res.end();
			});
		}else{														// 添加失败逻辑
			res.write("添加失败， <a href='/admin'>重新添加</a>");
			res.end();
		}		
	} else {														// 默认页面（首页）
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(fs.readFileSync(__dirname + '/005.定时给客户发消息.html'));
		res.end();
	}
}).listen(config.port);
console.log('listen on http://localhost:' + config.port);			// 在控制台输出端口号
function loop(req, res){											// 后台轮询函数
	getMoreSMS(res, function(data){									// 查看是否有新消息
		sendSSE(req, res, data);									// 通知客户端有新消息
	});
	//.在一个长链接中每隔10秒服务端进行事件推送到客户端
	setInterval(function() {
		getMoreSMS(res, function(data){
			sendSSE(req, res, data);
		});
	}, 10000);
}
function sendSSE(req, res, data) {
	var id = (new Date()).toLocaleTimeString();						// 获取当前的时间戳
	res.write('id: ' + id + '\n');									// 发送时间戳
	res.write("data: " + JSON.stringify(data) + '\n\n');			// 发送数据（JSON格式化）
}
function getMoreSMS(res, callback){
	// 查询数据库，查找所有未读的消息
	connection.query('SELECT id, msg, addDate from demo_12_5 where isRead = 0', function(err, rows, fields) {
		if (err || !rows.length) {
			console.log('errors');
		}else{
			callback(rows);
		}
	});
}
