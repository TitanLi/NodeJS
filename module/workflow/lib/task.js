const { exec } = require('child_process');
const wol = require('wol');
const Ping = require('ping');

const shell = (data) => {
    return new Promise(resolve => {
        exec(data, (err, stdout, stderr) => {
            if (err) {
                //some err occurred
                console.error(err)
                resolve("on_error");
            } else {
                // the *entire* stdout and stderr (buffered)
                if (stdout != "") console.log(`stdout: ${stdout}`);
                if (stderr != "") console.log(`stderr: ${stderr}`);
                setTimeout(() => {
                    resolve("on_success");
                }, 3000);
            }
        });
    });
}

const wakeOnLan = (MAC) => {
    return new Promise((resolve, reject) => {
        wol.wake(MAC, function (err, res) {
            if (!err) {
                resolve("on_success");
            } else {
                reject("on_error");
            }
        });
    });
}

const ping = (data) => {
    return Ping.promise.probe(data)
        .then(function (res) {
            // console.log(res.output);
            if(res.avg == "unknown"){
                return "on_error";
            }else{
                return "on_success";
            }
        });
}

module.exports = {
    shell: shell,
    wakeOnLan: wakeOnLan,
    ping: ping
}