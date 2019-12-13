function fun1(args, callback){
    console.log("fun1");
    callback(args);
}

function fun2(params) {
    console.log(`fun2 ${params}`);
}

fun1('apple',fun2);