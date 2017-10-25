

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