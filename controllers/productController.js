var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');



var router = express.Router();
var vm;

router.get('/detail/:productID', (req, res) => {
    var productID = req.params.productID;

    productRepo.loadSingle(productID).then(row=>{
        console.log(row);
        var cat = categoryRepo.loadSingle(row.productCatID);
        var brand = brandRepo.loadSingle(row.productBrandID);
        Promise.all([cat,brand]).then(([catRow,brandRow])=>{
            vm = {
                cat: catRow,
                brand: brandRow,
                product: row[0],
            }
            res.render('products/detail', vm);
        });
    })



});



module.exports = router;