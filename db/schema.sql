DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;


CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentId INT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    FOREIGN KEY (departmentId) REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT,
    managerId INT,
    FOREIGN KEY (roleId) REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (managerId) REFERENCES employees(id)
    ON DELETE SET NULL
);
