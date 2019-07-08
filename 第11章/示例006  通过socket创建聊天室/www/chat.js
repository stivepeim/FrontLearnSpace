if(!WebSocket){									// 判断浏览器是否支持websocket
	alert('Your browser does not support WebSocket, you cannot chat!');
}else{
var Socket;										// 定义socket全局变量，程序运行时被赋值
var username;									// 定义当前用户名全局变量
$(function(){
	var
	login_wrap = $("#login_wrap"),				// 登录窗口
	uname_input = $("#uname"),					// 登录用户名
	uname_welcome = $("#J_uname"),				// 登录后显示用户名
	now_time = $("#J_time"),					// 登录后显示当前时间
	userList = $("#Userlist"),					// 用户列表
	userTotal = $(".userTotal"),				// 用户总数
	sendto = $("#sendto"),						// 发送对象用户列表
	message_list = $("#messages"),				// 聊天消息列表
	chat_input = $('#chat_input'),				// 发送消息文本
	chat_wrap = $("#wrapper");					// 聊天窗口
	var now = function(){						// 获取当前时间
		var time = new Date();
		return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
	}
	var updateUserList = function(users){		// 更新用户列表
		var user_html = '',
			send_to_html = '<option value="all">所有人</option>';
		if(users.length > 0){
			users.forEach(function(user){
				user_html += '<li>' + user + '</li>';
				if(user != username){			// 加入聊天对象，不包括自己
					send_to_html += '<option value="'+ user +'">'+ user +'</option>'
				}
			});
			userList.html(user_html);			// 更新用户列表
			sendto.html(send_to_html);			// 更新发送对象
		}
		userTotal.html(users.length);			// 更新用户总数
	}
	var open = function(event){					// socket连接成功回调函数
		login_wrap.remove();					// 隐藏登录窗口
		chat_wrap.show();						// 显示聊天窗口
		uname_welcome.text(username);			// 设置当前用户名
		now_time.text(new Date());				// 设置当前时间
		var json_data = JSON.stringify({'message':username, 'sender': 'ws:__join__'});
		Socket.send(json_data);					// 发送消息socket消息，在服务器端注册用户
	};
	var message = function(event){				// 接收服务器端发回的消息回调函数
		var data = JSON.parse(event.data);		// 将消息转化为json格式
		var sender = data['sender'] || '';		// 消息的发送者
		var message = data['message'] || '';	// 消息内容
		if(sender == 'ws:__update_user__'){		// 发来的消息为更新用户列表动作
			updateUserList(message);			// 调用更新用户列表函数
		}else if(sender == '广播'){				// 发来的消息为系统广播
			var gb = '<li><strong>' + 
				sender +':</strong><span>' + 
				message + '</span><b>[' + now() +']</b></li>';
			message_list.append(gb);			// 更新消息列表
		}else{									// 一般的对话消息
			var gb = '<li><strong>' + 
				sender +':</strong><span>' + 
				message + '</span><b>[' + now() +']</b></li>';
			message_list.append(gb);			// 更新消息列表
		}
	};
	var error = function(event){				// socket链接失败回调函数
		console.log('error', event);
		return;
	};
	uname_input.keypress(function(e){			// 绑定登录名kepress事件
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13){							// 回车键被按下
			username = uname_input.val();		// 获取用户名
			chat_url = window.location.href;	// 获取当前URL
			chat_url = chat_url.substr(4);		
			chat_url = 'ws' + chat_url;			// 配置聊天的ws协议
			Socket = new WebSocket(chat_url, 'chat-protocol'); // 打开聊天socket链接
			Socket.onopen = open;				// 打开socket成功
			Socket.onmessage = message;			// 接收服务器端发来的消息
			Socket.onerror = error;				// 打开socket失败
		}
	});
	chat_input.keypress(function(e){			// 绑定消息框的kepress事件
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13){						// 回车键被按下
			message = chat_input.val();			// 获取聊天内容
			sendto_value = sendto.val();		// 获取发送对象
			sender = 'ws:__send__';				// 设置发送对象为消息发送
			$('#chat_input').val('');			// 清除聊天内容
			json_data = JSON.stringify({'message':{ msg: message, from: username, to: sendto_value}, 'sender':sender});
			Socket.send(json_data);				// 通过socket发送消息
			e.preventDefault();					// 阻止textarea的默认事件
			e.stopPropagation();				// 阻止冒泡
		}
	});
});
}