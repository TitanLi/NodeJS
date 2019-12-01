// 參考教學：https://segmentfault.com/a/1190000015271621
const readline = require('readline');
const rl = readline.createInterface({input : process.stdin,
                          output : process.stdout});
let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;

rl.question(`What is ${num1} + ${num2} ? \n` , (userInput) => {
    if(userInput.trim() == answer){
        rl.close();
    }else{
        rl.setPrompt('Incorrect response please try again\n');
        rl.prompt();
        // 當有接收到結束符號時觸發
        rl.on('line',(userInput) => {
            if(userInput.trim() == answer){
                rl.close();
            }else{
                rl.setPrompt('Incorrect response please try again\n');
                rl.prompt();
            }
        });
    }
});

rl.on('close',() => {
    console.log('Correct');
});