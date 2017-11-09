<?php
/**
* User home page for the application
*
* @author Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Rum att städa";
  include("includes/head.inc.php");

  $user = new User();
  $your_name = $user -> get_name();
?>
<!-- hidden span with user email so we can fetch it with javascript -->
<span id="modUserEmail" class="is-hidden"><?= $_SESSION["sess_id"] ?></span>

<nav class="navbar is-light" role="navigation" aria-label="main navigation">
  
<div class="navbar-brand">
    <a class="navbar-item" href="home.php">
      <span class="icon"><i class="fa fa-diamond"></i></span>
      <span>HOTEL<strong>LYX</strong></span>
    </a>

    <button class="button navbar-burger" data-target="navMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <div class="navbar-start">
  </div>

  <div class="navbar-menu navbar-end" id="navMenu">
    <a class="navbar-item" href="logout.php">
      <span class="icon has-text-danger">
        <i class="fa fa-sign-out"></i>
      </span> Logga ut
    </a>
  </div> 
</nav>

<section class="hero is-primary has-bg-img">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        Välkommen
      </h1>
      <h2 class="subtitle">
        <?= $your_name[0]["fname"] . " " . $your_name[0]["lname"] ?>
      </h2>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="columns" id="cardList">
    <!-- content here -->

    </div> <!-- /end .columns -->
  </div> <!-- /end .container -->
</section>

<!--  include rooom edit modal -->
<?php include("includes/modal.inc.php"); ?> 

<script>
// Display cards for all rooms not cleaned
$( document ).ready(function() {
  rooms.cardList();
});
</script>
<?php
  include("includes/footer.inc.php");
?>