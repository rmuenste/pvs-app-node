$('.upload-btn').on('click', function(){
  console.log('Clicked .upload-btn... \n');
  $('#upload-input').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){

  console.log('Change function... \n');

  var files = $(this).get(0).files;

  if (files.length > 0) {

    // Process the file upload

    // create a FormData object which will be sent as the data payload in the AJAX request
    var formData = new FormData();

    // loop through all the selected files
    for (var i = 0; i < files.length; i++) {

      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
      console.log('Uploading file: ' + file.name + '\n');

    }

    // insert ajax code here:
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log('upload successful!\n' + data);
        jQuery.noConflict();
        $('#myModal').modal('show');
      },
      error: function(data){
        console.log('Failed upload \n' + data);
        alert("Fehler beim Senden!");
      },
      xhr: function() {

        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if(evt.lengthComputable) {

            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progres-bar').text(percentComplete + '%');
            $('.progres-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if(percentComplete === 100) {
              $('.progress-bar').html('Done');
            }
          }
        }, false);
      return xhr;
      }
    });

  }
});
