

// Object containing utility methods
// Author: Daniel Olsson <orol1600@student.miun.se>
//----------------------------------------------------//
var utils = {
  
  // Bottom right notification 
  //--------------------------------------------------//
  notification: function(status, message) {
    
    switch (status) {
      
      case "success":
        // grab the elements to be used
        var notSuccDiv = $('#notSuccDiv');
        var notSuccMsg = $('#notSuccMsg');
        
        // put the message passed into the div
        notSuccMsg.html(message);
        // fade success div in, pause, fade out then remove message
        notSuccDiv.fadeIn(500)
          .delay(1500)
          .fadeOut(500, function(){
            notSuccMsg.html('');
          });       
        break;
    
      case "error":
        // grab the elements to be used
        var notErrDiv = $('#notErrDiv');
        var notErrMsg = $('#notErrMsg');
          
        // put the message passed into the div
        notErrMsg.html(message);
        // fade error div in, pause, fade out then remove message
        notErrDiv.fadeIn(500)
          .delay(1500)
          .fadeOut(500, function(){
            notErrMsg.html('');
          });
        break;

        default:
        // grab the elements to be used
        var notInfoDiv = $('#notInfoDiv');
        var notInfoMsg = $('#notInfoMsg');
          
        // put the message passed into the div
        notInfoMsg.html(message);
        // fade info div in, pause, fade out then remove message
        notInfoDiv.fadeIn(500)
          .delay(1500)
          .fadeOut(500, function(){
            notInfoMsg.html('');
          });          
        
    }
  },

  // Create excerpt from a text 
  //--------------------------------------------------//
  excerpt: function(text) {
    
    if (text.length > 36) {
    
      var shortText = text.substr(0, 35) + ' ...';
      return shortText;
    
    } else {
    
      return text;
    }
  }


}