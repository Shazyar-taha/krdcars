const mysql = require('mysql');


const config = {
    connectionLimit: 1000,
    port: 3306,
    host: 'de17.fcomet.com',
    user: 'mathwith_root',
    password: 'Z!gQaO0da52G',
    database: 'mathwith_krdcars'

}

// create connection pool
const pool = mysql.createPool(config);

// connect to db
pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Mysql Connected');
})


module.exports = pool;