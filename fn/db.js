var mysql = require('mysql');

exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'pirate_camera_store'
        });

        cn.connect();

        cn.query(sql, function(error, rows, fields) {
            if (error) {
            	reject(error);
            } else {
                //console.log('DB Connected!');
            	resolve(rows);
            }

            cn.end();
        });
    });
}

exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'pirate_camera_store'
        });

        cn.connect();

        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}

/*Product productID productName productPrice
productViews productDes productOrigin productCat
productProducer*/