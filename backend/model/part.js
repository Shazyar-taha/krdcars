const db = require('./db');


// fetch all parts from part table
exports.findAll = (offset) => {
    const sql = ` SELECT 
                    p.url_id,
                    
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('part_name',
                                        pd.part_name,
                                        'part_info',
                                        pd.part_info,
                                        'language_id',
                                        pd.language_id)),
                            ']') AS part_detail
                FROM
                    part p
                        INNER JOIN
                    part_detail pd ON pd.part_id = p.id
                LIMIT 18 OFFSET ?`;
    return db.query(sql, [offset]);
}


// fetch part by url id 
exports.findPartByUId = (partUId) => {
    const sql = ` SELECT 
                    p.url_id,
                    p.img,
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('part_name',
                                        pd.part_name,
                                        'part_info',
                                        pd.part_info,
                                        'language_id',
                                        pd.language_id)),
                            ']') AS part_detail
                FROM
                    part p
                        INNER JOIN
                    part_detail pd ON pd.part_id = p.id
                WHERE 
                    p.url_id = ?`;

    return db.query(sql, [partUId]);

}

// fetch the part by search
exports.findPartUsingSearch = (search) => {
    const sql = `SELECT 
                        p.url_id,
                    CONCAT('[',
                        GROUP_CONCAT( JSON_OBJECT('part_name',
                                    pd.part_name,
                                    'part_info',
                                    pd.part_info,
                                    'language_id',
                                    pd.language_id)),
                        ']') AS part_detail
                    FROM 
                        part p 
                    INNER JOIN 
                        part_detail pd ON pd.part_id = p.id
                    WHERE 
                        p.url_id LIKE ? OR pd.part_name LIKE ?
                    LIMIT 18 OFFSET 0`;
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