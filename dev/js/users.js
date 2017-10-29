

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
                        '<button class="button is-warning" id="del-' + data[i].email + '">' + 
                            'Radera\n' +
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
