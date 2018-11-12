//process.nextTick會將事件放入nextTickQueue的佇列中
//會在目前階段操作結束時執行
//先進先出概念執行
process.nextTick(function () {
    console.log(1);
});

process.nextTick(function () {
    console.log(2);
});

console.log(3);