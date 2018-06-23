var productRepo = require('../repos/productRepo');

module.exports = (req, res, next) => {

    productRepo.loadAll().then(rows => {
    	rows.sort((a,b)=>b.productSold - a.productSold);
    	console.log(rows);


        res.locals.layoutVM = {
            products: rows,
        }

        next();
    });
}