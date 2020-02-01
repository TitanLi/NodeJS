// slice
// pureDelete
function pureDelete(aArray, index) {
    return aArray.slice(0, index).concat(aArray.slice(index + 1));
}

let arr = ['a', 's', 'd', 'f', 'g', 'h'];
let result = pureDelete(arr, 4);

console.log(arr);     // [ 'a', 's', 'd', 'f', 'g', 'h' ]
console.log(result);  // [ 'a', 's', 'd', 'f', 'h' ]

// filter
// pureDeleteByValue
function pureDeleteByValue(aArray,value){
    return aArray.filter(function(v){
        return v !== value;
    });
}

arr = ['a', 's', 'd', 'f', 'g', 'h'];
result = pureDeleteByValue(arr, 'g');

console.log(arr);     // [ 'a', 's', 'd', 'f', 'g', 'h' ]
console.log(result);  // [ 'a', 's', 'd', 'f', 'h' ]

// filter
// pureDeleteByIndex
function pureDeleteByIndex(aArray,index){
    return aArray.filter(function(v,i){
        return i !== index;
    });
}

arr = ['a', 's', 'd', 'f', 'g', 'h'];
result = pureDeleteByIndex(arr, 4);

console.log(arr);     // [ 'a', 's', 'd', 'f', 'g', 'h' ]
console.log(result);  // [ 'a', 's', 'd', 'f', 'h' ]