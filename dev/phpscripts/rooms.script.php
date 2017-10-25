<?php
/**
* Contain scripts handling rooms
*
* @author    Daniel Olsson <orol1600@student.miun.se>
*/
    include("../config.php");
// Get the POST value telling which script to run
$func = trim($_POST["func"]);
$room = new Room();

// Switch statement make sure the correct script is run
switch ( $func ) {
  
    case "add_room":
        $nr = trim($_POST["nr"]);
        $info = trim($_POST["info"]);
        $comment = trim($_POST["comment"]);
        $status = trim($_POST["status"]);

        $validate = new Validate();
        $valid = $validate -> room($nr);

        if($valid !== "valid") {
          echo $valid;
          exit();
        } else {
          $result = $room -> add_room($nr, $info, $comment, $status);
          echo $result;
        }
        break;
    
    
    case "del_room":
        $nr = trim($_POST["nr"]);
        $result = $room -> del_room($nr);
        echo $result;
        break;

    case "get_room":
        $nr = trim($_POST["nr"]);
        $result = $room -> get_room($nr);
        echo $result;
        break;
        
    case "change_status":
        $nr = trim($_POST["nr"]);
        $result = $room -> change_status($nr);
        echo $result;
        break;

    case "update_info":
        $nr = trim($_POST["nr"]);
        $info = trim($_POST["info"]);
        $result = $room -> update_info($nr, $info);
        echo $result;
        break;

    case "all_rooms":
        $result = $room -> all_rooms();
        echo $result;
        break;
   
            
        
}

    // if(!($pass1 === $pass2)) {
    //     $msg = "passErr1";
    //     echo $msg;
    //     exit();
    // } else {
    //     // new instance of Validate class
    //     $validate = new Validate();
    //     // call Validate::signup with first name/last name/email/password parameters
    //     $valid = $validate -> signup($fname, $lname, $email, $pass1);
    //     // if the returned string is not "valid" return the failure message
    //     if ($valid !== "valid") {
    //         echo $valid;
    //         exit();
    //     } else {
    //         // else create a new instance of User class
    //         $user = new User();
    //         // call User::signup with first name/last name/pass/email parameters
    //         $signup = $user -> signup($fname, $lname, $pass1, $email, $admin);
    //         // return account successfully created message
    //         echo $signup;
    //         exit();
    //     }
    // }