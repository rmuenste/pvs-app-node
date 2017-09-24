var fs = require('fs');
var Path = require('path');
require('datejs');

var my_data = new Array();

var JulianDate = function(gdate) {

  var id = gdate.getDate();
  var im = gdate.getMonth() + 1;
  var iy = gdate.getFullYear();

  var dy = iy + (im - 2.85) /12.0;

  var da = Math.floor(367 * dy) - 1.75 * Math.floor(dy) + id;

  var db = Math.floor(da) - 0.75 * Math.floor(dy/100);

  return Math.floor(Math.floor(db) + 1721115);
  
}


var secondOf = function(s) {
  var ind = 0;
  var i;
  for(i=0; i < s.length; i++)
  {
    if(s.charAt(i) === '-')
    {
      ind++;
      if(ind ===2)
        return i;
    } 
  }
  return i;
}

var parseDate = function(fileName) {
  var index2 = secondOf(fileName);
//  console.log("Word: " + fileName);
//  console.log("Index: " + index2);
  var datum = fileName.slice(index2+1,fileName.length-4);
//  console.log("Substr: " + datum);
  var dmy = datum.split('-');
//  console.log("Date d-m-y: " + dmy[0] + ' ' + dmy[1] + ' ' + dmy[2] );
  var day = parseInt(dmy[0]);
  var month = parseInt(dmy[1]) - 1;
  var year = 2000 + parseInt(dmy[2]);
  var mydate = new Date(year, month, day);
//  console.log(mydate.toString());
  var w = mydate.getWeek();
//  console.log('We are in the ' + w + 'th week of the year.');
//  console.log('Cardinal day of month' + mydate.getDate());
  var my_date = new Object();
  my_date.week = w;
  my_date.day = day;
  my_date.year = year;
  my_date.month = month + 1;
  return my_date;

}

var mypath2 = './logs';
var dirs = fs.readdirSync(mypath2);
var count = 0;
for(var idx in dirs) {
  var fname = Path.join(mypath2, dirs[idx]);
  var file_stats = fs.statSync(fname);
  if(file_stats.isFile())
  {
    file_data = parseDate(dirs[idx]);
    var data_obj = new Object();
    data_obj.fileName = dirs[idx]; 
    data_obj.week = file_data.week; 
    data_obj.day = file_data.day; 
    data_obj.year = file_data.year; 
    data_obj.month = file_data.month; 
    data_obj.date = new Date(file_data.year, file_data.month-1, file_data.day, 1, 1, 0, 0);
    data_obj.julianDate = JulianDate(data_obj.date);
    console.log(data_obj);
    //my_data.push(data_obj);
    count++;
  }
}

//var l = dirs.length;
//parseDate(dirs[0]);
//parseDate(dirs[l-1]);

//var td = Date.today();
//
//var jd = JulianDate(td);
//
//console.log("JulianDate: " + jd);
