const router = require('express').Router();
const drivenModel = require('../model/driven_work');


// get all driven works
router.get('/', (req, res) => {
    drivenModel.findAll(1).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    })
})


// get all driven works by id
router.get('/drivenId', (req, res) => {
    const id = 1;
    drivenModel.findById({
        languageId: 1,
        id,
        id
    }).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    })
})


// to insert a driven work
router.post('/add-driven-work', (req, res) => {
    const params = {
        name: req.body.name,
        info: req.body.info,
        languageId: req.body.languageId
    };

    drivenModel.add(params).then(([rows]) => {
        res.send('added your data');
    }).catch((err) => {
        console.log(err);
    });
})

module.exports = router;