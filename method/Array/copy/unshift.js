function pureShift(aArray,newEntry){
    return [newEntry,...aArray];
}

let arr1 = ['a', 's', 'd', 'f'];
let arrData = 'y';
let result = pureShift(arr1,arrData);

console.log(arr1);    // [ 'a', 's', 'd', 'f' ]
console.log(result);  // [ 'y', 'a', 's', 'd', 'f' ]