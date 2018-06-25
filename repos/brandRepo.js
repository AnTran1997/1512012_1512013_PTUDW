var db = require('../fn/db');

exports.loadAll = () => {
	var sql = 'select * from brand';
	return db.load(sql);
}
