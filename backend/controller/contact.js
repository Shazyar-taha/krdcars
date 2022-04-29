const router = require('express').Router()
const contact = require('../model/contact');


// NOTE I AM USING url_id TO brand and Model so 
// WE USE URL_ID IN THE object 


router.get("/get-details", async (req, res) => {

    // get all brands
    let [brands, brandsField] = await contact.getBrands();

    // get all car type
    let [carTypes, carTypesField] = await contact.getCarType();

    // changing car type name arraysto object 
    carTypes.forEach(carType => {
        let name = {}
        carType.name.forEach(type => name = { ...name, ...type })
        name.en = name.EN
        name.kr = name.KR
        delete name.EN
        delete name.KR
        carType.name = name
        return carType
    })

    // send response
    res.send({
        brand: brands,
        carType: carTypes
    });

});


router.get("/get-models/:brandId", async (req, res) => {
    // get brand id from a parameter
    const { brandId } = req.params;

    // get all models by brand
    let [models, modelsField] = await contact.getModelsByBrand(brandId);

    // send response
    res.send(models);

});


router.post('/send-contact', async (req, res) => {

    /**
     * @TODO : post datas from ad information
     */
    // must be like this:
    /* 
    {
        brand: 1,
        carType: 1,
        model: 19,
        year: '325325',
        kurdishInfo: 'dsvsgdsvsd',
        englishInfo: 'dsvsdvdsvsdv'
    }
    */

    let [carInfo, carInfoField] = await contact.addInfo(req.user, {
        brandId: req.body.brand,
        carTypeId: req.body.carType,
        modelId: req.body.model,
        carYear: req.body.year,
        img: ""
    });

    if (carInfo.affectedRows > 0) {
        //  english
        let [carDetail, carDetailField] = await contact.addCarInfo({
            sendCarId: carInfo.insertId,
            carInfo: req.body.englishInfo,
            languageId: 1
        });

        //  kurdish
        let [carDetail2, carDetailField2] = await contact.addCarInfo({
            sendCarId: carInfo.insertId,
            carInfo: req.body.kurdishInfo,
            languageId: 2
        });

        if (carDetail.affectedRows > 0 && carDetail2.affectedRows > 0) {
            res.send({

                message: "SUCCESS"
            });
        } else {
            res.send({
                message: "FAILED"
            });
        }
    }





})


module.exports = router;