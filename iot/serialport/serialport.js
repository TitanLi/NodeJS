const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/tty.usbmodem141301');
const parser = new Readline();

port.pipe(parser);
// parser.on('data', console.log);
port.on('open', function () {
    console.log('port open')
    parser.on('data', function (data) {
        console.log(data);
    });
});