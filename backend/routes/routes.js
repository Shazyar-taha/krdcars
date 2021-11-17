const express = require('express');
const ads = require('../controller/ads');

const router = express.Router();


router.get('/ads', ads.getAds);


module.exports = router;