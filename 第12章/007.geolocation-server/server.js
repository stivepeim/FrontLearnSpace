var querystring = require('querystring'),
    http = require("http");                     // 引用htpp模块，用于web服务器
http.createServer(function (req, res) {         // 创建新服务器
    var postData = '';
    res.setHeader('Access-Control-Allow-Origin', '*');  // 所有域名跨域访问均可以被通过
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // 服务器支持 ' GET, POST' 方法
    req.setEncoding('utf8');                            // 设置接收数据编码格式为 UTF-8
    req.addListener('data', function (chunk) {          // 接收数据块并将其赋值给 postData
        postData += chunk;
    }).addListener('end', function () {
        postData = querystring.parse(postData);
        http.get("http://maps.google.com/maps/api/geocode/json?latlng=" +
                 postData.lat + "," + postData.lon +
                 "&language=zh-CN&sensor=true", function (_res) {
                     var result = '';
                     _res.setEncoding('utf8');
                     _res.on('data', function (chunk) { result += chunk; });
                     _res.on('end', function () { res.end(result); });
                 });
    });
}).listen(8080, function () {                   // 设置web服务器监听端口，并启动服务
    console.log('listening on http://localhost:8080'); // 控制台显示web服务器启动成功
});
