const db = require('./db');


// fetch all problem from problem table
exports.findAll = (languageId) => {
    const sql = `SELECT 
                p.id,
                p.problem_name,
                p.about,
                p.img,
                ac.full_name,
                ac.permission
            FROM 
                problem p
            INNER JOIN 
                account ac ON ac.id = p.account_id 
            WHERE p.language_id = ?`;

    return db.execute(sql, [language_id]);
}

// fetch a problem using problem id 
exports.findProblemById = (params) => {
    const sql = `SELECT 
                p.id,
                p.problem_name,
                p.about,
                p.img,
                ac.full_name,
                ac.permission
            FROM 
                problem p
            INNER JOIN 
                account ac ON ac.id = p.account_id 
            WHERE p.language_id = ? AND p.id = ?`;

    return db.execute(sql, [params.languageId, params.problemId]);
}