const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('hello',(data) => {
    console.log(`hello ${data}`);
});

eventEmitter.emit('hello','Titan');