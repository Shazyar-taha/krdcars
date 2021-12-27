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

// fetch all models from model table
exports.models = (languageId) => {
    const sql = `SELECT
                id, 
                model_name
                        FROM
                model
            WHERE language_id = ?`;
    return db.execute(sql, [languageId]);

}


// fetch cars by model
// the parameters contain languageId and modelId
exports.findCarByModel = (params) => {
    const sql = `SELECT 
    car.id,
	car.car_name,
    br.brand_name,
	m.model_name,
    ct.car_type_name,
    car.car_information,
    car.img,
    car.car_year
FROM
	car
INNER JOIN 
	brand br ON br.id = car.brand_id
INNER JOIN
	model m ON m.id = car.model_id
INNER JOIN	
	car_type ct ON ct.id = car.car_type_id
WHERE 
	language_id = ? AND m.id = ?`;
    return db.execute(sql, [params.languageId, params.modelId]);
}

// fetch a car by id
// the parameters contains languageId and carId
exports.findCarById = (params) => {
    const sql = `SELECT 
    car.id,
	car.car_name,
    br.brand_name,
	m.model_name,
    ct.car_type_name,
    car.car_information,
    car.img,
    car.car_year
FROM
	car
INNER JOIN 
	brand br ON br.id = car.brand_id
INNER JOIN
	model m ON m.id = car.model_id
INNER JOIN	
	car_type ct ON ct.id = car.car_type_id
WHERE 
	language_id = ? AND m.id = ?`;
    return db.execute(sql, [params.languageId, params.carId]);
}