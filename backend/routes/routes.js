const express = require('express');
const ads = require('../controller/ads');
const car = require('../controller/car');

const router = express.Router();


router.get('/ads', ads.getAds);

router.get('/brand', car.EnBrands);


module.exports = router;