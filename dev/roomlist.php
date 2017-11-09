<?php
/**
* List all rooms page for the application
*
* @author Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Rumslista";
include("includes/head.inc.php");
include("includes/nav.inc.php");
?>
<!-- hidden span with user email so we can fetch it with javascript -->
<span id="modUserEmail" class="is-hidden"><?= $_SESSION["sess_id"] ?></span>

<section class="hero is-primary has-bg-img">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title is-size-2">
        Rumslista
      </h1>
      <h2 class="subtitle">
        Se och redigera rum
      </h2>
      </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="column is-10 is-offset-1">
  
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Rum</th>
            <th class="is-hidden-mobile">Kommentar</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="roomTable">

        </tbody>
      </table>
    </div>
  </div>
</section>

<?php include("includes/modal.inc.php"); ?>

<script>
// Display table with all rooms
$( document ).ready(function() {
  rooms.all();
});
</script>
<?php
  include("includes/footer.inc.php");
?>

