<?php
/**
* @author    Daniel Olsson <orol1600@student.miun.se>
*/

// Auto load class-documents from classes-directory
spl_autoload_register(function($class) {
    include "classes/" . $class . ".class.php";
});

// Auto load function-documents from functions-directory
spl_autoload_register(function($func) {
    include "functions/" . $func . ".func.php";
});

// Dynamic page titles
$siteTitle = "Hotell Lyx";
$divider = " - ";

// Define global constant for site root folder
define ("SITE_ROOT", $_SERVER["DOCUMENT_ROOT"]);

// Define global constans with server connection params
 define("DBHOST", "test");
 define("DBUSER", "username");
 define("DBPASS", "password");
 define("DBDATABASE", "database");