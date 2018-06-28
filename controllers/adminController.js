var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var orderRepo = require('../repos/orderRepo');
var bodyParser = require('body-parser');

var router = express.Router();
var vm;

function initVM(callback) {
    var numberCanon = productRepo.loadNumberByBrand('canon');
    var numberFujifilm = productRepo.loadNumberByBrand('fujifilm');
    var numberNikon = productRepo.loadNumberByBrand('nikon');
    var numberSony = productRepo.loadNumberByBrand('sony');
    var totalBrand = brandRepo.loadNumberBrand();
    var totalCat = categoryRepo.loadNumberCat();
    Promise.all([numberCanon, numberFujifilm, numberNikon, numberSony, totalBrand, totalCat]).then(([canonRows,
        fujifilmRows,nikonRows,sonyRows, totalBrandRows, totalCatRows]) => {
        vm = {
            numCanon: canonRows,
            numFujifilm: fujifilmRows,
            numNikon: nikonRows,
            numSony: sonyRows,
            totalBrand: totalBrandRows,
            totalCat: totalCatRows
        }
        callback();
    });
}

function showProductByBrand(brandID, callback) {
    vm.brand = brandID;
    console.log(brandID);
    productRepo.loadAllByBrand(brandID).then(rows =>{
        vm.brandID = brandID
        callback();
    }); 
}

router.get('/', (req, res) =>{
       // res.render('admin/adminHome'); 
    initVM(() => {
        res.render('admin/adminHome'); 
    });    
});

router.get('/showBrand/:brandID', (req, res) => {
    var brandID = req.params.brandID;
    productRepo.loadAllByBrand(brandID).then(rows => {
        var vm = {
            products: rows,
            isExpanded: 1
        }
        res.render('admin/showProductsByBrand', vm);
    });
});

router.get('/showCat/:catID', (req, res) => {
    var catID = req.params.catID;
    productRepo.loadAllByCat(catID).then(rows => {
        var vm = {
            products: rows
        }
        res.render('admin/showProductsByCat', vm);
    });
});

router.get('/showAll', (req, res) => {
    productRepo.loadAll().then(rows => {
        var vm = {
            products: rows
        }
        res.render('admin/showAll', vm);
    });
});

router.get('/showOrderStatus', (req, res) => {
    var deliveredOrder = orderRepo.loadAllDelivered();
    var inStockOrder = orderRepo.loadAllInStock();
    var deliveryingOrder = orderRepo.loadAllInDeliverying();
    Promise.all([deliveredOrder, inStockOrder, deliveryingOrder]).then(([deliveredRows, inStockRows, deliveringRows])=>{
        vm = {
            delivered: deliveredRows,
            inStock: inStockRows,
            delivering: deliveringRows
        }
        res.render('admin/showOrderByStatus', vm);
    });
});

function convertISOToLocal(isoDate) {
    
}

router.get('/showOrderDate', (req, res) => {
    var dateStr = [];
    var allOrders = orderRepo.loadAll();
    var orderDates = orderRepo.loadDate();
    Promise.all([orderDates, allOrders]).then(([dateRows, orderByDateRows]) => {
        var dates = [];
        //Get array of order date
        for (var i = 0; i < dateRows.length; i++) {
            //Get dates from rows
            var temp = dateRows[i].orderDate;

            //consert ISO date into local date
            dateStr.push(temp.getFullYear() + '/' + (temp.getMonth()+1) + '/' + temp.getDate());           
        }

        var orders = [];
        for (var i = 0; i < dateStr.length; i++) {
            console.log(dates.length);
            var temp = orderByDateRows.filter((singleOrder)=>{
                var firstTime = singleOrder.orderDate.getFullYear() + '/' + (singleOrder.orderDate.getMonth()+1) + '/' + singleOrder.orderDate.getDate();
                return firstTime == dateStr[i];
            }); 
            orders.push(temp);

            //Adding objects dateStr and orders by that date into array 'dates'
            dates.push({date: dateStr[i], orders: orders[i]});
        }  
         
        vm = {
          orderDate: dates,
        }
        res.render('admin/showOrderByDate', vm);
    });

    Promise.all([orderDates, allOrders]).catch(console.error.bind(console));
});


router.get('/add', (req,res) => {
    vm = {
        showAlert:true
    }
    res.render('admin/addNewProduct', vm);    
});





module.exports = router;