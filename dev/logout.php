<?php
/**
* Run script to log user out
*
* @author Daniel Olsson <orol1600@student.miun.se>
*/
session_start();
include("config.php");
User::log_out();