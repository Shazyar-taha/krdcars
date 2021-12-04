const router = require('express').Router();
const carModel = require('../model/car');

// NOTE if languageId equals 1 that's English and that equals 2 that's kurdish

// get car brands
router.get('/brand', (req, res) => {
    carModel.brands(1).then(([rows, fieldData]) => {
        console.log(rows);
        res.send(rows);
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