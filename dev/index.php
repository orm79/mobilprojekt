<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Logga in";
  include("includes/head.inc.php");
  include("functions/login.func.php");
  
  

  $email = "";
  
  if(isset($_POST["form-button"])) {
    $email = $_POST["email"];
    login();
  }
?>
<nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="http://placehold.it/112x28" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </a>
    </div>
</nav>

<section class="hero is-primary is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Välkommen
      </h1>
      <h2 class="subtitle">
        Vänligen logga in 
      </h2>
    </div>
  </div>
</section>

<section class="section container">
  <div class="column is-6 is-offset-3">

    <h1 class="is-size-4 is-uppercase<">Skriv in dina uppgifter</h1>
    <br>
    <form action="index.php" method="post" class="box">

      <div class="field">
        <label class="label">E-post</label>
        <div class="control">
          <input class="input" id="email" name="email" type="email" placeholder="E-post">
        </div>
      </div>

      <div class="field">
        <label class="label">Lösenord</label>
        <div class="control">
          <input class="input" id="pass" name="pass" type="password" placeholder="Lösenord">
        </div>
      </div>

        <br />

      <div class="field">
        <div class="control">
          <input type="submit" class="button is-primary is-medium" id="formButton" name="form-button" value="LOGGA IN"></input>
        </div>
      </div>
    </form>

    <br />

    <div id="userMsgSection">
      <?php
      if(isset($_GET["retry"])) {
        echo "<div class='notification is-danger' id='userMsg'>
          <button class='delete' id='userMsgDel'></button>Fel e-post eller lösenord</div>";
        }
      ?>
    </div>
  
  </div> <!-- end .column -->
</section>

<?php
  include("includes/footer.inc.php");
?>

