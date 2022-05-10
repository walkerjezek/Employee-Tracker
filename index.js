const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const consoleTable = require("console.table");

// Initial prompt
const start = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        name: "start",
    },
]


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
viewDepartments();

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



// Function for the selected options
function options() {
    inquirer.prompt(start).then((response) => {
        if (response.start === "View all departments") {
            viewDepartments();
        } else if (response.start === "View all roles") {
            viewRoles();
        } else if (response.start === "View all employees") {
            viewEmployees();
        } else if (response.start === "Add a department") {
            addDepartment();
        } else if (response.start === "Add a role") {
            addRole();
        } else if (response.start === "Add an employee") {
            addEmployee();
        } else if (response.start === "Update an employee role") {
            updateRole();
        }
    });
}


// Initialize the app
function init() {
    inquirer.prompt(start).then((response => {
    })
    );
}


init();