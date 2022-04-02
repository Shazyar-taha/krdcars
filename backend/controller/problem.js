const router = require('express').Router();
const problemModel = require('../model/problem');


// get all problems
router.get('/car-problems', async (req, res) => {
    // get the page in query
    const page = parseInt(req.query.page || 1);
    // the limit is 18
    let offset = 18 * (page - 1);

    // get the problems
    let [problems, problemField] = await problemModel.findAll(offset);
    // get the count of problem
    let [problemCount, countField] = await problemModel.getProblemCount();
    // prepare the page count
    let pageCount = Math.ceil(problemCount[0].count / 20);

    
    if (problems.length == 0 || problems[0].url_id == null) {
        return res.send({
            message: 'Sorry We don\'t have any problem data'
        });
    }

    let problemSend = [];

    problems.forEach(p => {
        problemSend.push({
            url_id: p.url_id,
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

    // sending the data
    res.send({
        data: problemSend,
        pageCount: pageCount
    });

});

// get a problem by problem u id
router.get('/car-problems/:problemUId', async (req, res) => {
    // get the parameter
    const problemUid = req.params.problemUId;
    // get the problem
    let [problems, problemField] = await problemModel.findProblemByUId(problemUid);


    if (problems.length == 0 || problems[0].url_id == null) {
        return  res.send({
            message: 'Not found that problem'
        });
    }

    res.send({
        url_id: problems[0].url_id,
        image: problems[0].img,
        title: {
            en: problems[0].problem_detail.find(pd => pd.language_id == 1).problem_name,
            kr: problems[0].problem_detail.find(pd => pd.language_id == 2).problem_name
        },
        description: {
            en: problems[0].problem_detail.find(pd => pd.language_id == 1).problem_info,
            kr: problems[0].problem_detail.find(pd => pd.language_id == 2).problem_info
        }
    });
});


module.exports = router;