<?php
/**
* Admin home page for the application
*
* @author Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Administratör";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");

  $user = new User();
  $your_name = $user -> get_name();
?>
<section class="hero is-primary has-bg-img">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title is-size-2">
        Välkommen
      </h1>
      <h2 class="subtitle">
        <?= $your_name[0]["fname"] . " " . $your_name[0]["lname"] ?>
      </h2>
    </div>
  </div>
</section>
<!-- hidden span with user email so we can fetch it with javascript -->
<span id="modUserEmail" class="is-hidden"><?= $_SESSION["sess_id"] ?></span>
<section class="section">

  <div class="container">
    <h3 class="is-size-4 is-uppercase<">Rum att städa</h3>
    <br>

    <div class="columns" id="cardList">
      
    <!-- content here -->

    </div> <!-- /end .columns -->
  </div> <!-- /end .container -->
</section>

<!--  include rooom edit modal -->
<?php include("includes/modal.inc.php");?> 

<script>
// Display cards for all rooms not cleaned
$( document ).ready(function() {
  rooms.cardList();
});
</script>
<?php
  include("includes/footer.inc.php");
?>