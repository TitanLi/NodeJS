const workflow_task = require('./task.js');
class workflow {
    constructor(data) {
        this.data = data;
        this.count = 0;
        setInterval(() => {
            console.log(this.count++);
            // console.log(this.tasks);
        }, 6000);
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
        console.log(`${task} : ${result}`)
        // workflow next task
        let nextAction = this.data.tasks[task][result];
        if (nextAction != null) {
            this.tasksResult(nextAction);
        }
    }
}

module.exports = workflow;