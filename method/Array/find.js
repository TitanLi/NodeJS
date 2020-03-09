let telegramData = ['vcpu', 'ram', 'disk', 'switch', 'sdnSwitch', 'pc', 'server'];
let findKey = 'vcpu';
if (telegramData.find(e => e == findKey) != undefined) {
    console.log('have found out');
}else{
    console.log('did not find');
}