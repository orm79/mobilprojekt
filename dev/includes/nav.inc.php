<?php if(!User::logged_in()) {
        Redirect::to("index.php");
      }

      $user = new User();
      $logged_in = User::logged_in();
      $admin = $user -> get_admin();
      ?>

<nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">

      <a class="navbar-item" href="<?php if($logged_in && ($admin["admin"] == 1)) {
          echo 'admin.php';
          } else {
            echo 'home.php';
          }?>">
        <img src="http://placehold.it/112x28" alt="Hotell Lyx Logotyp" width="112" height="28">
      </a>

      <button class="button navbar-burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu navbar-end" id="navMenu">
      <a class="navbar-item" href="<?php if($logged_in && ($admin["admin"] == 1)) {
          echo 'admin.php';
          } else {
            echo 'home.php';
          }?>">
        Hem
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <div class="navbar-link">
          <span class="icon has-text-link">
            <i class="fa fa-user"></i>
          </span> Användare
        </div>
        <div id="moreDropdown" class="navbar-dropdown">
          <a class="navbar-item " href="userlist.php">
            <p>
              <strong>Användarlista</strong>
              <br>
              <small>Alla registrerade användare</small>
            </p>
          </a>
          <a class="navbar-item " href="adduser.php">
            <p>
              <strong>Ny användare</strong>
              <br>
              <small>Lägg till ny personal</small>
            </p>
          </a>
        </div>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <div class="navbar-link">
          <span class="icon has-text-success">
            <i class="fa fa-home"></i>
          </span>Rum
        </div>
        <div id="moreDropdown" class="navbar-dropdown">
          <a class="navbar-item " href="roomlist.php">
            <p>
              <strong>Statuslista</strong>
              <br>
              <small>Se status för alla rum</small>
            </p>
          </a>
          <a class="navbar-item " href="addroom.php">
            <p>
              <strong>Nytt rum</strong>
              <br>
              <small>Lägg till ett nytt rum</small>
            </p>
          </a>
        </div>
      </div>
      <a class="navbar-item" href="logout.php">
        <span class="icon has-text-danger">
          <i class="fa fa-sign-out"></i>
        </span> Logga ut
      </a>
  </nav>
  