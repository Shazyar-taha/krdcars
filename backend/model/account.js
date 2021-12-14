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
        let hashPass = await bcrypt.hash(user.password, 10);
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