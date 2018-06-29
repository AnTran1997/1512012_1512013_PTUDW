var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var userRepo = require('../repos/userRepo');
var accountRepo = require('../repos/accountRepo');

var vm;

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
    var vm = {
        curUser: req.session.curUser,
        isLogged: true
    }
    res.render('users/userAccount', vm);
});

router.post('/update', (req, res) => {
    var user = {
        name: req.body.fullname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        phone: req.body.phone
    };
    user.username = req.session.curUser.username;
    req.session.curUser.name = user.name;
    req.session.curUser.email = user.email;
    req.session.curUser.dob = user.dob;
    req.session.curUser.gender = user.gender;
    req.session.curUser.phone = user.phone;
    userRepo.update(user,req.session.curUser.username).then((value)=>{
        var vm = {
            curUser: user,
            isLogged: true
        }
        res.render('users/userAccount',vm);
    })
    
});

/*router.get('/admin', (req, res) => {  
    productRepo.loadAllByBrand(brandID).then(row => {
        var vm = {
            products:row
        }
        res.render('users/adminHome');
    }); 
    //res.render('users/adminHome');
});

router.get('/admin/showProduct/:brandID', (req, res) => {
    var brandID = req.params.brandID;

    productRepo.loadAllByBrand(brandID).then(row => {
        var vm = {
            products:row
        }
        res.render('/users/adminHome', vm);
    });
})*/


module.exports = router;