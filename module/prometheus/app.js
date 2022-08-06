const query = require('./query.js');
const axios = require('axios');

async function main(){
    // let data = await axios.get(`http://192.168.2.94:9090/api/v1/query?query=${query.cpu.pod_resource_requests_cpu_cores('prometheus-prometheus-operator-158562-prometheus-0')}`);
    let data = await axios.get(`http://192.168.2.94:9090/api/v1/query?query=${query.cluster.node_memory_MemAvailable_bytes()}`);
    console.dir(data.data, {depth: null, colors: true});
}

main();