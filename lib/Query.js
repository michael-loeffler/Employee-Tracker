const mysql = require('mysql2');
const inquirer = require('inquirer');
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
    addDepartment() {
        const departmentQuestions = [
            {
                type: 'input',
                message: `What is the name of the department?`,
                name: 'department_name',
            }
        ];
        inquirer
            .prompt(departmentQuestions)
            .then((data) => {
                db.query(`INSERT INTO departments (department_name) VALUES ('${data.department_name}')`, function (err, results) {
                    console.log(`${data.department_name} has been added to the Departments database`)
                });
            })
    }
    addRole() {
        const choices = [];
        db.query(`SELECT department_name FROM departments`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                choices.push(results[i].department_name);
            }
            // console.log(choices);
            
        })
        const roleQuestions = [
            {
                type: 'input',
                message: `What is the name of the role?`,
                name: 'title',
            },
            {
                type: 'input',
                message: `What is the salary of the role?`,
                name: 'salary',
            },
            {
                type: 'list',
                message: `Which department does the role belong to?`,
                name: 'department_name',
                choices: choices,
            }
        ];
        inquirer
            .prompt(roleQuestions)
            .then((data) => {
                var department_id = '';
                console.log(data.department_name);

                db.query(`SELECT id FROM departments WHERE department_name = ${data.department_name}`, function (err, results) {
                    department_id = results;
                })
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', '${department_id}')`, function (err, results) {
                    console.log(`${data.title} has been added to the Roles database`)
                });
            })
    }
}
module.exports = Query;