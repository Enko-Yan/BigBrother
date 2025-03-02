import fs from 'fs';
import path from 'path';
import { pool, dbConnection } from './connection';

const runSqlFile = async (filePath: string) => {
    const absolutePath = path.resolve(__dirname, '..', 'db', filePath);
    const sql = fs.readFileSync(absolutePath, 'utf8');
    try {
        await pool.query(sql);
        console.log(`Executed ${filePath} successfully`);
    } catch (err) {
        console.error(`Error executing ${filePath}:`, err);
    }
};

const setupDatabase = async () => {
    await dbConnection();
    await runSqlFile('schema.sql');
    await runSqlFile('seeds.sql');
    pool.end();
};

setupDatabase().then(() => console.log('Database setup completed')).catch((err) => console.error('Error setting up database:', err));