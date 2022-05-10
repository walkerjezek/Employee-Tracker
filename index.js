const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require("console.table");
const db = require('./db');


// Ref: 12-01-11
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker'
    },
    console.log(`Successfully connected to the database`)
);



// Initial prompt
function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "I'm done"],
            name: "start",
        },
    ]).then((data) => {
        switch (data.start) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case "I'm done":
                done();
                break;
        }
    })
};




// Arrays
const departmentArray = []


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = () => db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
        console.log(err)
    } else {
        console.table('\x1b[33m', results)
    }
    init();
});

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
viewRoles();

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
viewEmployees();

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
addDepartment();

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
addRole();

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
addEmployee();

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
updateRole();


function done() {
    process.exit();
}



init();