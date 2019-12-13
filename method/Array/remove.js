// 移除全部符合條件的元素
// Method 1
let data = [1, 2, 3, 4, 5, 6, 7, 7];
data = data.filter(item => item !== 7);
console.log(data) // return [ 1, 2, 3, 4, 5, 6 ]
// Method 2
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 0];
var filtered = array.filter(function(value, index, arr){
    return value > 5;
});
console.log(filtered); // return [6, 7, 8, 9]
console.log(array); // return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

// 僅移除一個符合條件的元素
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

let emp = ['abs', 'dsf', 'sdf', 'fd', 'fd'];
emp.remove('fd');
console.log(emp); // return [ 'abs', 'dsf', 'sdf', 'fd' ]