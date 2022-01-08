const db = require('./db');


// fetch all problem from problem table
exports.findAll = (offset) => {
    const sql = `SELECT 
                    u.name,
                    p.problem_name,
                    p.about,
                    p.language_id
                FROM 
                    problem p 
                INNER JOIN
                    url u ON u.id = p.url_id
                ORDER BY 
                    u.name, p.language_id
                LIMIT 20 OFFSET ?`;

    return db.query(sql, [offset]);
}

// fetch a problem using problem id 
exports.findProblemByUId = (problemUId) => {
    const sql = `SELECT 
                        p.problem_name,
                        p.about,
                        ac.full_name,
                        ac.permission,
                        i.img,
                        p.language_id
                     FROM 
                        problem p 
                    INNER JOIN 
                        url u ON u.id = p.url_id
                    INNER JOIN 
                        account ac ON ac.id = p.account_id
                    LEFT JOIN 
                        img i ON i.id = p.img_id
                    WHERE 
                        u.name = ?
                    ORDER BY 
                        u.name, p.language_id;`;

    return db.execute(sql, [problemUId]);
}