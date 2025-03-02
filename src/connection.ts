import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT!, 10),
});

const dbConnection = async () => {
    try {
        await pool.connect();
        console.log('Connected to database.');
    } catch (err) {
        console.error('Could not connect to database', err);
        process.exit(1);
    }
};

export { pool, dbConnection };




