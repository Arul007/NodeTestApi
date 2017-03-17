var express = require('express');
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/test";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.json({ message: 'hooray! welcome to our api!' });
  console.log("Inside the select");
  var client = new pg.Client(conString);
  client.connect();
  var query = client.query("SELECT * FROM company");
  console.log("Executing the query");
  
  query.on('row', function(row, result) {
     console.log("Result query");
     console.log(row);
     result.addRow(row);
  });

  query.on('end', function(result) {
    console.log(result.rowCount + ' rows were received');
    console.log(JSON.stringify(result.rows, null, "    "));
    res.send(JSON.stringify(result.rows, null, "    "));
  });
  // client.end();
});

module.exports = router;


// var pg = require('pg');
// var conString = "postgres://postgres:admin@localhost:5432/test";
//
// var client = new pg.Client(conString);
// client.connect();
//
// //queries are queued and executed one after another once the connection becomes available
// // var x = 10;
//
// // while (x > 0) {
// //     client.query("INSERT INTO junk(name, a_number) values('Ted',12)");
// //     client.query("INSERT INTO junk(name, a_number) values($1, $2)", ['John', x]);
// //     x = x - 1;
// // }
//
// var query = client.query("SELECT * FROM junk");
// //fired after last row is emitted
//
// query.on('row', function(row) {
//     console.log(row);
// });
//
// query.on('end', function() {
//     client.end();
// });
