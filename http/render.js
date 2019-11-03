const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) => {
    if(req.url == '/html'){
        const readStream = fs.createReadStream('./demo/demo.html');
        res.writeHead(200,{'Content-type':'text/html'});
        readStream.pipe(res);
    }else if(req.url == '/json'){
        const readStream = fs.createReadStream('./demo/demo.json');
        res.writeHead(200,{'Content-type':'application/json'});
        readStream.pipe(res);
    }else if(req.url == '/png'){
        const readStream = fs.createReadStream('./demo/demo.png');
        res.writeHead(200,{'Content-type':'image/png'});
        readStream.pipe(res);
    }
});

server.listen(3000);