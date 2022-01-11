const router = require('express').Router();
const drivenModel = require('../model/driven_work');


// get all driven works
router.get('/driving-works', (req, res) => {
    // get the page in query
    const page = parseInt(req.query.page || 1);
    // the limit is 20
    let offset = 20 * (page - 1);
    // to merge the data
    let drivingUid = '';

    drivenModel.findAll(offset).then(([rows, fieldData]) => {
        // declare the driving array
        if (rows.length != 0) {
            let driving = [];

            rows.forEach(row => {
                if (drivingUid.length == 0 || row.name != drivingUid) {
                    drivingUid = row.name;

                    driving.push({
                        url: row.name,
                        title: {
                            en: rows.find(r => r.name == drivingUid && r.language_id == 1).title,
                            kr: rows.find(r => r.name == drivingUid && r.language_id == 2).title
                        },
                        description: {
                            en: rows.find(r => r.name == drivingUid && r.language_id == 1).information,
                            kr: rows.find(r => r.name == drivingUid && r.language_id == 2).information
                        }
                    })
                }
            });

            res.send(driving);
        } else {
            res.send({
                message: 'Sorry We don\'t have any driving works data'
            });
        }
    }).catch((err) => console.log(err));

})

router.get('/driving-works/:uId', (req, res) => {

    drivenModel.findByUId(req.params.uId).then(([rows, fieldData]) => {

        if (rows.length > 0) {

            let drivingWorks = {

                title: {
                    en: rows.find(r => r.language_id == 1).title,
                    kr: rows.find(r => r.language_id == 2).title
                },
                description: {
                    en: rows.find(r => r.language_id == 1).info,
                    kr: rows.find(r => r.language_id == 2).info
                }

            };

            res.send(drivingWorks);

        } else {
            res.send({
                message: 'Sorry We don\'t have this data'
            });
        }



    }).catch((err) => console.log(err));

});

// search 



module.exports = router;