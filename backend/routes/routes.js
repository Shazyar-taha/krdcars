const express = require('express');
const adsController = require('../controller/ads');
const carController = require('../controller/car');
const partController = require('../controller/part')
const problemController = require('../controller/problem');

const router = express.Router();


router.use('/ads', adsController);

router.use('/car', carController);

router.use('/part', partController);

router.use('/problem', problemController);


module.exports = router;