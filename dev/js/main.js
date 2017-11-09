
// Object containing methods for the mobile burger menu
// Code from the bulma.io website
//----------------------------------------------------//

burgerMenu = {
  
  toggle: function() { 
      // Method toggles the burger navbar
      document.addEventListener('DOMContentLoaded', function () {

        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
        
          // Add a click event on each of them
          $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {
            
              // Get the target from the "data-target" attribute
              var target = $el.dataset.target;
              var $target = document.getElementById(target);
            
              // Toggle the class on both the "navbar-burger" and the "navbar-menu"
              $el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
            });
          });
        }
    });
  }
}

burgerMenu.toggle();

// Event listeners for the application
// Author: Daniel Olsson <orol1600@student.miun.se>
//----------------------------------------------------//

// Listening for: "Add user" form button press
//----------------------------------------------------//
$('body').on('click', '#userFormButton', function(e) {
  e.preventDefault();
  users.add();
  $('#fnameHelp, #lnameHelp, #emailHelp, #pass1Help, #pass2Help').html("");
  $('#fname, #lname, #email, #pass1, #pass2').removeClass('is-danger');
  
});

// Listening for: "Delete user" button press
//----------------------------------------------------//
$('body').on('click', '#userTable button', function(e) {
  // get full id of clicked button
  var fullID = e.target.id;
  // remove extra characters at beginning
  var theID = fullID.substr(4);
  // call the delete method with theID 
  users.delete(theID);
});

// Listening for: "Admin" checkbox change
//----------------------------------------------------//
$('body').on('change', '#userTable input[type="checkbox"]', function(e) {
  // get full id of change checkbox
  var fullID = e.target.id;
  // call the admin method with fullID 
  users.admin(fullID);

  // set checkboxes disabled while notification is displaying
  // to avoid breaking the animations
  var checkBoxes = document.getElementsByTagName('input');
  
  for (var i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].disabled = true;
  };

  setTimeout(function() {
    checkBoxes = document.getElementsByTagName('input');
    
    for (var i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].disabled = false;
    }   
  }, 4000);
});

// Listening for: "Add room" form button press
//----------------------------------------------------//
$('body').on('click', '#roomFormButton', function(e) {
  e.preventDefault();
  rooms.add_room();
  $('#roomNrHelp').html(' ');
  $('#roomNr').removeClass('is-danger');
  
});

// Listening for: "Edit room" button press
//----------------------------------------------------//
$('body').on('click', '#roomTable button', function(e) {
  // get full id of clicked button
  var fullID = e.target.id;
  
  // remove extra characters at beginning
  var theID = fullID.substr(5);
  
  // call the delete method with theID 
  rooms.openEdit(theID);

  // call the listener for closing modal
  listenModClose();
});

// Listening for: "Edit card" button press
//----------------------------------------------------//
$('body').on('click', '.cardEditLink', function(e) {
  // get full id of clicked button
  var fullID = e.target.id;
  
  // remove extra characters at beginning
  var theID = fullID.substr(9);
  
  // call the delete method with theID 
  rooms.openEdit(theID);

  // call the listener for closing modal clicks
  listenModClose();
});

// Adds eventlistener for close modal clicks
//----------------------------------------------------//
var listenModClose = function () {

  $('body').on('click', '#modCloseBtn, #modCancelBtn, .modal-background', function() {
    
    // fade the modal div out on close
    $('#modDiv').fadeOut(500);
    // empty all the values from the modal fields
    document.getElementById('modDiv').className = 'modal';
    document.getElementById('roomNr').innerHTML = '';
    document.getElementById('modRoomInfo').value = '';
    document.getElementById('modRoomCom').value = '';
    document.getElementById('modStatus').value = '';
    document.getElementById('modUser').innerHTML = '';
    document.getElementById('modDate').innerHTML = '';
  });
};

// Listening for: "Save" modal button press
//----------------------------------------------------//
$('body').on('click', '#modSaveBtn', function(e) {
  e.preventDefault();
  rooms.saveEdit();
});

