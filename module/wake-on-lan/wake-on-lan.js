const wol = require('wol');
 
wol.wake('a0:48:1c:a0:6f:29', function(err, res){
  console.log(res);
});