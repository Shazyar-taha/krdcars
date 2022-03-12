const express = require('express');
const adsController = require('../controller/ads');
const carController = require('../controller/car');
const partController = require('../controller/part')
const problemController = require('../controller/problem');
const accountController = require('../controller/account');
const drivingController = require('../controller/driven_work');
const searchController = require('../controller/search');
const contactController = require('../controller/contact');

const router = express.Router();


router.use('/account', accountController);

router.use('/ads', adsController);

router.use('/info', carController);

router.use('/info', partController);

router.use('/info', problemController);

router.use('/info', drivingController);

router.get('/search', searchController.search);

router.use('/contact', contactController)




module.exports = router;