const accountModel = require('../model/account');
const bcrypt = require('bcrypt');

const route = require('express').Router();



route.post('/login', (req, res) => {
    console.log('hello');
    const { email, password } = req.body;
    console.log(req.body);

    accountModel.login(email).then(async ([rows, fieldData]) => {
        if (rows.length > 0) {
            try {
                let isCorrect = await bcrypt.compare(password, rows[0].password);
                res.send(isCorrect);
            } catch (err) {
                throw err;
            }
        } else {
            res.send({
                message: "Sorry We don't have the user with that email"
            })
        }


    }).catch((err) => {
        console.log(err);
    });


});

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


route.get('/update', (req, res) => {
    accountModel.update().then(([rows, field]) => {
        console.log(rows);
    }).catch((err) => {
        console.log(err);
    })
})

// changing the user password
route.post('/change-pass', async (req, res) => {

    const { email, oldPassword, newPassword } = req.body;

    let isUpdate = await accountModel.changePassword({
        email: "p.shazyar108@gmail.com",
        oldPass: 'shazyar14',
        newPass: 'shazyarth12',
        confirmPass: 'shazyarth12'
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