<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Registrera användare";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");
  include("functions/signup.func.php");

  $fname = "";
  $lname = "";
  $email = "";
  if(isset($POST["form-button"])) {
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
  }
?>
<section class="hero is-primary is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
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

  <h1 class="is-size-4 is-uppercase<">Lägg till ny användare</h1>
  <br>
  <div class="box">
    <div class="field">
      <label class="label">Förnamn</label>
      <div class="control">
        <input class="input" id="fname" type="text" placeholder="Förnamn">
      </div>
    </div>
    
    <div class="field">
      <label class="label">Efternamn</label>
      <div class="control">
        <input class="input" id="lname" type="text" placeholder="Efternamn">
      </div>
    </div>

    <div class="field">
      <label class="label">E-post</label>
      <div class="control">
        <input class="input" id="email" type="email" placeholder="E-post">
      </div>
    </div>

    <div class="field">
      <label class="label">Lösenord</label>
      <div class="control">
        <input class="input" id="pass1" type="password" placeholder="Lösenord">
      </div>
    </div>

    <div class="field">
      <label class="label">Upprepa lösenord</label>
      <div class="control">
        <input class="input" id="pass2" type="password" placeholder="Upprepa lösenord">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" name="admin">
            Användaren ska vara administratör</a>
        </label>
      </div>
    </div

      <br />

      <div class="field">
        <div class="control">
          <button class="button is-primary is-medium" id="formButton">SKICKA</button>
        </div>
      </div>
      </div>

      <br />


      <div id="userMsgSection">
      <?php
      /*
      if(isset($_POST["form-button"])) {
        $msg = signUp();
        unset($_POST["form-button"]);
        if($msg == "Ny användare skapad") {
          echo "<div class='notification is-success' id='userMsg'>
            <button class='delete' id='userMsgDel'></button>" . $msg . "</div>";
        } elseif(strlen($msg) > 0) {
          echo "<div class='notification is-danger' id='userMsg'>
          <button class='delete' id='userMsgDel'></button>" . $msg . "</div>";
        }
      }
      */
      ?>
</div>

</div> <!-- /end .column -->
    <!-- <div class="form-container">
    <div class="field">
    <label class="label">Förnamn</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-success" type="text" placeholder="Förnamn">
      <span class="icon is-small is-left">
        <i class="fa fa-user"></i>
      </span>
      <span class="icon is-small is-right has-text-danger is-hidden">
        <i class="fa fa-warning"></i>
      </span>
    </div>
    <p class="help is-danger">Ej giltigt formaterat förnamn</p>
    </div>

      <div class="field">
        <label class="label">Efternamn</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-danger" type="text" placeholder="Efternamn">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fa fa-warning"></i>
          </span>
        </div>
        <p class="help is-danger">Ej giltigt formaterat efternamn</p>
      </div>

      <div class="field">
        <label class="label">E-post</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="E-post">
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fa fa-warning"></i>
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">Lösenord</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Lösenord">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fa fa-warning"></i>
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">Upprepa lösenord</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Upprepa lösenord">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fa fa-warning"></i>
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">Användartyp</label>
        <div class="control">
          <div class="select">
            <select>
              <option>Användare</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
      </div>
  </div> -->
</section>



<script>
  


</script>
<?php
  include("includes/footer.inc.php");
?>