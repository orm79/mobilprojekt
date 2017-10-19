<?php
/**
* Attempts to log in user with email and password from inputs
* On User::login() success redirect to home.php
* On failure redirect to login.php?retry
*
* @author    Daniel Olsson <orol1600@student.miun.se>
*/
function logIn() {
    // declare properties
    $email = trim($_POST["login-mail"]);
    $pass  = trim($_POST["login-pass"]);
    $user  = new User();
         
    $log_in = $user -> login($email, $pass);
    // if DB::login call successful check user type and redirect
    if($log_in == true) {
        if( ($user -> get_admin($email)) === true ) {
            Redirect::to("admin.php");
            exit();
        } else {
            Redirect::to("home.php");
            exit();
        }
    // else redirect back to login with url variable retry
    } else {
        Redirect::to("index.php?retry");
        exit();
    }
}