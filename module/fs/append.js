const fs = require('fs');

fs.appendFile('rename.txt','Hello',(err) => {
    if(err){
        console.log('append error');
    }else{
        console.log('append successfully');
    }
});