// The splice method can be used to add or remove elements from an array
var arr = [1, 2, 3, 4, 5, 6];
var removed = arr.splice(2,2);
console.log(removed); // return [ 3, 4 ]
console.log(arr); // return [ 1, 2, 5, 6 ]