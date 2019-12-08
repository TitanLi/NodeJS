class GA {
    constructor(vnf) {
        this.compute = [4, 8, 4, 6, 4, 2, 8, 8, 10, 12];
        this.vnf = vnf;
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
        // 基因數量大小
        console.log(initGen.length);
        for (let i = 0; i < initGen.length; i++) {
            // 用於比較輸出結果是否有超過Compute能力
            let initCompute = this.compute.slice();
            // let initVNF = this.vnf.slice();
            // 隨機選擇要交換的基因
            let copulationPoint = Math.floor(Math.random() * initCompute.length) + 1;
            if (i % 2 == 0) {
                // 基因交換暫存使用
                let cache = 0;
                // 交換基因使用
                let fatherGen = initGen[i][copulationPoint];
                let motherGen = initGen[i + 1][copulationPoint];
                // 保留初始基因
                let originFatherGen = fatherGen;
                let originMotherGen = motherGen;
                // console.log(copulationPoint);
                // console.log(initGen[i]);
                // console.log(initGen[i + 1]);
                // 如果被選中的基因沒有東西將不做處理
                if (fatherGen.length > 0 | motherGen.length > 0) {
                    if (!this.arrayCompare(fatherGen, motherGen)) {
                        // 基因交換
                        cache = fatherGen;
                        fatherGen = motherGen;
                        motherGen = cache;
                        console.log(`change ${i}`);
                        // 過濾基因，用來處理交配後重複及缺少基因問題
                        let deduplicationFatherGen = this.arrayFilter(originMotherGen, originFatherGen);
                        let deduplicationMotherGen = this.arrayFilter(originFatherGen, originMotherGen);
                        // 處理deduplicationFatherGen
                        for (let j = 0; j < deduplicationFatherGen.length; j++) {
                            // 刪除父親重複基因
                            let deleteRepeat = true;
                            while (deleteRepeat) {
                                let deduplication = Math.floor(Math.random() * initCompute.length) + 1;
                                if (deduplication != copulationPoint && this.arrayFind(initGen[i][deduplication], deduplicationFatherGen[j])) {
                                    this.arrayFilter(initGen[i][deduplication], [deduplicationFatherGen[j]]);
                                    deleteRepeat = false;
                                }
                            }
                            // 加入母親欠缺基因
                            let addGen = true;
                            while(addGen){
                                let addGenPoint = Math.floor(Math.random() * initCompute.length) + 1;
                                // 不將欠缺基因加入原先位子
                                if (addGenPoint != copulationPoint) {
                                    if (this.sumData(initGen[i+1][addGenPoint]) + deduplicationFatherGen[j] <= initCompute[copulationPoint - 1]) {
                                        initGen[i+1][addGenPoint].push(deduplicationFatherGen[j]);
                                        addGen = false;
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
                                    if (this.sumData(initGen[i][addGenPoint]) + deduplicationMotherGen[j] <= initCompute[copulationPoint - 1]) {
                                        initGen[i][addGenPoint].push(deduplicationMotherGen[j]);
                                        addGen = false;
                                    }
                                }
                            }
                            // 刪除母親重複基因
                            let deleteRepeat = true;
                            while (deleteRepeat) {
                                let deduplication = Math.floor(Math.random() * initCompute.length) + 1;
                                if (deduplication != copulationPoint && this.arrayFind(initGen[i+1][deduplication], deduplicationMotherGen[j])) {
                                    this.arrayFilter(initGen[i+1][deduplication], [deduplicationMotherGen[j]]);
                                    deleteRepeat = false;
                                }
                            }
                        }
                        // 交換基因結果
                        // console.log(originFatherGen, fatherGen);
                        // console.log(originMotherGen, motherGen);
                        // 更新基因
                        initGen[i][copulationPoint] = fatherGen;
                        initGen[i+1][copulationPoint] = motherGen;
                    }
                }
                // console.log("result");
                // console.log(initGen[i]);
                // console.log(initGen[i + 1]);
            }
        }
        console.timeEnd("copulationTimeCost");
        return initGen;
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
        for (let i = 0; i < arr2.length; i++) {
            arr1.remove(arr2[i]);
        }
        return arr1;
    }

    arrayFind(arr, data) {
        let found = arr.find(element => element == data);
        return found == undefined ? false : true;
    }
}

module.exports = GA;