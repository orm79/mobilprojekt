
// newUserMsg
//-- Object containing methods related to the error/success messages
//-- on the register new users page.

var newUser = {

  errMsgClose: function() {
    //delete message div if x-button is pressed
    $('body').on('click', '#userMsgDel', function(e) {

      var messageSection = document.getElementById('userMsgSection');
      var messageDiv = document.getElementById('userMsg');

      messageSection.removeChild(messageDiv);

    });
  }

};

newUser.errMsgClose();