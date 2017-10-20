
// newUserMsg
//-- Object containing methods related to the error/success messages
//-- on the register new users page.

newUserMsg = {
  
  delete: function() {
    //delete message div if x-button is pressed
    document.getElementById('userMsgSection').addEventListener('click', function(e) {
    
      var messageSection = document.getElementById('userMsgSection');
      var messageDiv = document.getElementById('userMsg');
      var button = e.target;

      if(button && button.nodeName =="BUTTON") {
        messageSection.removeChild(messageDiv);
      }
    });
  }
}

newUserMsg.delete();