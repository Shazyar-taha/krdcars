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


exports.addInfo = (user, information) => {
    const sql = `INSERT INTO 
                    send_car_info (account_id, model_id, car_type_id, car_year, img)
                VALUES 
                    (?, ?, ?, ?, ?)`;
    return db.query(sql, [user.id, information.modelId, information.carTypeId, information.carYear, information.img]);
}


exports.addCarInfo = (carInfo) => {
    const sql = `INSERT INTO send_car_detail (send_car_id, car_name, car_info, language_id) VALUES (?, 
        (SELECT CONCAT(b.brand_name, '-', m.model_name) AS car_name
        FROM 
            brand b 
        INNER JOIN 
            model m ON m.brand_id = b.id)
        , ?, ?)`;

    return db.query(sql, [carInfo.sendCarId, carInfo.carName, carInfo.carInfo, carInfo.languageId]);
}

