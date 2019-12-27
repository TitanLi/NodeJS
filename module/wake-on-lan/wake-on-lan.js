// 1. First, install ethtool:
// $ sudo apt install ethtool
// 2. For testing and temporarily enabling WoL: 
// $ sudo ethtool -s eth0 wol g

const wol = require('wol');
 
wol.wake('a0:48:1c:a0:6f:29', function(err, res){
  console.log(res);
});