const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// 可用來驗證req.body schema
const Joi = require('joi');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
// postman
app.use(bodyParser.json());
// cors
// front-end
// headers: {
//     'Access-Control-Allow-Origin': '*'
// }
app.use(cors());
// middleware
app.use('/', (req, res, next) => {
    req.apple = 'apple';
    next();
});
// routes
const apple = require('./routes/apple.js');
app.use('/apple',apple);

app.get('/', (req, res) => {
    console.log(req.apple);
    res.sendFile(path.join(__dirname, 'static', 'demo.html'));
});

app.post('/', (req, res) => {
    console.log(req.body);
    let name = req.body.userName;
    res.json({ name: name });
});

app.post('/joi', (req, res) => {
    console.log(req.body);
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    Joi.validate(req.body, schema, (err, result) => {
        if (err) {
            console.log(err);
            res.send('error');
        } else {
            console.log(result);
            res.send('successfully');
        }
    });
});

app.get('/route', (req, res) => {
    res.send('example route');
});

app.get('/params/:name/', (req, res) => {
    let name = req.params.name;
    res.send(`Hello ${name}`);
});

app.get('/query', (req, res) => {
    let query = req.query;
    res.send(`query data => ${JSON.stringify(query)}`);
});
app.listen(3000);