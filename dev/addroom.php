<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
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
<section class="hero is-primary is-bold">
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

    <h1 class="is-size-4 is-uppercase<">Lägg till nytt rum</h1>
    <br>
    <div class="box">
      <div class="field">
        <label class="label">Rumsnummer</label>
        <div class="control has-icons-left">
          <input class="input" id="roomNr" type="text" placeholder="Rummets nummer" required>
          <span class="icon is-small is-left">
            <i class="fa fa-hashtag"></i>
          </span>  
        </div>
        <p class="help is-danger" id="roomNrHelp"></p>
      </div>

      <div class="field">
        <label class="label">Information</label>
        <div class="control">
          <textarea class="textarea" id="roomInfo" placeholder="Information om rummet"></textarea>
        </div>
        <p class="help is-danger" id="roomInfoHelp"></p>
      </div>

      <div class="field">
        <label class="label">Kommentar</label>
        <div class="control">
          <textarea class="textarea" id="roomCom" placeholder="Kommentar till rummet"></textarea>
        </div>
        <p class="help is-danger" id="roomComHelp"></p>
      </div>

      <div class="field">
        <label class="label">Städstatus</label>
        <div class="control">
          <div class="select">
            <select id="roomStatus">
              <option value=1>Städat</option>
              <option value=0>Ej städat</option>
            </select>
          </div>
        </div>
      </div>
      <br>
      <br>

      <div class="field">
        <div class="control">
          <button class="button is-primary is-medium" id="roomFormButton">SKICKA</button>
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

</section>



<script>
  


</script>
<?php
  include("includes/footer.inc.php");
?>