const router = require('express').Router();
const partModel = require('../model/part');


// get all parts of car
router.get('/car-parts', async (req, res) => {
    // get the page in query
    const page = parseInt(req.query.page || 1);
    // the limit is 18
    let offset = 18 * (page - 1);

    let [parts, partField] = await partModel.findAll(offset);

    let partSend = [];

    // get count of all parts
    let [countPart, countField] = await partModel.getCountPart();

    

    let pageCount = Math.ceil(countPart[0].count / 20);

    if(parts.length == 0 || parts[0].url_id == null){
       return res.send({
            message: 'you don\'t have any data in part of car'
        });

    }   

    // flexing the data
    parts.forEach((p, i) =>{
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


    // sending the data
    res.send({
        data: partSend,
        pageCount: pageCount
        
    });

});


// get a part of car by part id
router.get('/car-parts/:partUId', async (req, res) => {
    const partUId = req.params.partUId;
    let oldPartUid = '';


    let [parts, partField] = await partModel.findPartByUId(partUId);

    if(parts.length == 0 || parts[0].url_id == null) {
        return res.send({
            message: 'you don\'t have any data in part of car'
        });
    }

    res.send({
            url: parts[0].url_id,
            title: { 
                en: parts[0].part_detail.find(pd => pd.language_id == 1).part_name,
                kr: parts[0].part_detail.find(pd => pd.language_id == 2).part_name
            },
            description: {
                en: parts[0].part_detail.find(pd => pd.language_id == 1).part_info,
                kr: parts[0].part_detail.find(pd => pd.language_id == 2).part_info
            },
            image: parts[0].img    
    });


});


module.exports = router;