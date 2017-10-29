
// Object containing room methods
// Author: Daniel Olsson <orol1600@student.miun.se>
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
        $('#roomNr').focus();
        break;
      
        case 'duplicate':
        $('#roomNr').addClass('is-danger');
        $('#roomNrHelp').html('Rumsnumret är redan registrerat');
        $('#roomNr').focus();
        break;
      
        case 'false':
        utils.notification('error', 'Något gick fel, prova igen senare.');
        $('#roomNr').focus();
        break;
      
        default:        
        $('#roomNr, #roomInfo, #roomComment').val('');     
        $('#roomNr').focus();
        utils.notification('success', 'Rum med nummer ' + nr + 'har lagts till.');
        
      }
    
       // if the call is not successful
    }).fail(function(jqXHR, textStatus, errorThrown) {
      // show a message that something went wrong
      $('#roomNr').focus();
      utils.notification("error", "Något gick fel, prova igen senare."); 
      
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
    
    var content;
    // loop through all rooms in data and add to content variable
    for(var i=0; i < data.length; i++) {
    
      var cleanStatus;  
      var cleanClass;
      // use the excerpt method to shorten the comment text if necessary
      var comment = utils.excerpt(data[i].comment);
      var rowID = 'row-' + data[i].nr;
      
      if(data[i].status == '1') {
        cleanStatus = 'Städat';
        cleanClass = ''
        } else {
          cleanStatus = 'Ej städat';
          cleanClass = 'is-selected';
        }
      content += '<tr id="' + rowID + '" class="' + cleanClass + '"' +'>\n' + 
                    '<th>' + data[i].nr + '</th>\n' +
                    '<td class="is-hidden-mobile">' + comment + '</td\n>' +
                    '<td>' + cleanStatus + '</td\n>' +
                    '<td>\n' +
                      '<button class="button is-pulled-right" style="z-index: 20;" id="edit-' + data[i].nr + '">' + 
                        '<span style="z-index: -15;">\n' + 
                          'Redigera &nbsp;\n' +
                          '<span class="icon is-small" style="z-index. -15;"\n>' + 
                            '<i class="fa fa-pencil" aria-hidden="true"></i>\n' +
                          '</span>\n' +
                        '</span>\n' +
                      '</button>\n' +
                    '</td>\n' +
                  '</tr>\n\n';
    };
    // add the content to the table 
    $('#roomTable').html(content);
    
  //when we get an error
    }).fail(function(jqXHR, textStatus, errorThrown) {
      utils.notification('error', 'Något gick fel vid hämtning av rumslista, prova igen senare.');
    });
  },

  // Open the edit form modal
  //--------------------------------------------------//
  openEdit: function(nr) {
    
    var result = rooms.ajaxCall({
      "func": "get_room",
      "nr": nr
      }, 'json', 'rooms.script.php');

    result.done(function(data) {
      
      document.getElementById('roomNr').innerHTML = nr;
      document.getElementById('modRoomNr').value = nr;
      document.getElementById('modRoomInfo').value = data[0].info;
      document.getElementById('modRoomCom').value = data[0].comment;
      document.getElementById('modStatus').value = data[0].status;
      document.getElementById('modUser').innerHTML = data[0].upd_user;
      document.getElementById('modDate').innerHTML = data[0].upd_time;
      
      $('#modDiv').css('display', 'flex');
      $('#modalBg').hide().fadeIn(1000);
      $('#modalCard').addClass('magictime spaceInDown');
      
      
    }).fail(function(jqXHR, textStatus, errorThrown) {
      utils.notification('error', 'Något gick fel vid hämtning av rumslista, prova igen senare.');
    });
  },

  // Save edited data from modal form
  //--------------------------------------------------//
  saveEdit: function() {

    var nr       = document.getElementById('modRoomNr').value;
    var info     = document.getElementById('modRoomInfo').value;
    var comment  = document.getElementById('modRoomCom').value;
    var status   = document.getElementById('modStatus').value;
    var upd_user = document.getElementById('modUserEmail').innerHTML;
    
    $('#modSaveBtn').addClass('is-loading');
    
    var result = rooms.ajaxCall({
      "func": "update_room",
      "nr": nr,
      "info": info,
      "comment": comment,
      "status": status,
      "upd_user": upd_user
      }, 'text', 'rooms.script.php');

      result.done(function(data) {
        
        if (data === 'yes') {
          
          utils.notification('success', 'Rum #' + nr + ' har uppdaterats.');
          
          setTimeout(function() {
            $('#modSaveBtn').removeClass('is-loading');
          }, 2500);
        
          rooms.all();
          rooms.cardList();
        } else {
          
          utils.notification('error', 'Något gick fel, prova igen senare.');
        }
      }).fail(function(jqXHR, textStatus, errorThrown) {
        utils.notification('error', 'Något gick fel vid uppdatering, prova igen senare.');
      });
  },

  // List all roms in card form
  //--------------------------------------------------//
  cardList: function() {

    var result = rooms.ajaxCall({
      "func": "all_rooms"
      }, 'json', 'rooms.script.php');
   
    //when function is done successfully
    result.done(function(data) {
    
    var content = ' ';
    
    // loop through all rooms in data and add to content variable
    for(var i=0; i < data.length; i++) {
    
      if(data[i].status === 0) {
      
      content += 

        '<div class="column is-tablet">\n' +
        '<div class="card" id="card-' + data[i].nr + '">\n' +
        
          '<header class="card-header">\n' +
            '<p class="card-header-title">Rum #' + data[i].nr +'</p>\n' +
            '<span class="card-header-icon has-text-danger">\n' + 
              '<span class="icon">\n' + 
                '<i class="fa fa-diamond" aria-hidden="true"></i>\n' +
              '</span>\n' +
            '</span>\n' +
          '</header>\n' +  
          
          '<div class="card-content">\n' + 
            '<div class="content">\n' +
              '<h3 class="is-size-6"><strong>Information</strong></h3>\n' +
              '<p>' + data[i].info +'</p>\n' +
              '<h3 class="is-size-6"><strong>Kommentar</strong></h3>\n' +
              '<p>' + data[i].comment +'</p>\n' +
            '</div>\n' + 
          '</div>\n' + 
          '<footer class="card-footer">\n' +
            '<a href="javascript:void(0)" class="card-footer-item cardDoneLink" id="cardDone-' + data[i].nr +'">Städning klar</a>\n' +
            '<a href="javascript:void(0)" class="card-footer-item cardEditLink" id="cardEdit-' + data[i].nr +'">Redigera</a>\n' +
          '</footer>\n' +
       
        '</div>\n' +
        '</div>\n\n';
      };
    };
    // add the content to the table 
    $('#cardList').html(content);
    //when we get an error
   }).fail(function(jqXHR, textStatus, errorThrown) {
     utils.notification('error', 'Något gick fel vid hämtning av rumslista, prova igen senare.');
   });    

  },

  // Change room status
  //--------------------------------------------------//
  changeStatus: function(nr, status, upd_user) {
    
    // run ajaxCall() with input data, datatype and URL
    var result = rooms.ajaxCall({
                   "nr": nr,
                   "status": status,
                   "upd_user": upd_user,
                   "func": "change_status"
                 }, 'text', 'rooms.script.php');
    
    // when call is done and ok, process returned data string
    result.done(function(data) {
      cardNr = '#card-' + nr;

      if (data == "yes") {
                
        utils.notification('success', 'Rummets status har ändrats.');
        $(cardNr).addClass('magictime spaceOutDown');
          
        setTimeout(function() {
          rooms.cardList();
        }, 1500);
        
      
      } else {
        
        utils.notification('error', 'Något gick fel, prova igen senare.');
      }
    // if the call is not successful
    }).fail(function(jqXHR, textStatus, errorThrown) {
      
      // show a message that something went wrong
      utils.notification('error', 'Något gick fel, prova igen senare.'); 
    });
  
  }
}

