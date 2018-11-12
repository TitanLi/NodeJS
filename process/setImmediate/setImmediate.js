//會在目前事件循環結尾時觸發
//與process.nextTick很像，但會在nextTick之後執行
//不會產生call stack

setImmediate((arg1, arg2) => {
    console.log('Hello ', arg1, arg2);
}, 'Titan', 'apple');

process.nextTick(() => {
    console.log('Hello');
});

function recurse(i, end) {
    if (i > end) {
        console.log('done');
    } else {
        console.log(i);
        setImmediate(recurse, i + 1, end);
    }
}

recurse(0, 99);