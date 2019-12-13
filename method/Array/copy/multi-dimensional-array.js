let currentArray = [[1], [2], [3], [4], [5], [6]];
// 複製二維陣列至新的記憶體位置
let newArray = currentArray.map(function (arr) {
    return arr.slice();
});
console.log(newArray);

// 複製三維陣列至新的記憶體位置
const arrayCopy = function (currentArray) {
    let newArray = currentArray.map(function (arr1) {
        let newArray1 = arr1.map(function (arr2) {
            return arr2.slice()
        });
        return newArray1;
    });
    return newArray;
}

// 複製多維陣列(Good)
const deepCopy = (arr) => {
    let copy = [];
    arr.forEach(elem => {
        if (Array.isArray(elem)) {
            copy.push(deepCopy(elem))
        } else {
            if (typeof elem === 'object') {
                copy.push(deepCopyObject(elem))
            } else {
                copy.push(elem)
            }
        }
    })
    return copy;
}
// Helper function to deal with Objects
const deepCopyObject = (obj) => {
    let tempObj = {};
    for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            tempObj[key] = deepCopy(value);
        } else {
            if (typeof value === 'object') {
                tempObj[key] = deepCopyObject(value);
            } else {
                tempObj[key] = value
            }
        }
    }
    return tempObj;
}
const array1 = [
    1,
    2,
    [6, 7, 8],
    'foo',
    ['bar', [9, 10], 11],
    12,
    13
];
const array2 = deepCopy(array1);
// now array2 has a separate copy of array1
console.log(`array2 => ${JSON.stringify(array2)}`);
//   array2 => [1,2,[6,7,8],"foo",["bar",[9,10],11],12,13]
array1[1] = 3;
array1[2][0] = 16;
array1[4][1][0] = 10;
console.log(`array1 => ${JSON.stringify(array1)}`);
//   array1 => [1,3,[16,7,8],"foo",["bar",[10,10],11],12,13]
console.log(`array2 => ${JSON.stringify(array2)}`);
//   array2 => [1,2,[6,7,8],"foo",["bar",[9,10],11],12,13]