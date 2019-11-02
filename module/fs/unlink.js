const fs = require('fs');

fs.unlink('demo.txt',(err) => {
    if(err){
        console.log('delete file error');
    }else{
        console.log('delete file successfully');
    }
});