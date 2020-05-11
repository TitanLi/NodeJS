const { threeDimensionalArraySortByFirstElement } = require('../lib/array.js');
const GA = require('./placement.js');
const compute = [
    [2, 4],
    [4, 4],
    [4, 8],
    [4, 6],
    [6, 12],
    [8, 8],
    [10, 20],
    [12, 36]
];

const vnf = [
    [2, 2],
    [2, 3],
    [4, 4],
    [4, 6],
    [5, 5]
];
const initPopulationSize = 10;
const ga = new GA(compute, vnf, initPopulationSize);

async function test() {
    // 產生初始化基因池
    let initPopulationResult = ga.initPopulation();
    let populationScore = ga.getScore(initPopulationResult);
    console.log('初始化基因');
    console.log(populationScore.sort(threeDimensionalArraySortByFirstElement));
    // populationScore[9] = [[ 27.04 ], [], [], [], [], [], [ 2, 5 ], [], [ 3, 4, 1 ]] ;
    // console.log(populationScore[9]);
    for (let i = 0; i < 100000; i++) {
        copulationResult = ga.copulation(populationScore);
        if (copulationResult) {
            populationScore = copulationResult;
        } else {
            i--;
        }
        // 變異
        if (Math.floor(Math.random() * 100) < 10) {
            mutationResult = ga.mutation(populationScore);
            if (mutationResult) {
                populationScore = mutationResult;
            } else {
                i--;
            }
        }
    }
    console.log(copulationResult.sort(threeDimensionalArraySortByFirstElement));
}

test();