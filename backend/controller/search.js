const drivenModel = require('../model/driven_work');
const carModel = require('../model/car');
const problemModel = require('../model/problem');
const partModel = require('../model/part');



exports.search = async (req, res) => {
    let query = req.query.query || '';
    

    if (query != '') {
        // fixing query
        query = '%' + query + '%';
        // get brand    
        let [brands, brandField] = await carModel.findBrandBySearch(query);

        // get models 
        let [models, modelFiled] = await carModel.findModelBySearch(query);
        let modelsSend = []

        // quick fix for models preview in search
        modelsSend = models.map(model => {
            return {
                ...model,
                title:{
                    en: model.title,
                    kr: model.title,
                }
            }
        })
        
        // get parts
        let [parts, partField] = await partModel.findPartUsingSearch(query);
        // declare partSend array
        let partSend = [];

        // flexing the data
        parts.forEach((p, i) => {
            partSend.push({
                url: p.url_id,
                title: {
                    en: p.part_detail.find(pd => pd.language_id == 1).part_name,
                    kr: p.part_detail.find(pd => pd.language_id == 2).part_name
                },
                description: {
                    en: p.part_detail.find(pd => pd.language_id == 1).part_info,
                    kr: p.part_detail.find(pd => pd.language_id == 2).part_info
                }

            })

        });


        // get problems 
        let [problems, problemField] = await problemModel.findProblemUsingSearch(query);
        // declare problemSend array
        let problemSend = [];
        // flexing the data
        problems.forEach(p => {
            problemSend.push({
                url: p.url_id,
                title: {
                    en: p.problem_detail.find(pd => pd.language_id == 1).problem_name,
                    kr: p.problem_detail.find(pd => pd.language_id == 2).problem_name
                },
                description: {
                    en: p.problem_detail.find(pd => pd.language_id == 1).problem_info,
                    kr: p.problem_detail.find(pd => pd.language_id == 2).problem_info
                }
            });
        });



        // get all driving works
        let [dWorks, dWorkField] = await drivenModel.findDrivingUsingSearch(query);
        // declare dWorkSend array
        let dWorkSend = [];
        // flexing the data
        dWorks.forEach(d => {
            dWorkSend.push({
                url: d.url_id,
                title: {
                    en: d.driven_work_detail.find(dd => dd.language_id == 1).driven_work_name,
                    kr: d.driven_work_detail.find(dd => dd.language_id == 2).driven_work_name
                },
                description: {
                    en: d.driven_work_detail.find(dd => dd.language_id == 1).driven_work_info,
                    kr: d.driven_work_detail.find(dd => dd.language_id == 2).driven_work_info
                }
            })
        });

        // send the result
        res.send({
            brands: brands,
            models: modelsSend,
            parts: partSend,
            problems: problemSend,
            drivingWorks: dWorkSend
        });

    } else {
        res.send({
            message: 'please write the query to fetch the data'
        })
    }


};