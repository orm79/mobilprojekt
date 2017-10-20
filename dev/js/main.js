
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

newUserMsg = {
  
  delete: function() {
    //delete message div if x-button is pressed
    document.getElementById('userMsgSection').addEventListener('click', function(e) {
    
      var messageSection = document.getElementById('userMsgSection');
      var messageDiv = document.getElementById('userMsg');
      var button = e.target;

      if(button && button.nodeName =="BUTTON") {
        messageSection.removeChild(messageDiv);
      }
    });
  }
}

newUserMsg.delete();