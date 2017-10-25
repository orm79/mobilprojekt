// Object containing room methods
//----------------------------------------------------//
var rooms = {
  
    // Ajax call, three params, returns promise
    //--------------------------------------------------//
    ajaxCall: function(theData, theType, theURL) {
      //return $.get promise
      return $.post({ 
        data: theData,
        dataType: theType,
        url: 'phpscripts/' + theURL
      });
    }, 
  
    // Add new room from form inputs
    //--------------------------------------------------//
    add_room: function() {
      
      var nr      = $('#roomNr').val();
      var info    = $('#roomInfo').val();
      var comment = $('#roomCom').val();
      var status  = $('#roomStatus').val();
  
      // run ajaxCall() with input data, datatype and URL
      var result = rooms.ajaxCall({
                     "nr": nr,
                     "info": info,
                     "comment": comment,
                     "status": status,
                     "func": "add_room"
                   }, 'text', 'rooms.script.php');
      
      // when call is done and ok, process returned data string
      result.done(function(data) {
        
        switch(data) {
        
        case 'nrErr':
          $('#roomNr').addClass('is-danger');
          $('#roomNrHelp').html('Felaktigt format, rum har tre siffror');
          break;

        case 'duplicate':
          $('#roomNr').addClass('is-danger');
          $('#roomNrHelp').html('Rumsnumret är redan registrerat');
          break;

        case 'false':
          $('#userMsgSection').html(
            '<div class="notification is-danger" id="userMsg">' +
            '<button class="delete" id="userMsgDel"></button>' +
            'Något gick fel, prova igen senare</div>');
            break;

        default:        
          $('#roomNr, #roomInfo, #roomComment').val('');     
          $('#userMsgSection').html(
            '<div class="notification is-success" id="userMsg">' +
            '<button class="delete" id="userMsgDel"></button>' +
            'Rum med nummer ' + nr + 'har skapats</div>');
        }
      
         // if the call is not successful
      }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        // show a message that something went wrong
        $('#userMsgSection').html(
          '<div class="notification is-danger" id="userMsg">' +
          '<button class="delete" id="userMsgDel"></button>' +
          'Något gick fel, prova igen senare</div>'
        );      
      });
    },

    // Get all rooms data and list it in table
    //--------------------------------------------------//
    all: function() {

      var result = rooms.ajaxCall({
       "func": "all_rooms"
      }, 'json', 'rooms.script.php');
    
    //when function is done successfully
    result.done(function(data) {
      console.log(data);
      var content;
      
      for(var i=0; i < data.length; i++) {
      
        var cleanStatus;  
        
        if(data[i].status == "1") {
          cleanStatus = "Städat";
          } else {
            cleanStatus = "Ostädat";
          }

        content += '<tr>\n' + 
                    '<th>' + data[i].nr + '</th>\n' +
                    '<td class="is-hidden-mobile">' + data[i].comment + '</td\n>' +
                    '<td>' + cleanStatus + '</td\n>' +
                    '<td>\n' +
                      '<a class="button is-primary is-outlined" id="edit-' + data[i].nr + '">' + 
                        '<span>\n' + 
                          'Redigera\n' +
                        '</span>\n' +
                        '<span class="icon is-small"\n>' + 
                          '<i class="fa fa-pencil"></i>\n' +
                        '</span>\n' +
                      '</a>\n' +
                    '</td>\n' +
                  '</tr>\n\n';
      };

      $('#roomTable').html(content);
      
    //when we get an error
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ': ' + errorThrown);
    });
  }    
  
}

  $('body').on('click', '#roomFormButton', function(e) {
    rooms.add_room();
    $('#roomNrHelp').html("");
    $('#roomNr').removeClass('is-danger');
    
  });