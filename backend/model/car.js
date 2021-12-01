const db = require('./db');


// fetch all brands from brand table 
exports.brands = (language_id) => {
    const sql = `SELECT 
	                id,
                    brand_name,
                    founder_name,
                    founder_date,
                    headquarters_location,
                    logo
                FROM 
                	brand 
                WHERE language_id = ?;`;
    return db.execute(sql, [language_id]);
}

// fetch all models from model table
exports.models = (language_id, cb) => {
    const sql = `SELECT 
	model_name
            FROM
	model
WHERE language_id = ?`;

    return db.execute(sql, [language_id]);

}


// fetch all cars from car table
exports.cars = (language_id) => {
    const sql = `SELECT 
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
	language_id = ?`;
    return db.execute(sql, [language_id]);
}