// 解構賦值
// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: [ 30, 40, 50 ]

({ a, b } = { a: 10, b: 20 });
console.log(a); 
//  expected output: 10
console.log(b);
//  expected output: 20

({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); 
//  expected output: 10
console.log(b);
//  expected output: 20
console.log(rest);
//  expected output: {c: 30, d: 40}