var db = require('../fn/db');

exports.loadAll = () => {
	var sql = 'select * from category';
	return db.load(sql);
}