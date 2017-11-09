
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

