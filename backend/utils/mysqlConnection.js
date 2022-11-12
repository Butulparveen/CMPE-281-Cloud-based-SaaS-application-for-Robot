"use strict";
const mysql = require("mysql");
const {
    mysqlHost,
    mysqlUser,
    mysqlPassword,
    mysqlDatabase,
} = require("./config");
const myPort = 3306;

const pool = mysql.createPool({
    connectionLimit: 100,
    host: mysqlHost,
    user: mysqlUser,
    port: myPort,
    password: mysqlPassword,
    database: mysqlDatabase,
});

pool.getConnection((err) => {
    if (err) {
        console.log("Error", err);
        throw "Error occured: " + err;
    } else {
        console.log("SQL Database Connected");
    }
});

module.exports = pool;
