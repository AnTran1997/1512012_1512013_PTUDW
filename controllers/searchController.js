var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');




var router = express.Router();
var vm;


router.get('/:name/:cat/:brand/:price', (req, res) => {
    var name = req.params.name;
    var cat = req.params.cat;
    var brand = req.params.brand;
    var price = req.params.price;
    console.log(name);
    console.log(cat);
    console.log(brand);
    console.log(price);
    
    res.render('search/result',vm);    
});


module.exports = router;