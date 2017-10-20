<?php
/**
 * Creates new user instance
 * Contains methods handling users
 *
 * @author    Daniel Olsson <orol1600@student.miun.se>
 */
class User {

	private $db;
         
    /**
	* Constructor for User class
	*/
	public function __construct() {
		$this -> db = DB::getInstance();
	}

	
	/**
	* Check if user is logged in
	* 
	* @return boolean true / false
	*/    
	public static function logged_in() {
		if(isset($_SESSION["sess_id"])) {
		return true;
		exit();
		} else {
			return false;
			exit();
		}
	}


    /**
    * Get user first and last name
    * 
    * @return array Associative array
    */    
    public function get_name() {
        $email = $_SESSION["sess_id"];

        $query = "SELECT fname, lname 
                  FROM users 
                  WHERE email = '" . $email . "'";
        
        $this -> db -> query($query);

        $result = $this -> db -> result_set();
            return $result;
    }	

    /**
    * Get user type admin (true or false)
    * 
    * @return int 0 or 1
    */    
    public function get_admin() {
      $email = $_SESSION["sess_id"];

      $query = "SELECT admin 
                FROM users 
                WHERE email = '" . $email . "'";
      
      $this -> db -> query($query);

      $result = $this -> db -> result();
          return $result;
  }	

    /**
    * Login database query via prepared statement
    * Sets session variable on successful login
    *
    * @param $email string
    * @param $pass string
    *
    * @return boolean true or false
    */    
    public function login($email, $pass) {
        // the sql query 
        $query = "SELECT email, password
                  FROM users
                  WHERE email = :email";
        // prepare statement
        $this -> db -> query($query);
        // bind parameter
        $this -> db -> bind(":email", $email);
        // execute the query and retrieve result as $result
        $result = $this -> db -> result();
        //if no email is found return bool false 
        if(!$result) {
            return false;
        }
        // if there is a result (email found) 
        // verify the password against the stored hashed password
        if(password_verify($pass, $result["password"])) {
            // if it matches set a session variable with the value of the email
            $_SESSION["sess_id"] = $result["email"];
            
            return true;
        } else {
            return false;
        }
        exit();
    }
    

    /**
    * Sign-up database query
    * Inserts new user into table users if email not already in database
    *
    * @param $fname      string    User first name
    * @param $lname      string    User last name
    * @param $pass       string    User password
    * @param $email      string    User email
    * @param $admin      tinyint   Is user admin 1 or 0
    *
    * @return string  Success or fail messages for account creation
    */    
    public function signup($fname, $lname, $pass, $email, $admin) {
        // hashing the password 
        $pass = password_hash($pass, PASSWORD_DEFAULT);
        // the query
        $query = "SELECT email
                  FROM users
                  WHERE email = :email";
        // prepare statement
        $this -> db -> query($query);
        // bind parameter
        $this -> db -> bind(":email", $email);
        // execute query and get result
        $result = $this -> db -> result(); 
        // if there is a result return user exists message
        if($result) {
            $message = "Fel: E-post redan registrerad";
            return $message;
            exit();
        }
        // if no matching email is found execute statement to insert data in table users
        $query = "INSERT INTO users (fname, lname, password, email, admin)
                  VALUES (:fname, :lname ,:pass , :email, :admin)";
        
        $this -> db -> query($query);
        
        $this -> db -> bind(":fname", $fname);
        $this -> db -> bind(":lname", $lname);
        $this -> db -> bind(":pass", $pass);
        $this -> db -> bind(":email", $email);
        $this -> db -> bind(":admin", $admin);

        $this -> db -> execute();
        // if a row was inserted return success message                               
        if(($this -> db -> rowCount()) > 0) {
            $message = "Ny användare skapad";
            return $message;
            exit();
        }
    }


    /**
    * Get all registered users
    *
    * @return array  Associative array with all users data
    */    
    public function all_users() {
        // the query
        $query = "SELECT email, fname, lname, added 
                  FROM users";
                  
        // prepare statement
        $this -> db -> query($query);

        // execute query and get result set
        $result = $this -> db -> result_set(); 
        return $result;
        exit();
    }


  /**
	* Log user out
  * public static so no need to instantiate
	*/    
	public static function log_out() {
		$user = $_SESSION["sess_id"];
		session_destroy();
		Redirect::to("index.php");
		exit();
	}      
}