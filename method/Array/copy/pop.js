function purePop(aArray) {
    return aArray.slice(0, 1);
}

let arr = ['a', 's', 'd', 'f'];
let data = purePop(arr);

console.log(arr);  // [ 'a', 's', 'd', 'f' ]
console.log(data);  //[ 'a' ]