const Client = require('./node_modules/kubernetes-client').Client
async function main() {
    try {
        const client = new Client({ version: '1.13' });
        const nodeLable = {
            "spec": {
                "taints": [
                    {
                        "key": "key",
                        "value": "value",
                        "effect": "NoSchedule"
                    }
                ]
            }
        }
        const deployment = await client.api.v1.nodes("titan5").patch({ body: nodeLable });
        console.dir(deployment, { depth: null, colors: true })
    } catch (err) {
        console.error('Error: ', err)
    }
}

main()