const sayHello = (name) => {
    console.log(`Hello ${name}`);
}

class firstClass{
    constructor(x){
        console.log('create object');
        this.x = x;
    }

    get firstClassData(){
        return this.x;
    }

    set firstClassData(value) {
        console.log('setter: '+value);
    }

    plus(){
        this.x ++
        return this.x;
    }

    less(){
        this.x --
        return this.x;
    }
}

// module.exports.sayHello = sayHello;
// module.exports.firstClass = firstClass;

module.exports = {
    sayHello : sayHello,
    firstClass : firstClass
}