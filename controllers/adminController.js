var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');


var router = express.Router();

router.get('/', (req, res) => {  
    res.render('admin/adminHome');
});

module.exports = router;