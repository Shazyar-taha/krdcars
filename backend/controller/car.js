const router = require('express').Router();
const carModel = require('../model/car');

// NOTE if languageId equals 1 that's English and that equals 2 that's kurdish

// get car brands
router.get('/cars/brand', (req, res) => {
    console.log(res.params.branduid);
    // limit is 20
    const page = parseInt(req.query.page || 1);
    // offset
    let offset = 20 * (page - 1);

    // declare two arrays
    let brands = [],
        titles = [],
        objects = [];

    let urlId = 0;


    // getting data from car model 
    carModel.findAllBrand(offset).then(([rows, fieldData]) => {
        // i wanna create array of the object which object is this
        // {url: name, value: {en: value, kr: value}, img: value}
        // so we gotta do this
        rows.forEach(row => {

            if (row.id != urlId) {

                urlId = row.id;
                // push the data to brands array
                brands.push({
                    id: row.id,
                    url: row.url_name,
                    img: row.img
                });

            }

            // pushing data to titles array
            titles.push({
                url_id: row.id,
                title: row.title,
                language_id: row.language_id
            });

        });

        // after that i creating the new array and send it
        // for each brand
        brands.forEach(brand => {
            objects.push({
                url: brand.url,
                title: {
                    en: titles.filter(t => t.url_id == brand.id && t.language_id == 1).map(t => t.title)[0],
                    kr: titles.filter(t => t.url_id == brand.id && t.language_id == 2).map(t => t.title)[0]
                },
                img: brand.img
            });
        });

        res.send(objects);

    }).catch((err) => {
        console.log(err);
    });

});

// get specific brands
router.get('/cars/brand:brandUId', (req, res) => {
    const urlName = req.params.brandUId;

    carModel.findBrandByUId(urlName).then(([rows, fieldData]) => {

        res.send({
            brand: {
                name: {
                    en: rows.filter(row => row.language_id = 1).map(row => row.brand_name)[0],
                    kr: rows.filter(row => row.language_id = 2).map(row => row.brand_name)[0]
                },
                founderName: {
                    en: rows.filter(row => row.language_id = 1).map(row => row.founder_name)[0],
                    kr: rows.filter(row => row.language_id = 2).map(row => row.founder_name)[0]
                },
                foundDate: rows[0].founder_date,
                headquartersLocation: {
                    en: rows.filter(row => row.language_id = 1).map(row => row.headquarters_location)[0],
                    kr: rows.filter(row => row.language_id = 2).map(row => row.headquarters_location)[0]
                }
            },
            model: {

            }
        });


    }).catch((err) => {
        console.log(err);
    });

});




// get car models
router.get('/model', (req, res) => {
    carModel.models(1).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    })
})


// get cars by model id
router.get('/car-models', (req, res) => {
    const modelId = 1;

    carModel.findCarByModel({
        languageId: 1,
        modelId: modelId
    }).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    });


})

// get car by car id
router.get('/car', (req, res) => {
    const carId = 1;
    carModel.findCarById({
        languageId: 1,
        carId: 1
    }).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    });
})


module.exports = router;