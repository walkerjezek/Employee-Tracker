DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

-- Create departments table
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

-- Create roles table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departmentId VARCHAR(30) NOT NULL,
    title INT NOT NULL,
    salary INT NOT NULL,
    -- Add join
    FOREIGN KEY (departmentId) REFERENCES departments(id),
    ON DELETE SET NULL
);


-- Create employees table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT NOT NULL,
    managerId INT NOT NULL,
    -- Add join
    FOREIGN KEY (roleId) REFERENCES roles(id),
    ON DELETE SET NULL,
    FOREIGN KEY (managerId) REFERENCES employee(id),
    ON DELETE SET NULL,
);
