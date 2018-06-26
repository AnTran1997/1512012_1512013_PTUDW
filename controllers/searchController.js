var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');




var router = express.Router();
var vm;
var priceStep = 10000000;

function initVM(callback){
    var cat = categoryRepo.loadAll();
    var brand = brandRepo.loadAll();
    var price = productRepo.loadPrice();
    Promise.all([cat,brand,price]).then(([catRows,brandRows,priceRows])=>{
        priceRows = priceRows.sort((a,b)=>b.productPrice - a.productPrice);
        console.log(priceRows);
        var priceRange = priceRows[0].productPrice-priceRows[priceRows.length-1].productPrice;
        var priceQuarter = priceRange/priceStep;
        var i = 0;
        var priceOption = [];
        while(priceRange>0){
            priceRange -= priceStep;
            priceOption.push({
                min: i*priceStep,
                max: i*priceStep+priceStep,
                text: `Từ ${i*priceStep} đến ${i*priceStep+priceStep}`
            });
            i++;
        }
        console.log(priceRange);
        vm ={
            cat: catRows,
            brand: brandRows,
            currentPage: 1,
            priceOption: priceOption
        }
        callback();
    });
}

function getResult(searchName, searchCat, searchBrand, searchPrice, pageID, callback){
    if(searchPrice!='-1'){
        searchPrice = vm.priceOption[searchPrice];
        console.log(searchPrice);
    }
    productRepo.loadByKey(searchName, searchCat, searchBrand, searchPrice).then(rows=>{
        vm.searchName = searchName;
        vm.searchCat= searchCat;
        vm.searchBrand= searchBrand;
        vm.searchPrice= searchPrice;
        vm.result= rows.slice((pageID-1)*10, (pageID-1)*10 + 10);
        vm.total = rows.length;
        vm.page = Math.ceil(rows.length/10);
        callback();
    });
}

router.get('/:name/:cat/:brand/:price/:pageID', (req, res) => {
    var pageID = req.params.pageID;
    var searchName = req.params.name;
    var searchCat = req.params.cat;
    var searchBrand = req.params.brand;
    var searchPrice = req.params.price;
    if(!vm){
        initVM(()=>{
            getResult(searchName, searchCat, searchBrand, searchPrice, pageID, ()=>{
                res.render('search/result',vm);
            });
        })
    }
    else{
        getResult(searchName, searchCat, searchBrand, searchPrice, pageID, ()=>{
            res.render('search/result',vm);
        });
    }
    
});



module.exports = router;