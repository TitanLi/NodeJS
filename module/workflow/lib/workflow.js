const colors = require('colors');
const workflow_task = require('./task.js');
class workflow {
    constructor(data) {
        this.data = data;
        this.count = 0;
    }

    execution() {
        let main = this.data['main'];
        this.tasksResult(main);
        return "ok";
    }

    async tasksResult(task) {
        // workflow task action
        let action = this.data.tasks[task].action;
        // workflow task data
        let actionData = this.data.tasks[task].data;
        // execution task
        let result = await workflow_task[action](actionData);
        if(result=="on_success"){
            console.log(colors.green(`${task} : ${result}`));
        }else{
            console.log(colors.red(`${task} : ${result}`));
        }
        // workflow next task
        let nextAction = this.data.tasks[task][result];
        // workflow wait
        let wait = this.data.tasks[task].wait;
        if (wait != undefined && result == "on_error") {
            // 判斷是否需要執行等待及判斷等待次數是否超過
            if (wait.wait && (this.count < (wait.max | 0))) {
                setTimeout(() => {
                    console.log(colors.red(`Retry ${task}`));
                    // 嘗試次數加一
                    this.count++;
                    this.tasksResult(task.toString());
                }, wait.time | 1);
            } else {
                console.log(colors.red(`Retry ${task} timeout !!!!`));
            }
        } else if (nextAction != null) {
            this.count = 0;
            this.tasksResult(nextAction);
        }
    }
}

module.exports = workflow;