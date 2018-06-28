var db = require('../fn/db');

exports.loadAll = () => {
	var sql = 'select * from category';
	return db.load(sql);
}


exports.loadSingle = (catID) =>{
	var sql = `select * from category where catID = '${catID}'`;
	return db.load(sql);
}

exports.loadNumberCat = () => {
	var sql = `select COUNT(*) from category`;
	return db.load(sql);
}