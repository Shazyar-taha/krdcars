const express = require('express');
const adsController = require('../controller/ads');
const carController = require('../controller/car');
const partController = require('../controller/part')
const problemController = require('../controller/problem');
const accountController = require('../controller/account');


const router = express.Router();

router.use('/account', accountController);

router.use('/ads', adsController);

router.use('/info', carController);

router.use('/part', partController);

router.use('/problem', problemController);


module.exports = router;