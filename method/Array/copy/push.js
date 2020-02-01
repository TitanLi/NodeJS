function purePush(aArray, newEntry) {
    return [...aArray, newEntry];
}

let arr1 = [1, 2, 3, 4];
let arr2 = [5, 6, 7];
let newArray = purePush(arr1, arr2);

console.log(arr1);     // [ 1, 2, 3, 4 ]
console.log(arr2);     // [ 5, 6, 7 ]
console.log(newArray); // [ 1, 2, 3, 4, [ 5, 6, 7 ] ]