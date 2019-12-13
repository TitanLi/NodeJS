// 複製二維陣列至新的記憶體位置
let newArray = currentArray.map(function(arr) {
    return arr.slice();
});

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