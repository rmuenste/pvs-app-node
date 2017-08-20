var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

const nodemailer = require('nodemailer');
const exec = require('child_process').exec;
const moment = require('moment');

var pw_obj = JSON.parse(fs.readFileSync('hash.json','utf8'));

var date = moment().format('DD-MM-YYYY');

//------------------------------------------------------------------------

console.log('Loaded modules... \n');
console.log('Today: ' + date);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

//------------------------------------------------------------------------

app.post('/upload', function(req, res){

  var status_var = false;

  console.log('Starting upload function... \n');
  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a files has been uploaded successfully,
  // rename it to it's original name
  form.on('file', function(field, file){

    var myname = 'pvs-' + date + '.dat'; 

    fs.rename(file.path, path.join(form.uploadDir, myname));

    console.log("file event: " + file.name);

    var output_name = './pvs_files/' + myname + '.gpg';

    //------------------------------------------------------------------------
    // asynchronous function call
    exec('./gpg_encrypt -i ./uploads/' + myname + ' -o ' + output_name, function(error, stdout, stderr) {

      if (error !== null) {
        console.log('exec error: ' + error);
      }

      var smtpConfig = {
        host: pw_obj['mail-server'],
        port: pw_obj['mail-port'],
        secure: true, // use SSL
        auth: {
          user: pw_obj['user'],
          pass: pw_obj['Password']
        }
      };

      var transporter = nodemailer.createTransport(smtpConfig);

      var mailOptions = {
        from: pw_obj['from'],
        to: pw_obj['to'],
        subject: pw_obj['subject'],
        text: pw_obj['body'], 
        attachments: [
        {
          filename: myname + '.gpg',
          path: output_name
        }
        ]
      };

      transporter.sendMail(mailOptions, function(err, info){
        if(err){
          console.log('Error');
          res.status(500).send();
        }
        else {
          console.log("SMTP: " + info.response);
          console.log('Email sent');
          res.status(200).send();
        }
      });

    });

  });
  
  //------------------------------------------------------------------------

  // log any errors that occur
  form.on('error', function(err){
    console.log('An error has occured: \n' + err);
    console.log("Error event fired.");
  });
  
  //------------------------------------------------------------------------

  // once all the files have been uploaded, send a response to the client
  form.on('end', function(){
    console.log("End form event fired.");
  });

  // parse the incoming request containing the form data
  form.parse(req);

  console.log('Upload handler end \n');

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000')
});
