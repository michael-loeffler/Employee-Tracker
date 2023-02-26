//-- IMPORT NECESSARY NODE PACKAGES AND MODULES --//
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config()
//-- CREATE MYSQL CONNECTION USING DATA STORED IN .ENV FILE --//
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
);
//-- CLASS DEFINIITION WITH 7 QUERY METHODS CORRESPONDING TO EACH MENU OPTION --//
class Query {
    //- DISPLAY METHODS -//
    async displayDepartments() {
        const results = await db.promise().query('SELECT id AS ID, department_name AS "Department Name" FROM departments');
        console.table(results[0]);
    }
    async displayRoles() {
        const results = await db.promise().query('SELECT roles.id AS ID, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id');
        console.table(results[0]);
    }
    async displayEmployees() {
        const results = await db.promise().query(`SELECT a.id AS ID, a.first_name AS "First Name", a.last_name AS "Last Name", roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary, concat(b.first_name, ' ', b.last_name) AS Manager 
        FROM employees a 
        LEFT JOIN employees b ON a.manager_id = b.id
        JOIN roles ON a.role_id = roles.id 
        JOIN departments ON roles.department_id = departments.id`);
        console.table(results[0]);
    }
    //- ADD METHODS -//
    async addDepartment() {
        const departmentQuestions = [
            {
                type: 'input',
                message: `What is the name of the department?`,
                name: 'department_name',
            }
        ];
        await inquirer
            .prompt(departmentQuestions)
            .then(async (data) => {
                await db.promise().query(`INSERT INTO departments (department_name) VALUES (?)`, data.department_name);
                console.log(`${data.department_name} has been added to the Departments database`);
            })
    }
    async addRole() {
        // initialization of array to be added to //
        const departmentChoices = [];
        // obtains an array of all departments in the database to be used as choices in the list inquiry question //
        const dept_results = await db.promise().query(`SELECT department_name FROM departments`);
        for (let i = 0; i < dept_results[0].length; i++) {
            departmentChoices.push(dept_results[0][i].department_name);
        }

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
        await inquirer
            .prompt(roleQuestions)
            .then(async (data) => {
                var department_id;
                // converts department choice into department id so that it can be added to the roles table (roles table does not accept dept name only dept id) //
                const results = await db.promise().query(`SELECT id FROM departments WHERE department_name = ?`, data.department_name);
                department_id = results[0][0].id;

                await db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [data.title, data.salary, department_id]);

                console.log(`${data.title} has been added to the Roles database`);
            })
    }
    async addEmployee() {
        // initialization of arrays to be added to //
        const roleChoices = [];
        const managerChoices = ["None"];
        // obtains an array of all role titles in the database to be used as choices in the list inquiry question //
        const role_results = await db.promise().query(`SELECT title FROM roles`);
        for (let i = 0; i < role_results[0].length; i++) {
            roleChoices.push(role_results[0][i].title);
        }
        // obtains an array of all employees in the database to be used as choices for manager name in the list inquiry question //
        const manager_results = await db.promise().query(`SELECT concat(first_name, ' ', last_name) AS full_name FROM employees`);
        for (let i = 0; i < manager_results[0].length; i++) {
            managerChoices.push(manager_results[0][i].full_name);
        }

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
        await inquirer
            .prompt(employeeQuestions)
            .then(async (data) => {
                var role_id;
                var manager_id;

                // converts role choice into role id so that it can be added to the employees table (employees table does not accept role name only role id) //
                const results_role = await db.promise().query(`SELECT id FROM roles WHERE title = ?`, data.title);
                role_id = results_role[0][0].id;

                if (data.manager_name === "None") {
                    // sets manager id to null if the user selects the option "None" for manager //
                    manager_id = null;
                } else {
                    // converts manager name choice into manager id so that it can be added to the employees table (employees table does not accept manager name only manager id) //
                    const results_manager = await db.promise().query(`SELECT id FROM employees WHERE concat(first_name, ' ', last_name) = ?`, data.manager_name);
                    manager_id = results_manager[0][0].id;
                }

                await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.first_name, data.last_name, role_id, manager_id]);

                console.log(`${data.first_name} ${data.last_name} has been added to the Employees database`)
            })
    }
    //- UPDATE METHOD -//
    async updateEmployeeRole() {
        // initialization of arrays to be added to //
        const employeeChoices = [];
        const roleChoices = [];
        // obtains an array of all employees in the database to be used as choices for the employee to be updated in the list inquiry question //
        const employee_results = await db.promise().query(`SELECT concat(first_name, ' ', last_name) AS full_name FROM employees`);
        for (let i = 0; i < employee_results[0].length; i++) {
            employeeChoices.push(employee_results[0][i].full_name);
        }
        // obtains an array of all role titles in the database to be used as choices in the list inquiry question //
        const role_results = await db.promise().query(`SELECT title FROM roles`);
        for (let i = 0; i < role_results[0].length; i++) {
            roleChoices.push(role_results[0][i].title);
        }

        const updateQuestions = [
            {
                type: 'list',
                message: `Which employee's role would you like to update?`,
                name: 'employee_name',
                choices: employeeChoices
            },
            {
                type: 'list',
                message: `Which role would you like to assign to the selected employee?`,
                name: 'title',
                choices: roleChoices
            }
        ];
        await inquirer
            .prompt(updateQuestions)
            .then(async (data) => {
                var role_id;

                // converts role choice into role id so that it can be updated in the employees table (employees table does not accept role name only role id) //
                const results_role = await db.promise().query(`SELECT id FROM roles WHERE title = ?`, data.title);
                role_id = results_role[0][0].id;

                await db.promise().query(`UPDATE employees SET role_id = ? WHERE concat(first_name, ' ', last_name) = ?`, [role_id, data.employee_name])

                console.log(`Role has been updated to ${data.title} for ${data.employee_name}`)
            })
    }
}
// EXPORTS AS A MODULE //
module.exports = Query;