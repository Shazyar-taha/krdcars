const router = require('express').Router();
const carModel = require('../model/car');

// NOTE if languageId equals 1 that's English and that equals 2 that's kurdish

// get car brands
router.get('/cars', (req, res) => {
    // limit is 20
    const page = parseInt(req.query.page || 1);
    // offset
    let offset = 20 * (page - 1);

    // declare two arrays
    let brands = [];

    let urlId = 0;

    // getting data from car model 
    carModel.findAllBrand(offset).then(([rows, fieldData]) => {

        rows.forEach(row => {
            if (row.id != urlId) {

                urlId = row.id;
                // push the data to brands array
                brands.push({
                    url: row.url_name,
                    title: {
                        en: rows.find(r => r.id == row.id && r.language_id == 1).title,
                        kr: rows.find(r => r.id == row.id && r.language_id == 2).title
                    },
                    image: row.img
                });

            }
        });

        res.send(brands);

    }).catch((err) => {
        console.log(err);
    });

});

// get specific brands
router.get('/cars/:brandUId', (req, res) => {
    const brandUid = req.params.brandUId;
    let models = [];
    let modelUrl = '';
    carModel.findBrandByUId(brandUid).then(([brandRows, fieldData]) => {
        if (brandRows.length != 0) {
            carModel.findAllModelsByBrand(brandUid).then(([modelRows, fieldData]) => {
                // get all models and merge the model name with language
                modelRows.forEach(model => {
                    if (modelUrl.length == 0 || modelUrl != model.url_name) {
                        modelUrl = model.url_name;

                        models.push({
                            url: model.url_name,
                            title: {
                                en: modelRows.filter(r => r.url_name == model.url_name && r.language_id == 1)
                                    .map(r => r.model_name)[0],
                                kr: modelRows.filter(r => r.url_name == model.url_name && r.language_id == 2)
                                    .map(r => r.model_name)[0]
                            }

                        })
                    }
                });

                res.send({
                    brand: {
                        name: {
                            en: brandRows.find(row => row.language_id == 1).brand_name,
                            kr: brandRows.find(row => row.language_id == 2).brand_name
                        },
                        founder: {
                            en: brandRows.find(row => row.language_id == 1).founder_name,
                            kr: brandRows.find(row => row.language_id == 2).founder_name
                        },
                        founded: brandRows[0].founder_date,
                        headquarters: {
                            en: brandRows.find(row => row.language_id == 1).headquarters_location,
                            kr: brandRows.find(row => row.language_id == 2).headquarters_location
                        }
                    },
                    models
                });

            });
        } else {
            res.send({
                message: 'Sorry that brand is not available'
            })
        }
    }).catch((err) => {
        console.log(err);
    });

});


// get specific car 
router.get('/cars/:brandUid/:modelUid', async (req, res) => {
    const brandUid = req.params.brandUid,
        modelUid = req.params.modelUid;

    const year = parseInt(req.query.year || 0);

    console.log('the year is ' + year);

    if (year == 0) {
        carModel.findCarByModelByBrand(brandUid, modelUid)
            .then(([rows, fieldData]) => {
                if (rows.length != 0) {
                    carModel.findCarYearByModelByBrand(brandUid, modelUid).
                    then(([modelYears, fieldData]) => {

                        res.send({
                            name: {
                                en: rows.find(r => r.language_id == 1).car_name,
                                kr: rows.find(r => r.language_id == 2).car_name
                            },
                            brandName: {
                                en: rows.find(r => r.language_id == 1).brand_name,
                                kr: rows.find(r => r.language_id == 2).brand_name
                            },
                            carInformation: {
                                en: rows.find(r => r.language_id == 1).car_information,
                                kr: rows.find(r => r.language_id == 2).car_information
                            },
                            image: rows.find(r => r.language_id == 1).img,
                            carType: {
                                en: rows.find(r => r.language_id == 1).car_type_name,
                                kr: rows.find(r => r.language_id == 2).car_type_name
                            },
                            availableYears: modelYears.map(r => r.car_year)

                        });
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    res.send({
                        message: 'Sorry that brand with that model is not available'
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
    } else {
        carModel.findCarByYear(brandUid, modelUid, year)
            .then(([rows, fieldData]) => {
                if (rows.length != 0) {
                    carModel.findCarYearByModelByBrand(brandUid, modelUid).
                    then(([modelYears, fieldData]) => {

                        res.send({
                            name: {
                                en: rows.find(r => r.language_id == 1).car_name,
                                kr: rows.find(r => r.language_id == 2).car_name
                            },
                            brandName: {
                                en: rows.find(r => r.language_id == 1).brand_name,
                                kr: rows.find(r => r.language_id == 2).brand_name
                            },
                            carInformation: {
                                en: rows.find(r => r.language_id == 1).car_information,
                                kr: rows.find(r => r.language_id == 2).car_information
                            },
                            image: rows.find(r => r.language_id == 1).img,
                            carType: {
                                en: rows.find(r => r.language_id == 1).car_type_name,
                                kr: rows.find(r => r.language_id == 2).car_type_name
                            },
                            availableYears: modelYears.map(r => r.car_year)

                        });
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    res.send({
                        message: 'Please Check the model or year'
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
    }

})




module.exports = router;