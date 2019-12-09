class GA {
    constructor(vnf) {
        this.compute = [2, 4, 4, 4, 6, 8, 8, 8, 10, 12];
        this.vnf = vnf;
        // this.initGenSize = 2;
        this.initGenSize = this.vnf.length * this.compute.length
        this.initGen = new Array(this.initGenSize);
        // 在基因大小中新增計算節點維度
        for (let i = 0; i < this.initGen.length; i++) {
            // 新增計算維度
            this.initGen[i] = new Array(this.compute.length + 1);
            this.initGen[i][0] = null;
            // 在計算節點中新增放置空間
            for (let j = 1; j <= this.compute.length; j++) {
                // 新增維度
                this.initGen[i][j] = new Array(0);
            }
        }
        Array.prototype.indexOf = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };

        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }

    init() {
        // this.compute.sort(function (a, b) { return b - a });
        console.time("initTimeCost");
        // 基因數量大小
        for (let i = 0; i < this.initGenSize; i++) {
            let initCompute = this.compute.slice();
            let initVNF = this.vnf.slice();
            // 產生基因
            while (initVNF.length != 0) {
                // 隨機選擇
                let computeCompute = Math.floor(Math.random() * initCompute.length);
                let vnfCount = Math.floor(Math.random() * initVNF.length);
                // 確認選擇到的物品是否可放入計算節點
                if (initCompute[computeCompute] >= initVNF[vnfCount]) {
                    // 將資料放入相對應位子當作初始化基因
                    this.initGen[i][computeCompute + 1].push(initVNF[vnfCount]);
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
        // console.log(this.initGen);
        console.timeEnd("initTimeCost");
        return this.initGen;
    }

    score(initGen) {
        console.time("scoreTimeCost");
        for (let i = 0; i < initGen.length; i++) {
            let genScore = 0;
            let runNode = 0;
            for (let j = 1; j <= this.compute.length; j++) {
                if (initGen[i][j].length > 0) {
                    genScore = genScore + (this.sumData(initGen[i][j]) / this.compute[j - 1]);
                    runNode = runNode + 1;
                }
            }
            let usageRate = this.compute.length - runNode
            initGen[i][0] = this.strip(Number(genScore.toFixed(2)) + usageRate);
        }
        // console.log(initGen);
        // console.log(this.compute);
        console.timeEnd("scoreTimeCost");
        return initGen;
    }

    copulation(initGen) {
        console.time("copulationTimeCost");
        let copyInitGen = this.arrayCopy(initGen);
        let originInitGen = this.arrayCopy(initGen);
        // 基因數量大小
        for (let i = 0; i < copyInitGen.length; i++) {
            // 用於比較輸出結果是否有超過Compute能力
            let [...initCompute] = this.compute;
            if (i % 2 == 0) {
                console.log(`交換基因池中第${i}、${i + 1}個基因`);
                // 隨機選擇要交換的基因
                let copulationPoint = Math.floor(Math.random() * initCompute.length) + 1;
                console.log(`交換基因位子 : ${copulationPoint}`);
                // 基因交換暫存使用
                let cache = 0;
                // 交換基因使用
                let fatherGen = copyInitGen[i][copulationPoint];
                let motherGen = copyInitGen[i + 1][copulationPoint];
                // 保留初始基因
                let originFatherGen = fatherGen;
                let originMotherGen = motherGen;
                // 如果被選中的基因沒有東西將不做處理
                if (fatherGen.length > 0 | motherGen.length > 0) {
                    if (!this.arrayCompare(fatherGen, motherGen)) {
                        // 基因交換
                        cache = fatherGen.slice();
                        fatherGen = motherGen.slice();
                        motherGen = cache;
                        console.log(`originFatherGen : ${JSON.stringify(originFatherGen)} \t fatherGen : ${JSON.stringify(fatherGen)}`);
                        console.log(`originMotherGen : ${JSON.stringify(originMotherGen)} \t motherGen : ${JSON.stringify(motherGen)}`);
                        // 更新基因回基因池
                        copyInitGen[i][copulationPoint] = fatherGen;
                        copyInitGen[i + 1][copulationPoint] = motherGen;
                        // 過濾基因，用來處理交配後重複及缺少基因問題
                        // 父基因 => 1.需刪除deduplicationFatherGen重複基因 2.補上缺少基因deduplicationMotherGen
                        // 母基因 => 1.需刪除deduplicationMotherGen重複基因 2.補上缺少基因deduplicationFatherGen
                        let deduplicationFatherGen = this.arrayFilter(originMotherGen, originFatherGen);
                        let deduplicationMotherGen = this.arrayFilter(originFatherGen, originMotherGen);
                        console.log(`基因交換後父基因需刪除的重複基因 => ${JSON.stringify(deduplicationFatherGen)}`);
                        console.log(`基因交換後母基因需刪除的重複基因 => ${JSON.stringify(deduplicationMotherGen)}`);
                        // 處理deduplicationFatherGen
                        for (let j = 0; j < deduplicationFatherGen.length; j++) {
                            // 刪除父親重複基因
                            let deleteRepeat = true;
                            while (deleteRepeat) {
                                let deduplication = Math.floor(Math.random() * initCompute.length) + 1;
                                if ((deduplication != copulationPoint) && (this.arrayFind(copyInitGen[i][deduplication], deduplicationFatherGen[j]))) {
                                    copyInitGen[i][deduplication] = this.arrayFilter(copyInitGen[i][deduplication], [deduplicationFatherGen[j]]);
                                    deleteRepeat = false;
                                    console.log(`選擇父基因位子 : ${deduplication}`);
                                    console.log(`刪除 ${deduplicationFatherGen[j]} 基因`);
                                }
                            }

                            // 加入母親欠缺基因
                            let addGen = true;
                            while (addGen) {
                                let addGenPoint = Math.floor(Math.random() * initCompute.length) + 1;
                                // 不將欠缺基因加入原先位子
                                if (addGenPoint != copulationPoint) {
                                    if ((this.sumData(copyInitGen[i + 1][addGenPoint]) + deduplicationFatherGen[j]) <= initCompute[addGenPoint - 1]) {
                                        copyInitGen[i + 1][addGenPoint].push(deduplicationFatherGen[j]);
                                        addGen = false;
                                        console.log(`選擇母基因位子 : ${addGenPoint}`);
                                        console.log(`加入 ${deduplicationFatherGen[j]} 基因`);
                                    }
                                }
                            }
                        }
                        // 處理deduplicationMotherGen
                        for (let j = 0; j < deduplicationMotherGen.length; j++) {
                            // 加入父親欠缺基因
                            let addGen = true;
                            while (addGen) {
                                let addGenPoint = Math.floor(Math.random() * initCompute.length) + 1;
                                // 不將欠缺基因加入原先位子
                                if (addGenPoint != copulationPoint) {
                                    if ((this.sumData(copyInitGen[i][addGenPoint]) + deduplicationMotherGen[j]) <= initCompute[addGenPoint - 1]) {
                                        copyInitGen[i][addGenPoint].push(deduplicationMotherGen[j]);
                                        addGen = false;
                                        console.log(`選擇父基因位子 : ${addGenPoint}`);
                                        console.log(`加入 ${deduplicationMotherGen[j]} 基因`);
                                    }
                                }
                            }
                            // 刪除母親重複基因
                            let deleteRepeat = true;
                            while (deleteRepeat) {
                                let deduplication = Math.floor(Math.random() * initCompute.length) + 1;
                                if ((deduplication != copulationPoint) && (this.arrayFind(copyInitGen[i + 1][deduplication], deduplicationMotherGen[j]))) {
                                    copyInitGen[i + 1][deduplication] = this.arrayFilter(copyInitGen[i + 1][deduplication], [deduplicationMotherGen[j]]);
                                    deleteRepeat = false;
                                    console.log(`選擇母基因位子 : ${deduplication}`);
                                    console.log(`刪除 ${deduplicationMotherGen[j]} 基因`);
                                }
                            }
                        }
                    }
                }
            }
        }
        console.timeEnd("copulationTimeCost");
        return copyInitGen;
    }

    sumData(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        };
        return sum;
    }

    // 解決javascript float問題
    // 0.1 + 0.2 = 0.30000000000000004
    strip(num, precision = 12) {
        return +parseFloat(num.toPrecision(precision));
    }

    // 陣列比較
    arrayCompare(arr1, arr2) {
        return arr1.sort().toString() == arr2.sort().toString()
    }

    arrayFilter(arr1, arr2) {
        // console.log("arrayFilter");
        let arrResult = arr1.slice();
        for (let i = 0; i < arr2.length; i++) {
            arrResult.remove(arr2[i]);
        }
        return arrResult;
    }

    arrayFind(arr, data) {
        // console.log("arrayFind");
        // console.log(arr,data);
        let found = arr.find(element => element == data);
        return found == undefined ? false : true;
    }

    arrayCopy(currentArray){
        let newArray = currentArray.map(function(arr) {
            return arr.slice();
        });
        return newArray;
    }
}

module.exports = GA;