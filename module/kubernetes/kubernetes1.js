const Client = require('kubernetes-client').Client
async function main () {
  try {
    const client = new Client({ version: '1.13' });
    const namespaces = await client.api.v1.namespaces.get();
    console.log('Namespaces: ', JSON.stringify(namespaces));
    } catch (err) {
    console.error('Error: ', err)
  }
}

main()