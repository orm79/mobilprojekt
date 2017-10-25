<?php
/**
 * Creates new room instance
 * Contains methods handling rooms
 *
 * @author    Daniel Olsson <orol1600@student.miun.se>
 */
class Room {

  private $db;

  /**
	* Constructor for Room class
	*/
	public function __construct() {
		$this -> db = DB::getInstance();
  }
  
  
  /**
   * Add new room
   *
   * @param $nr        string     Room number
   * @param $status    string     Room cleaning status  
   * @param $info      string     Information about room
   * @param $comment   string     Comment about room 
   *
   * @return string "true" / "false"
   */ 
  public function add_room($nr, $info, $comment, $status) {
    
    //check that room nr isn't already in table
    $query = "SELECT nr
              FROM rooms
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    $this -> db -> bind(":nr", $nr);
    
    $result = $this -> db -> result();

    if($result) {
      $message = "duplicate";
      return $message;
      exit();
    }

    //if room nr is not in table 
    $query = "INSERT INTO rooms (nr, info, comment, status)
              VALUES (:nr, :info, :comment, :status)";
    
    $this -> db -> query($query);
    $this -> db -> bind(":nr", $nr);
    $this -> db -> bind(":info", $info);
    $this -> db -> bind(":comment", $comment);
    $this -> db -> bind(":status", $status);
    
    $this -> db -> execute();
    
    if(($this -> db -> rowCount()) > 0) {
      return "true";
    } else {
      return "false";
    }  
  }  
  

  /**
  * Delete a room
  *
  * @param $nr  string     Room number
  *
  * @return string "true" / "false"
  */
  public function del_room($nr) {
        
    $query = "DELETE FROM rooms
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    
    $this -> db -> bind(":nr", $nr);
    
    $this -> db -> execute();
    
    if(($this -> db -> rowCount()) > 0) {
     return "true";
    } else {
      return "false";
    }
  }
  

  /**
  * Get all rooms 
  *
  * @return array    Associative array with all rooms data
  */
  public function all_rooms() {
        
    $query = "SELECT *
              FROM rooms";

    $this -> db -> query($query);

    $result = $this -> db -> result_set();
    return json_encode($result);
    exit();
  }  
  
  
  /**
  * Get specific room
  *
  * @param $nr  string  Room number
  *
  * @return array  Result as associative array
  */
  public function get_room($nr) {
    
    $this -> nr = $nr;
    
    $query = "SELECT *
              FROM rooms
              WHERE nr = :nr";
    
    $this -> db -> query($query);

    $this -> db -> bind(":nr", $this -> nr);

    $result = $this -> db -> result();
    return $result;
    exit();
  }


  /**
  * Update room info
  *
  * @param $nr      string     Room number
  * @param $info    string     Room information  
  *
  * @return string "true" / "false"
  */
  public function update_info($nr, $info) {
    
    $query = "UPDATE rooms
              SET info = :info
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    
    $this -> db -> bind(":nr", $nr);
    $this -> db -> bind(":info", $info);
    
    $this -> db -> execute();
   
    if(($this -> db -> rowCount()) > 0) {
     return "true";
    } else {
      return "false";
    }
  }


  /**
  * Change status for a room
  *
  * @param $nr        string     Room number
  * @param $status    int        Room cleaning status 1 or 0  
  *
  * @return string "true" / "false"
  */
  public function change_status($nr, $status) {
    
    $user = $_SESSION["sess_id"];
    
    $query = "UPDATE rooms
              SET status = :status, upd_time = NOW(), upd_user = :user
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    
    $this -> db -> bind(":nr", $nr);
    $this -> db -> bind(":status", $status);
    $this -> db -> bind(":user", $user);
    
    $this -> db -> execute();
   
    if(($this -> db -> rowCount()) > 0) {
     return "true";
    } else {
      return "false";
    }
  }
  

  
}