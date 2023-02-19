const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '2363MySQL!8747',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

