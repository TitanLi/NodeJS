const EventEmitter = require('events');

class Person extends EventEmitter{
    constructor(apple){
        super();
        this._apple = apple;
    }
}

let person = new Person('apple');
person.on('helloExtends',(data) => {
    console.log(`hello ${data}`);
    console.log(`get value ${person._apple}`);
    console.log('class extends events successfully');
});

person.emit('helloExtends','Titan');
// hello Titan
// get value apple
// class extends events successfully