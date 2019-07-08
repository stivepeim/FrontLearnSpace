/**
 * Created by Stivepeim on 8/5/16.
 */
function draw1(id) {
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    context.fillStyle = "red";
    context.strokeStyle = "blue";
    context.lineWidth = 1;
    context.fillRect(50, 50, 100, 100);
    context.strokeRect(50, 50, 100, 100);
}
function draw2(id) {
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    for (var i = 0; i < 10; i++) {
        context.beginPath();
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = 'rgba(255, 0, 0, 0.25)';
        context.fill();
    }
}

function draw3(id) {
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    for (var i = 0; i < 10; i++) {
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        context.fillStyle = 'rgba(255, 0, 0, 0.25)';
        context.fill();
    }
}

function draw4(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    var dx = 150;
    var dy = 150;
    var s = 100;
    context.beginPath();
    context.fillStyle = 'rgb(100,255,100)';
    context.strokeStyle = 'rgb(0,0,100)';
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 15 * 11;
    for(var i = 0; i < 30; i++)
    {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo( dx + x * s,dy + y * s);
    }
    context.closePath();
    context.fill();
    context.stroke();
}

function draw5(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    var dx = 150;
    var dy = 150;
    var s = 100;
    context.beginPath();
    context.globalCompositeOperation ='and';
    context.fillStyle = 'rgb(100,255,100)';
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 15 * 11;
    context.moveTo(dx,dy);
    for(var i = 0; i < 30; i++)
    {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.bezierCurveTo(dx + x * s,dy + y * s - 100,dx + x * s + 100,dy + y * s,dx + x * s,dy + y * s);
    }
    context.closePath();
    context.fill();
    context.stroke();
}

