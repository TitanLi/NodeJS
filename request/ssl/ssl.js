//Ignore invalid self-signed ssl certificate in node.js with https.request
//https://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
const rp = require('request-promise').defaults({ rejectUnauthorized: false });;
const data = require('./data.js');
let status = true;

const optionsAuth = {
    method: 'POST',
    uri: 'https://20.6.10.1/rest/login-sessions',
    headers: {
        'x-api-version': '800',
        'content-type': 'application/json'
    },
    body: data.auth,
    json: true
};

const optionsCreateDocker = {
    method: 'POST',
    uri: 'https://20.6.10.1/rest/server-profiles',
    qs: { force: 'ignoreServerHealth' },
    headers: {
        'x-api-version': '800',
        auth: 'MTYyOTc2MDMzMTM1gAb4NBjduWUj-PPj8frmGN7V4_NPap3T',
        'content-type': 'application/json'
    },
    body: data.create,
    json: true
};

const bay8_docker = async function () {
    let replicasData = await rp('http://20.6.0.111:4243/services')
        .catch(function (err) {
            console.log(err);
        });
    let replicas = JSON.parse(replicasData)[0].Spec.Mode.Replicated.Replicas;
    console.log(replicas);
    if (replicas >= 120) {
        if (status) {
            status = false;
            let authData = await rp(optionsAuth)
                .catch(function (err) {
                    status = true;
                    console.log(err);
                });
            let sessionID = authData.sessionID;
            console.log(sessionID);
            optionsCreateDocker.headers.auth = sessionID;
            let createDockerData = await rp(optionsCreateDocker)
                .catch(function (err) {
                    status = true;
                    console.log(err);
                });
            console.log(createDockerData);
        } else {
            console.log(status, 'pass');
        }
    } else {
        console.log(`pass ${replicas}`);
        status = true;
        console.log(status, 'pass');
    }
}

setInterval(bay8_docker, 3000);

