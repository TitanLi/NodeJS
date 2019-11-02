const fs = require('fs');

fs.readdir('.',(err,data) => {
    err ? err : console.log(data)
});