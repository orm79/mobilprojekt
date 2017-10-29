<?php
/**
* Contain scripts handling rooms
*
* @author    Daniel Olsson <orol1600@student.miun.se>
*/
    include("../config.php");
// Get the POST value telling which script to run
$func = trim($_POST["func"]);
$room = new Room();

// Switch statement make sure the correct script is run
switch ( $func ) {
  
    case "add_room":
        $nr = trim($_POST["nr"]);
        $info = trim($_POST["info"]);
        $comment = trim($_POST["comment"]);
        $status = trim($_POST["status"]);

        $validate = new Validate();
        $valid = $validate -> room($nr);

        if($valid !== "valid") {
          echo $valid;
          exit();
        } else {
          $result = $room -> add_room($nr, $info, $comment, $status);
          echo $result;
        }
        break;
    
    
    case "del_room":
        $nr = trim($_POST["nr"]);
        $result = $room -> del_room($nr);
        echo $result;
        break;

    case "get_room":
        $nr = trim($_POST["nr"]);
        $result = $room -> get_room($nr);
        echo $result;
        break;
        
    case "update_room":
        $nr       = trim($_POST["nr"]);
        $info     = trim($_POST["info"]);
        $comment  = trim($_POST["comment"]);
        $status   = trim($_POST["status"]);
        $upd_user = trim($_POST["upd_user"]);
        $result = $room -> update_room($nr, $info, $comment, $status, $upd_user);
        echo $result;
        break;

    case "all_rooms":
        $result = $room -> all_rooms();
        echo $result;
        break;

    case "change_status":
        $nr     = trim($_POST["nr"]);
        $status = trim($_POST["status"]);
        $upd_user = trim($_POST["upd_user"]);
        $result = $room -> change_status($nr, $status, $upd_user);
        echo $result;
        break;
            
        
}
