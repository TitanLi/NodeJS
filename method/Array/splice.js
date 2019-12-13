// The splice method can be used to add or remove elements from an array
var arr = [1, 2, 3, 4, 5, 6];
var removed = arr.splice(2,2);
console.log(removed); // return [ 3, 4 ]
console.log(arr); // return [ 1, 2, 5, 6 ]

// array.splice(start, deleteCount, item1, item2, ...)
var myFish1 = ['angel', 'clown', 'drum', 'sturgeon'];
var removed1 = myFish1.splice(2, 1, 'trumpet');
console.log(myFish1);
// myFish1 is ["angel", "clown", "trumpet", "sturgeon"]
console.log(removed1);
// removed1 is ["drum"]

var myFish2 = ['angel', 'clown', 'drum', 'sturgeon'];
var removed2 = myFish2.splice(-2, 2, 'trumpet');
console.log(myFish2);
// myFish2 is ["angel", "clown", "trumpet"]
console.log(removed2);
// removed2 is ["drum", "sturgeon"]