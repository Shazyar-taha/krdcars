const db = require('./db');



// fetch all brands from brand table 
exports.findAllBrand = (offset) => {
    const sql = `SELECT 
                        b.url_id AS url,
                        b.brand_name AS title,
                        b.img AS image
                    FROM
                    brand b
                    ORDER BY 
                    b.brand_name
                    LIMIT 20 OFFSET ?;`;
    return db.query(sql, [offset]);
}

// get count of brand
exports.getCountBrand = () => {
    const sql = `SELECT 
                    COUNT(id) AS count
                FROM 
                    brand;`;
    return db.query(sql, []);
}

// fetch the specific brand using url name
exports.findBrandByUId = (uid) => {
    const sql = `SELECT 
                    b.brand_name,
                    CONCAT( '[',
                        GROUP_CONCAT(DISTINCT
                                JSON_OBJECT(
                                'founder_id', fd.founder_id,
                                'founder_name',  fd.founder_name,
                                'language_id', fd.language_id
                                )
                        )
                        , ']'
                    )AS founder
                    ,
                    b.found_date,
                    GROUP_CONCAT(DISTINCT
                        JSON_OBJECT(
                            'headquarter', bd.headquarters_location,
                            'language_id', bd.language_id
                            )
                    ) AS headquarter 
                FROM 
                    brand b
                INNER JOIN
                    brand_detail bd ON bd.brand_id = b.id
                INNER JOIN
                    founder_detail fd ON fd.brand_id = b.id
                WHERE 
                    b.url_id = ?`;
    return db.query(sql, [uid]);
}

exports.findFounderByBrandUid = (brandUid) =>{
    const sql = `(SELECT 
                CONCAT('[',
                        GROUP_CONCAT( JSON_OBJECT('founder_id',
                                    fd.founder_id,
                                    'founder_name',
                                    fd.founder_name,
                                    'language_id',
                                    fd.language_id)),
                        ']') AS founder_name_en,
                        '' as founder_name_kr
            FROM 
                founder_detail fd 
            INNER JOIN 
                brand b ON b.id = fd.brand_id
            WHERE 
                b.url_id = ? AND fd.language_id = 1
            ORDER BY fd.founder_id asc)
            UNION
            (SELECT 
                '' AS founder_name_en,
                CONCAT('[',
                        GROUP_CONCAT( JSON_OBJECT('founder_id',
                                    fd.founder_id,
                                    'founder_name',
                                    fd.founder_name,
                                    'language_id',
                                    fd.language_id)),
                        ']') AS founder_name_kr
                        
            FROM 
                founder_detail fd 
            INNER JOIN 
                brand b ON b.id = fd.brand_id
            WHERE 
                b.url_id = ? AND fd.language_id = 2
            ORDER BY fd.founder_id asc);`
    return db.query(sql, [brandUid, brandUid]);
}

// fetch the some brand by searching name
exports.findBrandBySearch = (search) => {
    const sql = `SELECT DISTINCT
                    u.name AS url,
                    b1.brand_name AS english,
                    b2.brand_name AS kurdish,
                    i.img AS image
                FROM
                    brand b
                        INNER JOIN
                    url u ON u.id = b.url_id
                        INNER JOIN
                    img i ON i.id = b.img_id
                        LEFT JOIN
                    brand b1 ON (b1.url_id = b.url_id
                        AND b1.language_id = 1)
                        LEFT JOIN
                    brand b2 ON (b2.url_id = b.url_id
                        AND b2.language_id = 2)
                WHERE
                    b.brand_name LIKE '%${search}%'
                        OR u.name LIKE '%${search}%'
                LIMIT 20 OFFSET 0;`;
    return db.query(sql, []);
}



