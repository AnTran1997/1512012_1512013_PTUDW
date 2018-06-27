var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var bodyParser = require('body-parser');

var router = express.Router();
var vm;

function initVM(callback) {
    var cat = categoryRepo.loadAll();
    var brand = brandRepo.loadAll();
    Promise.all([cat,brand]).then(([carRows,brandRows]) => {
        vm = {
            cat: catRows,
            brand: brandRows,
            currentPage: 1,
        }
    })
    callback();
}

function showProductByBrand(brandID, callback) {
    vm.brand = brandID;
    console.log(brandID);
    productRepo.loadAllByBrand(brandID).then(rows =>{
        vm.brandID = brandID
        callback();
    }); 
}

/*function initVM(branchID, callback){
    productRepo.loadAllByBrand(branchID).then(rows => {
        vm = {
            products: rows
        }
        callback();
    });
}*/

router.get('/', (req, res) =>{
    initVM(() => {
        res.render('admin/adminHome');
    });       
});

router.get('/showProduct/:brandID', (req, res) => {
    var brandID = req.params.brandID;
    console.log(brandID);
    productRepo.loadAllByBrand(brandID).then(rows => {
        var vm = {
            products: rows,
            isExpanded: 1
        }
        res.render('admin/showProducts', vm);
    });
    /*if(!vm) {
        initVM(() => {
            showProductByBrand(brandID, () => {
                res.render('admin/showProducts');
            })
        });
    }*/
});



module.exports = router;