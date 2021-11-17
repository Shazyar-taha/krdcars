const db = require('./db');


// get ads 
exports.getAds = (cb) => {
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

    db.query(sql, async (err, rows) => {
        if (err) throw err;
        await cb(rows);
    });

}

// add the new ads
exports.addAds = (ads, cb) => {
    const sql = "INSERT INTO ads(location_id,  ads_name, start_date, end_date, ads_price) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [ads.location_id, ads.name, ads.start_date, ads.end_date, ads.price], (err, rows) => {
        if (err) throw err;
        cb('Inserted');
    });

}


// add the new location
exports.addLocation = (location, cb) => {
    const sql = "INSERT INTO location(location_name) VALUES(?)";

    db.query(sql, [location], (err, rows) => {
        if (err) throw err;
        cb('Inserted');
    });

}

// get locations
exports.getLocations = (cb) => {
    db.query(`SELECT * FROM location`, (err, rows) => {
        if (err) throw err;
        cb(rows);
    });
}