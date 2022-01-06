const router = require('express').Router();
const partModel = require('../model/part');


// get all parts of car
router.get('/car-parts', (req, res) => {
    // get the page in query
    const page = parseInt(req.query.page || 1);
    // the limit is 20
    let offset = 20 * (page - 1);
    // to merge the data
    let partUid = '';


    partModel.findAll(offset).then(([rows, fieldData]) => {
        if (rows.length != 0) {
            // declare the array to stores the all parts
            let parts = [];
            // for each row
            rows.forEach(row => {
                // check
                if (partUid.length == 0 || partUid != row.name) {
                    // stores the last name field in row
                    partUid = row.name;
                    // push the data to parts array
                    parts.push({
                        url: row.name,
                        title: {
                            en: rows.find(r => r.name == row.name && r.language_id == 1).part_name,
                            kr: rows.find(r => r.name == row.name && r.language_id == 2).part_name
                        },
                        description: {
                            en: rows.find(r => r.name == row.name && r.language_id == 1).about,
                            kr: rows.find(r => r.name == row.name && r.language_id == 2).about
                        }
                    });
                }
            });

            // after that i send the parts
            res.send(parts);
        } else {
            res.send({
                message: 'you don\'t have any data in part of car'
            });
        }
    }).catch((err) => {
        console.log(err);
    })

});


// get a part of car by part id
router.get('/car-parts/:partUId', (req, res) => {
    const partUId = req.params.partUId;
    let oldPartUid = '';

    partModel.findPartByUId(partUId).then(([rows, field]) => {
        if (rows.length != 0) {

            rows.forEach((row) => {
                if (oldPartUid.length == 0 || oldPartUid != row.name) {
                    oldPartUid = row.name;

                    res.send({
                        name: {
                            en: rows.find(r => r.name == row.name && r.language_id == 1).part_name,
                            kr: rows.find(r => r.name == row.name && r.language_id == 2).part_name
                        },
                        description: {
                            en: rows.find(r => r.name == row.name && r.language_id == 1).about,
                            kr: rows.find(r => r.name == row.name && r.language_id == 2).about
                        },
                        image: row.img
                    })
                }
            })

        } else {
            res.send({
                message: 'Sorry we don\'t have that part'
            });
        }
    }).catch((err) => {
        console.log(err);
    })

});


module.exports = router;