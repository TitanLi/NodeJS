// splice會改變原本陣列
function spliceFun(arr){
    return arr.splice(0,3);
}

// slice會回傳新的陣列
function sliceFun(arr){
    return arr.slice(0,3);
}

let arr1 = [1,2,3,4,5,6,7];
let arr2 = [1,2,3,4,5,6,7];

console.log(spliceFun(arr1),arr1);  // [ 1, 2, 3 ] [ 4, 5, 6, 7 ]

console.log(sliceFun(arr2),arr2);  // [ 1, 2, 3 ] [ 1, 2, 3, 4, 5, 6, 7 ]