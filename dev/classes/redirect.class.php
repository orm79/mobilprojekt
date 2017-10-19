<?php
/**
 * Redirect class
 *
 * @author    Daniel Olsson <orol1600@student.miun.se>
 */
class Redirect {
     
     /**
     * Redirects user to new location
     * 
     * @param string $addr      Redirect location
     *
     * @return void
     */    
    public static function to($addr) {
        header("location: " . $addr);
        exit();
    }
}