var nodemailer = require('nodemailer');

//------------------------------------------------------------------------

/*
 * This function calls a GPG encryption subprocess in an asynchronous manner
 * @param error Passed parameter
 * @param stdout Std output of the gpg process
 * @param stderr Std err output of the gpg process
 * @param orig_name Name of the file that should encrypted
 * @param out_name Name of the encrypted file that should sent
 *                by email
 * @param mail_data Configuration object for mail server access
 * @param res_obj Response object from express
 *
 */
var encryptHandler = function(error, stdout, stderr, res_obj, orig_name, out_name, mail_data) {

  if (error !== null) {
    console.log('The encryption of the file failed: ' + error);
    res_obj.status(500).send();
    return;
  }

  var smtpConfig = {
    host: mail_data['host'],
    port: mail_data['port'],
    secure: true, // use SSL
    auth: {
      user: mail_data['user'],
      pass: mail_data['pass']
    }
  };

  var transporter = nodemailer.createTransport(smtpConfig);

  var mailOptions = {
    from: mail_data['from'],
    to: mail_data['to'],
    subject: mail_data['subject'],
    text: mail_data['body'], 
    attachments: [
    {
      filename: orig_name + '.gpg',
      path: out_name
    }
    ]
  };

  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log('Mail error: ' + err);
      console.log('Sending Server Error 500');
      //res_obj.status(500).send();
      res_obj.status(500).send(err);
    }
    else {
      console.log("SMTP: " + info.response);
      console.log('Email sent');
      res_obj.status(200).send();
    }
  });

}

exports.encryptHandler = encryptHandler;
