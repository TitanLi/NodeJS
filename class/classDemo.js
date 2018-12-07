const mqtt = require('mqtt');
class MQTT {
    constructor(IP) {
        this.client = mqtt.connect(`mqtt://${IP}`);
        this.client.on('connect', () => {
            console.log('MQTT connect');
            this.client.subscribe('message');
        });
    }

    push() {
        this.client.publish('hello', 'world');
        console.log('Publish hello world');
        return 'ok';
    }
}

module.exports = MQTT;