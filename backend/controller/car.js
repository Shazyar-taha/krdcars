const carModel = require('../model/car');


// 
exports.EnBrands = (req, res) => {
    carModel.brands(1, (rows) => {
        res.send(rows);
    });
}