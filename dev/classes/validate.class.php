<?php
/**
 * Validates user input
 *
 * @author    Daniel Olsson <orol1600@student.miun.se>
 */
class Validate {
    
    private $name,
            $user,
            $pass,
            $email;
  
    
    /**
    * Validates user signup input 
    * 
    * @param string $fame        First name input
    * @param string $lname       Last name input
    * @param string $email       Email input
    * @param string $pass        Password input
    *
    * @return string $valid      Return fail or success string
    */    
    public function signup($fname, $lname, $email, $pass) {
        $this -> fname = $fname;
        $this -> lname  = $lname;
        $this -> email = $email;
        $this -> pass  = $pass;

        // check inputs against regex and return string
        switch(false) {
            // check for valid first name
            case (preg_match("/^[a-öA-Ö\-\s]{2,}$/", $this -> fname)):
                $valid = "Ogiltiga tecken i förnamn";
                return $valid;
                break;
            // check for valid last name
            case (preg_match("/^[a-öA-Ö\-\s]{2,}$/", $this -> lname)):
                $valid = "Ogiltiga tecken i efternamn";
                return $valid;
                break;
            // check mail for correct format
            case (preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $this -> email)):
                $valid = "Ogiltig e-post adress";
                return $valid;
                break;
            // check password 4 characters min length, can contain special chars !@#$%
            case (preg_match("/^(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{4,50}$/", $this -> pass)):
                $valid = "Ogiltigt lösenord! endast A-Z 0-9 !@#$%";
                return $valid;
                break;
            // return "valid" string if all input passes validation
            default: 
                $valid = "valid";
                return $valid;          
        }
    }
} 