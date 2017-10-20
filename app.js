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

const employee = {name: 'Jimmy', location: 'USA'}
connection.query('insert into employees set ?', employee, (err, res) => {
    if(err) throw err;
    console.log('Last inserted ID:', res);
});

connection.query('update employees set location = ? where id = ?', ['South Africa', 5], (err, res) => {
    if (err) throw err;
    console.log(`Changed ${res.changedRows} row(s)`);
    console.log(res);
});

connection.query('delete from employees where name = ?', ['Dan'], (err, res) => {
    if (err) throw err;
    console.log(`Deleted ${res.affectedRows} row(s)`);
    console.log(res);
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
});