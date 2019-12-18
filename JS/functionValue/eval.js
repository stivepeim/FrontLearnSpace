console.log(eval('2+2'))
// console.log(eval('alert("Hello")'))

var b = 100;

function foo(str, a){
    eval(str);
    console.log(a, b);
}

foo('var b = 2;', 1)
// 不再推荐使用了，仅仅是注入js代码使用，而且还有性能消耗太大的问题