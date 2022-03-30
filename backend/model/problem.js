const db = require('./db');


// fetch all problem from problem table
exports.findAll = (offset) => {
    const sql = `SELECT 
                        p.url_id,
                        
                        CONCAT('[',
                                GROUP_CONCAT(DISTINCT JSON_OBJECT('problem_name',
                                            pd.problem_name,
                                            'problem_info',
                                            pd.problem_info,
                                            'language_id',
                                            pd.language_id)),
                                ']') AS problem_detail
                    FROM
                        problem p
                            INNER JOIN
                        problem_detail pd ON pd.problem_id = p.id
                    LIMIT 20 OFFSET ?`;

    return db.query(sql, [offset]);
}


// fetch a problem using problem id 
exports.findProblemByUId = (problemUId) => {
    const sql = `SELECT 
                    p.url_id,
                    p.img,
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('problem_name',
                                        pd.problem_name,
                                        'problem_info',
                                        pd.problem_info,
                                        'language_id',
                                        pd.language_id)),
                            ']') AS problem_detail
                FROM
                    problem p
                        INNER JOIN
                    problem_detail pd ON pd.problem_id = p.id
                WHERE 
                    p.url_id = ?`;

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



// get count of problem
exports.getProblemCount = () => {
    const sql = `SELECT 
                COUNT(p.id) AS count
            FROM
                problem p;`;
    return db.query(sql, []);
}