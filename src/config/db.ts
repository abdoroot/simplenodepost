import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME || "test_db",
    password: process.env.DB_PASSWORD || "123456",
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default pool;
