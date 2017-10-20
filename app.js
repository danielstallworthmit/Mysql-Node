const mysql = require('mysql');
const pass = require('./config').secret;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: pass,
    database: 'tests'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql db!');
});


connection.query('SELECT * from employees', (err, rows) => {
    if (err) throw err;
    console.log('Data received from db \n');
    rows.map((row) => {
        console.log(`${row.name} is in ${row.location}`);
    });
});


connection.end((err) => {
    //End connection
})