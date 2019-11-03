const http = require('http');
const server = http.createServer((req,res) => {
    res.write('Hello world from NodeJS');
    res.end();
});

server.listen(3000);