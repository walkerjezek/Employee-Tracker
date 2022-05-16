const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require("console.table");
// const db = require('./db');


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
const departmentArray = [];
const roleArray = [];
const employeeArray = [];


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
const viewRoles = () => db.query('SELECT * FROM roles', (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.table('\x1b[33m', results)
    }
    init();
});

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = () => db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.table('\x1b[33m', results)
    }
    init();
});

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the department you would like to add: ",
            name: "newDepartment",
        },
    ]).then((res) => {
        db.query('INSERT INTO departments (departmentName) VALUES (?)', res.newDepartment, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                viewDepartments();
            }
            init();
        })
    })
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role you would like to add?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What department would you like to assign this role to?',
            name: 'addToDepartment',
        },
        {
            type: 'input',
            message: 'What salary would you like to asign to this role',
            name: 'newSalary'
        },
    ]).then((res) => {
        db.query('INSERT INTO roles (title, departmentId, salary) VALUE (?, ?, ?)', [res.newRole, res.addToDepartment, res.newSalary], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                viewRoles();
            }
            init();
        })
    })
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new employees first name?',
            name: 'newEmpFirst'
        },
        {
            type: 'input',
            message: 'What is the new employees last name?',
            name: 'newEmpLast'
        },
        {
            type: 'input',
            message: 'What is the new employees role?',
            name: 'newEmpRole',
        },
        {
            type: 'input',
            message: 'Who is the new employees manager?',
            name: 'newEmpManager',
        },
    ]).then((res) => {
        db.query('INSERT INTO employees (newEmpFirst, newEmpLast, newEmpRole, newEmpManager) VALUE (?, ?, ?, ?)', [res.newEmpFirst, res.newEmpLast, res.newEmpRole, res.newEmpManager], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                viewEmployees();
            }
            init();
        })
    })
};

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
const updateRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What emplyee would you like to update?',
            name: 'updateEmployee',
        },
        {
            type: 'input',
            message: 'What role would you like to assign to this employee?',
            name: 'updateRole',
        },
    ]).then((res) => {
        db.query('INSERT INTO roles (updateEmployee, updateRole) VALUE (?, ?)', [res.updateEmplyee, res.updateRole], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                viewRoles();
            }
            init();
        })
    })
};



// End the process when the user selects I'm Done
function done() {
    process.exit();
}



init();