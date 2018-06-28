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


exports.add = (proName, proID, proBrandID, proCatID, proPrice, proStock, proImg, proDate) => {
	var sql = `insert into products(productID, productName, productPrice, productViews, productSold, productDes, productOrigin, productCatID, productBrandID, productStock, productImg, productSale, productDate) VALUES ('${proID}','${proName}','${proPrice}','0','0','','Japan','${proCatID}','${proBrandID}','${proStock}','${proImg}','0','${proDate}')`;
	return db.save(sql);
}

exports.loadNumberByBrand = (brandID) => {
	var sql = `select COUNT(*) from products where productBrandID = '${brandID}'`;
	return db.load(sql);
}

