<?php
/**
* Daniel Olsson <orol1600@student.miun.se>
*/
$thisPage = "Lägg till rum";
include("includes/head.inc.php");
include("includes/nav.inc.php");
?>
<section class="hero is-primary has-bg-img">
  <div class="hero-body has-text-centered">
    <div class="container">
      <h1 class="title is-size-2">
        Nytt rum
      </h1>
      <h2 class="subtitle">
        Lägg till nytt rum
      </h2>
    </div>
  </div>
</section>

<section class="section container">
  <div class="column is-6 is-offset-3">
    <div class="box">
      
      <form>
        <div class="field">
          <label class="label">Rumsnummer</label>
          <div class="control has-icons-left">
            <input class="input" id="roomNr" type="text" placeholder="Rummets nummer" required autofocus>
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
            <button class="button is-link" id="roomFormButton">Lägg till</button>
          </div>
        </div>
      </form>
    
    </div> <!-- /end .box -->
  </div> <!-- /end .column -->
</section>



<script>
  


</script>
<?php
  include("includes/footer.inc.php");
?>