

// Object containing utility methods
//----------------------------------------------------//
var utils = {
  
  
  // Bottom right notification 
  //--------------------------------------------------//
  notification: function(message) {
    
    // grab the elements to be used
    var notDiv = $('#notDiv');
    var notDivMsg = $('#notDivMsg');
    var notMsg = $('#notMsg');
    // put the message passed into the div
    notMsg.html(message);
    // fade div in, pause, fade out then remove message
    notDiv.fadeIn(1200)
      .delay(2000)
      .fadeOut(1200, function(){
        notMsg.html('');
      });
  }

}