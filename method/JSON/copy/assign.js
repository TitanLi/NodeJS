// 複製JSON
const obj = {a:1};
const copy = Object.assign({},obj);
copy['b'] = 2;
console.log(obj);
console.log(copy);