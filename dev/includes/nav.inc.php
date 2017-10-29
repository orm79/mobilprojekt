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
        <div.logo-div>
          <span class="icon"><i class="fa fa-diamond"></i></span>
          <span>HOTEL<strong>LYX</strong></span>
        </div.logo-div>
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
        <div class="icon"><i class="fa fa-home"></i></div>
        HEM
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        
        <div class="navbar-link">
          ANVÄNDARE
        </div>
        <div class="navbar-dropdown">
          <a class="navbar-item " href="userlist.php">
            <p>
              <span class="icon has-text-info">
                <i class="fa fa-list"></i>
              </span>
              <strong>Användarlista</strong>
              <br>
              <span class="icon has-text-info">
                <i class=""></i>
              </span>
              <small>Alla registrerade användare</small>
            </p>
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item " href="adduser.php">
            <p>
              <span class="icon has-text-info">
                <i class="fa fa-user-plus"></i>
              </span>
              <strong>Ny användare</strong>
              <br>
              <span class="icon has-text-info">
                <i class=""></i>
              </span>
              <small>Lägg till ny personal</small>
            </p>
          </a>
        </div>
      
      </div>
     
      <div class="navbar-item has-dropdown is-hoverable">
        
        <div class="navbar-link">
          RUM
        </div>
        
        <div class="navbar-dropdown">
          <a class="navbar-item " href="roomlist.php">
            <p>
              <span class="icon has-text-success">
                <i class="fa fa-list"></i>
              </span>
              <strong>Statuslista</strong>
              <br>
              <span class="icon has-text-info">
                <i class=""></i>
              </span>
              <small>Se status för alla rum</small>
            </p>
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item " href="addroom.php">
            <p>
              <span class="icon has-text-success">
                <i class="fa fa-plus"></i>
              </span>
              <strong>Nytt rum</strong>
              <br>
              <span class="icon has-text-success">
                <i class=""></i>
              </span>
              <small>Lägg till ett nytt rum</small>
            </p>
          </a>
        </div>
      
      </div>
      
      <a class="navbar-item" href="logout.php">
        <span class="icon has-text-danger">
          <i class="fa fa-sign-out"></i>
        </span>LOGGA UT
      </a>
    </div> 
  </nav>
  