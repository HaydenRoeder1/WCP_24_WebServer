const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test_database2');

function setup(){
    //db.run('CREATE TABLE users(Username text, Password text)');
    db.run("INSERT INTO users(Username, Password) VALUES('hroeder2', 'password2')");
}
setup();

db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});

