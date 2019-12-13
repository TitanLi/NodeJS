// Method 1
(function () {
    var args = Array.from(arguments);
    console.log(args);
    // [ 1, 2, 3 ]
    return args;
})(1, 2, 3); 

// Method 2
let arrayFrom = Array.from(new Set(["foo", "window"]));
console.log(arrayFrom);
// [ 'foo', 'window' ]

// Method 3
let m = new Map([[1, 2], [2, 4], [4, 8]]);

let arrayFromMap = Array.from(m);

console.log(arrayFromMap);
// [ [ 1, 2 ], [ 2, 4 ], [ 4, 8 ] ]