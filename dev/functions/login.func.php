<?php
/**
* Attempts to log in user with email and password from inputs
* On User::login() success redirect to admin.php or home.php
* On failure redirect to index.php?retry
*
* @author    Daniel Olsson <orol1600@student.miun.se>
*/
function logIn() {
    // declare properties
    $email = trim($_POST["email"]);
    $pass  = trim($_POST["pass"]);
    $user  = new User();
         
    $log_in = $user -> login($email, $pass);
    // if DB::login call successful check user type and redirect
    if($log_in == true) {
        
        $admin = $user -> get_admin($email);
        if( ($admin["admin"]) === 1 ) {
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