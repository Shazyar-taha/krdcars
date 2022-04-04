const router = require('express').Router();
const carModel = require('../model/car');

// NOTE if languageId equals 1 that's English and that equals 2 that's kurdish

// get car brands
router.get('/cars', async (req, res) => {
    // limit is 18
    const page = parseInt(req.query.page || 1);
    // offset
    let offset = 18 * (page - 1);
    // get the brands
    let [brands, brandField] = await carModel.findAllBrand(offset);
    // get the count of brands
    let [count, countField] = await carModel.getCountBrand();

    // calculate the total page
    let pageCount = Math.ceil(count[0].count / 18);

    res.send({
        pageCount: pageCount,
        data: brands
    });


});

// get specific brands
router.get('/cars/:brandUId', async (req, res) => {
    // brand url id
    const brandUid = req.params.brandUId;
    // limit is 18
    const page = parseInt(req.query.page || 1);
    // offset
    let offset = 18 * (page - 1);
    // get the a brand
    let [brands, brandField] = await carModel.findBrandByUId(brandUid);
    // get models of the specific brand
    let [models, modelsField] = await carModel.findAllModelsByBrand(brandUid, offset);
    // get count of models
    let [count, countField] = await carModel.getCountModel(brandUid);

    // get founders from the brand
    let founders = JSON.parse(brands[0].founder);

    let foundersSend = [];
    // fixing the founder
    founders.forEach(founder => {
        if (founder.language_id == 1) {
            foundersSend.push({
                en: founder.founder_name,
                kr: founders.find(f => f.founder_id == founder.founder_id && f.language_id == 2).founder_name
            });
        }
    });

    let brandSend = {

        brand: {
            name: brands[0].brand_name,
            founder: foundersSend,
            founded: brands[0].found_date,
            headquarters: {
                en: JSON.parse(brands[0].headquarter).find(h => h.language_id == 1).headquarter,
                kr: JSON.parse(brands[0].headquarter).find(h => h.language_id == 2).headquarter
            },
        },
        models: models,
        pageCount: Math.ceil(count[0].count / 18)
    }


    // sending data
    res.send(brandSend);
});


// get specific car 
router.get('/cars/:brandUid/:modelUid', async (req, res) => {
    const brandUid = req.params.brandUid,
        modelUid = req.params.modelUid;

    const year = parseInt(req.query.year || 0);

    console.log('the year is ' + year);

    if (year == 0) {

        let [cars, carsField] = await carModel.findCarByModelByBrand(brandUid, modelUid);

        let [availableYears, availableYearsField] = await carModel.findAvailableYearsByModel(modelUid);

        let carSend;

        if (cars.length != 0) {
            carSend = {
                name: {
                    en: JSON.parse(cars[0].car_info).find(c => c.language_id == 1).car_name,
                    kr: JSON.parse(cars[0].car_info).find(c => c.language_id == 2).car_name
                },
                brandName: cars[0].brand_name,
                carInformation: {
                    en: JSON.parse(cars[0].car_info).find(c => c.language_id == 1).car_info,
                    kr: JSON.parse(cars[0].car_info).find(c => c.language_id == 2).car_info
                },
                image: cars[0].img,
                carType: {
                    en: JSON.parse(cars[0].car_type).find(c => c.language_id == 1).type_name,
                    kr: JSON.parse(cars[0].car_type).find(c => c.language_id == 2).type_name
                },
                availableYears: availableYears.map(c => c.car_year)
            };

            res.send(carSend);
        } else {
            res.send({
                message: 'Sorry that brand with that model is not available'
            });
        }

    } else {
        let [cars, carsField] = await carModel.findCarByYear(brandUid, modelUid, year);

        let [availableYears, availableYearsField] = await carModel.findAvailableYearsByModel(modelUid);



        let carSend;

        if (cars.length != 0) {
            carSend = {
                name: {
                    en: JSON.parse(cars[0].car_info).find(c => c.language_id == 1).car_name,
                    kr: JSON.parse(cars[0].car_info).find(c => c.language_id == 2).car_name
                },
                brandName: cars[0].brand_name,
                carInformation: {
                    en: JSON.parse(cars[0].car_info).find(c => c.language_id == 1).car_info,
                    kr: JSON.parse(cars[0].car_info).find(c => c.language_id == 2).car_info
                },
                image: cars[0].img,
                carType: {
                    en: JSON.parse(cars[0].car_type).find(c => c.language_id == 1).type_name,
                    kr: JSON.parse(cars[0].car_type).find(c => c.language_id == 2).type_name
                },
                availableYears: availableYears.map(c => c.car_year)
            };

            res.send(carSend);
        } else {
            res.send({
                message: 'Sorry that brand with that model is not available'
            });

        }
    }

})




module.exports = router;