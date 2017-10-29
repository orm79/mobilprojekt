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
<nav class="navbar is-light" aria-label="main navigation">
    <div class="navbar-brand">
    <a class="navbar-item" href="#">
    <div.logo-div>
      <span class="icon"><i class="fa fa-diamond"></i></span>
      <span>HOTEL<strong>LYX</strong></span>
    </div>
  </a>
    </div>
</nav>

<section class="hero is-primary has-bg-img">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title is-size-2">
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

    <form action="index.php" method="post" class="box">

      <div class="field">
        <label class="label">E-post</label>
        <div class="control">
          <input class="input" id="email" name="email" type="email" placeholder="E-post" autofocus>
        </div>
      </div>

      <div class="field">
        <label class="label">Lösenord</label>
        <div class="control">
          <input class="input" id="pass" name="pass" type="password" placeholder="Lösenord">
        </div>
      </div>

        <br>

      <div class="field">
        <div class="control">
          <input type="submit" class="button is-primary" id="formButton" name="form-button" value="Logga in"></input>
        </div>
      </div>
    </form>

    <br>

    </div>
  
  </div> <!-- end .column -->
</section>

<script>
    $( document ).ready(function(){
      
      var isRetry = function(){
        // check for ?retry in window url bar
        return window.location.href.search("[?&]retry") != -1;
      };
      // run check
      retry = isRetry();
      // if ?retry in window url bar then notify user to retry
      if(retry === true) {
        utils.notification('error', 'Fel e-post eller lösenord, prova igen.');
      }
    }); 
</script>

<?php
  include("includes/footer.inc.php");
?>