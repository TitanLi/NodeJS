const mqtt = require('mqtt');
const deviceId = process.env.DeviceId;
const iotHubName = process.env.iotHubName;
const userName = `${iotHubName}.azure-devices.net/${deviceId}/api-version=2016-11-14`;
const iotHubTopic = `devices/${deviceId}/messages/events/`;

var client = mqtt.connect(`mqtts://${iotHubName}.azure-devices.net:8883`, {
    keepalive: 10,
    clientId: deviceId,
    protocolId: 'MQTT',
    clean: false,
    protocolVersion: 4,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    username: userName,
    password: process.env.password,
    rejectUnauthorized: false,
});

client.on('connect', function () {
    console.log('connect');
    client.subscribe(iotHubTopic, function (err) {
        if (!err) {
            // client.publish('presence', 'Hello mqtt')
        }
    })
});

setInterval(() => {
    client.publish(iotHubTopic, "It works!");
}, 3000);