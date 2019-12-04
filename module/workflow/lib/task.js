const { exec } = require('child_process');

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

module.exports = {
    shell: shell
}