const adsModel = require('../model/ads');


exports.getAds = (req, res) => {
    let ads = [];
    let adsId = 0;
    let obj = {};
    adsModel.getAds((rows) => {
        rows.forEach((row) => {
            if (adsId != row.id) {
                adsId = row.id;
                obj = {
                    id: row.id,
                    ads_name: row.ads_name,
                    location: row.location,
                    img: row.img
                }
                ads.push();
            } else {

            }


        })
    })

}