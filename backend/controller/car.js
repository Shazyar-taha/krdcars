const router = require('express').Router();
const carModel = require('../model/car');
const router = require('../routes/routes');


// get car brand
router.get('/brand', (req, res) => {
    carModel.brands(1, (rows) => {
        res.send(rows);
    });
})


module.exports = router;