//-- IMPORT NECESSARY NODE PACKAGES AND MODULES --//
const inquirer = require('inquirer');
const Query = require('./lib/Query');
const query = new Query();

//-- INQUIRER PROMPTS, QUESTION ARRAYS FOR EACH ACTION AND 1 FOR ACTION OPTIONS --//
const actionOptions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: [
            `View all departments`, 
            `View all roles`, 
            `View all employees`, 
            `Add a department`, 
            `Add a role`, 
            `Add an employee`, 
            `Update an employee's role`, 
        ],
    }
];

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
    // {
    //     type: 'list',
    //     message: `What is the employee's role?`,
    //     name: 'role_id',
    //     choices: []
    // },
    // {
    //     type: 'list',
    //     message: `Who is the employee's manager?`,
    //     name: 'manager_id',
    //     choices: []
    // }
];

const updateQuestions = [
    // {
    //     type: 'list',
    //     message: `Which employee's role would you like to update?`,
    //     name: 'employee_id',
    //     choices: []
    // },
    // {
    //     type: 'list',
    //     message: `Which role would you like to assign to the selected employee?`,
    //     name: 'role_id',
    //     choices: []
    // }
]

//-- FUNCTIONS --//
//- Creates a function that initializes the app; it is called immediately when the app is ran and asks what action the user would like to take. -//
function init() {
    displayMenuOptions(actionOptions);
};

function displayMenuOptions(questions) {
    inquirer
        .prompt(questions)
        .then((data) => {
            if (data.action === `View all departments`) {
                query.displayDepartments();
            } else if (data.action === `View all roles`) {
                query.displayRoles();
            } else if (data.action === `View all employees`) {
                query.displayEmployees();
            } else if (data.action === `Add a department`) {
                query.addDepartment();
            } else if (data.action === `Add a role`) {
                query.addRole();
            } else if (data.action === `Add an employee`) {
                
            } else if (data.action === `Update an employee's role`) {
                
            }
        })
};

// function viewDepartments() {
//     query.displayDepartments();
//     displayMenuOptions(actionOptions); DID NOT WORK
// }

init();