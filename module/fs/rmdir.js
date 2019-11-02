const fs = require('fs');

fs.rmdir('demo',(err) => {
    if(err){
        console.log('rmdir error');
    }else{
        console.log('successfully delete the folder');
    }
});