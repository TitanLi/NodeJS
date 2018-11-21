const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;
const dotenv = require('dotenv').load();

const connectionString = `HostName=${process.env.HostName};DeviceId=${process.env.DeviceId};SharedAccessKey=${process.env.SharedAccessKey};`;

console.log(connectionString);
var client = Client.fromConnectionString(connectionString, Protocol);

function sendTelemetry() {
    var data = JSON.stringify({
        temperature: 'temperature'
    });
    var message = new Message(data);
    client.sendEvent(message, (err, res) => console.log(`Sent message: ${message.getData()}` +
        (err ? `; error: ${err.toString()}` : '') +
        (res ? `; status: ${res.constructor.name}` : '')));
}

var connectCallback = function (err) {
    if (err) {
        console.error('Could not connect: ' + err);
    } else {
        console.log('Client connected');
        // Send telemetry measurements to Azure IoT Central every 1 second.
        setInterval(sendTelemetry, 1000);
        // client.sendEvent(message, function (err) {
        //     if (err) console.log(err.toString());
        // });

        client.on('message', function (msg) {
            console.log(msg);
            client.complete(msg, function () {
                console.log('completed');
            });
        });
    }
};

client.open(connectCallback);