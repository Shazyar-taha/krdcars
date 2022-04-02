const db = require('./db');


// fetch all parts from part table
exports.findAll = (offset) => {
    const sql = `SELECT 
                        p.url_id,
                        (SELECT 
                                JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                    pd.language_id,
                                                    'part_name',
                                                    pd.part_name,
                                                    'part_info',
                                                    pd.part_info))
                            FROM
                                part_detail pd
                            WHERE
                                pd.part_id = p.id) AS part_detail
                    FROM
                        part p
                    ORDER BY p.id
                    LIMIT 18 OFFSET ?`;
    return db.query(sql, [offset]);
}


// fetch part by url id 
exports.findPartByUId = (partUId) => {
    const sql = `SELECT 
                    p.url_id,
                    p.img,
                    (SELECT 
                            JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                pd.language_id,
                                                'part_name',
                                                pd.part_name,
                                                'part_info',
                                                pd.part_info))
                        FROM
                            part_detail pd
                        WHERE
                            pd.part_id = p.id) AS part_detail
                FROM
                    part p
                WHERE 
                    p.url_id = ?`;

    return db.query(sql, [partUId]);

}

// fetch the part by search
exports.findPartUsingSearch = (search) => {
    const sql = `SELECT
                        p.url_id,
                        (SELECT 
                                JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                    pd.language_id,
                                                    'part_name',
                                                    pd.part_name,
                                                    'part_info',
                                                    pd.part_info))
                            FROM
                                part_detail pd
                            WHERE
                                pd.part_id = p.id) AS part_detail
                    FROM
                        part p
                    WHERE 
                        p.url_id LIKE ? 
                    ORDER BY p.url_id 
                    LIMIT 18 OFFSET 0;`;
    return db.query(sql, [search, search]);
}


// get count of part
exports.getCountPart = () => {
    const sql = `SELECT 
                        COUNT(p.id) AS count
                    FROM
                        part p;`;
    return db.query(sql, []);
}