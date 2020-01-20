const Client = require('kubernetes-client').Client
async function main() {
    const client = new Client({ version: '1.13' });
    /*
        Namespaces
    */
    // Get Kubernetes namespaces
    const namespaces = await client.api.v1.namespaces.get();
    console.log(JSON.stringify(namespaces, null, 4));
    /* 
        Deployment
    */
    // Create Deployment 
    const deployDeployment = require('./demo-data/deployment.json');
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deployDeployment });
    console.log(JSON.stringify(create, null, 4));
    // Patch Deployment new image
    const newImage = {
        "spec": {
            "template": {
                "spec": {
                    "containers": [
                        {
                            "name": "nginx",
                            "image": "nginx:latest"
                        }
                    ]
                }

            }
        }
    };
    const patchDeploymentNewImage = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').patch({ body: newImage });
    console.log(JSON.stringify(patchDeploymentNewImage, null, 4));
    // Patch Deployment new replica
    const newReplica = {
        "spec": {
            "replicas": 10
        }
    }
    const patchDeploymentNewReplica = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').patch({ body: newReplica });
    console.log(JSON.stringify(patchDeploymentNewReplica, null, 4));
    // Get Deployment
    const getDeployment = await client.apis.apps.v1.namespaces('default').deployments.get();
    console.log(JSON.stringify(getDeployment, null, 4));
    // Get Deployment by name
    const getDeploymentByName = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').get();
    console.log(JSON.stringify(getDeploymentByName, null, 4));
    // Delete Deployment by name
    const deleteDeploymentByName = await client.apis.apps.v1.namespaces('default').deployments('nginx-deployment').delete();
    console.log(JSON.stringify(deleteDeploymentByName, null, 4));
}

main()