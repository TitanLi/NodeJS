var arr = [5, 9, 1, 3, 2, 6];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 5, 6, 9 ]

arr.sort((a, b) => {
    return a - b;
});
console.log(arr);
// [ 1, 2, 3, 5, 6, 9 ]

arr.sort((a, b) => {
    return b - a;
});
console.log(arr);
// [ 9, 6, 5, 3, 2, 1 ]