const db = require('./db');




// check the email address if 
// exist the email then tell the user change the email
function isExistEmail(email) {
    const sql = "SELECT email FROM account WHERE email = ?";
    return db.query(sql, [email]);
}



exports.addUser = (user) => {
    let isExist = isExistEmail(user.email).then(([rows, fieldData]) => {
        console.log(rows);
    }).catch((err) => console.log(err));


}