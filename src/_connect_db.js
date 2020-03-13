const mysql = require('mysql');
const bluebird = require('bluebird');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tea'
});

db.connect();
bluebird.promisifyAll(db);

module.exports = db;