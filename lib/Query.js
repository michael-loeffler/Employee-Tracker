const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '2363MySQL!8747',
        database: 'company_db'
    },
);

class Query {
    displayDepartments() {
        db.query('SELECT * FROM departments', function (err, results) {
            console.table(results);
          });
        return;
    }
    displayRoles() {
        db.query('SELECT * FROM roles', function (err, results) {
            console.table(results);
          });
    }
    displayEmployees() {
        db.query('SELECT * FROM employees', function (err, results) {
            console.table(results);
          });
    }
}

module.exports = Query;