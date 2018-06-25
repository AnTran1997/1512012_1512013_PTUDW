var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');

var router = express.Router();

router.get('/search1', (req, res) => {
    res.render('searchProduct/searchSuccess');
});

router.get('/search2', (req, res) => {
    res.render('searchProduct/searchFailed');
})

module.exports = router;