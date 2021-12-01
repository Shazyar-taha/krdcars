const router = require('express').Router()
const adsModel = require('../model/ads');

// get ads
router.get('/', (req, res) => {
    // creating three arrays 
    let info = [],
        imgs = [],
        ads = [];
    // to store ads_id
    let adsId = 0;

    // getting data from ads model 
    // i wanna execute one query to fetch data from ads table
    // and ads_img table and merge the data
    adsModel.getAds().then((rows, fieldData) => {

        rows[0].forEach((row) => {
            console.log(row);
            // if the id not equal adsId 
            if (adsId != row.id) {
                adsId = row.id;
                // push a ads info to info arrays
                info.push({
                    id: row.id,
                    ads_name: row.ads_name,
                    location: row.location_name
                });
            }
            // push a image to the imgs array
            imgs.push({
                id: row.id,
                img: row.img
            });
        });

        // after that for each info row push to the ads array
        // with filter to imgs array
        info.forEach(row => {
            ads.push({
                id: row.id,
                ads_name: row.ads_name,
                location: row.location,
                img: imgs.filter(img => img.id == row.id).map(img => img.img)
            });

        });
        // send the ads array
        res.send(ads);
    }).catch((err) => {
        console.log(err);
    })

})


module.exports = router;