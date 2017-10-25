

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
    console.log(data);  
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
          // id of the row
          var rowID = 'row-' + email;
          
          if (data == "yes") {
            // using vanilla js because jquery struggles with @ and . in id
            document.getElementById(rowID).className = 'is-hidden';
        
            utils.notification('Användaren med e-post <strong>' + email + ' </strong>är borttagen.')
          } else {
            utils.notification('Något gick fel, prova igen senare.');
          }
        }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus + ': ' + errorThrown);
        });
      },

  // Update user admin status
  //--------------------------------------------------//
  admin: function(fullID) {
    
        // remove extra characters at beginning
        var email = fullID.substr(4);
        
        var checkBoxes = document.getElementsByTagName('input').disabled = true;
        for (var i = 0; i < checkBoxes.length; i++) {
          checkBoxes[i].disabled = true;
        }

        var result = users.ajaxCall({
          "func": "update_admin",
          "email": email
        }, 'text', 'users.script.php');
        
        result.done(function(data) {
          
          rowID = 'row-' + email;

          if (data == '1') {
            
            document.getElementById(fullID).setAttribute('checked', true);
              
            document.getElementById(rowID).className = 'is-selected';

            utils.notification('Admin status för ' + email + ' har uppdaterats.');

              
              
          } else if (data == '0') {
            document.getElementById(fullID).setAttribute('checked', false);
            document.getElementById(rowID).className = ' ';

            utils.notification('Admin status för ' + email + ' har uppdaterats.');
          } else {
            
              utils.notification('Något gick fel, prova igen senare.');
          }          
          
          setTimeout(function() {
            var checkBoxes = document.getElementsByTagName('input').disabled = true;
            for (var i = 0; i < checkBoxes.length; i++) {
              checkBoxes[i].disabled = false;
            }   
          }, 5000);
          
        }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus + ': ' + errorThrown);
        });
      }
}


// Listening for: "New user" form button press
//----------------------------------------------------//
$('body').on('click', '#userFormButton', function(e) {
  users.add();
  $('#fnameHelp, #lnameHelp, #emailHelp, #pass1Help, #pass2Help').html("");
  $('#fname, #lname, #email, #pass1, #pass2').removeClass('is-danger');
  
});

$('body').on('click', '#testbutton', function(e) {
  var mittID = "daniel@olsson.se";
  document.getElementById(mittID).innerHTML = "hej";
  //$('#testdiv').html('<p>Adminstatus för ben@boj.se: ' + result + '</p>');
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
  console.log(fullID);
  // call the admin method with fullID 
  users.admin(fullID);
});



// $('body').on('click', '#testbutton', function(e) {
//   users.delete("lennart@svensk.se");
  
// });