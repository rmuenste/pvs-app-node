function createTable(){

  mytable = $('<table></table>').attr({ id: "basicTable" });
  var rows = 3; // new Number($("#rowcount").val());
  var cols = 3;
  var tr = [];
  var hdr = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
  $('<td></td>').text("Datum").appendTo(hdr); 
  $('<td></td>').text("Albis").appendTo(hdr); 
  $('<td></td>').text("Praxis-Archiv").appendTo(hdr); 
  for (var i = 0; i < rows; i++) {
    var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
    for (var j = 0; j < cols; j++) {
      $('<td></td>').text("text1").appendTo(row); 
    }

  }
  console.log("TTTTT:"+mytable.html());
  mytable.appendTo("#box");	       

}
