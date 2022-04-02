const router = require('express').Router()
const contact = require('../model/contact');


// NOTE I AM USING url_id TO brand and Model so 
// WE USE URL_ID IN THE object 


router.get("/get-details", async (req, res) => {
   
    // get all brands
    let [brands, brandsField] = await contact.getBrands();
    
    // get all car type
    let [carTypes, carTypesField] = await contact.getCarType();

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


module.exports = router;