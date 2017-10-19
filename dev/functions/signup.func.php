<?php
/**
* Get user input from signup form, validates the input and insert into database
*
* @author    Daniel Olsson <orol1600@student.miun.se>
*/
function signUp() {
    // declare properties as inputs, after trimming whitespace
    $fname   = trim($_POST["signup-fname"]);
    $lname  = trim($_POST["signup-lname"]);
    $email  = trim($_POST["signup-email"]);
    $pass   = trim($_POST["signup-pass"]);
    $pass2 = trim($_POST["signup-pass2"]);

    if(!($pass === $pass2)) {
        $msg = "Lösenorden stämmer inte överens";
        return $msg;
        exit();
    } else {
        // new instance of Validate class
        $validate = new Validate();
        // call Validate::signup with first name/last name/email/password parameters
        $valid = $validate -> signup($fname, $lname, $email, $pass);
        // if the returned string is not "valid" return the failure message
        if ($valid !== "valid") {
            return $valid;
            unset($_POST["signup-btn"]);
            exit();
        } else {
            // else create a new instance of User class
            $user = new User();
            // call User::signup with first name/last name/pass/email parameters
            $signup = $user -> signup($fname, $lname, $pass, $email);
            // return account successfully created message
            return $signup;
            unset($_POST["signup-btn"]);            
            exit();
        }
    }
}