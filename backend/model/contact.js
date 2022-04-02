const db = require('./db');


// get brands 
exports.getBrands = () => {
    const sql = `SELECT 
                    id,
                    brand_name AS name
                FROM
                    brand
                ORDER BY 
                    brand_name ASC`;

    return db.query(sql);
}

// get carType
exports.getCarType = () => {
    const sql = `SELECT 
                    ct.id,
                    (SELECT 
                            JSON_ARRAYAGG(JSON_OBJECT(l.short_name, cd.type_name))
                        FROM
                            car_type_detail cd
                                INNER JOIN
                            language l ON l.id = cd.language_id
                        WHERE
                            cd.car_type_id = ct.id) AS name
                FROM
                    car_type ct
                ORDER BY ct.id`;
    return db.query(sql);
}


// get models by brand
exports.getModelsByBrand = (brandId) => {
    const sql = `SELECT 
                        id,
                        model_name AS name
                    FROM 
                        model 
                    WHERE 
                        brand_id = ?
                    ORDER BY 
                        model_name`;
    return db.query(sql, [brandId]);
}

