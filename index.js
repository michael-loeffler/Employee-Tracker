//-- IMPORT NECESSARY NODE PACKAGES AND MODULES --//
const inquirer = require('inquirer');
const Query = require('./lib/Query');
const query = new Query();

//-- INQUIRER PROMPTS: QUESTION ARRAY OF ACTION OPTIONS --//
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
            `Quit Application`
        ],
    }
];

//-- FUNCTIONS --//
//- Creates a function which is called immediately when the app is ran and asks what action the user would like to take. Once selected, the associated function for that action is ran, and then this function is ran again to allow the user to select another action if they so choose -//
function displayMenuOptions(questions) {
    inquirer
        .prompt(questions)
        .then(async (data) => {
            if (data.action === `View all departments`) {
                await query.displayDepartments();
                displayMenuOptions(actionOptions);
            } else if (data.action === `View all roles`) {
                await query.displayRoles();
                displayMenuOptions(actionOptions);
            } else if (data.action === `View all employees`) {
                await query.displayEmployees();
                displayMenuOptions(actionOptions);
            } else if (data.action === `Add a department`) {
                await query.addDepartment();
                displayMenuOptions(actionOptions);
            } else if (data.action === `Add a role`) {
                await query.addRole();
                displayMenuOptions(actionOptions);
            } else if (data.action === `Add an employee`) {
                await query.addEmployee();
                displayMenuOptions(actionOptions);
            } else if (data.action === `Update an employee's role`) {
                await query.updateEmployeeRole();
                displayMenuOptions(actionOptions);
            } else {
                process.exit(0); // closes the app if the user selects "Quit Application" //
            }
        })
};

displayMenuOptions(actionOptions);