var db = require('../fn/db');

exports.loadAll = () => {
	var sql = 'select * from category';
	return db.load(sql);
}


exports.loadSingle = (catID) =>{
	var sql = `select * from products where productCatID = '${catID}'`;
	return db.load(sql);
}