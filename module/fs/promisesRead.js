const fsPromises = require('fs').promises;

// 讀取檔案
const readFile = async () => {
    data = await fsPromises.readFile('./data.json');
    console.log(JSON.parse(data));
}
readFile()