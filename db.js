import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "students",
    password: "ajnascv1234",
    port: 5432,
});


export default  pool;