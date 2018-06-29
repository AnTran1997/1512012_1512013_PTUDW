var express = require('express');
var productRepo = require('../repos/productRepo'),
cartRepo = require('../repos/cartRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var orderRepo = require('../repos/orderRepo');

var router = express.Router();
var vm;


function initVM(callback){
    var cat = categoryRepo.loadAll();
    var brand = brandRepo.loadAll();
    var pro = productRepo.loadAll();
    Promise.all([cat,brand,pro]).then(([catRows,brandRows, proRows])=>{
        vm = {
            cat: catRows,
            brand: brandRows,
            currentPage: 1
        }
        callback();
    });
}

router.get('/', (req, res) => {
    initVM(()=>{
        vm.curUser= req.session.curUser,
        vm.isLogged= true;
        vm.items= req.session.cart;
        vm.nItem = cartRepo.getNumberOfItems(req.session.cart);
        vm.nSum = cartRepo.sumPrice(req.session.cart);
        res.render('cart/index', vm);
    });
    
});

router.post('/cartItems', (req, res) => {
    res.end(cartRepo.getNumberOfItems(req.session.cart).toString());
});

router.post('/cartSum', (req, res) => {
    res.end(cartRepo.sumPrice(req.session.cart).toString());
});


router.post('/add/:proID/:quantity', (req, res) => {
    var proID = req.params.proID;
    var quantity = req.params.quantity;
    productRepo.loadSingle(proID).then(rows => {
        var item = {
            product: rows[0],
            quantity: +quantity,
            price: rows[0].productPrice* +quantity
        };
        cartRepo.add(req.session.cart, item);
        res.end(cartRepo.getNumberOfItems(req.session.cart).toString());
        // res.redirect(req.headers.referer);
    });
});

router.post('/remove/:proID', (req, res) => {
    var proID = req.params.proID;
    cartRepo.remove(req.session.cart, proID);
    res.end(cartRepo.getNumberOfItems(req.session.cart).toString());
});

router.post('/checkout', (req, res) => {

    console.log(req.session.curUser);
    var user = {
        id: req.session.curUser.username,
        name: req.body.customer_name,
        addr: req.body.customer_addr,
        phone: req.body.customer_phone
    }
    console.log(user);

    var cart = req.session.cart;

    var totalAmount = cartRepo.getNumberOfItems(cart);
    var totalPrice = cartRepo.sumPrice(cart);
    orderRepo.loadAll().then(rows=>{
        var orderID = 'dh' + rows.length;

        var stock, sold;
        for(var i =0;i<cart.length;i++){
            stock = parseInt(cart[i].product.productStock)-parseInt(cart[i].quantity);
            sold = parseInt(cart[i].product.productSold)+parseInt(cart[i].quantity);
            productRepo.checkoutProduct(cart[i].product.productID, stock, sold);
        }

        orderRepo.saveOrder(orderID, user, totalAmount, totalPrice);
        req.session.cart = [];
        var cat = categoryRepo.loadAll();
        var brand = brandRepo.loadAll();
        var pro = productRepo.loadAll();
        vm = {
            cat: cat,
            brand: brand,
            currentPage: 1
        }
        res.render('cart/payment', vm);
    })
    
});

module.exports = router;