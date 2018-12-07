const MQTT = require('./classDemo.js');

const mqtt = new MQTT('127.0.0.1:1883');

setInterval(() => {
    mqtt.push();
}, 3000);
