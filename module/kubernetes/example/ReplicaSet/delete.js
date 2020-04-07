const Client = require('./node_modules/kubernetes-client').Client
async function main () {
  try {
    const client = new Client({ version: '1.13' });
    const deployment = await client.apis.apps.v1.namespaces("default").replicasets("nginx-deployment-7c69c4d9bb").delete();
    console.dir(deployment, {depth: null, colors: true})
    } catch (err) {
    console.error('Error: ', err)
  }
}

main()