// var a = undefined; // false
// var a = null; // false
// var a = ''; // false
// var a = ' '; // false
// var a = ""; // false
var a = {}; // true
if(a) {
console.log('if');
}else{
  console.log('else');
}