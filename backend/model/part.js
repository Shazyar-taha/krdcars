const db = require('./db');


// fetch all parts from part table
exports.findAll = (offset) => {
    const sql = ` SELECT
                    u.name,
                    p.part_name,
                    p.about,
                    p.language_id
                FROM
                    part p 
                INNER JOIN 
                    url u ON u.id = p.url_id
                ORDER BY u.name, p.language_id
                LIMIT 20 OFFSET ?`;
    return db.query(sql, [offset]);
}

// fetch part by url id 
exports.findPartByUId = (partUId) => {
    const sql = ` SELECT
                    u.name,
                    p.part_name,
                    p.about,
                    p.language_id,
                    i.img
                FROM
                    part p 
                INNER JOIN 
                    url u ON u.id = p.url_id
                LEFT JOIN 
                    img i ON i.id = p.img_id
                WHERE 
                    u.name = ?
                ORDER BY 
                    u.name, p.language_id`;

    return db.query(sql, [partUId]);

}

// fetch the part by search
exports.findPartUsingSearch = (partName, uId) => {
    const sql = `SELECT 
                u.name AS url,
                p.part_name,
                p.about AS info,
                p.language_id
            FROM 
                part p 
            INNER JOIN 
                url u ON u.id = p.url_id
            WHERE 
                p.part_name LIKE '%${partName}%' OR
                u.name LIKE '%${uId}%'
            ORDER BY
                p.language_id ASC
            LIMIT 20 OFFSET 0;`;
    return db.query(sql, []);
}