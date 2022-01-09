const db = require('./db');


// fetch all driven works data 
exports.findAll = (offset) => {
    const sql = `SELECT 
                    u.name,
                    d.name AS title,
                    d.information,
                    d.language_id
                FROM 
                    driving_work d
                INNER JOIN 
                    url u ON u.id = d.url_id
                ORDER BY u.name, d.language_id
                LIMIT 20 OFFSET ?`;

    return db.query(sql, [offset]);
}

// fetch the specific driving work by uId
exports.findByUId = (uId) => {
    const sql = `SELECT 
                    d.name AS title,
                    d.information AS info,
                    d.language_id
                FROM  
                    driving_work d 
                INNER JOIN 
                    url u ON u.id = d.url_id
                WHERE 
                    u.name = ? and u.url_type_id = ?`;

    return db.query(sql, [uId, 5]);
}


// adding the data to driven work
// params consists the name , info and languageId
exports.add = (params) => {
    const sql = `INSERT INTO driven_work(name, information, language_id) VALUES(?, ?, ?)`;
    return db.execute(sql, [params.name, params.info, params.language]);
}