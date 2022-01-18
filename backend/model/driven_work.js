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



exports.findDrivingUsingSearch = (search) => {
    const sql = `SELECT DISTINCT
                    u.name AS url,
                    d1.name AS english,
                    d1.information AS english_des,
                    d2.name AS kurdish,
                    d2.information AS kurdish_des
                FROM 
                    driving_work d 
                INNER JOIN 
                    url u ON u.id = d.url_id
                LEFT JOIN 
                    driving_work d1 ON (d1.url_id = d.url_id AND d1.language_id = 1)
                LEFT JOIN 
                    driving_work d2 ON (d2.url_id = d.url_id AND d2.language_id = 2)
                WHERE 
                    d.name LIKE '%${search}%' OR
                    u.name LIKE '%${search}%'
                LIMIT 20 OFFSET 0`;
    return db.query(sql, []);

}