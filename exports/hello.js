const hello_lib = require('./lib/hello_lib');

hello_lib.sayHello('Titan');
// Hello Titan
const firstClass = new hello_lib.firstClass(9);
// create object
console.log(firstClass.plus());
// 10
console.log(firstClass.less());
// 9
console.log(firstClass.firstClassData);
firstClass.firstClassData = 100;

hello_lib.a();