const db = require('./db');


// get ads 
exports.getAds = () => {
    const sql = `SELECT 
                        ads.id,
                        ads.ads_name,
                        l.location_name,
                        ads_img.img
                    FROM 
                        ads 
                    INNER JOIN 
                        location l ON l.id = ads.location_id
                    INNER JOIN 
                        ads_img ON ads_img.ads_id = ads.id
                    WHERE 
                        ads.end_date >= curdate()`;
    return db.execute(sql);
}

// add the new ads
exports.addAds = (ads) => {
    const sql = "INSERT INTO ads(location_id,  ads_name, start_date, end_date, ads_price) VALUES (?, ?, ?, ?, ?)";
    return db.execute(sql, [ads.location_id, ads.name, ads.start_date, ads.end_date, ads.price]);
}


// add the new location
exports.addLocation = (location) => {
    const sql = "INSERT INTO location(location_name) VALUES(?)";

    return db.execute(sql, [location]);

}

// get locations
exports.getLocations = () => {
    return db.execute(`SELECT * FROM location`);
}