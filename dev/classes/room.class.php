<?php
/**
 * Creates new room instance
 * Contains methods handling rooms
 *
 * @author    Daniel Olsson <orol1600@student.miun.se>
 */
class Room {

  private $db,
          $nr,
          $status,
          $upd_time,
          $upd_user,
          $info,
          $comment;

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
   * @param $status    int        Room cleaning status 1 or 0  
   * @param $info      string     Information about room
   * @param $comment   string     Comment about room 
   *
   * @return bool true / false
   */ 
  public function add_room($nr, $status, $info = "", $comment = "") {
    $this -> nr      = $nr;
    $this -> status  = $status;
    $this -> info    = $info;
    $this -> comment = $comment;
    
    //check that room nr isn't already in table
    $query = "SELECT nr
              FROM rooms
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    $this -> db -> bind(":nr, $nr");
    $result = $this -> db -> result();

    if($result) {
      $message = "duplicate";
      return $message;
      exit();
    }

    //if room nr is not in table 
    $query = "INSERT INTO rooms (nr, status, info, comment)
              VALUES (:nr, :status, :info, :comment)";
    
    $this -> db -> query($query);
    $this -> db -> bind(":nr", $this -> nr);
    $this -> db -> bind(":status", $this -> status);
    $this -> db -> bind(":info", $this -> info);
    $this -> db -> bind(":comment", $this -> comment);
    
    $this -> db -> execute();
    
    if(($this -> db -> rowCount()) > 0) {
      return true;
    } else {
      return false;
    }  
  }  
  

  /**
   * Delete a room
   *
   * @param $nr  string     Room number
   *
   * @return bool true / false
   */
  public function delete_room($nr) {
    $this -> nr = $nr;
    
    $query = "DELETE FROM rooms
              WHERE nr = :nr";
    $this -> db -> query($query);
    
    $this -> db -> bind(":nr", $this -> nr);
    
    $this -> db -> execute();
    
    if(($this -> db -> rowCount()) > 0) {
     return true;
    } else {
      return false;
    }
  }
  

  /**
  * Get all rooms 
  *
  * @return array    Associative array with all rooms data
  */
  public function get_all_rooms() {
        
    $query = "SELECT *
              FROM rooms";

    $this -> db -> query($query);

    $result = $this -> db -> result_set();
    return $result;
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
  }


  /**
  * Change status for a room
  *
  * @param $nr        string     Room number
  * @param $status    int        Room cleaning status 1 or 0  
  *
  * @return bool true / false
  */
  public function change_status($nr, $status) {
    $this -> nr      = $nr;
    $this -> status  = $status;
    $user = $_SESSION["sess_id"];
    
    $query = "UPDATE rooms
              SET status = :status, upd_time = NOW(), upd_user = '" . $user . "'
              WHERE nr = :nr";
    
    $this -> db -> query($query);
    $this -> db -> bind(":nr", $this -> nr);
    $this -> db -> bind(":status", $this -> status);
    $this -> db -> execute();
   
    if(($this -> db -> rowCount()) > 0) {
     return true;
    } else {
      return false;
    }
  }
  

  
}