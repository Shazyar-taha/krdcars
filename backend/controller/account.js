const accountModel = require('../model/account');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport-config');

initializePassport(passport);

const route = require('express').Router();

exports.postLogin = passport.authenticate('local');


route.post('/login', passport.authenticate('local'), (req, res) => {

    // const { email, password } = req.body;

    console.log(req.user);



    // accountModel.login(email).then(async ([rows, fieldData]) => {
    //     if (rows.length > 0) {
    //         try {
    //             let isCorrect = await bcrypt.compare(password, rows[0].password);

    //             if (isCorrect) {


    //                 /**
    //                  * @todo : passport authenication here
    //                  */


    //                 res.send({
    //                     message: "SUCCESS",
    //                 })
    //             } else {
    //                 res.send({
    //                     message: "FAILED"
    //                 })
    //             }
    //         } catch (err) {
    //             throw err;
    //         }
    //     } else {
    //         res.send({
    //             message: "FAILED"
    //         })
    //     }


    // }).catch((err) => {
    //     console.log(err);
    // });


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