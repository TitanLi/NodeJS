const express = require('express');
const route = express.Router();

// middleware
route.use((req, res, next) => {
     console.log('apple middleware');
     next();
});

route.get('/', (req, res) => {
    res.send('route apple');
});

route.get('/example', (req, res) => {
    res.send('route apple example');
});

module.exports = route;