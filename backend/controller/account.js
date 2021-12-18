const accountModel = require('../model/account');

const route = require('express').Router();


// adding a new user to database
route.post('/user', async (req, res) => {

    const user = {
        fullName: "Shazyar Taha Abdulla",
        password: "shazyarth12",
        email: "p.shazyar108@gmail.com",
        permission: "ADMIN",
        profileImg: "dsfiuewrim,cvndfiesd"
    }

    let isAdded = await accountModel.addUser(user);
    console.log(isAdded);
});


// changing the user password
route.post('/change-pass', async (req, res) => {
    let isUpdate = await accountModel.changePassword({
        id: 1,
        oldPass: 'shazyar13',
        newPass: 'shazyar14',
        confirmPass: 'shazyar14'
    });

    if (isUpdate) {
        res.send({
            message: 'change password'
        });
    } else {
        res.send({
            message: 'not changed'
        });
    }
})

module.exports = route;