var email = require('../email');
var userModel = require('../../api/user/user.model');


module.exports = {
  sendInviteEmailToUser: function(user){
    console.log('sending email to:', user);
    return email.sendEmail(user.email, 'Yo, join CASA');
  }
};
