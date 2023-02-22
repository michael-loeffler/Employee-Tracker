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
        db.query(`SELECT a.id AS ID, a.first_name AS "First Name", a.last_name AS "Last Name", roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary, concat(b.first_name, ' ', b.last_name) AS Manager 
        FROM employees a 
        LEFT JOIN employees b ON a.manager_id = b.id
        JOIN roles ON a.role_id = roles.id 
        JOIN departments ON roles.department_id = departments.id`, function (err, results) {
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
        const departmentChoices = [];
        db.query(`SELECT department_name FROM departments`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                departmentChoices.push(results[i].department_name);
            }
            // console.log(departmentChoices);
            
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
                choices: departmentChoices,
            }
        ];
        inquirer
            .prompt(roleQuestions)
            .then((data) => {
                var department_id;
                
                db.query(`SELECT id FROM departments WHERE department_name = '${data.department_name}'`, function (err, results) {
                    console.log(results[0].id);
                    department_id = results[0].id;
                    console.log(department_id);
                })
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', ${department_id})`, function (err, results) {
                    console.log(err);
                    console.log(`${data.title} has been added to the Roles database`);
                });
            })
    }
    addEmployee() {
        const roleChoices = [];
        const managerChoices = ["None"];
        db.query(`SELECT title FROM roles`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                roleChoices.push(results[i].title);
            }});
        db.query(`SELECT concat(first_name, ' ', last_name) AS full_name FROM employees`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                managerChoices.push(results[i].full_name);
            }});
                             
        const employeeQuestions = [
            {
                type: 'input',
                message: `What is the employee's first name?`,
                name: 'first_name',
            },
            {
                type: 'input',
                message: `What is the employee's last name?`,
                name: 'last_name',
            },
            {
                type: 'list',
                message: `What is the employee's role?`,
                name: 'title',
                choices: roleChoices
            },
            {
                type: 'list',
                message: `Who is the employee's manager?`,
                name: 'manager_name',
                choices: managerChoices
            }
        ];
        inquirer
            .prompt(employeeQuestions)
            .then((data) => {
                var role_id;
                var manager_id;

                db.query(`SELECT id FROM roles WHERE title = ${data.title}`, function (err, results) {
                    console.log(results);
                    role_id = results;
                    console.log(role_id);
                });
                db.query(`SELECT id FROM employees WHERE concat(first_name, ' ', last_name) = ${data.manager_name}`, function (err, results) {
                    manager_id = results; 
                    console.log(manager_id);
                });
                db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.first_name}', '${data.last_name}', '${role_id}', '${manager_id}')`, function (err, results) {
                    console.log(err);
                });
            })
    }

}
module.exports = Query;