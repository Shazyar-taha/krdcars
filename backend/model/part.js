const db = require('./db');


// fetch all parts from part table
exports.findAll = (languageId) => {
    const sql = `SELECT 
                id,
                part_name,
                about,
                img
            FROM
                part
            WHERE language_id = ?`;
    return db.execute(sql, [languageId]);

}

// fetch part by id 
// the parameters contain languageId and partId
exports.findPartById = (params) => {
    const sql = `SELECT 
                    id,
                    part_name,
                    about,
                    img
                FROM
                    part
                WHERE language_id = ? AND id = ?`

    return db.execute(sql, [params.languageId, params.partId]);

}

// adding a part to part table
exports.addPart = (params) => {
    const sql = `INSERT INTO part(part_name, about, img, language_id)
    VALUES(?, ?, ?, ?)`;

    return db.execute(sql, [params.partName, params.about, params.img, params.languageId]);
}