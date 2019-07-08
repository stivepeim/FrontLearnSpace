var http = require('http');								// 加载HTTP模块
var url = require('url');								// 加载URL模块
var fs = require('fs');									// 加载文件系统模块
var path = require('path');								// 加载path模块
var config = require('./config');						// 加载配置文件
var mime = config.mime;									// mime信息
var PORT = config.port;									// 端口号
var websocketserver = require('./websocketserver').ws;		// web socket server模块
// URL路由
var pathHandle = function(realPath, req, res, pathname){
	path.exists(realPath, function (exists) {				// 判断是否存在此文件路径
		if (!exists) {
			// 文件路径不存在，抛出404错误
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.write("请求的URL " + pathname + " 找不到");
			res.end();
		}else{
			// 读取二进制文件
			fs.readFile(realPath, "binary", function(err, file){
				if(err){
					res.writeHead(500, {'Content-Type': 'text/plain'});	// 读取失败，500错误
					res.end(err);
				}else{
					var ext = path.extname(realPath);					// 获取文件的扩展名
					ext = ext ? ext.slice(1) : "unknow";				// 扩展名容错处理
					var contentType = mime[ext] || "text/plain";		// 设置mime类型
					res.writeHead(200, {'Content-Type': contentType});	// 输出页头
					res.write(file, "binary");							// 写入文件
					res.end();
				}
			});
		}
	});
};
// 创建一个静态服务器
var server = http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;					// 解析URL
	if(pathname.slice(-1) === '/'){								// URL无路径，使用默认首页
		pathname = pathname + "page.html";						// 配置默认首页路径
	}
	var realPath = "www" + pathname;							// 配置服务器的相对路径
	pathHandle(realPath, req, res, pathname);					// 加载文件并输出
});
server.listen(PORT);											// 静态服务器监听在用户定义的端口
console.log("服务器运行在: http://127.0.0.1:" + PORT + "，请用浏览器打开！");
websocketserver(server);										// 运行web wocket server
