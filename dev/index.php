<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
session_start();
include("config.php");
include("functions/login.func.php");

$thisPage = "Logga in";

$email = "";

if(isset($_POST["form-button"])) {
$email = $_POST["email"];
login();
}
?>
<!DOCTYPE html>
<html lang="sv">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- jQuery CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <title> <?= $siteTitle . $divider . $thisPage ?>  </title>
</head>

<body>

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