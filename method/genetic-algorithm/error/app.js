const GA = require('./GA.js');

const ga = new GA([2, 2, 3, 4, 5, 6, 6]);

const VNF_GA = async function (callback) {
    let cacheData;
    let initGen = await ga.init();
    let initScoreGen = await ga.initScore(initGen);
    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            cacheData = ga.arrayCopy(initScoreGen);
            let copulation = await ga.copulation(cacheData);
            cacheData = copulation;
        } else {
            let copulation = await ga.copulation(cacheData);
            cacheData = copulation;
        }

        // cacheData = copulation;
        console.log(i);
        console.log(cacheData.sort());
    }
    callback(ga.arrayCopy(cacheData));
}

VNF_GA((data) => {
    console.log("Result");
    // console.log(data.sort());
});