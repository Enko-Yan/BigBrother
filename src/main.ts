import inquirer from "inquirer";
import { pool, dbConnection } from './connection';
import { DatabaseManager } from './database';

const databaseManager = new DatabaseManager();

const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                //'Update Employee Role',
                'Exit',
            ],
        }
    ]).then((answers) => {
        switch (answers.mainMenu) {
            case 'View Employees':
                databaseManager.getEmployees();
                mainMenu();
                break;
            case 'View Departments':
                databaseManager.getDepartments();
                mainMenu();
                break;
            case 'View Roles':
                databaseManager.getRoles();
                mainMenu();
                break;
            case 'Add Employee':
                promptAddEmployee();
                break;
            case 'Add Department':
                promptAddDepartment();
                break;  
            case 'Add Role':
                promptAddRole();
                break;
            //case 'Update Employee Role':  
                //databaseManager.updateEmployeeRole();
                //break;
            case 'Exit':
                process.exit();
                //break;
        }
    }).catch((err) => {
        console.error(err);
    });
    
};
            
const promptAddEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for the employee (numbers only):',
        },
        {
            type: 'input',
            name: 'manager_first_name',
            message: 'Enter employee manager first name:',
        },
        {
            type: 'input',
            name: 'manager_last_name',
            message: 'Enter employee manager last name:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the employee manager (numbers only):',
        }
    ]).then((answers) => {
        databaseManager.addEmployee(
            answers.first_name, 
            answers.last_name, 
            parseInt(answers.role_id), 
            answers.manager_first_name, 
            answers.manager_last_name, 
            parseInt(answers.manager_id
            ))
            .then(() => {
                databaseManager.getEmployees();
                mainMenu();
            })
            .catch((err) => {
                console.error(err);
                mainMenu();
            });
    }).catch((err) => {
        console.error(err);
        mainMenu();
    });
};
const promptAddDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department you would like to add:',
        }
    ]).then((answers) => {
        databaseManager.addDepartment(answers.departmentName)
            .then(() => {
                databaseManager.getDepartments();
                mainMenu();
            })
            .catch((err) => {
                console.error(err);
                mainMenu();
            });
    }).catch((err) => {
        console.error(err);
        mainMenu();
    });
};

const promptAddRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role you would like to add:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role (numbers only):',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for the role (numbers only):',
        },
    ])
    .then((answers) => {
        databaseManager.addRole(answers.title, parseInt(answers.salary), parseInt(answers.department_id))
            .then(() => {
                databaseManager.getRoles();
                mainMenu();
            })
            .catch((err) => {
                console.error(err);
                mainMenu();
            });
    }).catch((err) => {
        console.error(err);
        mainMenu();
    });
};

//const promptUpdateEmployeeRole = () => {
    //inquirer.prompt([
        //{
            //type: 'input',
            //name: 'role_id',
            //message: 
mainMenu();