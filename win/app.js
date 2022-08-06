const rp = require('request-promise').defaults({ rejectUnauthorized: false });
const dateFormat = require('dateformat');
const cement = require('./list/cement.json');

let keys = Object.keys(cement);
console.log(keys);

let date = dateFormat(new Date(), "yyyy/m/d");

const getValue = async function (current_date,stock_id) {
    let replicasData = await rp('https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_'+stock_id+'.tw&json=1&delay=0')
        .catch(function (err) {
            console.log(err);
        });
    console.log(replicasData);
}

for (const key in keys) {
    console.log(keys[key]);
    getValue('2021/11/3',key);
}

