const router = require('express').Router()
const contact = require('../model/contact');


router.get("/get-details", (req, res) => {
    const brands = [];
    const carTypes = [];
    let urlId = 0;
    let carTypeId = 0;

    contact.getBrands().then(([rows, fieldData]) => {

        rows.forEach(row => {

            if (row.url_id != urlId) {
                urlId = row.url_id;
                // push the data to brands array
                brands.push({
                    id: row.url_id,
                    name: {
                        en: rows.find(r => r.url_id == row.url_id && r.language_id == 1).brand_name,
                        kr: rows.find(r => r.url_id == row.url_id && r.language_id == 2).brand_name
                    }
                });
            }
        });


        contact.getCarType().then(([rows2, fields]) => {

            rows2.forEach((row) => {

                if (row.car_type_id != carTypeId) {
                    carTypeId = row.car_type_id;

                    carTypes.push({
                        id: row.car_type_id,
                        name: {
                            en: rows2.find(r => r.car_type_id == row.car_type_id && r.language_id == 1).car_type_name,
                            kr: rows2.find(r => r.car_type_id == row.car_type_id && r.language_id == 2).car_type_name
                        }
                    });

                }
            });

            // send the data
            res.send({
                brands: brands,
                carTypes: carTypes
            });
        }).catch((err) => console.log(err));

    }).catch((err) => console.log(err));




});


router.get("/get-models", (req, res) => {

    const { brandId } = req.body;
    console.log(brandId);
    const models = [];
    let urlId = 0;

    contact.getModelsByBrand(brandId).then(([rows, fieldData]) => {

        rows.forEach((row) => {

            if (row.url_id != urlId) {
                urlId = row.url_id;
                // i use url id insets as model id
                models.push({
                    id: row.url_id,
                    name: {
                        en: rows.find(r => r.url_id == row.url_id && r.language_id == 1).model_name,
                        kr: rows.find(r => r.url_id == row.url_id && r.language_id == 2).model_name
                    }
                });
            }



        });

        res.send(models);
    }).catch((err) => console.log(err));



})


module.exports = router;