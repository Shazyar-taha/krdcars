const db = require('./db');




// check the email address if 
// exist the email then tell the user change the email
function isExistEmail(email) {
    const sql = "SELECT email FROM account WHERE email = ?";
    return db.execute(sql, [email]);
}



exports.addUser = (user) => {
    let isExist = isExistEmail(user.email).then(([rows, fieldData]) => {

    }).catch((err) => console.log(err));


}