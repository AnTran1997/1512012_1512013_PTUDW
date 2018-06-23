var productRepo = require('../repos/productRepo');

module.exports = (req, res, next) => {

    productRepo.loadAll().then(rows => {

        res.locals.layoutVM = {
            products: rows,
            best: rows.sort((a,b)=>b.productSold - a.productSold).slice(0,10),
            mostViews: rows.sort((a,b)=>b.productViews - a.productViews).slice(0,10),
            sale: rows.sort((a,b)=>b.productSale - a.productSale).slice(0,10)
        }

        next();
    });
}