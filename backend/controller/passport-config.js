const bcrypt = require('bcrypt');
const db = require('../model/db');
const LocalStrategy = require('passport-local').Strategy;


function initialize(passport) {

    const authenticateUser = async (email, password, done) => {
        // get user using email
        const sql = "SELECT id, password FROM account WHERE email=?";
        let user = null;
        db.execute(sql, [email]).then(async ([row, fields]) => {
            user = row[0];
            if (user == null) {
                return done(null, false, {
                    message: "We don't have a user with this email"
                });
            }

            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: "Your password is incorrect"
                    });
                }
            } catch (e) {
                return done(e);
            }
        });
    }









    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authenticateUser));


    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        const sql = "SELECT id, password FROM account WHERE id = ?";
        db.execute(sql, [id]).then(([rows, fields]) => {
            return done(null, rows[0])
        }).catch((err) => {
            console.log(err);
        })
    });
}


module.exports = initialize;