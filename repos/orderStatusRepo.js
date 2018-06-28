var db = require('../fn/db');

exports.loadNumStatus = () => {
    var sql = `select count(*) as numberStatus from orderstatus`;
    return db.load(sql);
}

exports.loadAll = () => {
    var sql = `select orderStatusName from orderstatus`;
    return db.load(sql);
}
