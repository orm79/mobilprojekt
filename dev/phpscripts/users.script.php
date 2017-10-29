<?php
/**
* Contain scripts handling users
*
* @author    Daniel Olsson <orol1600@student.miun.se>
*/
    include("../config.php");
// Get the POST value telling which script to run
$func = trim($_POST["func"]);
$user = new User();

// Switch statement make sure the correct script is run
switch ( $func ) {
  
    case "all_users":
        $result = $user -> all_users();
        echo $result;
        break;

    case "signup":
        $fname = trim($_POST["fname"]);
        $lname = trim($_POST["lname"]);
        $email = trim($_POST["email"]);
        $pass1 = trim($_POST["pass1"]);
        $pass2 = trim($_POST["pass2"]);
        $admin = trim($_POST["admin"]);

        if(!($pass1 === $pass2)) {
            $msg = "passErr1";
            echo $msg;
            exit();
        } else {
            // new instance of Validate class
            $validate = new Validate();
            // call Validate::signup with first name/last name/email/password parameters
            $valid = $validate -> signup($fname, $lname, $email, $pass1);
            // if the returned string is not "valid" return the failure message
            if ($valid !== "valid") {
                echo $valid;
                exit();
            } else {
                // else create a new instance of User class
                $user = new User();
                // call User::signup with first name/last name/pass/email parameters
                $signup = $user -> signup($fname, $lname, $pass1, $email, $admin);
                // return account successfully created message
                echo $signup;
                exit();
            }
        } 
        break;

        case "get_user":
            $email = trim($_POST["email"]);
            $result = $user -> get_user($email);
            echo $result;
            break;
      
        case "del_user":
            $email = trim($_POST["email"]);
            $result = $user -> del_user($email);
            echo $result;
            break;

        case "update_admin":
            $email = trim($_POST["email"]);
            $result = $user -> update_admin($email);
            echo $result;
            break;
           
        
}
