const mysql = require('mysql');
const bluebird = require('bluebird');
const { database, username, password, host } = require(__dirname + '/../config/dbConfig');

const db = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

db.connect();
bluebird.promisifyAll(db);

module.exports = db;