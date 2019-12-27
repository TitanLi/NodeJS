// 環境安裝：https://github.com/TitanLi/CloudNative/tree/master/ubuntu#wake-on-lan

const wol = require('wol');
 
wol.wake('a0:48:1c:a0:6f:29', function(err, res){
  console.log(res);
});