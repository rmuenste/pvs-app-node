var nodemailer = require('nodemailer');

//------------------------------------------------------------------------

/*
 * This function calls the nodemailer module to send an email with an attachment 
 * @param error Passed parameter
 * @param stdout Std output of the gpg process
 * @param stderr Std err output of the gpg process
 * @param res_obj Response object from express
 * @param orig_name Name of the file that should encrypted
 * @param out_name Name of the encrypted file that should sent
 *                by email
 * @param mail_data Configuration object for mail server access
 *
 */
var mailHandler_test = function(error, stdout, stderr, res_obj, orig_name, out_name, mail_data) {

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
    to: 'raphael.muenster@gmail.com',
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

//========================================================================
//         This function sends a simple mail without attachment
//========================================================================
/*
 * This function calls the nodemailer module to send an email with an attachment 
 * @param error Passed parameter
 * @param res_obj Response object from express
 * @param user_data An object containing the user data and message 
 * @param mail_data Configuration object for mail server access
 *
 */
var mailFromUser = function(error, res_obj, user_data, mail_data) {

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
    from: user_data.userName,
    to: 'raphael.muenster@gmail.com',
    subject: user_data.userSubject,
    text: user_data.userMSG + "\n please reply to " + user_data.userMail, 
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

exports.mailHandler_test = mailHandler_test;
exports.mailFromUser = mailFromUser;
