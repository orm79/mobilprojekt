<?php
/**
* Get user input from signup form, validates the input and insert into database
*
* @author    Daniel Olsson <orol1600@student.miun.se>
*/
function signUp() {
    // declare properties as inputs, after trimming whitespace
    $fname = trim($_POST["fname"]);
    $lname = trim($_POST["lname"]);
    $email = trim($_POST["email"]);
    $pass1  = trim($_POST["pass1"]);
    $pass2 = trim($_POST["pass2"]);
    $admin = "";
    
    if( isset($_POST["admin"])) {
        $admin = 1;
    };

    if(!($pass1 === $pass2)) {
        $msg = "Lösenorden stämmer inte överens";
        return $msg;
        exit();
    } else {
        // new instance of Validate class
        $validate = new Validate();
        // call Validate::signup with first name/last name/email/password parameters
        $valid = $validate -> signup($fname, $lname, $email, $pass1);
        // if the returned string is not "valid" return the failure message
        if ($valid !== "valid") {
            return $valid;
            unset($_POST["form-button"]);
            exit();
        } else {
            // else create a new instance of User class
            $user = new User();
            // call User::signup with first name/last name/pass/email parameters
            $signup = $user -> signup($fname, $lname, $pass1, $email, $admin);
            // return account successfully created message
            return $signup;
            unset($_POST["form-button"]);            
            exit();
        }
    }
}