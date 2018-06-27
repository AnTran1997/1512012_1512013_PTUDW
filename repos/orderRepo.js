var db = require('../fn/db');

exports.loadAll = () => {
	var sql = `select * from orders`;
	return db.load(sql);
}

exports.loadAllByStatus = (statusID) => {
    var sql = `select * from orders where orderStatusID = '${statusID}'`;
    return db.load(sql);
}

exports.loadAllDelivered = () => {
    var sql = `select * from orders where orderStatusID = 'delivered'`;
    return db.load(sql);
}

exports.loadAllInStock = () => {
    var sql = `select * from orders where orderStatusID = 'inStock'`;
    return db.load(sql); 
}

exports.loadAllInDeliverying = () => {
    var sql = `select * from orders where orderStatusID = 'deliverying'`;
    return db.load(sql); 
}