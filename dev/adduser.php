<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
session_start();
$thisPage = "Registrera användare";
  include("includes/head.inc.php");
  include("includes/nav.inc.php");
?>
<section class="section">
  
  <!-- <div class="form-container">
    <h1 class="is-size-4 is-uppercase<">Lägg till ny användare</h1>
    <br>
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
<?php
  include("includes/footer.inc.php");
?>