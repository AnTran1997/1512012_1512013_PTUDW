var express = require('express');
var productRepo = require('../repos/productRepo');



var router = express.Router();
var vm;

router.get('/', (req, res) => {
	productRepo.loadAll().then(rows => {
        vm = {
            products: rows,
            best: rows.sort((a,b)=>b.productSold - a.productSold).slice(0,10),
            mostViews: rows.sort((a,b)=>b.productViews - a.productViews).slice(0,10),
            sale: rows.sort((a,b)=>b.productSale - a.productSale).slice(0,10),
            new: rows.sort((a,b)=>b.productDate - a.productDate).slice(0,10),
            total: rows.length,
            page: Math.ceil(rows.length/9),
            currentAll: rows.sort((a,b)=>a.productID - b.productID).slice(0,9)
        }
        res.render('home/index', vm);
    });

});

router.get('/:filter/:pageID', (req, res) => {
    console.log('here');
    productRepo.loadAll().then(rows => {
       var pageID = req.params.pageID;
       var filter = req.params.filter;
       console.log(pageID);
       console.log(filter);

       vm.currentAll = rows.slice((pageID-1)*9,(pageID-1)*9+9);
       res.render('home/index', vm);
   });
});

module.exports = router;