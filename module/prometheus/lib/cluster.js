/**
 * 取得Kubernetes Cluster中Node資訊
 * @return {data.result[].metric.node} 主機名稱
 * @return {data.result[].value[0]} 時間
 * @return {data.result[].value[1]} Pod數量
 */
const node_info = () => {
    return (`
        sum(\
            kube_pod_info{\
                cluster=""}\
            ) by (node)
    `)
}

/**
 * 取得Kubernetes Cluster中namespace資訊
 * @return {data.result[].metric.namespace:} namespace名稱
 * @return {data.result[].value[0]} 時間
 * @return {data.result[].value[1]} Pod數量
 */
const namespace_info = () => {
    return (`
        sum(\
            kube_pod_info{\
                cluster=""}\
            ) by (namespace)
    `)
}

/**
 * 取得Kubernetes Cluster中pod資訊
 * @return {data.result[].metric.namespace:} pod名稱
 * @return {data.result[].value[0]} 時間
 * @return {data.result[].value[1]} Pod數量
 */
const pod_info = () => {
    return (`
        sum(\
            kube_pod_info{\
                cluster=""}\
            ) by (node, pod)
    `)
}


module.exports = {
    node_info,
    namespace_info,
    pod_info
}