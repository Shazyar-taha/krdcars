const db = require('./db');


// fetch all problem from problem table
exports.findAll = (offset) => {
    const sql = `SELECT 
                    p.url_id,
                    (SELECT 
                            JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                pd.language_id,
                                                'problem_name',
                                                pd.problem_name,
                                                'problem_info',
                                                pd.problem_info))
                        FROM
                            problem_detail pd
                        WHERE
                            pd.problem_id = p.id) AS problem_detail
                FROM
                    problem p
                ORDER BY p.id
                LIMIT 18 OFFSET 0;`;

    return db.query(sql, [offset]);
}


// fetch a problem using problem id 
exports.findProblemByUId = (problemUId) => {
    const sql = `SELECT 
                    p.url_id,
                    p.img,
                    (SELECT 
                            JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                pd.language_id,
                                                'problem_name',
                                                pd.problem_name,
                                                'problem_info',
                                                pd.problem_info))
                        FROM
                            problem_detail pd
                        WHERE
                            pd.problem_id = p.id) AS problem_detail
                FROM
                    problem p
                WHERE 
                    p.url_id = ?`;

    return db.execute(sql, [problemUId]);
}

// fetch some problem using search
exports.findProblemUsingSearch = (search) => {
    const sql = `SELECT 
                        p.url_id,
                        p.img,
                        (SELECT 
                                JSON_ARRAYAGG(JSON_OBJECT('language_id',
                                                    pd.language_id,
                                                    'problem_name',
                                                    pd.problem_name,
                                                    'problem_info',
                                                    pd.problem_info))
                            FROM
                                problem_detail pd
                            WHERE
                                pd.problem_id = p.id) AS problem_detail
                    FROM
                        problem p
                    WHERE 
                        p.url_id LIKE  ?
                    ORDER BY 
                        p.url_id
                    LIMIT 18 OFFSET 0`;

    return db.query(sql, [search, search]);
}



// get count of problem
exports.getProblemCount = () => {
    const sql = `SELECT 
                COUNT(p.id) AS count
            FROM
                problem p;`;
    return db.query(sql, []);
}