// Method 1
let data = [1, 2, 3, 4, 5, 6, 7];

data = data.filter(item => item !== 7);

console.log(data)

// Method 2
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

let emp = ['abs', 'dsf', 'sdf', 'fd'];
emp.remove('fd');
console.log(emp);