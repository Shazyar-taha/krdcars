const db = require('./db');


// fetch all driven works data 
exports.findAll = (offset) => {
    const sql = `SELECT 
                        p.url_id,
                        
                        CONCAT('[',
                                GROUP_CONCAT(DISTINCT JSON_OBJECT('driven_work_name',
                                            pd.driven_work_name,
                                            'driven_work_info',
                                            pd.driven_work_info,
                                            'language_id',
                                            pd.language_id)),
                                ']') AS driven_work_detail
                    FROM
                        driven_work p
                            INNER JOIN
                        driven_work_detail pd ON pd.driven_work_id = p.id
                    LIMIT 18 OFFSET ?`;
    return db.query(sql, [offset]);
}



// fetch the specific driving work by uId
exports.findByUId = (uId) => {
    const sql = `SELECT 
                    p.url_id,
                    p.img,
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('driven_work_name',
                                        pd.driven_work_name,
                                        'driven_work_info',
                                        pd.driven_work_info,
                                        'language_id',
                                        pd.language_id)),
                            ']') AS driven_work_detail
                FROM
                    driven_work p
                        INNER JOIN
                    driven_work_detail pd ON pd.driven_work_id = p.id
                WHERE 
                    p.url_id = ?`;
    return db.query(sql, [uId]);
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
                LIMIT 18 OFFSET 0`;
    return db.query(sql, []);

}


// get count of driving_work
exports.getCountDriven = () => {
    const sql = `SELECT 
                    COUNT(id) AS count
                FROM 
                    driven_work;`;
    return db.query(sql, []);
}