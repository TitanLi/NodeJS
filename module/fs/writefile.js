const fs = require('fs');

fs.writeFile('demo.txt','Hello Titan',(err) => {
    if(err){
        console.log('write file error');
    }else{
        console.log('file successfully created');
    }
});