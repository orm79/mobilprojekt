
// BurgerMenu
//-- Object containing methods for the mobile burger menu

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


// Object containing user methods
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
                $('#fnameHelp').html("Ogiltiga tecken i förnamn");
                $('#fname').addClass('is-danger');
                break;

        case 'lnameErr':
                $('#lnameHelp').html("Ogiltiga tecken i efternamn");
                $('#lname').addClass('is-danger');
                break;

        case 'emailErr':
                $('#emailHelp').html("Ej korrekt e-post format");
                $('#email').addClass('is-danger');
                break;

        case 'passErr1':
                $('#pass2Help').html("Lösenorden matchar ej, prova igen.");
                $('#pass1, #pass2').addClass('is-danger').val("");
                break;

        case 'passErr2':
                $('#pass1Help').html('Ogiltigt lösenord! endast A-Z 0-9 !@#$%');
                $('#pass1').addClass('is-danger').val("");
                break;

        default:
                $('#fname, #lname, #email, #pass1, #pass2').val('');        

                $('#userMsgSection').html(
                  '<div class="notification is-success" id="userMsg">' +
                  '<button class="delete" id="userMsgDel"></button>' +
                  data + ': ' + email + '</div>'
                );
      }
       // if the call is not successful
    }).fail(function(jqXHR, textStatus, errorThrown) {
      
      // show a message that something went wrong
      $('#userMsgSection').html(
        '<div class="notification is-danger" id="userMsg">' +
        '<button class="delete" id="userMsgDel"></button>' +
        'Något gick fel, prova igen senare</div>'
      );      
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
        content += '<tr>\n' + 
                      '<th>' + data[i].lname + '</th>\n' +
                      '<td>' + data[i].fname + '</td\n>' +
                      '<td>' + data[i].email + '</td\n>' +
                      '<td>\n' +
                        '<label class="checkbox">\n' + 
                          '<input type="checkbox">\n' +
                          'Admin\n' + 
                        '</label>\n' +
                      '</td>\n' +
                      '<td>\n' +
                        '<a class="button is-danger is-outlined" id="edit-' + data[i].email + '">' + 
                          '<span>\n' + 
                            'Radera\n' +
                          '</span>\n' +
                          '<span class="icon is-small"\n>' + 
                            '<i class="fa fa-times"></i>\n' +
                          '</span>\n' +
                        '</a>\n' +
                      '</td>\n' +
                    '</tr>\n\n';
      };

      $('#userTable').html(content);
      
    //when we get an error
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ': ' + errorThrown);
      console.log(jqXHR);
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
      console.log(textStatus + ': ' + errorThrown);
    });
  },

  // Delete user from email
  //--------------------------------------------------//
  delete: function(email) {
    
        var result = users.ajaxCall({
          "func": "del_user",
          "email": email
        }, 'text', 'users.script.php');
        
        result.done(function(data) {
          
          console.log(data);
          
        }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus + ': ' + errorThrown);
        });
      },

  // Update user admin status
  //--------------------------------------------------//
  admin: function(email) {
    
        var result = users.ajaxCall({
          "func": "update_admin",
          "email": email
        }, 'text', 'users.script.php');
        
        result.done(function(data) {
          console.log(data);
          return(data);
          
        }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus + ': ' + errorThrown);
        });
      }


}

$('body').on('click', '#userFormButton', function(e) {
  users.add();
  $('#fnameHelp, #lnameHelp, #emailHelp, #pass1Help, #pass2Help').html("");
  $('#fname, #lname, #email, #pass1, #pass2').removeClass('is-danger');
  
});

$('body').on('click', '#testbutton', function(e) {
  users.admin("ben@boj.se");
  //$('#testdiv').html('<p>Adminstatus för ben@boj.se: ' + result + '</p>');
});

// $('body').on('click', '#testbutton', function(e) {
//   users.delete("lennart@svensk.se");
  
// });