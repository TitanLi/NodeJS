const Client = require('ssh2').Client;
const conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.exec("echo 'apple' > /home/ubuntu/apple.txt", function(err, stream) {
    if (err) throw err;
    stream.on('close', function(code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '192.168.2.94',
  port: 22,
  username: 'ubuntu',
  privateKey: require('fs').readFileSync('/Users/liwensheng/.ssh/id_rsa')
});