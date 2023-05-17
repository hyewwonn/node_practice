const sqlite3 = require('sqlite3').verbose(); // verbose는 stack trace 정보를 추가로 출력
const http = require('http');

// open database in memory
let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
})

db.run('CREATE TABLE IF NOT EXISTS ranking(name text not null, score inreger not null)');

function select() {
    let sql = `SELECT * FROM ranking`;

    db.all(sql, [], (err, rows) => {
        if(err) {
            throw err;
        }
        rows.forEach((row)=>{
            console.log(row);
        });
    });

    db.close();
}

db.run(`INSERT INTO ranking(name, score) VALUES('성재', 502)`, function(err) {
    if(err) {
        return console.log(err.message);
    }
    select();
});

// db.run(`DELETE FROM ranking`);

