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
                    LIMIT 18 OFFSET ?;`;
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
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('founder_id',
                                        fd.founder_id,
                                        'founder_name',
                                        fd.founder_name,
                                        'language_id',
                                        fd.language_id)),
                            ']') AS founder,
                    b.found_date,
                    CONCAT('[',
                    GROUP_CONCAT(DISTINCT JSON_OBJECT('headquarter',
                                bd.headquarters_location,
                                'language_id',
                                bd.language_id)
                                ), ']'
                            ) AS headquarter
                FROM
                    brand b
                        INNER JOIN
                    founder_detail fd ON fd.brand_id = b.id
                        INNER JOIN
                    brand_detail bd ON bd.brand_id = b.id
                WHERE
                    b.url_id = ?`;
    return db.query(sql, [uid]);
}


// fetch the some brand by searching name
exports.findBrandBySearch = (search) => {
    const sql = `SELECT 
                    b.url_id AS url,
                    b.brand_name AS title,
                    b.img AS image 
                FROM
                    brand b 
                WHERE 
                    b.brand_name LIKE ? OR b.url_id LIKE ?
                LIMIT 18 OFFSET 0`;
    return db.query(sql, [search, search]);
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
                INNER JOIN 
                    car c ON c.model_id = m.id
                WHERE 
                    b.url_id = ?
                LIMIT 18 OFFSET ?`;
    return db.query(sql, [brandUId, offset]);
}

// available years of car models
exports.findAvailableYearsByModel = (modelUid) =>{
    const sql = `SELECT 
                        c.car_year
                    FROM 
                        car c 
                    INNER JOIN 
                        model m ON m.id = c.model_id
                    WHERE 
                        m.url_id = ?
                    ORDER BY c.car_year ASC`;
    return db.query(sql, [modelUid]);
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
    const sql = `SELECT 
            m.url_id AS url,
            b.url_id AS brandUid,
            m.model_name AS title
        FROM
            model m
        INNER JOIN 
            brand b ON b.id = m.brand_id
        INNER JOIN 
            car c ON c.model_id = m.id
        WHERE 
            m.url_id LIKE ? OR m.model_name LIKE ?
        ORDER BY 
            m.model_name
        LIMIT 18 OFFSET 0`;

    return db.query(sql, [search, search]);
}

// fetch all years of the specific model and brand
exports.findCarYearByModelByBrand = (brandUid, modelUid) => {
    const sql = `SELECT 
                        b.brand_name,
                        c.car_year,
                        c.img,
                        CONCAT('[',
                                GROUP_CONCAT(DISTINCT JSON_OBJECT('type_name',
                                            ctd.type_name,
                                            'language_id',
                                            ctd.language_id)),
                                ']') AS car_info,
                        CONCAT('[',
                                GROUP_CONCAT(DISTINCT JSON_OBJECT('car_name',
                                            cd.car_name,
                                            'car_info',
                                            cd.car_info,
                                            'language_id',
                                            cd.language_id)),
                                ']') AS car_info
                    FROM
                        car c
                            INNER JOIN
                        model m ON m.id = c.model_id
                            INNER JOIN
                        brand b ON b.id = m.brand_id
                            INNER JOIN
                        car_detail cd ON cd.car_id = c.id
                    INNER JOIN 
                        car_type ct ON ct.id = c.car_type_id
                    INNER JOIN 
                        car_type_detail ctd ON ctd.car_type_id = ct.id
                    WHERE 
                        (m.url_id = ? AND b.url_id = ?);`;
    return db.query(sql, [modelUid, brandUid]);
}

// fetch the max year of car by model and brand 
exports.findCarByModelByBrand = (brandUid, modelUid) => {
    const sql = `SELECT 
                    b.brand_name,
                    MAX(c.car_year) AS car_year,
                    c.img,
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('type_name',
                                        ctd.type_name,
                                        'language_id',
                                        ctd.language_id)),
                            ']') AS car_type,
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('car_name',
                                        cd.car_name,
                                        'car_info',
                                        cd.car_info,
                                        'language_id',
                                        cd.language_id)),
                            ']') AS car_info
                FROM
                    car c
                        INNER JOIN
                    model m ON m.id = c.model_id
                        INNER JOIN
                    brand b ON b.id = m.brand_id
                        INNER JOIN
                    car_detail cd ON cd.car_id = c.id
                INNER JOIN 
                    car_type ct ON ct.id = c.car_type_id
                INNER JOIN 
                    car_type_detail ctd ON ctd.car_type_id = ct.id
                WHERE 
                    (m.url_id = ? AND b.url_id = ?)
                GROUP BY 
                    c.id;`;

    return db.query(sql, [modelUid, brandUid]);
}
// fetch a car by year, model and brand
exports.findCarByYear = (brandUid, modelUid, year) => {
    const sql = `SELECT 
                    b.brand_name,
                    c.car_year,
                    c.img,
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('type_name',
                                        ctd.type_name,
                                        'language_id',
                                        ctd.language_id)),
                            ']') AS car_type,
                    CONCAT('[',
                            GROUP_CONCAT(DISTINCT JSON_OBJECT('car_name',
                                        cd.car_name,
                                        'car_info',
                                        cd.car_info,
                                        'language_id',
                                        cd.language_id)),
                            ']') AS car_info
                FROM
                    car c
                        INNER JOIN
                    model m ON m.id = c.model_id
                        INNER JOIN
                    brand b ON b.id = m.brand_id
                        INNER JOIN
                    car_detail cd ON cd.car_id = c.id
                INNER JOIN 
                    car_type ct ON ct.id = c.car_type_id
                INNER JOIN 
                    car_type_detail ctd ON ctd.car_type_id = ct.id
                WHERE 
                    (m.url_id = ? AND b.url_id = ?) AND (c.car_year = ?)`;
    return db.query(sql, [modelUid, brandUid, year]);

}