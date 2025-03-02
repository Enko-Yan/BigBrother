import inquirer from "inquirer";
import { pool, dbConnection } from './connection';

const getDepartments = async () => {
    const departmentQuery = `SELECT * FROM department;`;
    try {
        const res = await pool.query(departmentQuery);
        console.log(res.rows);
    } catch (err) {
        console.error("Error executing departmentQuery", err);
    }
}

const getRoles = async () => {
    const roleQuery = `SELECT * FROM role;`;
    try {
        const res = await pool.query(roleQuery);
        console.log(res.rows);
    } catch (err) {
        console.error("Error executing roleQuery", err);
    }
}

const getEmployees = async () => {
    const employeeQuery = `SELECT * FROM employee;`;
    try {
        const res = await pool.query(employeeQuery);
        console.log(res.rows);
    } catch (err) {
        console.error("Error executing employeeQuery", err);
    }
}

