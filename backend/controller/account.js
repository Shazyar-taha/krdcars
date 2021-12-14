const accountModel = require('../model/account');

const route = require('express').Router();


route.get('/user', async (req, res) => {

    const user = {
        fullName: "Sara Ahmaf",
        password: "dsfk",
        email: "ddddd@yahoo.com",
        permission: "USER",
        profileImg: "ffffff"
    }
    let isAdded = await accountModel.addUser(user);
    console.log(isAdded);
});


module.exports = route;