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

// get count of part
exports.getCountPart = () => {
    const sql = `SELECT 
                COUNT(p.id) AS count
            FROM 
                part p
            INNER JOIN 
                url u ON u.id = p.url_id`;
    return db.query(sql, []);
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
exports.findPartUsingSearch = (search) => {
    const sql = `SELECT DISTINCT
                    u.name As url,
                    p1.part_name AS english,
                    p2.part_name AS kurdish,
                    p1.about AS english_about,
                    p2.about AS kurdish_about
                FROM 
                    part p
                INNER JOIN 
                    url u ON u.id = p.url_id
                LEFT JOIN 
                    part p1 ON (p1.url_id = p.url_id AND p1.language_id = 1)
                LEFT JOIN 
                    part p2 ON (p2.url_id = p.url_id AND p2.language_id = 2)
                WHERE 
                    p.part_name LIKE '%${search}%' OR
                    u.name LIKE '%${search}%'
                LIMIT 20 OFFSET 0`;
    return db.query(sql, []);
}