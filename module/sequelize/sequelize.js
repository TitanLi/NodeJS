const { Sequelize, Model, DataTypes } = require('sequelize');
// Connecting to a database
const sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/test');

(async () => {
    try {
        // Testing the connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()
