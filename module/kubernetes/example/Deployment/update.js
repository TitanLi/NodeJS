const Client = require('./node_modules/kubernetes-client').Client
async function main() {
    try {
        const client = new Client({ version: '1.13' });
        const nodeSelector = {
            spec: {
                template: {
                    spec: {
                        nodeSelector: {
                            node: "titan4"
                        }
                    }
                }
            }
        }
        const namespaces = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').patch({ body: nodeSelector });
        console.log('Namespaces: ', JSON.stringify(namespaces));
    } catch (err) {
        console.error('Error: ', err)
    }
}

main()