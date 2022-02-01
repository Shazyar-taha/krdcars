const accountModel = require('../model/account');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport-config');

initializePassport(passport);

const route = require('express').Router();

exports.postLogin = passport.authenticate('local');


route.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) { console.log(err); }

        if (user) {
            res.send({
                user: user,
                message: "SUCCESS",
            })
        }
        else {
            res.send({
                message: "FAILED"
            })
        }
    })(req, res, next);
});



// adding a new user to database
route.post('/register', async (req, res) => {

    const user = req.body
    user.permission = 'USER'

    let isAdded = await accountModel.addUser(user);

    if (isAdded) {
        res.send({
            message: "SUCCESS"
        })
    }
    else {
        res.send({
            message: "FAILED"
        })
    }
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