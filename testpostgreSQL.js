var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/test";

var client = new pg.Client(conString);
client.connect();

//queries are queued and executed one after another once the connection becomes available
// var x = 10;

// while (x > 0) {
//     client.query("INSERT INTO junk(name, a_number) values('Ted',12)");
//     client.query("INSERT INTO junk(name, a_number) values($1, $2)", ['John', x]);
//     x = x - 1;
// }

var query = client.query("SELECT * FROM company");
//fired after last row is emitted

query.on('row', function(row) {
    console.log(row);
});

query.on('end', function() {
    client.end();
});
