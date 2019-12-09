class MQTT {
    constructor() {

    }

    push(asd) {
        let a = asd.slice();
        let b = asd.slice();
        a[0] = 0;
        console.log(a,b);
        return 'ok';
    }
}

module.exports = MQTT;