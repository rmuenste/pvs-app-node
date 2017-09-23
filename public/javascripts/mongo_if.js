var DateJS = require('datejs');
var MongoClient = require('mongodb').MongoClient
  , assert = require("assert");

function lastMonday() {
  var last_mon = Date.today();
  if(last_mon.getDay() === 1)
    return last_mon;
  else {
    last_mon.moveToDayOfWeek(1, -1);
    return last_mon;
  }
}

function nextSunday() {
  var sun =  Date.today();
  if(sun.getDay() === 0)
    return sun;
  else {
    sun.moveToDayOfWeek(0);
    return sun;
  }
}

function makeTable(data, from, to) {

}

var url = 'mongodb://localhost:27017/testDB';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to mongo, database testDB");

  var coll = db.collection('testColl');

  console.log("Using collection testColl");

  var td = Date.today();
  var w  = td.getWeek();
  var lm = lastMonday();
  var sd = nextSunday();

  var first = Date.today();
  first.set({day: 1, month: 0, year: 2018});

  console.log('First: ' + first);
  console.log('First Week: ' + first.getWeek());

  console.log('We are in the ' + w + 'th week of the year.');
  console.log('Today: ' + td);
  console.log('Last Monday: ' + lm);
  console.log('Sunday: ' + sd);

  // make dd-mm-yy strings from mon, sun
  // and get all the entries in between from
  // the database
  // Dates in the future do not need to be
  // retrieved from the db
  // By default we take a db-query that collects
  // all the days of the current week
  // Remember week 52 can contain a Sunday, January 1st
  

  // The db entry should contain:
  // { date: somedate, weekInYear: number, dayOfYear: 1-365(366), task: Albis,
  // file: path}
  // example db.collection.find({ dayOfYear: {$gt : 10, $lt: 17}});
  // example db.collection.find({ $and: [ { dayOfYear: {$gt : 10}},  
  // { dayOfYear: {$lt: 17}}
  // ]});
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('Records in testColl:');
    //console.log(docs);

  });


  db.close();

});

