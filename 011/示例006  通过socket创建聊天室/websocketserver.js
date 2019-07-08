var
clients = [],											// 存储客户端连接
users = [],												// 存储连接的用户名
WebSocketServer = require('websocket').server;			// 引入WebSocketServer模块
var run = function(httpServer){					
	wsServer = new WebSocketServer({					// 创建WebSocketServer实例
		httpServer: httpServer,
		autoAcceptConnections: false
	});
	wsServer.on('request', function(request) {
		var connection = request.accept('chat-protocol', request.origin);		// 获取连接
		var client_index = clients.push(connection) - 1;    					// 聊天室人员加1
		users[client_index] = 'Anonymous';										// 设置用户名为
		// Anonymous
		// 当前用户接收客户端性来的消息
		var message = function(message) {										// 接收消息回调函数
			if (message.type === 'utf8') {
			var data = JSON.parse(message.utf8Data);
				var message = data['message'];									// 消息
				var sender = data['sender'];									// 发送者
			   if(sender == 'ws:__join__'){ // 有新用户加入聊天室				// 新加入逻辑
					// 广播
					broadcasted( '【' + message + '】^-^加入了聊天室');			// 通知所有人有人加入
					// 更新用户名单
					users[client_index] = message;								// 更新当前加入者用户名
					updateUser();												// 更新用户列表
				}else if(sender == 'ws:__send__'){								// 发送消息逻辑
					var from = message.from,									// 获取发送源
						to = message.to,										// 获取目的地源
						msg = message.msg;										// 获取消息体
					if(to == 'all'){ // 发送给所有人							// 发送对象是所有用户
						broadcasted(msg, from);									// 广播消息
					}else{ 														// 发送给某个人
						for (var i = 0; i < clients.length; i++){
							if(users[i] == to || users[i] == from){ 			// 发送给自己和对方
								var json_data = JSON.stringify({"message": '私信：' + msg, "sender": from});
								clients[i].sendUTF(json_data);					// 把消息push到客户端
							}
						}
					}
				}
			}
		};
		// 当前加入者监听退出聊天室事件
		var close = function(reasonCode, description) {
			clients.splice(client_index, 1);    								// 客户端数量减1
			leaving_user = users.splice(client_index, 1)[0];					// 用户数量减1
			var message = '【' + leaving_user + '】 离开了聊天室!';
			broadcasted(message);												// 管理员广播有用户离开
			updateUser();														// 更新用户列表
		};
		connection.on('message', message);										// 监听客户端发来的消息事件
		connection.on('close', close);											// 监听用户离开聊天室事件
	});
};
// 向所有用户广播信息
var broadcasted = function(message, sender){
    sender = sender || '广播';
	var json_data = JSON.stringify({'message': message, 'sender': sender});
	for (var i = 0; i < clients.length; i++){
        clients[i].sendUTF(json_data);											// 向所有用户循环广播所有消息
    }
}
var updateUser = function(){
    sender = 'ws:__update_user__';												// 设置发送对象
    broadcasted(users, sender);													// 发送客户端，更新用户列表
};
String.prototype.trim = function(){												// 去除字符串两边的空格
    return this.replace(/^\s+|\s+$/g,'');
}
exports.ws = run;																// 暴露WebSocketServer接口