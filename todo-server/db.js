/**
 * @author Michael Anderson
 * This module creates a connection to the mysql database
 * Connection credentials are defined in the .env file of the project 
 */

require('dotenv').config()

const mysql = require("mysql")

function makeConnection() {
    const database = mysql.createConnection({
        host:  process.env.HOST,
        user:  process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    database.connect(err => {
        if (err) console.log(err); //!throw error to catch 
    });
    return database;
}

module.exports = {
    makeConnection
}
