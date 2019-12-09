const GA = require('./GA.js');

const ga = new GA([2,6,4,3,5,2,6]);

let initGen = ga.init();
let initScoreGen = ga.score(initGen);
// console.log(initScoreGen);
let copulation = ga.copulation(initScoreGen);
// console.log(copulation);
// let copulationScoreGen = ga.score(copulation);
// console.log(initScoreGen);
// console.log(copulationScoreGen);
