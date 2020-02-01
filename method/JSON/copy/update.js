function updateProperty(obj, item) {
    return Object.assign({}, obj, item);
}

let obj = { a: 1, b: 2 };
let item = { a: 2 };
let result = updateProperty(obj, item);

console.log(obj);     // { a: 1, b: 2 }
console.log(result);  // { a: 2, b: 2 }

// ES7
function updatePropertyES7(obj, item) {
    return { ...obj, ...item };
}

obj = { a: 1, b: 4 };
item = { a: 4 };
result = updatePropertyES7(obj, item);

console.log(obj);     // { a: 1, b: 4 }
console.log(result);  // { a: 4, b: 4 }