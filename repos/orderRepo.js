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

exports.loadDate = () =>{
    var sql = `select DISTINCT orderDate from orders`;
    return db.load(sql);
}

exports.loadByDate = (date) => {
    var sql = `select * from orders where orderDate = '${date}'`;
    return db.load(sql);
}

exports.loadOrderID = () => {
    var sql = `select orderID from orders`;
    return db.load(sql);
}

exports.loadTest = (orderID) => {
    var sql = `select * from orders where orderID = '${orderID}'`;
    return db.load(sql);
}