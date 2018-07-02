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

exports.loadNumberOrderByStatus = (statusID) => {
    var sql = `select COUNT(*) as numOrders from orders where orderStatusID = '${statusID}'`;
    return db.load(sql);
}


exports.saveOrder =(orderID, user,totalAmount, totalPrice)=>{

    var sql = `INSERT INTO orders (orderID, totalProduct, totalPrice, username, orderStatusID, orderDate, deliveryPrice, deliveryAddress, receivedCustomer) VALUES ('${orderID}', '${totalAmount}', '${totalPrice}', '${user.id}', 'delivered', '2018-06-29', '0', '${user.addr}', '${user.name}')`;
    return db.load(sql);
}



exports.saveSingleOrderProduct = (proID, orderID, quan)=>{
    var sql = `insert into orderedproducts (productID, orderID, boughtNumber) VALUES ('${proID}', '${orderID}', '${quan}')`;
    return db.load(sql);
}