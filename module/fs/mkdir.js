const fs = require('fs');

fs.mkdir('demo',(err) => {
    if(err){
        console.log('mkdir error');
    }else{
        console.log('folder successfully created');
    }
})