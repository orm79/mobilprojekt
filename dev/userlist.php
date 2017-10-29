<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Användarlista";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");
?>
<section class="hero is-primary has-bg-img">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title is-size-2">
        Användarlista
      </h1>
      <h2 class="subtitle">
        Se och redigera användare
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
            <th class="is-hidden-mobile">Efternamn</th>
            <th class="is-hidden-mobile">Förnamn</th>
            <th>E-post</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="userTable">

        </tbody>
      </table>    
    </div>
  </div>
</section>

<script>
// Display table with all registered users
$( document ).ready(function() {
  users.all();
});
</script>
<?php
  include("includes/footer.inc.php");
?>