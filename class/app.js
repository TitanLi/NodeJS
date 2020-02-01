const MQTT = require('./classDemo.js');
const mqtt = new MQTT('127.0.0.1:1883');

setInterval(() => {
    mqtt.push();
    console.log(mqtt.firstClassData);
    // 127.0.0.1:1883
    mqtt.firstClassData = 100;
    // setter: 100
}, 3000);

const GS = require('./getter-setter.js');
const gs1 = new GS('name','Titan',true);
const gs2 = new GS('name','Titan',true);
console.log(gs1._name);
gs1._name = 'Apple';
console.log(gs1._name);
console.log(gs2._name);

console.log(gs1._color);
// 使用getter function
console.log(gs1.color);
// 使用setter function
gs1.color = 'red';
console.log(gs1._color);

const Student = require('./static.js');
const student1 = new Student('a');
console.log(Student.numOfStudents);
const student2 = new Student('b');
console.log(Student.numOfStudents);
