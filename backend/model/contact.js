const db = require('./db');

// NOTE I AM USING url_id INSTEAD OF id

// get brands 
exports.getBrands = () => {
    const sql = `SELECT 
                    brand_name, language_id, url_id 
                FROM 
                    brand
                ORDER BY 
                    id ASC`;

    return db.execute(sql);
}

// get carType
exports.getCarType = () => {
    const sql = "SELECT car_type_id, car_type_name, language_id FROM car_type";
    return db.execute(sql);
}


// get models by brand
exports.getModelsByBrand = (brandId) => {
    const sql = `SELECT 
                    m.model_name,
                    m.language_id,
                    m.url_id
                FROM
                    model m
                INNER JOIN 
                    brand b ON b.id = m.brand_id
                WHERE 
                    b.url_id = ?`;
    return db.execute(sql, [brandId]);
}

