

// Object containing user methods
//---------------------------------------------//
var users = {

  ajaxCall: function(theQuery, theType, theURL) {
    //return $.get promise
    return $.post({ 
      data: theQuery,
      dataType: theType,
      url: theURL
    });
  }, 

  add: function() {
    
      console.log('button clicked');
      
      var fname = $('#fname').val();
      var lname = $('#lname').val();
      var email = $('#email').val();
      var pass1 = $('#pass1').val();
      var pass2 = $('#pass2').val();
      var admin = '';
            
      if( $('input[name="admin"]').is(':checked')) {
        admin = 1;
      } else {
        admin = 0;
      };
    
    
    var result = users.ajaxCall({
                   fname: fname,
                   lname: lname,
                   email: email,
                   pass1: pass1,
                   pass2: pass2,
                   admin: admin
                 }, 'text', 'signup.func.php');

    result.done(function(data) {
      
      console.log('data = ' + data);


    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ': ' + errorThrown);
    });

  }//,
  
  // getAll : function() {
  //   var allUsers = 'all_users';
  //   ajaxCall({
  //       func : allUsers
  //       },
  //       'users.php'
  //   );
  //   //when function is done successfully
  //   getAll.done(function(data) {
  //     console.log(data);
  //     return data;
  //   //when we get an error
  //   }).fail(function(jqXHR, textStatus, errorThrown) {
  //     console.log(textStatus + ': ' + errorThrown);
  //   });
  // },

  // getName : function(email) {
  //   ajax({
  //       func: 'get_name',
  //       email: email
  //     },
  //     'users.php'
  //   );
  //   getName.done(function(data) {
  //     console.log(data);
  //     return data;
  //   }).fail(function(jqXHR, textStatus, errorThrown) {
  //     console.log(textStatus + ': ' + errorThrown);
  //   });
  // }


}

$('body').on('click', '#formButton', function(e) {
  users.add();
  console.log('button clicked');
});
//var result = users.getAll();
//console.log('result: ' + result);