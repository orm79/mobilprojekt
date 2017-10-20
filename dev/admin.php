<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Administratör";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");
  
  $user = new User();
  $your_name = $user -> get_name();
?>
<section class="hero is-primary is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Välkommen <?= $your_name[0]["fname"] ?>
      </h1>
      <h2 class="subtitle">
        
      </h2>
    </div>
  </div>
</section>



<?php
  include("includes/footer.inc.php");
?>