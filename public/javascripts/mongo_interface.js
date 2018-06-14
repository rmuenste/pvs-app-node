var MongoClient = require("mongodb").MongoClient,
                  assert = require("assert");

var url = 'mongodb://AlfredAlfer:TuHayffin2@localhost:27017/AlbisDB';

var opts = {db: {authSource:'admin'}};

MongoClient.connect(url, opts, function(err, db) {
  if(!err) {
    console.log("Connected!");
  } else {
    console.log("could not connect");
  }

  var coll = db.collection("PVS");
  db.close();

});

//var jd = require('./juliandate.js');
//var util = require('util');
//var mysql = require('mysql');
//
//var con = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "ticCerk9",
//  database: "praxis"
//});
//
//// This statement selects the all juliandates
//// that are >= 2458271 
//con.query('SELECT * FROM Backups WHERE juliandate >= 2458271;', function (err, result) {
//  if (err) throw err;
//  console.log('The solution is: ', result);
//});
//
//con.end();
