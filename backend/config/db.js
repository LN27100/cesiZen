const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Ne connecte pas à la BDD en environnement de test
if (process.env.NODE_ENV !== 'test') {
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
  });
}

module.exports = db;
