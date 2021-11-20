const router = require('express').Router();
const carModel = require('../model/car');



// get car brand
router.get('/brand', (req, res) => {
    console.log('hello');
    carModel.brands(1, (rows) => {
        console.log(rows);
        res.send(rows);
    });
})


module.exports = router;