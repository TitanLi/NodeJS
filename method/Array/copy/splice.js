function pureSplice(aArray, start, deleteCount, ...items) {
    return [...aArray.slice(0, start), ...items, ...aArray.slice(start + deleteCount)];
}

let arr1 = ['a', 's', 'd', 'f'];
let arr2 = ['a', 's'];
let result = pureSplice(arr1, 2, 2, arr2);
console.log(arr1);    // [ 'a', 's', 'd', 'f' ]
console.log(arr2);    // [ 'a', 's' ]
console.log(result);  // [ 'a', 's', [ 'a', 's' ] ]