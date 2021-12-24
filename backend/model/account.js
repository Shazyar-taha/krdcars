const db = require('./db');
const bcrypt = require('bcrypt');



// check the email address if 
// exist the email then tell the user change the email
function isExistEmail(email) {
    const sql = "SELECT email FROM account WHERE email = ?";
    return db.query(sql, [email]);
}



exports.addUser = async (user) => {

    let email = await isExistEmail(user.email);

    if (email[0].length == 0) {
        // you don't have that user with that email
        // create a insert statement
        const sql = `INSERT INTO account(full_name, password, email, permission, profile_img) 
        VALUES(?, ?, ?, ?, ?)`;

        // hashing the password 
        let hashPass = await bcrypt.hash(user.password, 12);
        console.log(hashPass);
        // insert a user 
        return db.execute(sql, [user.fullName, hashPass, user.email, user.permission, user.profileImg])
            .then(([rows, fieldData]) => {
                return rows.affectedRows > 0;
            }).catch((err) => console.log(err));
    } else {
        console.log("you can't insert a user with that email !");
        console.log(email[0][0].email);
        return false;
    }


}


// this object pass the user{id, oldPassword, newPassword, confirm new Password}
exports.changePassword = async (user) => {

    // we get the user in database
    return db.query('SELECT password FROM account WHERE id = ?', [user.id])
        .then(([rows, fieldData]) => {
            if (rows.length == 0) {
                return 'not found the user'
            } else {
                try {
                    return bcrypt.compare(user.oldPass, rows[0].password).then(async (result) => {
                        if (result && (user.newPass == user.confirmPass)) {
                            // update the user password 
                            let newPassword = await bcrypt.hash(user.newPass, 12);
                            return db.execute('UPDATE account SET password = ? WHERE id = ? ', [newPassword, user.id])
                                .then(([rows, fieldData]) => {
                                    return rows.affectedRows > 0;
                                }).catch(err => console.log(err));
                        } else {
                            return false;
                        }
                    })
                } catch (err) {
                    console.log(err);
                }

            }

        }).catch((err) => console.error(err));


}