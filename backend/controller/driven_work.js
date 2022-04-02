const router = require('express').Router();
const drivenModel = require('../model/driven_work');


// get all driven works
router.get('/driving-works', async (req, res) => {
    // get the page in query
    const page = parseInt(req.query.page || 1);
    // the limit is 20
    let offset = 18 * (page - 1);

    // get driven work
    let [dWorks, dWorkField] = await drivenModel.findAll(offset);

    // get count of driven work

    let [count, countField] = await drivenModel.getCountDriven();

    let pageCount = Math.ceil(count[0].count / 20);

    if (dWorks.length == 0 || dWorks[0].url_id == null) {
        return res.send({
            message: 'Sorry We don\'t have any driving works data'
        });
    }

    let dWorkSend = [];

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

    //sending data 
    res.send({
        data: dWorkSend,
        pageCount: pageCount
    });

})



router.get('/driving-works/:uId', async (req, res) => {
    
    let [dWorks, dWorkField] = await drivenModel.findByUId(req.params.uId);

    if (dWorks.length == 0 || dWorks[0].url_id == null) {
        return res.send({
            message: 'Not Found That Data'
        });
    }

    res.send({
        url: dWorks[0].url_id,
        image: dWorks[0].img,
            title: {
                en: dWorks[0].driven_work_detail.find(dd => dd.language_id == 1).driven_work_name,
                kr: dWorks[0].driven_work_detail.find(dd => dd.language_id == 2).driven_work_name
            },
            description: {
                en: dWorks[0].driven_work_detail.find(dd => dd.language_id == 1).driven_work_info,
                kr: dWorks[0].driven_work_detail.find(dd => dd.language_id == 2).driven_work_info
            }
    });



})

// search 



module.exports = router;