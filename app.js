const mysql = require('mysql');
const pass = require('./config').secret;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    password: pass,
    database: 'tests',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql db!');
});

const employee = {name: 'Dan', location: 'USA'}
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

connection.query('call sp_getall()', (err, rows) => {
    if (err) throw err;
    console.log('Data received from db \n');
    rows[0].map((row) => {
        console.log(`${row.name} is in ${row.location}`);
    });
});

connection.query("set  @employee_id = 0; call sp_insert_employee(@emplyee_id, 'Ron', 'USA'); select @employee_id", (err, rows) => {
    if (err) throw err;
    console.log('Data received \n');
    console.log(rows);
});


connection.end((err) => {
    //End connection
});