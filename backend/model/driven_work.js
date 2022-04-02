const db = require('./db');


// fetch all driven works data 
exports.findAll = (offset) => {
    const sql = `SELECT 
                    d.url_id,
                    (SELECT 
                            JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                dwd.language_id,
                                                'driven_work_name',
                                                dwd.driven_work_name,
                                                'driven_work_info',
                                                dwd.driven_work_info))
                        FROM
                            driven_work_detail dwd
                        WHERE
                            dwd.driven_work_id = d.id) AS driven_work_detail
                FROM
                    driven_work d
                ORDER BY 
                    d.id
                LIMIT 18 OFFSET ?`;
    return db.query(sql, [offset]);
}



// fetch the specific driving work by uId
exports.findByUId = (uId) => {
    const sql = `SELECT 
                    d.url_id,
                    d.img,
                    (SELECT 
                            JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                dwd.language_id,
                                                'driven_work_name',
                                                dwd.driven_work_name,
                                                'driven_work_info',
                                                dwd.driven_work_info))
                        FROM
                            driven_work_detail dwd
                        WHERE
                            dwd.driven_work_id = d.id) AS driven_work_detail
                FROM
                    driven_work d
                WHERE 
                    d.url_id = ?`;
    return db.query(sql, [uId]);
}



exports.findDrivingUsingSearch = (search) => {
    const sql = `SELECT 
                    d.url_id,
                    d.img,
                    (SELECT 
                            JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                dwd.language_id,
                                                'driven_work_name',
                                                dwd.driven_work_name,
                                                'driven_work_info',
                                                dwd.driven_work_info))
                        FROM
                            driven_work_detail dwd
                        WHERE
                            dwd.driven_work_id = d.id) AS driven_work_detail
                FROM
                    driven_work d
                WHERE 
                    d.url_id LIKE  ?
                ORDER BY
                    d.url_id
                LIMIT 18 OFFSET 0`;
    return db.query(sql, [search, search]);

}


// get count of driving_work
exports.getCountDriven = () => {
    const sql = `SELECT 
                    COUNT(id) AS count
                FROM 
                    driven_work;`;
    return db.query(sql, []);
}