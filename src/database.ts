import { pool, dbConnection } from './connection';

export class DatabaseManager {
    async getDepartments() {
        const departmentQuery = `SELECT * FROM department;`;
        try {
            const res = await pool.query(departmentQuery);
            console.log(res.rows);
        } catch (err) {
            console.error("Error executing departmentQuery", err);
        }
    }

    async getRoles() {
        const roleQuery = `SELECT * FROM role;`;
        try {
            const res = await pool.query(roleQuery);
            console.log(res.rows);
        } catch (err) {
            console.error("Error executing roleQuery", err);
        }
    }

    async getEmployees() {
        const employeeQuery =  `
        SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, 
               r.title AS role_title, 
               m.first_name AS manager_first_name, m.last_name AS manager_last_name
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    try {
        const res = await pool.query(employeeQuery);
        res.rows.forEach(row => {
            console.log(`Employee: ${row.first_name} ${row.last_name}, Role: ${row.role_title}, Manager: ${row.manager_first_name ? row.manager_first_name + ' ' + row.manager_last_name : 'None'}`);
        });
    } catch (err) {
        console.error("Error executing employeeQuery", err);
    }
    }

    async addDepartment(departmentName: string) {
        const newDepartment = `INSERT INTO department (name) VALUES ($1);`;
        try {
            await pool.query(newDepartment, [departmentName]);
            console.log(`Department ${departmentName} added successfully`);
        } catch (err) {
            console.error("Error adding department", err);
        }
    }

    async addRole(title: string, salary: number, department_id: number) {
        const newRole = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);`;
        try {
            await pool.query(newRole, [title, salary, department_id]);
            console.log(`Role ${title} added successfully`);
        } catch (err) {
            console.error("Error adding role", err);
        }
    }

    async addEmployee(first_name: string, last_name: string, role_id: number, manager_first_name: string, manager_last_name: string, manager_id: number) {
        const newEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_first_name, manager_last_name, manager_id) VALUES ($1, $2, $3, $4, $5, $6);`;
        try {
            await pool.query(newEmployee, [first_name, last_name, role_id, manager_first_name, manager_last_name, manager_id]);
            console.log(`Employee ${first_name} ${last_name} added successfully`);
        } catch (err) {
            console.error("Error adding employee", err);
        }
    }

    //async updateEmployeeRole(role_id: number) {
        //const newEmployeeRole = `UPDATE employee SET role_id = $1 WHERE id = $2;`;
        //try {
            //await pool.query(newEmployeeRole, [role_id]);
            //console.log(`Employee ${role_id} role updated successfully`);
        //} catch (err) {
            //console.error("Error updating employee role", err);
        //}
    //}

}
