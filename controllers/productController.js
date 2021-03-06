var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var cartRepo = require('../repos/cartRepo');


var router = express.Router();
var vm;

router.get('/detail/:productID', (req, res) => {
    var productID = req.params.productID;

    productRepo.loadSingle(productID).then(row=>{
        var catAll = categoryRepo.loadAll();
        var brandAll = brandRepo.loadAll();
        var cat = categoryRepo.loadSingle(row[0].productCatID);
        var brand = brandRepo.loadSingle(row[0].productBrandID);
        var proCat = productRepo.loadSimilarCat(row[0].productCatID, row[0].productID);
        var proBrand = productRepo.loadSimilarBrand(row[0].productBrandID, row[0].productID);
        Promise.all([catAll, brandAll, cat,brand, proCat, proBrand]).then(([catRows, brandRows, catRow,brandRow, proCatRow, proBrandRow])=>{
            vm = {
                cat: catRows,
                brand: brandRows,
                catS: catRow[0],
                brandS: brandRow[0],
                product: row[0],
                proCat: proCatRow,
                proBrand: proBrandRow,
                currentPage:1,
                curUser: req.session.curUser,
                isLogged: req.session.isLogged
            }
            var newView = parseInt(row[0].productViews) + 1;
            console.log(newView);
            productRepo.updateView(productID,newView).then(rows=>{
                vm.product.productViews = newView;
                res.render('products/detail', vm);

            })
        });
    })



});



module.exports = router;