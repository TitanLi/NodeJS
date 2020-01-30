console.log(Object.prototype.toString.call([1,2,3,4]));  // [object Array]
console.log(Object.prototype.toString.call(new Date())); // [object Date]
console.log(Object.prototype.toString.call(/a-z/));      // [object RegExp]
console.log(Object.prototype.toString.call('Apple'));    // [object String]