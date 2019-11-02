const MQTT = require('./classDemo.js');

const mqtt = new MQTT('127.0.0.1:1883');

setInterval(() => {
    mqtt.push();
    console.log(mqtt.firstClassData);
    // 127.0.0.1:1883
    mqtt.firstClassData = 100;
    // setter: 100
}, 3000);
