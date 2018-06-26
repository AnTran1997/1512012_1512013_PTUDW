var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');


var router = express.Router();

router.get('/', (req, res) => {  
    res.render('admin/adminHome');
});


router.get('/showProduct/:brandID', (req, res) => {
    var brandID = req.params.brandID;

    productRepo.loadAllByBrand(brandID).then(rows => {
        var vm = {
            products: rows
        }
        res.render('admin/showProducts', vm);
    });
});

/*router.get('/showProduct', (req, res) => {
        res.render('admin/showProducts');
});*/

module.exports = router;