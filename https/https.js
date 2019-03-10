const fs = require('fs');
const https = require('https');

const options = {
    key:fs.readFileSync('server-key.pem'),       //載入公開金鑰
    cert:fs.readFileSync('server-cert.pem'),     //載入私密金鑰
    // ca:[fs.readFileSync('client-cert.pem')]   //載入伺服器憑證
}

const server = https.createServer(options,function(req,res){
    let authorized = req.socket.authorized ? 'authorized' : 'unauthorized';
    console.log(authorized);
    res.writeHead(200);
    res.write('Welcome');
    res.end();
});

server.listen(3001);