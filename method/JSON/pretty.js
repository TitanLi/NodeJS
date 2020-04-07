const jsonString = `{"name":"John","color":"green",
                     "smoker":false,"id":7,"city":"Berlin"}`
const object = JSON.parse(jsonString)

console.dir(object, {depth: null, colors: true})
