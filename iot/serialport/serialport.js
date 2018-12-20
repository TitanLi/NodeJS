//Docker control device
//sudo docker run -tid --device=/dev/ttyACM0 node bash
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyACM0');
const parser = new Readline();
let writeData = 1;
port.pipe(parser);
// parser.on('data', console.log);
port.on('open', function () {
    console.log('port open')
    parser.on('data', function (data) {
        console.log(data);
    });
    setInterval(()=>{
        port.write(writeData.toString());
        writeData++;
    },3000);
});