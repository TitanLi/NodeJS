// https://github.com/camsong/blog/issues/9
// 解決javascript float問題
// 0.1 + 0.2 = 0.30000000000000004
const strip = function (num, precision = 12) {
    return +parseFloat(num.toPrecision(precision));
}

let num = 0.1 + 0.2;
console.log(num);
num = strip(num);
console.log(num);