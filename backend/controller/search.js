const drivenModel = require('../model/driven_work');
const carModel = require('../model/car');
const problemModel = require('../model/problem');
const partModel = require('../model/part');



exports.search = async (req, res) => {
    const query = req.query.query || '';
    // declare the result of the array
    let results = {
        brands: [],
        models: [],
        parts: [],
        problems: [],
        drivingWorks: []
    };

    if (query != '') {

        // get brand    
        let [brands, brandField] = await carModel.findBrandBySearch(query);

        // push all brand to the result
        brands.forEach((row) => {
            results.brands.push({
                url: row.url,
                title: {
                    en: row.english,
                    kr: row.kurdish
                },
                image: row.image
            });
        });


        // get models 
        let [models, modelFiled] = await carModel.findModelBySearch(query);
        // push all model to the results
        models.forEach(row => {
            results.models.push({
                url: row.modelUrl,
                brandUid: row.brandUrl,
                title: {
                    en: row.english,
                    kr: row.kurdish
                }
            });
        });

        // get parts
        let [parts, partField] = await partModel.findPartUsingSearch(query);
        // push the all part to the result
        parts.forEach((row) => {
            results.parts.push({
                url: row.url,
                title: {
                    en: row.english,
                    kr: row.kurdish
                },
                description: {
                    en: row.english_about,
                    kr: row.kurdish_about
                }
            });
        });

        // get problems 
        let [problems, problemField] = await problemModel.findProblemUsingSearch(query);
        // push the problems to the result
        problems.forEach((row) => {
            results.problems.push({
                url: row.url,
                title: {
                    en: row.english,
                    kr: row.kurdish
                },
                description: {
                    en: row.english_about,
                    kr: row.kurdish_about
                }
            });
        });

        // get all driving works
        let [drivings, drivingFiled] = await drivenModel.findDrivingUsingSearch(query);

        // push all the driving to the result
        drivings.forEach((row) => {
            results.drivingWorks.push({
                url: row.url,
                title: {
                    en: row.english,
                    kr: row.kurdish
                },
                description: {
                    en: row.english_des,
                    kr: row.kurdish_des
                }
            })
        });


        res.send(results);
    } else {
        res.send({
            message: 'please write the query to fetch the data'
        })
    }


};