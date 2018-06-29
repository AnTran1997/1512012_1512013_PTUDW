var db = require('../fn/db');

exports.add = user => {
	var sql = `insert into users(username, password, name, email, dob, permission) values('${user.username}', '${user.password}', '${user.name}', '${user.email}', '${user.dob}', ${user.permisson})`;
	return db.save(sql);
}

exports.login = user => {
	var sql = `select * from users where username = '${user.username}' and password = '${user.password}'`;
	return db.load(sql);
}