// Listening for: "Cleaning done" link on card
//----------------------------------------------------//
$('body').on('click', '.cardDoneLink', function(e) {
  
  var upd_user = document.getElementById('modUserEmail').innerHTML;
  var status = 1;
  
  // get full id of clicked button
  var fullID = e.target.id;
  
  // remove extra characters at beginning
  var theID = fullID.substr(9);
 
  rooms.changeStatus(theID, status, upd_user);
});



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
                      '<button class="button is-pulled-right" id="edit-' + data[i].nr + '">' + 
                        'Redigera\n' +
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
      
      $('#modDiv').fadeIn(500).css('display', 'flex').addClass('is-active');
      
    }).fail(function(jqXHR, textStatus, errorThrown) {
      utils.notification('error', 'Något gick fel, prova igen senare.');
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
      utils.notification('error', 'Något gick fel, prova igen senare.');
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



// Object containing users methods
// Author: Daniel Olsson <orol1600@student.miun.se>
//----------------------------------------------------//
var users = {

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

  // Add new user from form inputs
  //--------------------------------------------------//
  add: function() {
    
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var pass1 = $('#pass1').val();
    var pass2 = $('#pass2').val();
    var admin = '';

    // set var admin value depending on checkbox status
    if( $('input[name="admin"]').is(':checked')) {
      admin = 1;
    } else {
      admin = 0;
    };
    
    // run ajaxCall() with input data, datatype and URL
    var result = users.ajaxCall({
                   "fname": fname,
                   "lname": lname,
                   "email": email,
                   "pass1": pass1,
                   "pass2": pass2,
                   "admin": admin,
                   "func": "signup"
                 }, 'text', 'users.script.php');

    // when call is done and ok, process returned data string
    result.done(function(data) {
      
      switch(data) {

        case 'fnameErr':
          $('#fnameHelp').html('Ogiltiga tecken i förnamn');
          $('#fname').addClass('is-danger');
          $('#fname').focus();
          break;

        case 'lnameErr':
          $('#lnameHelp').html('Ogiltiga tecken i efternamn');
          $('#lname').addClass('is-danger');
          $('#lname').focus();
          break;

        case 'emailErr':
          $('#emailHelp').html('Ej korrekt e-post format');
          $('#email').addClass('is-danger');
          $('#email').focus();
          break;

        case 'passErr1':
          $('#pass2Help').html('Lösenorden matchar ej, prova igen.');
          $('#pass1, #pass2').addClass('is-danger').val("");
          $('#pass1').focus();
          break;

        case 'passErr2':
          $('#pass1Help').html('Ogiltigt lösenord! endast A-Z 0-9 !@#$%');
          $('#pass1').addClass('is-danger').val("");
          $('#pass1').focus();
          break;

        default:
          $('#fname, #lname, #email, #pass1, #pass2').val(''); 
          $('input[name="admin"]').prop( "checked", false);
          $('#fname').focus();

          utils.notification('success', 'Användare med e-post ' + email + ' har skapats.');

      }
       // if the call is not successful
    }).fail(function(jqXHR, textStatus, errorThrown) {
      // show a message that something went wrong
      $('#fname').focus();
      utils.notification('error', 'Något gick fel, prova igen senare');     
    });
  },
  
  // Get all users data and list it in table
  //--------------------------------------------------//
  all: function() {
    
    var result = users.ajaxCall({
      "func": "all_users"
    }, 'json', 'users.script.php');
    
    //when function is done successfully
    result.done(function(data) {
     
      var content;
      
      for(var i=0; i < data.length; i++) {
        
        var adminClass = 'class=" "';
        var adminCheck = '';
        
        if (data[i].admin == "1") {
          adminClass =  'class="is-selected"';
          adminCheck = 'checked';
        }

        content += '<tr id="row-' + data[i].email + '" ' + adminClass + '>\n' + 
                      '<th class="is-hidden-mobile">' + data[i].lname + '</th>\n' +
                      '<td class="is-hidden-mobile">' + data[i].fname + '</td\n>' +
                      '<td>' + data[i].email + '</td\n>' +
                      '<td>\n' +
                        '<label class="checkbox">\n' + 
                          '<input type="checkbox" id="adm-' + data[i].email + '" ' + adminCheck + '>\n' +
                          'Admin\n' + 
                        '</label>\n' +
                      '</td>\n' +
                      '<td>\n' +
                        '<button class="button is-pulled-right" id="del-' + data[i].email + '">' + 
                            'Ta bort\n' +
                        '</button>\n' +
                      '</td>\n' +
                    '</tr>\n\n';
      };

      $('#userTable').html(content);
      
    //when we get an error
    }).fail(function(jqXHR, textStatus, errorThrown) {
      
      utils.notification('error', 'Något gick fel, prova igen senare'); 
    });
  },

  // Get user from email
  //--------------------------------------------------//
  get: function(email) {

    var result = users.ajaxCall({
      "func": "get_user",
      "email": email
    }, 'json', 'users.script.php');
    
    result.done(function(data) {
      
      return(data);
      
    }).fail(function(jqXHR, textStatus, errorThrown) {
       
    });
  },

  // Delete user from email
  // Author: Daniel Olsson <orol1600@student.miun.se>
  //--------------------------------------------------//
  delete: function(email) {
    
        var result = users.ajaxCall({
          "func": "del_user",
          "email": email
        }, 'text', 'users.script.php');
        
        result.done(function(data) {
          // id of the row
          var rowID = 'row-' + email;
          
          if (data == "yes") {
            // using vanilla js because jquery struggles with @ and . in id
            document.getElementById(rowID).className = 'is-hidden';
        
            utils.notification('success', 'Användaren med e-post ' + email + ' är borttagen.')
          } else {
            utils.notification('error', 'Något gick fel, prova igen senare.');
          }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            utils.notification('error', 'Något gick fel, prova igen senare.');
        });
      },

  // Update user admin status
  //--------------------------------------------------//
  admin: function(fullID) {
    
        // remove extra characters at beginning
        var email = fullID.substr(4);
        
        var result = users.ajaxCall({
          "func": "update_admin",
          "email": email
        }, 'text', 'users.script.php');
        
        result.done(function(data) {
          
          rowID = 'row-' + email;

          if (data == '1') {
            
            document.getElementById(fullID).setAttribute('checked', true);
            document.getElementById(rowID).className = 'is-selected';
            utils.notification('success', 'Adminstatus för ' + email + ' har uppdaterats.');

          } else if (data == '0') {
            
            document.getElementById(fullID).setAttribute('checked', false);
            document.getElementById(rowID).className = ' ';
            utils.notification('success', 'Adminstatus för ' + email + ' har uppdaterats.');
          
          } else {
            
            utils.notification('error', 'Något gick fel, prova igen senare.');
          }          

        }).fail(function(jqXHR, textStatus, errorThrown) {
            utils.notification('error', 'Något gick fel, prova igen senare.'); 
        });
      },

}


// Object containing utility methods
// Author: Daniel Olsson <orol1600@student.miun.se>
//----------------------------------------------------//
var utils = {
  
  // Bottom notification
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