const fs = require('fs');
const zlib = require('zlib');
const gunzip = zlib.createGunzip();

let readStream = fs.createReadStream('demo.js.gz');
let writeStream = fs.createWriteStream('demo.js');

readStream.pipe(gunzip).pipe(writeStream);