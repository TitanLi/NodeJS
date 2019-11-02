const fs = require('fs');

let readStream = fs.createReadStream('promisesRead.js','utf-8');
let writeStream = fs.createWriteStream('demo.js','utf-8');

// readStream.on('data',(data) => {
//     writeStream.write(data);
// });

// 與上方功能相同 
readStream.pipe(writeStream);