var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');



var router = express.Router();
var vm;

router.get('/', (req, res) => {
    var cat = categoryRepo.loadAll();
    var brand = brandRepo.loadAll();
    var pro = productRepo.loadAll();
    Promise.all([cat,brand,pro]).then(([catRows,brandRows, proRows])=>{
        vm = {
            cat: catRows,
            brand: brandRows,
            products: proRows,
            best: proRows.sort((a,b)=>b.productSold - a.productSold).slice(0,10),
            mostViews: proRows.sort((a,b)=>b.productViews - a.productViews).slice(0,10),
            sale: proRows.sort((a,b)=>b.productSale - a.productSale).slice(0,10),
            new: proRows.sort((a,b)=>b.productDate - a.productDate).slice(0,10),
            total: proRows.length,
            page: Math.ceil(proRows.length/9),
            currentAll: proRows.sort((a,b)=>a.productID - b.productID).slice(0,9),
            currentPage: 1,
            currentFilter: 'all',
            currentFilterOption: 'none'
        }
        res.render('home/index', vm);
    });

});

router.get('/:filter/:filterOption/:pageID', (req, res) => {
    var pageID = req.params.pageID;
    var filter = req.params.filter;
    var filterOption = req.params.filterOption;
    console.log(pageID);
    console.log(filter);
    console.log(filterOption);
    if(pageID!=vm.currentPage || filter!=vm.currentFilter || filterOption != vm.currentFilterOption){
        vm.currentPage = pageID;
        vm.currentFilter = filter;
        vm.currentFilterOption = filterOption;
        switch(filter){
            case 'cat':
            productRepo.loadCatByPage((pageID-1)*9,filterOption).then(rows => {
                vm.currentAll = rows;
                vm.page =  Math.ceil(rows.length/9);
                res.render('home/index',vm);
            });
            break;
            case 'brand':
            productRepo.loadBrandByPage((pageID-1)*9,filterOption).then(rows => {
                vm.currentAll = rows;
                vm.page =  Math.ceil(rows.length/9);
                res.render('home/index',vm);
            });
            break;
            default:
            productRepo.loadAllByPage((pageID-1)*9).then(rows => {
                vm.currentAll = rows;
                res.render('home/index',vm);
            });
        }
    }
    else{
        res.render('home/index',vm);
    }
    
});


module.exports = router;