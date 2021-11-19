const express = require('express');
const ads = require('../controller/ads');
const car = require('../controller/car');

const router = express.Router();


router.use('/ads', ads);
router.use('/car', car);


module.exports = router;