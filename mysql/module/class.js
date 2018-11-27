const mysql = require('mysql');
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(function (err) {
                if (err) {
                    // console.error('error connecting: ' + err.stack);
                    return reject(err);
                }
                resolve('connect');
            });
        });
    }
    createDB(db) {
        return new Promise((resolve, reject) => {
            this.connection.query(`CREATE DATABASE ${db}`, (err) => {
                if (err)
                    return reject(err);
                resolve('create');
            });
        });
    }
    createTable(tableName, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(`CREATE TABLE  ${tableName} ${args}`, (err) => {
                if (err)
                    return reject(err);
                resolve('create');
            });
        });
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve('insert');
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
    test() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('apple');
            }, 3000);
        });
    }
}

module.exports = Database
