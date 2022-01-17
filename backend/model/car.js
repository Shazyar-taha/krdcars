const db = require('./db');



// fetch all brands from brand table 
exports.findAllBrand = (offset) => {
    const sql = `SELECT 
                    url.id,
                    url.name AS url_name,
                    br.brand_name AS title,
                    br.language_id,
                    i.img
                FROM 
                    brand br
                INNER JOIN 
                    url ON url.id = br.url_id
                LEFT JOIN 
                    img i ON i.id = br.img_id
                ORDER BY 
                    url.name, br.language_id ASC 
                LIMIT  20 OFFSET ?`;
    return db.query(sql, [offset]);
}

// fetch the specific brand using url name
exports.findBrandByUId = (uid) => {
    const sql = `SELECT
                    br.brand_name,
                    br.founder_name,
                    br.founder_date,
                    br.headquarters_location,
                    br.language_id
                FROM
                    brand br
                INNER JOIN 
                    url ON url.id = br.url_id
                WHERE 
                    url.name = ?
                ORDER BY br.language_id`;
    return db.query(sql, [uid]);
}

// fetch the some brand by searching name
exports.findBrandBySearch = (brandName, uId) => {
    const sql = `SELECT 
                u.name AS url,
                b.brand_name AS title,
                i.img AS image,
                b.language_id
            FROM 
                brand b
            INNER JOIN 
                url u ON u.id = b.url_id
            LEFT JOIN 
                img i ON i.id = b.img_id
            WHERE 
                b.brand_name LIKE '%${brandName}%' OR
                u.name LIKE '%${uId}%'
            ORDER BY 
                b.language_id ASC
            LIMIT 20 OFFSET 0;`
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
exports.findAllModelsByBrand = (brandUId) => {
    const sql = `SELECT 
                    u_model.name AS url_name,
                    m.model_name,
                    m.language_id
                FROM 
                    car 
                INNER JOIN 
                    model m ON m.id = car.model_id
                INNER JOIN 
                    url u_model ON u_model.id = m.url_id
                INNER JOIN 
                    brand b ON b.id = car.brand_id
                INNER JOIN 
                    url u_brand ON u_brand.id = b.url_id 
                WHERE 
                    u_brand.name = ?
                ORDER BY 
                    u_model.name, m.language_id ASC`;
    return db.query(sql, [brandUId]);
}

// fetch the models
exports.findModelBySearch = (search) => {
    const sql = `SELECT 
                u.name AS model_url,
                m.model_name AS title,
                ub.name AS brand_url,
                m.language_id
            FROM 
                car c
            INNER JOIN 
                model m ON m.id = c.model_id
            INNER JOIN 
                brand b ON b.id = c.brand_id
            INNER JOIN 
                url u ON u.id = m.url_id
            INNER JOIN 
                url ub ON ub.id = b.url_id
            WHERE 
                m.model_name LIKE '%${modelName}%' OR
                u.name LIKE '%${uId}%'
            ORDER BY 
                m.language_id ASC
            LIMIT 20 OFFSET 0`;

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