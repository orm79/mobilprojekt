<?php
  $thisPage = "Rumslista";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");
?>
<section class="hero is-primary is-bold">
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

  <table class="table is-fullwidth is-hoverable">
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
</section>

<script>
// Display table with all rooms
$( document ).ready(function() {
  rooms.all();
});
</script>
<?php
  include("includes/footer.inc.php");
?>

