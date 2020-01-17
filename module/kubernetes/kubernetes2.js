const Client = require('kubernetes-client').Client
async function main () {
  try {
    const client = new Client({ version: '1.13' });
    const replica = {
      spec: {
        replicas: 10
      }
    }
    const namespaces = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').patch({ body:replica });
    console.log('Namespaces: ', JSON.stringify(namespaces));
    } catch (err) {
    console.error('Error: ', err)
  }
}

main()