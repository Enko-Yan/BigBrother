
INSERT INTO department (name)
VALUES ('Shipping and receiving'),
       ('Billing'),
       ('Account supervisor'),
       ('Human resources'),
       ('Field technician'),
       ('Field manager');


INSERT INTO role (title, salary, department_id)
VALUES ('Warehouse lead', 40000.00, (SELECT id FROM department WHERE name = 'Shipping and receiving')),
       ('Clerk', 50000.00, (SELECT id FROM department WHERE name = 'Billing')),
       ('Financial manager', 90000.00, (SELECT id FROM department WHERE name = 'Account supervisor')),
       ('HR specialist', 55000.00, (SELECT id FROM department WHERE name = 'Human resources')),
       ('Service expert', 70000.00, (SELECT id FROM department WHERE name = 'Field technician')),
       ('Lead technician', 80000.00, (SELECT id FROM department WHERE name = 'Field manager'));


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('George', 'Fisher', (SELECT id FROM role WHERE title = 'Warehouse lead'), NULL);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brody', 'Dalle', (SELECT id FROM role WHERE title = 'Financial manager'), NULL),
       ('Yuri', 'Shevchuk', (SELECT id FROM role WHERE title = 'Lead technician'), NULL);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Robert', 'Smith', (SELECT id FROM role WHERE title = 'Clerk'), 
           (SELECT id FROM employee WHERE first_name = 'Brody' AND last_name = 'Dalle')),
       ('Siouxsie', 'Sioux', (SELECT id FROM role WHERE title = 'HR specialist'), 
           (SELECT id FROM employee WHERE first_name = 'George' AND last_name = 'Fisher')),
       ('Sergei', 'Shnurov', (SELECT id FROM role WHERE title = 'Service expert'), 
           (SELECT id FROM employee WHERE first_name = 'Yuri' AND last_name = 'Shevchuk'));

       