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

router.get('/', (req, res) =>{
        res.render('admin/adminHome');       
});

router.get('/showBrand/:brandID', (req, res) => {
    var brandID = req.params.brandID;
    productRepo.loadAllByBrand(brandID).then(rows => {
        var vm = {
            products: rows,
            isExpanded: 1
        }
        res.render('admin/showProductsByBrand', vm);
    });
});

router.get('/showCat/:catID', (req, res) => {
    var catID = req.params.catID;
    productRepo.loadAllByCat(catID).then(rows => {
        var vm = {
            products: rows
        }
        res.render('admin/showProductsByCat', vm);
    });
});

router.get('/showAll', (req, res) => {
    productRepo.loadAll().then(rows => {
        var vm = {
            products: rows
        }
        res.render('admin/showAll', vm);
    });
});


module.exports = router;