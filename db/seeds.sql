-- Ref: 12-01-07
INSERT INTO departments (name)
VALUES 
        ( "Sales" ),
        ( "Finance" ),
        ( "Operations" ),
        ( "Marketing" ),
        ( "Engineering" ),
        ( "Legal" );
        ( "Human Resources" );

INSERT INTO roles (departmentId, title, salary)
VALUES 
        ( 1, "Sales Lead", 100000 ),
        ( 1, "Account Manager", 80000 ),
        ( 2, "Analyst", 75000 ),
        ( 2, "Accountant", 75000 ),
        ( 2, "Auditor", 80000 ),
        ( 4, "Analyst" 75000 ),
        ( 3, "Coordinator", 60000 );
        ( 5, "Engineer", 90000 );

INSERT INTO employees (roleId, firstName, lastName)
VALUES 
        ( 3, "Walker", "Jezek"  ),
        ( 2, "John", "Smith" ),
        ( 3, "Sam", "Reynolds" ),
        ( 4, "Matt", "Jones" ),
        ( 5, "Margo", "Jane" ),
        ( 6, "Alex", "Honnold" );