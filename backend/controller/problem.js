const router = require('express').Router();
const problemModel = require('../model/problem');


// get all problems
router.get('/car-problem', (req, res) => {
    // get the page in query
    const page = parseInt(req.query.page || 1);
    // the limit is 20
    let offset = 20 * (page - 1);
    // to merge the data
    let problemUid = '';

    problemModel.findAll(offset).then(([rows, fieldData]) => {
        if (rows.length != 0) {

            // declare the array
            let problem = [];

            rows.forEach((row) => {

                if (problemUid.length == 0 || row.name != problemUid) {
                    problemUid = row.name;


                    problem.push({
                        url: row.name,
                        title: {
                            en: rows.find(r => r.name == problemUid && r.language_id == 1).problem_name,
                            kr: rows.find(r => r.name == problemUid && r.language_id == 2).problem_name
                        },
                        description: {
                            en: rows.find(r => r.name == problemUid && r.language_id == 1).about,
                            kr: rows.find(r => r.name == problemUid && r.language_id == 2).about
                        }
                    })

                }
            });

            res.send(problem);


        } else {
            res.send({
                message: 'Sorry We don\'t have any problem data'
            });
        }

    }).catch((err) => {
        console.log(err);
    })

});

// get a problem by problem u id
router.get('/car-problem/:problemUId', (req, res) => {
    // get
    const problemUid = req.params.problemUId;

    problemModel.findProblemByUId(problemUid).then(([rows, fieldData]) => {

        if (rows.length != 0) {

            let problem = {
                title: {
                    en: rows.find(r => r.language_id == 1).problem_name,
                    kr: rows.find(r => r.language_id == 2).problem_name
                },
                description: {
                    en: rows.find(r => r.language_id == 1).about,
                    kr: rows.find(r => r.language_id == 2).about
                },
                author: {
                    accountType: rows[0].permission,
                    name: rows[0].full_name,
                },
                img: rows[0].img
            }

            res.send(problem);
        } else {
            res.send({
                message: 'Not Found'
            })
        }

    }).catch((err) => {
        console.log(err);
    })

});


module.exports = router;