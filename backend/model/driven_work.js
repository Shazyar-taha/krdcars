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
    const sql = `SELECT 
                    p.url_id,
                    CONCAT('[',
                            GROUP_CONCAT(JSON_OBJECT('driven_work_name',
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
                    p.url_id LIKE ? OR pd.driven_work_name LIKE ?
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