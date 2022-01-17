const router = require('express').Router();
const drivenModel = require('../model/driven_work');
const carModel = require('../model/car');
const problemModel = require('../model/problem');
const partModel = require('../model/part');


router.get('/search', async (req, res) => {

    const query = {
        name: 'i',
        urlName: 'i'
    };


    let models = carModel.findModelBySearch(query.name, query.urlName);


    let results = {
        brands: [],
        models: [],
        parts: [],
        problems: [],
        drivingWorks: []
    };





})