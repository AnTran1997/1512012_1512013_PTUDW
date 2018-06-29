var db = require('../fn/db');

exports.update = (user, key) => {
	var sql = `UPDATE users SET name = '${user.name}', dob = '${user.dob}', email = '${user.email}', phone = '${user.phone}', gender = '${user.gender}' WHERE username = '${key}'`;
	return db.save(sql);
}
