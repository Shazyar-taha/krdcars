const db = require('./db');



// fetch all brands from brand table 
exports.findAllBrand = (offset) => {
    const sql = `SELECT 
        url.id,
        url.name AS url_name,
        br.brand_name AS title,
        br.language_id,
        br.logo AS img
    FROM 
        brand br
    INNER JOIN 
        url ON url.id = br.url_id
    ORDER BY url.name, br.language_id ASC 
    LIMIT 20 OFFSET ?`;
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


// fetch the models using brand url name
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
                ORDER BY u_model.name, m.language_id ASC`;
    return db.query(sql, [brandUId]);
}


// fetch the all models of a specific brand
exports.findCarByModelByBrand = (brandUid, modelUid) => {
    const sql = `SELECT 
                    c.car_name,
                    c.car_information,
                    c.img, 
                    ct.car_type_name,
                    c.language_id, 
                    c.img,
                    MAX(c.car_year) AS car_year
                    
                FROM
                    car c
                INNER JOIN
                    car_type ct ON ct.id = c.car_type_id
                        AND ct.language_id = c.language_id
                INNER JOIN 
                    brand br ON br.id = c.brand_id
                INNER JOIN 
                    model m ON m.id = c.model_id
                INNER JOIN 
                    url u_brand ON u_brand.id = br.url_id
                INNER JOIN 
                    url u_model ON u_model.id = m.url_id
                WHERE
                    (u_brand.name = ? AND u_model.name = ?)
                GROUP BY
                    c.car_name`;

    return db.query(sql, [brandUid, modelUid]);
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
                c.car_name,
                c.car_information,
                c.img, 
                ct.car_type_name,
                c.language_id, 
                c.img
            FROM
                car c
            INNER JOIN
                car_type ct ON ct.id = c.car_type_id
                    AND ct.language_id = c.language_id
            INNER JOIN 
                brand br ON br.id = c.brand_id
            INNER JOIN 
                model m ON m.id = c.model_id
            INNER JOIN 
                url u_brand ON u_brand.id = br.url_id
            INNER JOIN 
                url u_model ON u_model.id = m.url_id
            WHERE
                (u_brand.name = ? AND u_model.name = ?)
                AND c.car_year = ?`;
    return db.query(sql, [brandUid, modelUid, year]);

}