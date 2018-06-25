var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');

var router = express.Router();

router.get('/payment', (req, res) => {
    res.render('users/payment');
});

router.get('/editOrder', (req, res) => {
    res.render('users/editOrder');
});

router.get('/historyShopping', (req, res) => {
    res.render('users/historyShopping');
});

router.get('/account', (req, res) => {
    res.render('users/account');
});

router.get('/admin', (req, res) => {
    res.render('users/adminHome');
});

module.exports = router;