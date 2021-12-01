const router = require('express').Router();
const carModel = require('../model/car');



// get car brands
router.get('/brand', (req, res) => {
    carModel.brands(1).then(([rows, fieldData]) => {
        console.log(rows);
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    });

})


module.exports = router;