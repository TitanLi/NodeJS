const compute = [2, 4, 4, 4, 6, 8, 8, 8, 10, 12];
const vnf = [2, 2, 3, 4, 5, 6, 6];
const initGenSize = 2;
let initGen = new Array(initGenSize);

// 在基因大小中新增計算節點維度
for (let i = 0; i < initGen.length; i++) {
    // 新增計算維度
    initGen[i] = new Array(compute.length + 1);
    initGen[i][0] = [null];
    // 在計算節點中新增放置空間
    for (let j = 1; j <= compute.length; j++) {
        // 新增維度
        initGen[i][j] = new Array(0);
    }
}

// 複製三維陣列至新的記憶體位置
const arrayCopy = function (currentArray) {
    let newArray = currentArray.map(function (arr1) {
        let newArray1 = arr1.map(function (arr2) {
            return arr2.slice()
        });
        return newArray1;
    });
    return newArray;
}

// 陣列總和
const sumData = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    };
    return sum;
}

// 解決javascript float問題
// 0.1 + 0.2 = 0.30000000000000004
const strip = function (num, precision = 12) {
    return +parseFloat(num.toPrecision(precision));
}

// 產生初始化基因池
const init = function () {
    return new Promise((resolve, reject) => {
        // 基因數量大小
        for (let i = 0; i < initGenSize; i++) {
            let initCompute = compute.slice();
            let initVNF = vnf.slice();
            // 產生基因
            while (initVNF.length != 0) {
                // 隨機選擇
                let computeCompute = Math.floor(Math.random() * initCompute.length);
                let vnfCount = Math.floor(Math.random() * initVNF.length);
                // 確認選擇到的物品是否可放入計算節點
                if (initCompute[computeCompute] >= initVNF[vnfCount]) {
                    // 將資料放入相對應位子當作初始化基因
                    initGen[i][computeCompute + 1].push(initVNF[vnfCount]);
                    // 更新計算節點剩餘資源
                    initCompute[computeCompute] = initCompute[computeCompute] - initVNF[vnfCount];
                    // 將目標物體移出
                    let index = initVNF.indexOf(initVNF[vnfCount]);
                    if (index > -1) {
                        initVNF.splice(index, 1);
                    }
                }
            }
        }
        resolve(arrayCopy(initGen));
    });
}

// 為初始化基因給予評分
const initScore = function (data) {
    return new Promise((resolve, reject) => {
        let initScoreResult = arrayCopy(data);
        for (let i = 0; i < initScoreResult.length; i++) {
            let genScore = 0;
            let runNode = 0;
            for (let j = 1; j <= compute.length; j++) {
                if (initScoreResult[i][j].length > 0) {
                    genScore = genScore + (sumData(initScoreResult[i][j]) / compute[j - 1]);
                    runNode = runNode + 1;
                }
            }
            let usageRate = compute.length - runNode
            initScoreResult[i][0] = [strip(Number(genScore.toFixed(2)) + usageRate)];
        }
        resolve(initScoreResult);
    });
}

// 待確認
const copulation = function (data) {
    return new Promise((resolve, reject) => {
        let copulation_Data = arrayCopy(data);
        for (let i = 0; i < copulation_Data.length; i++) {
            // 用於比較輸出結果是否有超過Compute能力
            let [...initCompute] = compute;
        }
        resolve(copulation_Data);
    });
}

async function test() {
    let initResult = await init();
    let initScoreGen = await initScore(initResult);
    let cache_Data;
    for (let i = 0; i < 100; i++) {
        if (i == 0) {
            let initCopulationResult = await copulation(initScoreGen);
            cache_Data = arrayCopy(initCopulationResult);
        }
        let copulationResult = await copulation(cache_Data);
        cache_Data = arrayCopy(copulationResult);
    }
    initGen[0][0][0] = 123;
    cache_Data[1][0][0] = 456;
    console.log(initResult);
    console.log(initScoreGen);
    console.log(cache_Data);
    console.log(initGen);
}

test();