function draw6(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var g1 = context.createLinearGradient(0,0,0,300);
    g1.addColorStop(0,'rgb(255,255,0)');
    g1.addColorStop(1,'rgb(0,255,255)');
    context.fillStyle = g1;
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    var g2 = context.createLinearGradient(0,0,300,0);
    g2.addColorStop(0,'rgba(0,0,255,0.5)');
    g2.addColorStop(1,'rgba(255,0,0,0.5)');
    for(var i = 0; i < 10; i++)
    {
        context.beginPath();
        context.fillStyle = g2;
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
}

function draw7(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var g1 = context.createRadialGradient(400,0,0,400,0,400);
    g1.addColorStop(0.1,'rgb(255,255,0)');
    g1.addColorStop(0.3,'rgb(255,0,255)');
    g1.addColorStop(1,'rgb(0,255,255)');
    context.fillStyle = g1;
    context.fillRect(0, 0, 400, 300);
    var n = 0;
    var g2 = context.createRadialGradient(250,250,0,250,250,300);
    g2.addColorStop(0.1,'rgba(255,0,0,0.5)');
    g2.addColorStop(0.7,'rgba(255,255,0,0.5)');
    g2.addColorStop(1,'rgba(0,0,255,0.5)');
    for(var i = 0; i < 10; i++)
    {
        context.beginPath();
        context.fillStyle = g2;
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
}
function draw8(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    // 图形绘制
    context.translate(200,50);
    context.fillStyle = 'rgba(255,0,0,0.25)';
    for(var i = 0;i < 50;i++)
    {
        context.translate(25,25);
        context.scale(0.95,0.95);
        context.rotate(Math.PI / 10);
        context.fillRect(0,0,100,50);
    }
}

function draw9(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    // 图形绘制
    context.translate(200,50);
    for(var i = 0;i < 50;i++)
    {
        context.translate(25,25);
        context.scale(0.95,0.95);
        context.rotate(Math.PI / 10);
        create5Star(context);
        context.fill();
    }
}
function create5Star(context)
{
    var n = 0;
    var dx = 100;
    var dy = 0;
    var s = 50;
    // 创建路径
    context.beginPath();
    context.fillStyle = 'rgba(255,0,0,0.5)';
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 5 * 4;
    for(var i = 0; i < 5; i++)
    {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo( dx + x * s,dy + y * s);
    }
    context.closePath();
}

function draw10(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    /* 定义颜色 */
    var colors = ["red", "orange", "yellow", "green", "blue", "navy", "purple"];
    /* 定义线宽*/
    context.lineWidth = 10;
    context.transform(1, 0, 0, 1, 100,0)
    /*循环绘制圆弧*/
    for( var i=0; i<colors.length; i++ )
    {
        /* 定义每次向下移动10个像素的变换矩阵 */
        context.transform(1, 0, 0, 1, 0, 10);
        /* 设定颜色 */
        context.strokeStyle = colors[i];
        /* 绘制圆弧 */
        context.beginPath();
        context.arc(50, 100, 100, 0, Math.PI, true);
        context.stroke();
    }
}

function draw11(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    /* ----------------------------------------------
     * 绘制红色长方形
     * -------------------------------------------- */
    context.strokeStyle = "red";
    context.strokeRect(30, 10, 60, 20);
    /* ----------------------------------------------
     * 绘制顺时针旋转45°后的蓝色长方形
     * -------------------------------------------- */
    /*绘制45°圆弧 */
    var rad = 45 * Math.PI / 180;
    /*定义顺时针旋转45°的变换矩阵*/
    context.setTransform(Math.cos(rad), Math.sin(rad), -Math.sin(rad),
        Math.cos(rad), 0, 0 );
    /* 绘制图形 */
    context.strokeStyle = "blue";
    context.strokeRect(30, 10, 60, 20);
    /* ----------------------------------------------
     * 绘制放大2.5倍后的绿色长方形
     * -------------------------------------------- */
    /* 定义放大2.5倍的变换矩阵 */
    context.setTransform(2.5, 0, 0, 2.5, 0, 0);
    /* 绘制图形 */
    context.strokeStyle = "green";
    context.strokeRect(30, 10, 60, 20);
    /* ----------------------------------------------
     * 将坐标原点向右移动40像素，向下移动80像素后绘制灰色长方形
     * -------------------------------------------- */
    /* 定义将坐标原点向右移动40像素，向下移动80像素的矩阵 */
    context.setTransform(1, 0, 0, 1, 40, 80);
    /* 绘制图形 */
    context.strokeStyle = "gray";
    context.strokeRect(30, 10, 60, 20);
}

function draw12(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var oprtns = new Array(
        "source-atop",
        "source-in",
        "source-out",
        "source-over",
        "destination-atop",
        "destination-in",
        "destination-out",
        "destination-over",
        "lighter",
        "copy",
        "xor"
    );
    i=8;    //读者可自行修改该参数来显示想要查看的组合效果
    //绘制原有图形（蓝色长方形）
    context.fillStyle = "blue";
    context.fillRect(10, 10, 60, 60);
    /*设置组合方式，从组合的参数数组中挑选组合方式，此处因为i是8，
     所以选择oprtns数组中第9(数组从0开始计算）个组合方式lighter*/
    context.globalCompositeOperation = oprtns[i];
    //设置新图形（红色圆形）
    context.beginPath();
    context.fillStyle = "red";
    context.arc(60, 60, 30, 0, Math.PI*2, false);
    context.fill();
}

function draw13(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 10;
    context.shadowColor = 'rgba(100,100,100,0.5)';
    context.shadowBlur = 7.5;
    // 图形绘制
    context.translate(0,50);
    for(var i = 0;i < 3;i++)
    {
        context.translate(50,50);
        create5Star13(context);
        context.fill();
    }
}
function create5Star13(context)
{
    var n = 0;
    var dx = 100;
    var dy = 0;
    var s = 50;
    //创建路径
    context.beginPath();
    context.fillStyle = 'rgba(255,0,0,0.5)';
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 5 * 4;
    for(var i = 0; i < 5; i++)
    {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo( dx + x * s,dy + y * s);
    }
    context.closePath();
}

function draw14(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    image = new Image();
    image.src = "tyl.jpg";
    image.onload = function()
    {
        drawImg(context,image);
    };
}
function drawImg(context,image)
{
    for(var i = 0;i < 7;i++)
        context.drawImage(image,0 + i * 50,0 + i * 25,100,100);
}

function draw15(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "#EEEEFF";
    context.fillRect(0, 0, 400, 300);
    image = new Image();
    image.src = "tyl.jpg";
    image.onload = function()
    {
        drawImg(context,image);
    };
}
function drawImg(context,image)
{
    var i=0;
    //首先调用该方法绘制原始图像
    context.drawImage(image,0,0,100,100);
    //绘制将局部区域进行放大后的图像
    context.drawImage(image,23,5,57,80,110,0,100,100);
}


function draw16(id)
{
    var image = new Image();
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    image.src = "tyl2.jpg";
    image.onload = function()
    {
        drawImg16(canvas,context,image);
    };
}
function drawImg16(canvas,context,image)
{
    //平铺比例
    var scale=5
    //缩小后图像宽度
    var n1=image.width/scale;
    //缩小后图像高度
    var n2=image.height/scale;
    //平铺横向个数
    var n3=canvas.width/n1;
    //平铺纵向个数
    var n4=canvas.height/n2;
    for(var i=0;i<n3;i++)
        for(var j=0;j<n4;j++)
            context.drawImage(image,i*n1,j*n2,n1,n2);
}
function draw17(id)
{
    var image = new Image();
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    image.src = "tyl3.jpg";
    image.onload = function()
    {
        //创建填充样式，全方向平铺
        var ptrn = context.createPattern(image,'repeat');
        //指定填充样式
        context.fillStyle = ptrn;
        //填充画布
        context.fillRect(0,0,400,300);
    };
}

function draw18(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var gr = context.createLinearGradient(0,400,300,0);
    gr.addColorStop(0,'rgb(255,255,0)');
    gr.addColorStop(1,'rgb(0,255,255)');
    context.fillStyle = gr;
    context.fillRect(0, 0, 400, 300);
    image = new Image();
    image.onload = function()
    {
        drawImg18(context,image);
    };
    image.src = "tyl.jpg";
}

function drawImg18(context,image)
{
    create5StarClip18(context);
    context.drawImage(image,-50,-150,300,300);
}

function create5StarClip18(context)
{
    var n = 0;
    var dx = 100;
    var dy = 0;
    var s = 150;
    context.beginPath();
    context.translate(100,150);
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 5 * 4;
    for(var i = 0; i < 5; i++)
    {
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo( dx + x * s,dy + y * s);
    }
    context.clip();
}

function draw19(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var image = new Image();
    image.src = "tyl.jpg";
    image.onload = function ()
    {
        context.drawImage(image, 0, 0);
        var imagedata = context.getImageData(0,0,image.width,image.height);
        for (var i = 0, n = imagedata.data.length; i < n; i += 4)
        {
            imagedata.data[i+0] = 255 - imagedata.data[i+0]; // red
            imagedata.data[i+1] = 255 - imagedata.data[i+2]; // green
            imagedata.data[i+2] = 255 - imagedata.data[i+1]; // blue
        }
        context.putImageData(imagedata, 0, 0);
    };
}
function draw20(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context=canvas.getContext('2d');
    context.fillStyle= '#00f';
    context.font= 'italic 30px sans-serif';
    context.textBaseline = 'top';
    //填充字符串
    context.fillText  ('示例文字', 0, 0);
    context.font='bold  30px sans-serif';
    //轮廓字符串
    context.strokeText('示例文字', 0, 50);
}

function draw21(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.font = 'italic 20px sans-serif';
    /* 定义绘制文字*/
    var txt = "字符串的宽度为";
    /* 获取文字宽度 */
    var tm1 = context.measureText(txt);
    /* 绘制文字 */
    context.fillText(txt, 10, 30);
    context.fillText(tm1.width, tm1.width+10, 30);
    /* 改变字体 */
    context.font = "bold  30px sans-serif";
    /* 重新获取文字宽度 */
    var tm2 = context.measureText(txt);
    /* 重新绘制文字*/
    context.fillText(txt, 10, 70);
    context.fillText(tm2.width,tm2.width+10, 70);
}

function draw22(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    context.fillStyle = "rgb(0, 0, 255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgb(255, 255, 0)";
    context.fillRect(10, 20, 50, 50);
    window.location =canvas.toDataURL("image/jpeg");
}

var context;
var width,height;
var i;
function draw23(id)
{
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    context = canvas.getContext('2d');
    width=canvas.width;
    height=canvas.height;
    i=0;
    setInterval(rotate23,100);         //十分之一秒
}
function rotate23()
{
    context.clearRect(0,0,width,height);
    context.fillStyle = "red";
    context.fillRect(i, 0, 20, 20);
    i=i+20;
}


var globalId;
var i=0;
function draw24(id)
{
    globalId=id;
    setInterval(Composite24,1000);
}
function Composite24()
{
    var canvas = document.getElementById(globalId);
    if (canvas == null)
        return false;
    var context = canvas.getContext('2d');
    var oprtns = new Array(
        "source-atop",
        "source-in",
        "source-out",
        "source-over",
        "destination-atop",
        "destination-in",
        "destination-out",
        "destination-over",
        "lighter",
        "copy",
        "xor"
    );
    if(i>10) i=0;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    //绘制原有图形（蓝色长方形）
    context.fillStyle = "blue";
    context.fillRect(10, 10, 60, 60);
    //设置组合方式
    context.globalCompositeOperation = oprtns[i];
    //设置新图形（红色圆形）
    context.beginPath();
    context.fillStyle = "red";
    context.arc(60, 60, 30, 0, Math.PI*2, false);
    context.fill();
    context.restore();
    i=i+1;
}

















