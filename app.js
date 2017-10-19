const mysql = require('mysql');
const pass = require('./config').secret;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: pass,
    database: ''
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql db');
});