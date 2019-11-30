const express = require('express');
const app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test_database2');

/*
db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});
*/

//db.run('CREATE TABLE users(ID int, Username varchar(255), Password varchar(255));');
//db.run('INSERT INTO users VALUES(1, hroeder1, pass123)');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    console.log("Got a request for Hello World from: " + req.ip);
    res.json({yuh: "Hello World"});
});

app.get('/data', (req, res) => {
    console.log("Got a request for data")
    var data = new Array();

    db.each('SELECT * FROM users', (err, row) => {
        data.push(row);
    }, function(){
        res.json(data);
    })
});

app.post('/test', (req, res) => {
    console.log("Post Request?");
    //console.log(req);;
    console.log(req.url);
    console.log(req.body);

    var data = new Array();
    var usernameExists = false;
    db.each('SELECT * FROM users', (err, row) => {
        if(row.Username == req.body.Username && usernameExists == false){
            usernameExists = true;
            console.log("USERNAME MATCH");
        }
    }, function(){
        if(usernameExists == true){
            res.json({err: "Username already exists"});
        }else{
            data = new Array();
            db.run("INSERT INTO users(Username, Password) VALUES(?,?)",req.body.Username, req.body.Password);
            db.each('SELECT * FROM users', (err, row) => {
                data.push(row);
            }, function(){
                res.json(data);
            })
        }
    
    })
});
app.get('/clearData', (req,res) => {
    console.log("Clear Data");
    db.run('DELETE FROM users');

    
    var data = new Array();
    db.each('SELECT * FROM users', (err, row) => {
        data.push(row);
    }, function(){
        res.json(data);
    });
})

app.listen(3001, () => console.log('Listening on port 3001'));
