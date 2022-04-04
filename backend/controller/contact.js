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

    console.log(req.body);
    console.log(req.user);
    


    res.send({
        message: 'SUCCESS' || 'FAILED'
    })
})


module.exports = router;