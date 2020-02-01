function pureReverse(aArray){
    return [...aArray].reverse();
}

let arr = [1, 2, 4, 3, 7, 5, 6];
let result = pureReverse(arr);

console.log(arr);     // [ 1, 2, 4, 3, 7, 5, 6 ]
console.log(result);  // [ 6, 5, 7, 3, 4, 2, 1 ]