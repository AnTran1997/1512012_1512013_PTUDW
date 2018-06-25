var db = require('../fn/db');

exports.loadAll = () => {
	var sql = 'select * from products';
	return db.load(sql);
}

exports.loadAllByPage = (offset)=>{
	var sql = `select * from products limit 9 offset ${offset}`;
	return db.load(sql);
}

exports.loadCatByPage = (offset, cat)=>{
	var sql = `select * from products where productCatID = '${cat}' limit 9 offset ${offset}`;
	return db.load(sql);
}

exports.loadBrandByPage = (offset, brand)=>{
	var sql = `select * from products where productBrandID = '${brand}' limit 9 offset ${offset}`;
	return db.load(sql);
}

exports.loadSingle = (proID) =>{
	var sql = `select * from products where productID = '${proID}'`;
	return db.load(sql);
}