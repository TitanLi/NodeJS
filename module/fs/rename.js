const fs = require('fs');

fs.rename('demo.txt','rename.txt',(err) => {
    if(err){
        console.log('rename error');
    }else{
        console.log('rename successfully');
    }
});