//import { resolve } from 'url';
//import { rejects } from 'assert';

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


exports.loadSimilarCat = (catID, productID)=>{
	var sql = `select * from products where productCatID = '${catID}' and productID <> '${productID}' limit 5`;
	return db.load(sql);
}

exports.loadSimilarBrand = (brandID, productID)=>{
	var sql = `select * from products where productBrandID = '${brandID}' and productID <> '${productID}' limit 5`;
	return db.load(sql);
}

exports.loadAllByBrand = (brandID) => {
	var sql = `select * from products where productBrandID = '${brandID}'`;
	return db.load(sql);
}

exports.loadAllByCat = (catID) => {
	var sql = `select * from products where productCatID = '${catID}'`;
	return db.load(sql);
}

exports.loadByKey = (name, cat, brand, price) =>{
	var para =[];
	if(name!='all') para.push(`UPPER(productName) like UPPER('%${name}%')`);
	if(cat!='all') para.push(`productCatID='${cat}'`);
	if(brand!='all') para.push(`productBrandID='${brand}'`);
	if(price!='-1') para.push(`productPrice>='${price.min}' and productPrice<='${price.max}'`);
	para = para.join(' and ');
	if(para.length>0){
		para= 'where ' + para;
	}
	console.log(para);
	var sql = `select * from products ${para}`;
	return db.load(sql);
}

exports.loadPrice = ()=>{
	var sql = `select distinct productPrice from products`;
	return db.load(sql);
}


exports.insertNewProduct = (proName, proID, proBrandID, proCatID, proPrice, proStock, proImg, proDate) => {
	var latestID = `SELECT MAX(productID) FROM products`;
	var newProID = latestID + 1;
	var sql = `insert products(productID, productName, productPrice, productViews, productSold, 
	productDes, productOrigin, productCatID, productBrandID, productStock, productImg, 
	productSale, productDate) VALUES ('${proID}','${proName}','${proPrice}','0','0','',
	'Japan','${proCatID}','${proBrandID}','${proStock}','${proImg}','0','${proDate}')`;
	return db.save(sql);
}

exports.addNewProduct = (proName, proID, proBrandID, proCatID, proPrice, proStock, proImg, proDate) => {
	var latestID = `SELECT MAX(productID) FROM products`;
	var newProID = latestID + 1;
	var sql = `insert into products(productID, productName, productPrice, productViews, productSold, productDes, productOrigin, productCatID, productBrandID, productStock, productImg, productSale, productDate) VALUES ('${proID}','${proName}','${proPrice}','0','0','','Japan','${proCatID}','${proBrandID}','${proStock}','${proImg}','0','${proDate}')`;
	return db.save(sql);
}

exports.add = (proName, proID, proBrandID, proCatID, proPrice, proStock, proImg) => {
	//Get current date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var proDate = yyyy + '-' + mm + '-' + dd;

	var sql = `insert into products(productID, productName, productPrice, productViews, productSold, productDes, productOrigin, productCatID, productBrandID, productStock, productImg, productSale, productDate) VALUES ('${proID}','${proName}','${proPrice}','0','0','','Japan','${proCatID}','${proBrandID}','${proStock}','${proImg}','0','${proDate}')`;
	return db.save(sql);
}

exports.loadNumberByBrand = (brandID) => {
	var sql = `select COUNT(*) as Total_Brand from products where productBrandID = '${brandID}'`;
	return db.load(sql);
}

exports.loadNumberByCat = (catID) => {
	var sql = `select COUNT(*) as Total_Cat from products where productCatID = '${catID}'`;
	return db.load(sql);
}

exports.delete = (id) => {
	var sql = `delete from products where productID = '${id}'`;
	return db.save(sql);
}

exports.update = (c) => {
	//var sql = `update products set productName='${c.proName}', productBrandID='${c.proBrandID}', productCatID='${c.proCatID}', productViews='${c.proView}', productStock='${c.proStock}', productSold='${c.proSold}', productPrice='${c.proPrice}', productOrigin='${c.proOrigin}', productSale='${c.proSale}', productDate='${c.proDate}' where productID='${c.proID}'`;
	var sql = `update products set productName='${c.namePro}', productBrandID='${c.brand}', productCatID='${c.cat}', productViews='${c.view}', productStock='${c.stock}', productSold='${c.sold}', productPrice='${c.price}', productOrigin='${c.origin}', productSale='${c.sale}', productDate='${c.date}', productImg='${c.proImg}' where productID='${c.idPro}'`;
	return db.save(sql);
}
exports.checkoutProduct = (id, stock,sold) =>{
	var sql = `UPDATE products SET productStock = '${stock}', productSold = '${sold}' WHERE productID = '${id}'`;
	return db.save(sql);
}

