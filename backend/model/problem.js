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

// get count of problem
exports.getProblemCount = () => {
    const sql = `SELECT 
                    COUNT(p.id) AS count
                FROM 
                    problem p
                INNER JOIN 
                    url u ON u.id = p.url_id`;
    return db.query(sql, []);
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

// fetch some problem using search
exports.findProblemUsingSearch = (search) => {
    const sql = `SELECT DISTINCT
                    u.name As url,
                    p1.problem_name AS english,
                    p2.problem_name AS kurdish,
                    p1.about AS english_about,
                    p2.about AS kurdish_about
                FROM 
                    problem p
                INNER JOIN 
                    url u ON u.id = p.url_id
                LEFT JOIN 
                    problem p1 ON (p1.url_id = p.url_id AND p1.language_id = 1)
                LEFT JOIN 
                    problem p2 ON (p2.url_id = p.url_id AND p2.language_id = 2)
                WHERE 
                    p.problem_name LIKE '%${search}%' OR
                    u.name LIKE '%${search}%'
                LIMIT 20 OFFSET 0`;

    return db.query(sql, []);
}