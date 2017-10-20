<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Administratör";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");
  $user = new User();
  $admin = $user -> get_admin();
?>
<p><?= var_dump($admin) ?></p>