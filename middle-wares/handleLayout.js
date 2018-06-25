var productRepo = require('../repos/productRepo');

module.exports = (req, res, next) => {

    productRepo.loadAll().then(rows => {

        res.locals.layoutVM = {
            products: rows,
        }
        next();
    });
}