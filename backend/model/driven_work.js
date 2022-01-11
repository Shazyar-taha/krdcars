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



exports.findDrivingUsingSearch = (drivingName, uId) => {
    const sql = `SELECT 
                    u.name AS url,
                    d.name AS title,
                d.information AS info,
                    d.language_id
                FROM 
                    driving_work d
                INNER JOIN 
                    url u ON u.id = d.url_id
                WHERE 
                    d.name LIKE '%${drivingName}%' OR
                    u.name LIKE '%${uId}%'
                ORDER BY
                    d.language_id ASC
                LIMIT 20 OFFSET 0`;
    return db.query(sql, []);

}