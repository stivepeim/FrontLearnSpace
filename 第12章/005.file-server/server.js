﻿var fs = require('fs'),                         // 引用fs模块，用于对文件操作
    querystring = require('querystring'),
    http = require("http");                     // 引用htpp模块，用于web服务器

http.createServer(function (req, res) {         // 创建新服务器
    var postData = '';

    // 所有域名跨域访问均可以被通过
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 服务器支持 'OPTIONS, HEAD, GET, POST, PUT, DELETE' 方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // 设置接收数据编码格式为 UTF-8
    req.setEncoding('utf8');

    // 接收数据块并将其赋值给 postData
    req.addListener('data', function (chunk) {
        postData += chunk;
    }).addListener('end', function () {
        postData = querystring.parse(postData);

        var result;

        if (postData.type == 'set') {
            fs.writeFile(__dirname + '\\data.json', JSON.stringify(postData.data || []), function (err) {
                if (err) {
                    result = { "code": 500 };
                } else {
                    result = { "code": 200 };
                };
                res.end(JSON.stringify(result));
            });
        } else {
            fs.readFile(__dirname + '\\data.json', 'utf8', function (err, data) {
                if (err) {
                    result = { "code": 500 };
                } else {
                    result = { "code": 200, "data": JSON.parse(data) };
                };
                res.end(JSON.stringify(result));
            });
        };
    });
}).listen(8080, function () {                   // 设置web服务器监听端口，并启动服务
    // 控制台显示web服务器启动成功
    console.log('listening on http://localhost:8080');
});
