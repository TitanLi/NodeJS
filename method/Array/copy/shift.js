function pureShift(aArray){
    return aArray.slice(1);
}

let arr = ['a', 's', 'd', 'f'];
let data = pureShift(arr);

console.log(arr);  // [ 'a', 's', 'd', 'f' ]
console.log(data); // [ 's', 'd', 'f' ]