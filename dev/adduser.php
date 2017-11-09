<?php
/**
* Add user page for the application
*
* @author Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Registrera användare";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");

  $fname = "";
  $lname = "";
  $email = "";
  if(isset($POST["form-button"])) {
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
  }
?>
<section class="hero is-primary has-bg-img">
  <div class="hero-body has-text-centered">
    <div class="container">
      <h1 class="title is-size-2">
        Registrering
      </h1>
      <h2 class="subtitle">
        Lägg till ny användare
      </h2>
    </div>
  </div>
</section>

<section class="section container">
  <div class="column is-6 is-offset-3">
    <div class="box">
    
    <form>
      <div class="field">
        <label class="label">Förnamn</label>
        <div class="control has-icons-left">
          <input class="input" id="fname" type="text" placeholder="Förnamn" required autofocus>
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>  
        </div>
        <p class="help is-danger" id="fnameHelp"></p>
      </div>

      <div class="field">
        <label class="label">Efternamn</label>
        <div class="control has-icons-left">
          <input class="input" id="lname" type="text" placeholder="Efternamn" required>
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </div>
        <p class="help is-danger" id="lnameHelp"></p>
      </div>

      <div class="field">
        <label class="label">E-post</label>
        <div class="control has-icons-left">
          <input class="input" id="email" type="email" placeholder="E-post" required>
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
        <p class="help is-danger" id="emailHelp"></p>
      </div>

      <div class="field">
        <label class="label">Lösenord</label>
        <div class="control has-icons-left">
          <input class="input" id="pass1" type="password" placeholder="Lösenord" required>
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
        <p class="help is-danger" id="pass1Help"></p>
      </div>

      <div class="field">
        <label class="label">Upprepa lösenord</label>
        <div class="control has-icons-left">
          <input class="input" id="pass2" type="password" placeholder="Upprepa lösenord" required>
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
        <p class="help is-danger" id="pass2Help"></p>
      </div>
      <br>
      <div class="field">
        <div class="control">  
          <label class="checkbox">
            <input type="checkbox" name="admin">
            Användaren ska vara administratör
          </label>
        </div>  
      </div>
        <br>
        <br>

      <div class="field">
        <div class="control">
          <button class="button is-link" id="userFormButton">Registrera</button>
        </div>
      </div>
    </form>  
    
    </div> <!-- /end .box -->
  </div> <!-- /end .column -->
</section>

<?php
  include("includes/footer.inc.php");
?>