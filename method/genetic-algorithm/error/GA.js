class GA {
    constructor(vnf) {
        // [ 10, [], [], [], [ 4 ], [ 6 ], [], [], [ 6, 2 ], [ 2, 5, 3 ], [] ],
        this.compute = [2, 4, 4, 4, 6, 8, 8, 8, 10, 12];
        this.vnf = vnf;
        this.initGenSize = 2;
        // this.initGenSize = this.vnf.length * this.compute.length;
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
        return new Promise((resolve, reject) => {
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
            resolve(this.arrayCopy(this.initGen));
        });
    }

    initScore(initGen) {
        console.time("scoreTimeCost");
        return new Promise((resolve, reject) => {
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
            resolve(this.arrayCopy(initGen));
        });
    }

    copulation(initGen) {
        console.time("copulationTimeCost");
        return new Promise((resolve, reject) => {
            let copyInitGen = this.arrayCopy(initGen);
            let originInitGen = this.arrayCopy(initGen);
            // 基因數量大小
            for (let i = 0; i < copyInitGen.length; i++) {
                // 用於比較輸出結果是否有超過Compute能力
                let [...initCompute] = this.compute;
                if (i % 2 == 0) {
                    // console.log(`交換基因池中第${i}、${i + 1}個基因`);
                    // 隨機選擇要交換的基因
                    let copulationPoint = Math.floor(Math.random() * initCompute.length) + 1;
                    // 預計交換基因對
                    let father = this.arrayCopy(initGen)[i];
                    let mother = this.arrayCopy(initGen)[i + 1];
                    // 保留初始基因
                    let originFatherGen = this.arrayCopy(initGen)[i];
                    let originMotherGen = this.arrayCopy(initGen)[i + 1];
                    // 基因交換暫存使用
                    let cache = 0;
                    // 交換基因位置使用
                    let fatherGen = father[copulationPoint].slice();
                    let motherGen = mother[copulationPoint].slice();
                    // 如果被選中的基因沒有東西將不做處理
                    if (fatherGen.length > 0 | motherGen.length > 0) {
                        father[0] = true;
                        mother[0] = true;
                        if (!this.arrayCompare(fatherGen, motherGen)) {
                            // console.log(`交換基因位子 : ${copulationPoint}`);
                            // console.log(`Father => ${JSON.stringify(father)}`);
                            // console.log(`Mother => ${JSON.stringify(mother)}`);
                            // 交換基因是否成功
                            let copulationStatus = true;
                            // 基因交換(一維度陣列)
                            cache = fatherGen;
                            fatherGen = motherGen;
                            motherGen = cache;
                            // console.log(`originFatherGen : ${JSON.stringify(originFatherGen[copulationPoint])} \t fatherGen : ${JSON.stringify(fatherGen)}`);
                            // console.log(`originMotherGen : ${JSON.stringify(originMotherGen[copulationPoint])} \t motherGen : ${JSON.stringify(motherGen)}`);
                            // 更新基因回暫存基因陣列
                            father[copulationPoint] = fatherGen.slice();
                            mother[copulationPoint] = motherGen.slice();
                            // 過濾基因，用來處理交配後重複及缺少基因問題
                            // 父基因 => 1.需刪除deduplicationFatherGen重複基因 2.補上缺少基因deduplicationMotherGen
                            // 母基因 => 1.需刪除deduplicationMotherGen重複基因 2.補上缺少基因deduplicationFatherGen
                            let deduplicationFatherGen = this.arrayFilter(originMotherGen[copulationPoint], originFatherGen[copulationPoint]);
                            let deduplicationMotherGen = this.arrayFilter(originFatherGen[copulationPoint], originMotherGen[copulationPoint]);
                            // console.log(`基因交換後父基因需刪除的重複基因 => ${JSON.stringify(deduplicationFatherGen)}`);
                            // console.log(`基因交換後母基因需刪除的重複基因 => ${JSON.stringify(deduplicationMotherGen)}`);
                            // 處理deduplicationFatherGen
                            // console.log("\n處理deduplicationFatherGen");
                            for (let j = 0; j < deduplicationFatherGen.length; j++) {
                                let fatherCount = 0;
                                let motherCount = 0;
                                // 刪除父親重複基因
                                let deleteRepeat = true;
                                while (deleteRepeat && copulationStatus) {
                                    let deduplication = Math.floor(Math.random() * initCompute.length) + 1;
                                    if ((deduplication != copulationPoint) && (this.arrayFind(father[deduplication], deduplicationFatherGen[j]))) {
                                        father[deduplication] = this.arrayFilter(father[deduplication], [deduplicationFatherGen[j]]);
                                        deleteRepeat = false;
                                        // console.log(`選擇父基因位子 : ${deduplication}`);
                                        // console.log(`刪除 ${deduplicationFatherGen[j]} 基因`);
                                    }
                                    fatherCount++;
                                    if (fatherCount > 100) {
                                        console.log(`處理deduplicationFatherGen\nFather Count ${fatherCount} Break`);
                                        copulationStatus = false;
                                    }
                                }

                                // 加入母親欠缺基因
                                let addGen = true;
                                while (addGen && copulationStatus) {
                                    let addGenPoint = Math.floor(Math.random() * initCompute.length) + 1;
                                    // 不將欠缺基因加入原先位子
                                    if (addGenPoint != copulationPoint) {
                                        if ((this.sumData(mother[addGenPoint]) + deduplicationFatherGen[j]) <= initCompute[addGenPoint - 1]) {
                                            mother[addGenPoint].push(deduplicationFatherGen[j]);
                                            addGen = false;
                                            // console.log(`選擇母基因位子 : ${addGenPoint}`);
                                            // console.log(`加入 ${deduplicationFatherGen[j]} 基因`);
                                        }
                                    }
                                    motherCount++;
                                    if (motherCount > 100) {
                                        console.log(`處理deduplicationFatherGen\nMother Count ${motherCount} Break`);
                                        copulationStatus = false;
                                    }
                                }
                            }
                            // 處理deduplicationMotherGen
                            // console.log("\n處理deduplicationMotherGen");
                            for (let j = 0; j < deduplicationMotherGen.length; j++) {
                                let fatherCount = 0;
                                let motherCount = 0;
                                // 加入父親欠缺基因
                                let addGen = true;
                                while (addGen && copulationStatus) {
                                    let addGenPoint = Math.floor(Math.random() * initCompute.length) + 1;
                                    // 不將欠缺基因加入原先位子
                                    if (addGenPoint != copulationPoint) {
                                        if ((this.sumData(father[addGenPoint]) + deduplicationMotherGen[j]) <= initCompute[addGenPoint - 1]) {
                                            father[addGenPoint].push(deduplicationMotherGen[j]);
                                            addGen = false;
                                            // console.log(`選擇父基因位子 : ${addGenPoint}`);
                                            // console.log(`加入 ${deduplicationMotherGen[j]} 基因`);
                                        }
                                    }
                                    fatherCount++;
                                    if (fatherCount > 100) {
                                        console.log(`處理deduplicationMotherGen\nFather Count ${fatherCount} Break`);
                                        copulationStatus = false;
                                    }
                                }
                                // 刪除母親重複基因
                                let deleteRepeat = true;
                                while (deleteRepeat && copulationStatus) {
                                    let deduplication = Math.floor(Math.random() * initCompute.length) + 1;
                                    if ((deduplication != copulationPoint) && (this.arrayFind(mother[deduplication], deduplicationMotherGen[j]))) {
                                        mother[deduplication] = this.arrayFilter(mother[deduplication], [deduplicationMotherGen[j]]);
                                        deleteRepeat = false;
                                        // console.log(`選擇母基因位子 : ${deduplication}`);
                                        // console.log(`刪除 ${deduplicationMotherGen[j]} 基因`);
                                    }
                                    motherCount++;
                                    if (motherCount > 100) {
                                        console.log(`處理deduplicationMotherGen\nMother Count ${motherCount} Break`);
                                        copulationStatus = false;
                                    }
                                }
                            }

                            if (copulationStatus) {
                                // console.log(copulationStatus);
                                copyInitGen[i] = father;
                                copyInitGen[i + 1] = mother;
                            } else {
                                // console.log(copulationStatus);
                                copyInitGen[i] = originFatherGen;
                                copyInitGen[i + 1] = originMotherGen;
                            }
                            copyInitGen[i] = this.score(copyInitGen[i], originFatherGen);
                            copyInitGen[i + 1] = this.score(copyInitGen[i], originMotherGen);
                            // console.log(copyInitGen);
                        }
                    }
                }
            }
            console.timeEnd("copulationTimeCost");
            resolve(this.arrayCopy(copyInitGen));
        });
    }

    score(origin, current) {
        let sum1 = 0;
        let sum2 = 0;
        for (let i = 1; i <= this.compute.length; i++) {
            if (origin[i].length == 0) {
                sum1 = this.strip(sum1 + 1);
            } else {
                sum1 = this.strip(sum1 + Number((this.sumData(origin[i])/this.compute[i-1]).toFixed(2)));
            }
            if (current[i].length == 0) {
                sum2 = this.strip(sum2 + 1);
            } else {
                sum2 = this.strip(sum2 + Number((this.sumData(current[i])/this.compute[i-1]).toFixed(2)));
            }
        }
        // console.log(sum1,sum2);
        if(sum1>=sum2){
            origin[0] = sum1;
            return origin;
        }else{
            current[0] = sum2;
            return current;
        }
    }

    betterGenes(initGen, copulationGen) {
        return new Promise((resolve, reject) => {
            let arr1 = this.arrayCopy(initGen);
            let arr2 = this.arrayCopy(copulationGen);
            let arr3 = arr1.concat(arr2);
            let result = this.arrayMultidimensionalFilter(arr3);
            result.splice(0, result.length - this.initGenSize);
            console.log(result);
            resolve(result);
        });
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
        return JSON.stringify(arr1.sort()) == JSON.stringify(arr2.sort());
    }

    arrayFilter(arr1, arr2) {
        let arrResult = arr1.slice();
        for (let i = 0; i < arr2.length; i++) {
            arrResult.remove(arr2[i]);
        }
        return arrResult;
    }

    arrayFind(arr, data) {
        let found = arr.find(element => element == data);
        return found == undefined ? false : true;
    }

    // 複製多維陣列至新的記憶體位置
    arrayCopy(currentArray) {
        let newArray = currentArray.map(function (arr) {
            return arr.slice();
        });
        return newArray;
    }

    // 利用排序資料來過濾重複的基因
    arrayMultidimensionalFilter(currentArray) {
        let arr = this.arrayCopy(currentArray);
        arr.sort();
        for (let i = 0; i < arr.length; i++) {
            if (JSON.stringify(arr[i]) == JSON.stringify(arr[i + 1])) {
                arr.remove(arr[i + 1]);
                i = i - 1;
            }
        }
        return arr;
    }
}

module.exports = GA;