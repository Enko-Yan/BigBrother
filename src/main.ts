import inquirer from "inquirer";
import { pool, dbConnection } from './connection';

const getDepartments = async () => {
    const qeury = `SELECT * FROM department;`
}