// ES6語法
const a = 'a';
const b = 'b';
const json = { a, b };
console.log(json);  // { a: 'a', b: 'b' } 

// function
const jsonFun = {
    name: 'Titan',
    fun(param) {
        console.log(`${param} ${this.name}`)
    }
}
jsonFun.fun('Hello');  // Hello Titan

// 計算得出屬性名稱
const prop = 'foo';
const computeJSON = {
    [prop]: 'hey',
    ['b' + 'ar']: 'there'
}
console.log(computeJSON.foo, computeJSON.bar);  // hey there

// 複製JSON
const json1 = {
    'hello': 'Hello',
    'name': 'name'
};
const json2 = { ...json1 };
json2.name = 'Titan';
console.log(json1, json2)