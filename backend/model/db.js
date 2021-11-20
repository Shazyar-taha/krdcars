const mysql = require('mysql');


const config = {
    connectionLimit: 1000,
    port: 3325,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'krdcars'

}

// create connection pool
const pool = mysql.createPool(config);

// connect to db
pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Mysql Connected');
})


module.exports = pool;