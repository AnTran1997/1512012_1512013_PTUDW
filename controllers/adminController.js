var express = require('express');
var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');
var orderRepo = require('../repos/orderRepo');
var statusRepo = require('../repos/orderStatusRepo');
var bodyParser = require('body-parser');


var router = express.Router();
var vm;

function initVM(callback) {
    //To show chart of brands
    var numberCanon = productRepo.loadNumberByBrand('canon');
    var numberFujifilm = productRepo.loadNumberByBrand('fujifilm');
    var numberNikon = productRepo.loadNumberByBrand('nikon');
    var numberSony = productRepo.loadNumberByBrand('sony');
    var totalBrand = brandRepo.loadNumberBrand();
    var allBrands = brandRepo.loadAllBrand();
    var allProducts = productRepo.loadAll();

    //To show chart of types
    var numberPhysic = productRepo.loadNumberByCat('physic');
    var numberDigital = productRepo.loadNumberByCat('digital');
    var numberInstant = productRepo.loadNumberByCat('instant');
    var totalNumberCat = categoryRepo.loadNumberCat();
    var allCats = categoryRepo.loadCatName();
    var totalNumberCat = categoryRepo.loadNumberCat();

    //To show chart of orders
    var numDelivered = orderRepo.loadNumberOrderByStatus('delivered');
    var numDelivering = orderRepo.loadNumberOrderByStatus('deliverying');
    var numInStock = orderRepo.loadNumberOrderByStatus('inStock');
    var numAllStatus = statusRepo.loadNumStatus();
    var allStatus = statusRepo.loadAll();
    

    Promise.all([numberCanon, numberFujifilm, numberNikon, numberSony,allProducts, totalBrand, totalNumberCat, allBrands,
    numberPhysic, numberDigital, numberInstant, totalNumberCat, allCats, numDelivered, numDelivering, numInStock,
    numAllStatus, allStatus]).then(([canonRows, fujifilmRows,nikonRows, sonyRows, allProRows, totalBrandRows, totalCatRows, 
    allBrandsRows, physicRows, digitalRows, instantRows, numberCatRows, allCatRows, numDeliveredRows, numDeliveringRows, numInStockRows,
    numAllStatusRows, allStatusRows]) => {
        // **** BRANDS
        //Hoac dung allProRows.length
        var totalProByBrand = canonRows[0].Total_Brand + fujifilmRows[0].Total_Brand + nikonRows[0].Total_Brand + sonyRows[0].Total_Brand;  //Tong tat ca san pham
        //--- get percentage by brands ---
        var brandPercentage = [];  //array to store percentafe of each brand
        brandPercentage.push(canonRows[0].Total_Brand*100/totalProByBrand);
        brandPercentage.push(fujifilmRows[0].Total_Brand * 100 / totalProByBrand)
        brandPercentage.push(nikonRows[0].Total_Brand * 100 / totalProByBrand);
        brandPercentage.push(sonyRows[0].Total_Brand * 100 / totalProByBrand);
        //--- get name of all brands ---
        var listBrand = [];
        for(var i = 0; i < allBrandsRows.length; i++) {
            listBrand.push(allBrandsRows[i].brandName);
        }

        // *** CATEGORIES
        var totalProByCat = allProRows.length;  //get total numbers of products
        //-- get percentage by categories
        var catPercentage = [];
        catPercentage.push(physicRows[0].Total_Cat * 100 / totalProByCat);
        catPercentage.push(digitalRows[0].Total_Cat * 100 / totalProByCat);
        catPercentage.push(instantRows[0].Total_Cat * 100 / totalProByCat);
        //--- get name of all categories
        var listCat = [];
        for (var i = 0; i < allCatRows.length;i++) {
            listCat.push(allCatRows[i].catName);
        }

        // *** ORDERS 
        var totalOrders = numDeliveredRows[0].numOrders + numDeliveringRows[0].numOrders + numInStockRows[0].numOrders;
        //-- get percentage by orders
        var orderPercentage = [];
        orderPercentage.push(numDeliveredRows[0].numOrders * 100 / totalOrders);
        orderPercentage.push(numDeliveredRows[0].numOrders * 100 / totalOrders);
        orderPercentage.push(numInStockRows[0].numOrders * 100 / totalOrders);
        //-- get name of all status
        var listStatus = [];
        for (var i = 0; i< allStatusRows.length; i++) {
            listStatus.push(allStatusRows[i].orderStatusName);
        }

        vm = {
            totalBrand: totalBrandRows[0].Total,
            percentBrands: brandPercentage,
            allBrands: listBrand,

            totalCat: totalCatRows[0].Total,
            percentCats: catPercentage,
            allCats: listCat,

            totalStatus: numAllStatusRows[0].numverStatus,
            percentStatus: orderPercentage,
            allstatus: listStatus
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


router.post('/delete', (req, res) => {
    productRepo.delete(req.body.productID).then(value => {;
        res.redirect(req.get('referer'));
    }).catch(err => {
        console.log("Query failed");
    })
});


router.post('/add', (req, res) => {
    productRepo.add(req.body.namePro, req.body.idPro, req.body.nxs, req.body.catPro, req.body.price, req.body.numberPro, req.body.proImg).then(value => {  
        var vm = {
            showAlert: true
        };
        res.render('admin/adminHome', vm);
    }).catch(err => {
        res.end("Query failed");
    });
});

router.post('/edit', (req, res) => {
    /*console.log(req.body.namePro);
    console.log(req.body.idPro);
    console.log(req.body.brand);
    console.log(req.body.cat);
    console.log(req.body.price);
    console.log(req.body.stock);
    console.log(req.body.sold);
    console.log(req.body.view);
    console.log(req.body.origin);
    console.log(req.body.sale);
    console.log(req.body.date);
    console.log(req.body.proImg);*/

    productRepo.update(req.body).then(value => {
        var vm = {
            showAlert: true
        };
        res.redirect(req.get('referer'));
    }).catch(err => {
        res.end("Error occurred!");
    });
});
module.exports = router;
