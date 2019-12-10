const GA = require('./GA.js');

const ga = new GA([2, 6, 4, 3, 5, 2, 6]);

const VNF_GA = async function (callback) {
    let copulation, copulationScoreGen, copulationgaBetterScoreGen;
    let cacheData;
    let initGen = await ga.init();
    let initScoreGen = await ga.score(initGen);
    cacheData = ga.arrayCopy(initScoreGen);
    for (let i = 1; i < 4; i++) {
        if (i % 2 == 0) {
            copulation = await ga.copulation(cacheData);
            copulationScoreGen = await ga.score(copulation);
            cacheData = ga.arrayCopy(copulationScoreGen);
        } else {
            copulation = await ga.copulation(cacheData);
            copulationScoreGen = await ga.score(copulation);
            copulationgaBetterScoreGen = await ga.betterGenes(cacheData, copulationScoreGen);
            cacheData = ga.arrayCopy(copulationgaBetterScoreGen);
        }
        console.log(cacheData.sort());
        console.log(i);
    }
    callback(ga.arrayCopy(cacheData));
}

VNF_GA((data)=>{
    console.log(data);
});