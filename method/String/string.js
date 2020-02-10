// 刪除空白
let data1 = '   apple   ';
console.log(data1.trim()); // apple

// 取代字串
let data2 = 'aa:bb:cc:dd:ee:ff:gg';
console.log(data2.replace(':',''));   // aabb:cc:dd:ee:ff:gg
console.log(data2.replace(/:/g,''));  // aabbccddeeffgg