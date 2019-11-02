const mqtt = require('mqtt');
class MQTT {
    constructor(IP) {
        this.ip = IP;
        this.client = mqtt.connect(`mqtt://${IP}`);
        this.client.on('connect', () => {
            console.log('MQTT connect');
            this.client.subscribe('message');
        });
    }

    get firstClassData(){
        return this.ip;
    }

    set firstClassData(value) {
        console.log('setter: '+ value);
    }

    push() {
        this.client.publish('hello', 'world');
        console.log('Publish hello world');
        return 'ok';
    }
}

module.exports = MQTT;