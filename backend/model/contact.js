const db = require('./db');



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
    const sql = "SELECT url_id, model_name, language_id FROM model WHERE brand_id = ?";
    return db.execute(sql, [brandId]);
}

