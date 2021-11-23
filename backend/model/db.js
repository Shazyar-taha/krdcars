const mysql = require('mysql');

const config = {
    connectionLimit: 1000,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

}

// create connection pool
const pool = mysql.createPool(config);

// connect to db
pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Mysql Connected');
})


module.exports = pool;