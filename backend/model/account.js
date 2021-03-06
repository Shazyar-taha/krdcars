const db = require('./db');
const bcrypt = require('bcrypt');




exports.login = (email) => {
    const sql = "SELECT full_name, email, password FROM account WHERE email = ?";
    return db.query(sql, [email]);
}

exports.user = (id) => {
    const sql = "SELECT id, full_name, email FROM account WHERE id = ?";
    return db.query(sql, [id]);
}


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
        const sql = `INSERT INTO account(full_name, password, email, permission) 
        VALUES(?, ?, ?, ?)`;

        // hashing the password 
        let hashPass = await bcrypt.hash(user.password, 12);
        console.log(hashPass);
        // insert a user 
        return db.execute(sql, [user.fullName, hashPass, user.email, user.permission])
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
exports.changePassword = async ({ id, oldPassword, newPassword }) => {

    // we get the user in database
    return db.query('SELECT password FROM account WHERE id = ?', [id])
        .then(async ([rows, fieldData]) => {
            try {
                return bcrypt.compare(oldPassword, rows[0].password).then(async (result) => {
                    if (result) {
                        // update the user password 
                        let newPass = await bcrypt.hash(newPassword, 12);
                        return db.execute('UPDATE account SET password = ? WHERE id = ? ', [newPass, id])
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

        }).catch((err) => console.error(err));

}