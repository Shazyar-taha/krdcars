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

// get count of brand
exports.getCountBrand = () => {
    const sql = `SELECT 
                    COUNT(b.id) AS count 
                FROM 
                    brand b
                INNER JOIN 
                    url u ON u.id = b.url_id
                LEFT JOIN
                    img i ON i.id = b.img_id`;
    return db.query(sql, []);
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
                    u_model.name, m.language_id ASC 
                    LIMIT 20 OFFSET ?`;
    return db.query(sql, [brandUId, offset]);
}

// get count of model
exports.getCountModel = (brandUid) => {
    const sql = `SELECT 
	COUNT(e.model_name) AS count
FROM 
	(SELECT 
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
		u_model.name, m.language_id ASC) e;`
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