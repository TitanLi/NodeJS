function sum(...numbers) {
    let result = 0;
    numbers.forEach((number) => {
        result += number;
    });
    console.log(result);
}

sum(1);  // 1
sum(1, 2, 3, 4);  // 10

function multi(x,...y){
    console.log('x :' , x);
    console.log('y :' , y);
}

multi(1);
// x : 1
// y : []
multi(1,2,3,4);
// x : 1
// y : [ 2, 3, 4 ]