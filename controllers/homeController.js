var express = require('express');
var productRepo = require('../repos/productRepo');



var router = express.Router();

router.get('/', (req, res) => {
	productRepo.loadAll().then(rows => {
        res.locals.layoutVM = {
            products: rows,
            best: rows.sort((a,b)=>b.productSold - a.productSold).slice(0,10),
            mostViews: rows.sort((a,b)=>b.productViews - a.productViews).slice(0,10),
            sale: rows.sort((a,b)=>b.productSale - a.productSale).slice(0,10),
            new: rows.sort((a,b)=>b.productDate - a.productDate).slice(0,10),
            total: rows.length,
            page: Math.ceil(rows.length/9),
            currentAll: rows.slice(0,9)
        }
        res.render('home/index');
    });
    
});

module.exports = router;