// fetch the all models of a specific brand
exports.findCarByModelByBrand = (brandUid, modelUid) => {
    const sql = `SELECT 
                    br.brand_name,
                    c.car_name,
                    c.car_information,
                    ct.car_type_name,
                    c.language_id, 
                    i.img,
                    MAX(c.car_year) AS car_year
                FROM
                    car c
                INNER JOIN
                    car_type ct ON ct.id = c.car_type_id
                        AND ct.language_id = c.language_id
                INNER JOIN 
                    brand br ON br.id = c.brand_id 
                        AND br.language_id = c.language_id
                INNER JOIN 
                    model m ON m.id = c.model_id
                INNER JOIN 
                    url u_brand ON u_brand.id = br.url_id
                INNER JOIN 
                    url u_model ON u_model.id = m.url_id
                LEFT JOIN
                    img i ON i.id = c.img_id
                WHERE
                    (u_brand.name = ? AND u_model.name = ?)
                GROUP BY
                    c.car_name`;

    return db.query(sql, [brandUid, modelUid]);
}



// fetch the models using model name url name
exports.findAllModelsByBrand = (brandUId, offset) => {
    const sql = `SELECT 
                    m.url_id AS url,
                    m.model_name
                FROM 
                    model m 
                INNER JOIN
                    brand b ON b.id = m.brand_id
                WHERE 
                    b.url_id = ?
                LIMIT 20 OFFSET ?`;
    return db.query(sql, [brandUId, offset]);
}

// get count of model
exports.getCountModel = (brandUid) => {
    const sql = `SELECT 
                    COUNT(m.id) AS count
                FROM 
                    model m
                INNER JOIN 	
                    brand b ON b.id = m.brand_id
                WHERE 
                    b.url_id = ?`
    return db.query(sql, [brandUid]);
}

// fetch the models
exports.findModelBySearch = (search) => {
    const sql = `SELECT DISTINCT
                    um.name AS modelUrl,
                    ub.name AS brandUrl,
                    m1.model_name AS english,
                    m2.model_name AS kurdish
                FROM 
                    model m 
                INNER JOIN 
                    car c ON c.model_id = m.id
                INNER JOIN 
                    brand b ON b.id = c.brand_id
                INNER JOIN 
                    url um ON um.id = m.url_id
                INNER JOIN 
                    url ub ON ub.id = b.url_id
                LEFT JOIN 
                    model m1 ON (m1.url_id = m.url_id AND m1.language_id = 1)
                LEFT JOIN 
                    model m2 ON (m2.url_id = m.url_id AND m2.language_id = 2)
                WHERE 
                    m.model_name LIKE '%${search}%' 
                    OR um.name LIKE '%${search}%'
                LIMIT 20 OFFSET 0;`;

    return db.query(sql, []);
}

// fetch all years of the specific model and brand
exports.findCarYearByModelByBrand = (brandUid, modelUid) => {
    const sql = `SELECT DISTINCT
                    c.car_year
                FROM
                    car c
                        INNER JOIN
                    brand br ON br.id = c.brand_id
                        INNER JOIN
                    model m ON m.id = c.model_id
                        INNER JOIN
                    url u_brand ON u_brand.id = br.url_id
                        INNER JOIN
                    url u_model ON u_model.id = m.url_id
                WHERE
                    (u_brand.name = ?
                        AND u_model.name = ?);`;
    return db.query(sql, [brandUid, modelUid]);
}


// fetch a car by year, model and brand
exports.findCarByYear = (brandUid, modelUid, year) => {
    const sql = `SELECT 
                    br.brand_name,
                    c.car_name,
                    c.car_information,
                    ct.car_type_name,
                    c.language_id, 
                    i.img
                FROM
                    car c
                INNER JOIN
                    car_type ct ON ct.id = c.car_type_id
                        AND ct.language_id = c.language_id
                INNER JOIN 
                    brand br ON br.id = c.brand_id
                        AND br.language_id = c.language_id
                INNER JOIN 
                    model m ON m.id = c.model_id
                INNER JOIN 
                    url u_brand ON u_brand.id = br.url_id
                INNER JOIN 
                    url u_model ON u_model.id = m.url_id
                LEFT JOIN 
                    img i ON i.id = c.img_id
                WHERE
                    (u_brand.name = ? AND u_model.name = ?)
                    AND c.car_year = ?`;
    return db.query(sql, [brandUid, modelUid, year]);

}