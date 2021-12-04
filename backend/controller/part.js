const router = require('express').Router();
const partModel = require('../model/part');


// get all parts of car
router.get('/', (req, res) => {
    partModel.findAll(1).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    })
});


// get a part of car by part id
router.get('/part-id', (req, res) => {
    const partId = 1;
    partModel.findById({
        languageId: 1,
        partId: 1
    }).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    })
});


module.exports = router;