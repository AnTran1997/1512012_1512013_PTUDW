var db = require('../fn/db');

exports.loadAll = () => {
	var sql = 'select * from brand';
	return db.load(sql);
}

exports.loadSingle = (brandID) =>{
	var sql = `select * from brand where brandID = '${brandID}'`;
	return db.load(sql);
}