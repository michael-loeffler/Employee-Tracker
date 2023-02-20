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
        db.query('SELECT id AS ID, department_name AS "Department Name" FROM departments', function (err, results) {
            console.table(results);
          });
        return;
    }
    displayRoles() {
        db.query('SELECT roles.id AS ID, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
            console.table(results);
          });
    }
    displayEmployees() {
        db.query('SELECT employees.id AS ID, employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary, employees.first_name + employees.last_name AS Manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', function (err, results) {
            console.table(results);
          });
    }
}

module.exports = Query;