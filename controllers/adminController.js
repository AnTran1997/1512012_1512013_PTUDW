var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var bodyParser = require('body-parser');

var router = express.Router();
var vm;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

function initVM(branchID, callback){
    productRepo.loadAllByBrand(branchID).then(rows => {
        vm = {
            products: rows
        }
        callback();
    });
}

router.get('/', (req, res) =>{
        res.render('admin/adminHome');
})

router.get('/showProduct/:brandID', (req, res) => {
    var brandID = req.params.brandID;
    console.log(brandID);
    

    productRepo.loadAllByBrand(brandID).then(rows => {
        var vm = {
            products: rows
        }
        res.render('admin/showProducts', vm);
    });
});






module.exports = router;