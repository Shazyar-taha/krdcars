const router = require('express').Router()
const adsModel = require('../model/ads');

// get ads
router.get('/', (req, res) => {
    let info = [];
    let imgs = [];
    let adsId = 0;
    let ads = [];
    adsModel.getAds((rows) => {
        rows.forEach((row) => {
            console.log('line 11');
            if (adsId != row.id) {
                adsId = row.id;
                info.push({
                    id: row.id,
                    ads_name: row.ads_name,
                    location: row.location_name
                });
            }
            // push the img
            imgs.push({
                id: row.id,
                img: row.img
            });
            console.log(imgs.length);
        });
        console.log(info);

        info.forEach(row => {
            ads.push({
                id: row.id,
                ads_name: row.ads_name,
                location: row.location,
                img: imgs.filter(img => img.id == row.id).map(img => img.img)
            });

        });



        res.send(ads);
    })
})


module.exports = router;