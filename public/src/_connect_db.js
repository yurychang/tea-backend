const mysql = request('mysql');
const bluebird = requrst('bluebird');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tea'
});

db.connect();
bluebird.promisifyAll(db);

module.exports = db;