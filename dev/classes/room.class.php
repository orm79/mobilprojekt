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
  * @return string  Result as json-formatted string
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
  * @return string  Result as json-formatted string
  */
  public function get_room($nr) {
    
    $this -> nr = $nr;
    
    $query = "SELECT *
              FROM rooms
              WHERE nr = :nr";
    
    $this -> db -> query($query);

    $this -> db -> bind(":nr", $this -> nr);

    $result = $this -> db -> result_set();
    return json_encode($result);
    exit();
  }


  /**
  * Update room
  *
  * @param $nr      string     Room number
  * @param $info    string     Room information  
  *
  * @return string "true" / "false"
  */
  public function update_room($nr, $info, $comment, $status, $upd_user) {
    
    $query = "UPDATE rooms
              SET info = :info, comment = :comment, status = :status, upd_user = :upd_user, upd_time = NOW()
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    
    $this -> db -> bind(":nr", $nr);
    $this -> db -> bind(":info", $info);
    $this -> db -> bind(":comment", $comment);
    $this -> db -> bind(":status", $status);
    $this -> db -> bind(":upd_user", $upd_user);
    
    $this -> db -> execute();
   
    if(($this -> db -> rowCount()) > 0) {
     return "yes";
    } else {
      return "no";
    }
  }


  /**
  * Change status for a room
  *
  * @param $nr          string     Room number
  * @param $status      int        Room cleaning status 1 or 0 
  * @param $upd_user    string     The user email making the update  
  *
  * @return string "yes" / "no"
  */
  public function change_status($nr, $status, $upd_user) {
    
    
    $query = "UPDATE rooms
              SET status = :status, upd_time = NOW(), upd_user = :upd_user
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    
    $this -> db -> bind(":nr", $nr);
    $this -> db -> bind(":status", $status);
    $this -> db -> bind(":upd_user", $upd_user);
    
    $this -> db -> execute();
   
    if(($this -> db -> rowCount()) > 0) {
     return "yes";
    } else {
      return "no";
    }
  }
  

  
}