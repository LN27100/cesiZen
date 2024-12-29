const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'LN27100',
    password: '02111979Lh.',
    database: 'cesi_zen'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = db;
