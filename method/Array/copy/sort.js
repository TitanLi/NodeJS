function pureSort(aArray, compareFunction) {
    return [...aArray].sort(compareFunction);
}

let arr = [1, 2, 4, 3, 7, 5, 6];
// 遞增排序
let ascend = (a, b) => a - b;
// 遞減排序
let descend = (a, b) => b - a;


let result = pureSort(arr, ascend);

console.log(arr);     // [ 1, 2, 4, 3, 7, 5, 6 ]
console.log(result);  // [ 1, 2, 3, 4, 5, 6, 7 ]