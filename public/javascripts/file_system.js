var fs = require('fs');
var Path = require('path');
var DateJS = require('datejs');

var mypath = './logs/albis-log-15-01-17.log';

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

var mypath2 = './logs';
var dirs = fs.readdirSync(mypath2);
var count = 0;
for(var idx in dirs) {
  var fname = Path.join(mypath2, dirs[idx]);
  var file_stats = fs.statSync(fname);
  if(file_stats.isFile())
  {
    count++;
  }
}

var parseDate = function(fileName) {
  var index2 = secondOf(fileName);
  console.log("Word: " + fileName);
  console.log("Index: " + index2);
  var datum = fileName.slice(index2+1,fileName.length-4);
  console.log("Substr: " + datum);
  var dmy = datum.split('-');
  console.log("Date d-m-y: " + dmy[0] + ' ' + dmy[1] + ' ' + dmy[2] );
  var day = parseInt(dmy[0]);
  var month = parseInt(dmy[1]) - 1;
  var year = 2000 + parseInt(dmy[2]);
  var mydate = new Date(year, month, day);
  console.log(mydate.toString());
  var w = mydate.getWeek();
  console.log('We are in the ' + w + 'th week of the year.');
  console.log('Cardinal day of month' + mydate.getDate());

//  var day_num = mydate.dayOfYear();
//  console.log('It is the ' + day_num + '-th day of the year.');

}

var l = dirs.length;
parseDate(dirs[0]);
parseDate(dirs[l-1]);


