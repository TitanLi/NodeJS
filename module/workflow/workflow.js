const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// 可用來驗證req.body schema
const Joi = require('joi');
const Workflow = require('./lib/workflow.js');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
// postman
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log(req.body);
    let workflow = new Workflow(req.body)
    res.send(workflow.execution());
});

app.listen(3000);