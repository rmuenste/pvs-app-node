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
