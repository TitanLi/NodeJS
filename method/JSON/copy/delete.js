// 方法一
function deleteProperty1(obj, key) {
    const newObj1 = Object.assign({}, obj);
    delete newObj1[key];
    return newObj1;
}

let obj = { a: 1, b: 4 };
let result = deleteProperty1(obj, 'a');

console.log(obj);     // { a: 1, b: 4 }
console.log(result);  // { b: 4 }

// 方法二
function deleteProperty2(obj, key) {
    const { [key]: deleted, ...newObj2 } = obj;
    return newObj2;
}

obj = { a: 1, b: 4 };
result = deleteProperty2(obj, 'a');

console.log(obj);     // { a: 1, b: 4 }
console.log(result);  // { b: 4 }