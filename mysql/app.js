//Docker run container : docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql
//Mac Install MySQL Client : brew install mysql --client-only --universal
//Connect to MySQL server : $ mysql -h 127.0.0.1 -u root -p
//In Mysql docker container : ALTER USER root IDENTIFIED WITH mysql_native_password BY 'password';
//Create database : create database test;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

connection.connect();

// connection.end();