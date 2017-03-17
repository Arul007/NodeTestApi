var express = require('express');
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/test";
var router = express.Router();

// default router
router.get('/',function(req,res,next){
  var response = {};
  response = {"message" : "Welcome to Express Default router"}
  res.json(response);
});

// To get all data of the table
router.get('/selectall', function(req, res) {
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

});

// To get all data emp by id
router.get('/select/:id', function(req, res,next) {
  console.log(req.params.id);
  var id = req.params.id;
  console.log("select for the particular employee"+req.params.id);
  var client = new pg.Client(conString);
  client.connect();

  var query = client.query("select * from company where id="+id);
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

});

router.post('/select', function(req, res,next) {
  console.log(req.body.id);
  var id = req.body.id;
  // console.log(req.query.id);
  // res.json({ message: 'hooray! welcome to our api!' });
  console.log("select for the particular employee  ===> "+req.body.id);
  var client = new pg.Client(conString);
  client.connect();
  console.log("Connection Established successfully");
  var query = client.query("select * from company where id="+id);
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

});

// to delete
router.delete('/delete', function(req, res,next) {
  console.log(req.body.id);
  var id = req.body.id;
  console.log("select for the particular employee ===> "+req.body.id);
  var client = new pg.Client(conString);
  client.connect(function(err) {
  if (err) {
    res.json({"error" : "Error in Connection"+err});
  }else{
    console.log("Connection Established successfully");
    var query = client.query("delete from company where id="+id,function(err, data) {
      if(err){
        res.json({"error" : "Error in Deletion"+err});
      }else{
        console.log("Executing the query");
        res.json({"success" : "Entry deleted successfully for"+id});
      }

      });
  }

  });

});

// To update the data of emp by id
router.put('/update', function(req, res,next) {
  console.log(req.body.id);
  console.log(req.body.name);
  var id = req.body.id;
  var name = req.body.name;
  console.log("select for the particular employee ==> "+req.body.id);
  var client = new pg.Client(conString);
  client.connect(function(err) {
  if (err) {
    res.json({"error" : "Error in Connection"+err});
  }else{
    console.log("Connection Established successfully");
    var query = client.query("update company set name ='"+name+"' where id="+id,function(err, data) {
      if(err){
        res.json({"error" : "Error in Update"+err});
      }else{
        console.log("Executing the query");
        res.json({"success" : "Entry Updated successfully for id => "+id});
      }
      });
  }

  });

});

// to create a employee details
router.post('/create', function(req, res,next) {
  console.log(req.body.id);
  console.log(req.body.name);

  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var salary = req.body.salary;
  var dept = req.body.dept;
  // var name = req.body.name;
  console.log("select for the particular employee ==> "+req.body.id);
  var client = new pg.Client(conString);
  var query = client.connect(function(err) {
  if (err) {
    res.json({"error" : "Error in Connection"});
  }else{
    console.log("Connection Established successfully");
    var query = client.query("insert into company(id,dept,name,address,salary) values("+id+",'"+dept+"','"+name+"','"+address+"',"+salary+")",function(err, data) {
      if(err){
        res.json({"error" : "Error in insert query"+err});
      }else{
        console.log("Executing the query");
        res.json({"success" : "insert query executed successfully for id => "+id});
      }
      });
  }

  });

});

module.exports = router;
