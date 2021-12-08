const accountModel = require('../model/account');

const route = require('express').Router();


route.get('/user', (req, res) => {
    let email = 't.shazyar@yahoo.com';

    accountModel.addUser({
        email: "t.shazyar@yahoo.com"
    });
});


module.exports = route;