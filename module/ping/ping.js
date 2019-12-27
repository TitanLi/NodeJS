const ping = require('ping');
 
const hosts = ['192.168.2.97', 'google.com', 'yahoo.com'];
 
hosts.forEach(function (host) {
    ping.promise.probe(host)
        .then(function (res) {
            console.log(res);
        });
});