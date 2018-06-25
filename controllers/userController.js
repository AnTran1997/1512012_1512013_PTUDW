var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');

var router = express.Router();

router.get('/userAccount', (req, res) => {
    res.render('users/userAccount');
});

module.exports = router;