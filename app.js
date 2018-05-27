// load the express module
var express = require('express');

// create an express object
var app = express();

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var eh = require('./encrypthandler');

var mht = require('./mailhandler_test');

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

/*
 * Express POST request handler for route /upload
 */
app.post('/upload', function(req, res){

  console.log('Processing POST request with parameters: \n');
  /*
   * The Express request object has parameters:
   * @param originalUrl
   * @param protocol String identifying the protocol
   * @param ip IP address of the request
   * @param path Path portion of the url request
   * @param host Host name of the request
   * @param method Method of the request
   * @param query Query string of the request
   * @param secure Boolean that is true if TLS is used
   * @param get(header) a method that returns the value of header
   * @param headers An object form of the request headers
   *
   */
  console.log('Processing POST request with parameters: \n');
  console.log('Protocol: ' + req.protocol);
  console.log('Original url: ' + req.originalUrl);
  console.log('IP: ' + req.ip);
  console.log('Hostname: ' + req.hostname);
  console.log('Path: ' + req.path);
  console.log('Query: ' + JSON.stringify(req.query));
  console.log('Headers: ' + JSON.stringify(req.headers, null, 2));

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
    /*
     * This function call a GPG encryption subprocess in an asynchronous manner
     * @param myname The name of the unencrypted file
     * @param output_name The name of the encrypted file
     *
     */
    //exec('./gpg_encrypt -i ./uploads/' + myname + ' -o ' + output_name, function(error, stdout, stderr) {
    exec('python ./gpg_encrypt.py -i ./uploads/' + myname + ' -o ' + output_name + ' -d ' + pw_obj['gnupghome'] , function(error, stdout, stderr) {

      eh.encryptHandler(error, stdout, stderr,res, myname, output_name, pw_obj);

    });

  });

  //------------------------------------------------------------------------

  // log any errors that occur
  form.on('error', function(err){
    console.log('An error has occured: \n' + err);
    console.log("Error event fired.");
  });

  //------------------------------------------------------------------------

  // once all the files the 'end' event is fired
  form.on('end', function(){
    console.log("End form event fired.");
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

//------------------------------------------------------------------------

/*
 * Express GET request handler for route /json
 */
app.get('/json', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([
        {"Date": "07.01.2017", "Albis-BU": "OK", "PA-BU": "OK", "JD": "7"},
        {"Date": "03.01.2017", "Albis-BU": "OK", "PA-BU": "OK", "JD": "3"},
        {"Date": "06.01.2017", "Albis-BU": "OK", "PA-BU": "OK", "JD": "6"},
        {"Date": "04.01.2017", "Albis-BU": "OK", "PA-BU": "OK", "JD": "4"},
        {"Date": "01.01.2017", "Albis-BU": "OK", "PA-BU": "OK", "JD": "1"},
        {"Date": "05.01.2017", "Albis-BU": "OK", "PA-BU": "OK", "JD": "5"},
        {"Date": "02.01.2017", "Albis-BU": "OK", "PA-BU": "OK", "JD": "2"}
  ], null, 3));
});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000')
});
