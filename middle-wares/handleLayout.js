var productRepo = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');

module.exports = (req, res, next) => {
	var cat = categoryRepo.loadAll();
	var brand = brandRepo.loadAll();
	var pro = productRepo.loadAll();
	Promise.all([cat,brand,pro]).then(([catRows,brandRows, proRows])=>{
		res.locals.layoutVM = {
			cat: catRows,
			brand: brandRows,
			products: proRows,
			currentPage: 1,
			currentFilter: 'all',
			currentFilterOption: 'none'
		}
		next();
	});
}

