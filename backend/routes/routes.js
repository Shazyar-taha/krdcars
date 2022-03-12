const express = require('express');
const adsController = require('../controller/ads');
const carController = require('../controller/car');
const partController = require('../controller/part')
const problemController = require('../controller/problem');
const accountController = require('../controller/account');
const drivingController = require('../controller/driven_work');
const searchController = require('../controller/search');


const router = express.Router();


router.use('/account', accountController);

router.use('/ads', adsController);

router.use('/info', carController);

router.use('/info', partController);

router.use('/info', problemController);

router.use('/info', drivingController);

router.get('/search', searchController.search);


router.get('/contact/get-details', (req, res) => {
    res.send({
        brands: [{ id: 1, name: { kr: 'بمو', en: 'bmw' } }],
        carTypes: [{ id: 1, name: { kr: 'سپۆرت', en: 'sports' } }],
    })
})
router.get('/contact/get-models', (req, res) => {

    const { brandId } = req.body

    res.send({
        brands: [{ id: 1, name: { kr: 'بمو', en: 'bmw' } }],
    })
})




module.exports = router;