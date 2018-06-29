var express = require('express');
var productRepo = require('../repos/productRepo'),
cartRepo = require('../repos/cartRepo');

var router = express.Router();

router.get('/', (req, res) => {
    var vm = {
        items: req.session.cart
    };
    res.render('cart/index', vm);
});

router.post('/cartItems', (req, res) => {
 res.end(cartRepo.getNumberOfItems(req.session.cart).toString());
});


router.post('/add/:proID/:quantity', (req, res) => {
    var proID = req.params.proID;
    var quantity = req.params.quantity;
    productRepo.loadSingle(proID).then(rows => {
        var item = {
            product: rows[0],
            quantity: +quantity,
            amount: rows[0].productPrice* +quantity
        };
        cartRepo.add(req.session.cart, item);
        res.end(cartRepo.getNumberOfItems(req.session.cart).toString());
        // res.redirect(req.headers.referer);
    });
});

// router.post('/remove', (req, res) => {
//     cartRepo.remove(req.session.cart, +req.body.proId);
//     res.redirect(req.headers.referer);
// });

module.exports = router;