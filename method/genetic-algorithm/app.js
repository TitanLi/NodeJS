const GA = require('./GA.js');

const ga = new GA([2,6,4,3,5,2,6]);

let initGen = ga.init();
let initScoreGen = ga.score(initGen);
// console.log(initScoreGen);
let copulation = ga.copulation([ [ 7.38, [], [], [ 2 ], [], [ 3 ], [ 2 ], [ 5 ], [], [ 4, 6 ], [ 6 ] ],
    [ 8.17, [], [ 3 ], [], [ 4 ], [], [ 6 ], [ 2, 2 ], [ 6 ], [], [ 5 ] ] ]);
// console.log(copulation);
// let copulationScoreGen = ga.score(copulation);
// console.log(initScoreGen);
// console.log(copulationScoreGen);
