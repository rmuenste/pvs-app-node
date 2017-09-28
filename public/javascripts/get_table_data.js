$(function () {
  $.ajax({
    type: 'GET',
    url: '/json',
    success: function(data) {

      data.sort(function(a,b) {
        return parseInt(a.JD) - parseInt(b.JD);
      });

      mytable = $('<table></table>').attr({ id: "basicTable" });
      var rows = data.length;
      var cols = 3;
      var tr = [];
      var hdr = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
      $('<td></td>').text("Datum").appendTo(hdr); 
      $('<td></td>').text("Albis").appendTo(hdr); 
      $('<td></td>').text("Praxis-Archiv").appendTo(hdr); 

      var abrv = ["So","Mo","Di","Mi","Do","Fr","Sa"];

      $.each(data, function(i, item) {
        var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
        var de_date = item['Date'];
        var darray = de_date.split('.');

        var jsDate = new Date(parseInt(darray[2]),parseInt(darray[1])-1,parseInt(darray[0]), 1, 1, 1); 

//        console.log("Day: " + parseInt(darray[0]));
//        console.log("Mon: " + parseInt(darray[1]));
//        console.log("Yr: " + parseInt(darray[2]));
//
//        console.log("jsDate: " + jsDate.toString());
//        console.log("Dow: " + jsDate.getDay());

        var dow = jsDate.getDay();

        //var elem = $('<td></td>').text(abrv[dow] + " " + item['Date']).appendTo(row); 
        var elem = $('<td></td>');
        elem.text(abrv[dow] + " " + item['Date']).appendTo(row); 

        if( dow === 6 || dow === 0) {
          var strText = "Frei"
          $('<td></td>').text(strText).appendTo(row); 
          $('<td></td>').text(strText).appendTo(row); 
        } else {
          $('<td></td>').text(item['Albis-BU']).appendTo(row); 
          $('<td></td>').text(item['PA-BU']).appendTo(row); 
        }
        
      });

      var ftr = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
      $('<td></td>').text("Mo 09.01.2017").appendTo(ftr); 
      var f = $('<td></td>');
      f.css({'color':'red', 'font-weight':'Bold'})
      f.text("FAIL").appendTo(ftr); 
      f = $('<td></td>');
      f.css({'color':'red', 'font-weight':'Bold'})
      f.text("FAIL").appendTo(ftr); 

      mytable.appendTo("#box");	       

    }
  });
});
