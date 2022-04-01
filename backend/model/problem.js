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
                    LIMIT 18 OFFSET ?`;

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
    const sql = `SELECT 
                    p.url_id,
                CONCAT('[',
                    GROUP_CONCAT( JSON_OBJECT('problem_name',
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
                    p.url_id LIKE ? OR pd.problem_name LIKE ?
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