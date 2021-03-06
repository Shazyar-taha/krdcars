const accountModel = require('../model/account');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport-config');

initializePassport(passport);

const route = require('express').Router();

exports.postLogin = passport.authenticate('local');



// getting user
route.get('/user-cockie', (req, res) => {
    res.send(req.user)
})


// get a user
route.get('/user', (req, res) => {

    if (req.user) {
        accountModel.user(req.user.id).then(([rows, fieldData]) => {

            res.send(rows[0]);

        }).catch((err) => {
            console.log(err);
        });
    } else {
        res.send({
            message: 'FAILED'
        });
    }
});

route.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) { console.log(err); }

        if (user) {
            req.logIn(user, (error) => {
                if (error) { console.log(error); }
                res.send({
                    user: user,
                    message: "SUCCESS",
                })
            })
        }
        else {
            res.send({
                message: "FAILED"
            })
        }
    })(req, res, next);
});

// logout route
route.post('/logout', (req, res) => {
    req.logout();

    res.send({
        message: "SUCCESS"
    })
})



// adding a new user to database
route.post('/register', async (req, res) => {

    const user = req.body
    user.permission = 'USER'
    console.log(req.body);
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



// changing the user password
route.post('/change-password', async (req, res) => {

    const user = req.user
    const { password, newPassword } = req.body

    if (!user) {
        return res.send({
            status: 'FAILED',
            message: 'not_logged_in'
        })
    }

    /**
     * @todo : ba pey aw useray la cookie wary agrit passwordaka bgora
     */

    console.log(user);
    console.log(password);
    console.log(newPassword);



    let isUpdated = await accountModel.changePassword({ id: user.id, oldPassword: password, newPassword: newPassword });


    if (isUpdated) {
        res.send({
            status: 'SUCCESS'
        })
    }


})

module.exports = route;