
var Q = require('q');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

//todo: make this configurable?
var transporter = nodemailer.createTransport(
  smtpTransport({
      //host: 'smtp.gmail.com',
      //port: 465,
      secure: false
  })
);

Q.ninvoke(transporter, 'verify')
.then(() => console.log('SMTP Configured successfully'))
.catch(err => console.log('SMTP Configuration error: ', err));

module.exports = {
  sendEmail: function(emailAddress, body){
    console.log('sending <', body, '> to: ', emailAddress);
    return Q.ninvoke(transporter, 'sendMail', {
      from: 'no-reply@casa.paulgray.net',
      to: emailAddress,
      subject: 'hello world!',
      html: body
    })
    .then(function(error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent');
      }
    });
  }
};
