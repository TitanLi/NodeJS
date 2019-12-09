const a = [1,2,3,4,5,6];

function asd(a){
    let b = a.slice(0);
let c = a.slice(0);

b[2] = 100;
console.log(b,c);
}

asd(a);