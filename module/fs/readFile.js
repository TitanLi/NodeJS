const fs = require('fs');

fs.readFile('demo.txt','utf-8',(err,data) => {
    if(err){
        console.log('read file error');
    }else{
        console.log(data);
    }
});