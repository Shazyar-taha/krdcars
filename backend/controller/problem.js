const router = require('express').Router();
const problemModel = require('../model/problem');


// get all problems
router.get('/', (req, res) => {
    problemModel.findAll(1).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    });
});

// get a problem by id
router.get('/problem-id', (req, res) => {
    const problemId = 1;

    problemModel.findProblemById({
        languageId: 1,
        problemId: problemId
    }).then(([rows, fieldData]) => {
        res.send(rows);
    }).catch((err) => {
        console.log(err);
    });
});


module.exports = router;