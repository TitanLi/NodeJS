const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();

let readStream = fs.createReadStream('promisesRead.js','utf-8');
let writeStream = fs.createWriteStream('demo.js.gz','utf-8');

readStream.pipe(gzip).pipe(writeStream);