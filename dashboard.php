<?php
session_start();
// check to see if the user is logged in
if ($_SESSION['loggedin']) {
require_once 'config.php';


$con = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ( mysqli_connect_errno() ) {
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}

$sql = "SELECT username FROM accounts WHERE id=" . $_SESSION['id'];
$result = $con->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $username = $row["username"];
    }
} else {
    $username = "Unavailable";
}

} else {
	// user is not logged in, send the user to the login page
	header('Location: index.php');
}
?>

<!doctype html>
<!-- Website Designed by Zachary McGee -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Scrapey - Online Web Scraping Application</title>
  <meta name="description" content="Scrapey">
  <meta name="author" content="Scrapey">
  <link rel="stylesheet" href="css/style.css">
  <link href="css/library/prism.css" rel="stylesheet" />
  <link rel="stylesheet" href="js/library/themes/default/style.min.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</head>

<body>
  <div id="sidebar" class="sidebar">
    <div class="sidebar-header">
      <a href="https://scrapey.io/dashboard.php"><img src="images/logo.png"/></a>
    </div>
    <div class="sidebar-menu">
      <a href="#" class="sidebar-button active" id="dashboard"><i class="fas fa-tachometer-alt"></i><span class="parent-link">Dashboard</span></a>
      <a href="#" class="sidebar-button" id="tasks"><i class="fas fa-tasks"></i><span class="parent-link">Tasks</span></a>
      <a href="#" class="sidebar-button" id="tasks"><i class="fas fa-tasks"></i><span class="parent-link">Tasks</span></a>
    </div>
</div>

  <div class="header">
    <div class="header-img">
    </div>
    <div class="header-account-info">
    <div class="header-menu-buttons">
      <i class="fas fa-bell fa-lg" style="color: #263544; margin-right:10px;"></i>
      <i class="fas fa-question-circle fa-lg" style="color: #263544;"></i>
    </div>
    <div class="header-account-username">
      <p><i class="fas fa-user fa-lg" style="color: #263544;"></i><?php echo "<a href='account.php'>" . $username . "</a>"?></p>
    </div>
     <i class="fas fa-caret-down fa-sm" onclick="openDropdown('account-dropdown')" style="color: #263544; margin-top: 4px; cursor: pointer;"></i>
      <div class="account-dropdown" id="account-dropdown">
        <i class="fas fa-caret-up" style="margin-top:-20px;position: absolute;top: 9px;color: white;left: 142px;"></i>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="logout.php">Logout</a>
      </div>
    </div>
    <div class="header-menu-bar">
      <ul>
        <li><a href="#" id="button1">Home</a></li>
        <li><a href="#" onClick="scrollToSection('#description')">Link</a></li>
        <li><a href="#" onClick="scrollToSection('#definition')">Link</a></li>
        <li><a href="#" onClick="scrollToSection('#design')">Link</a></li>
      </ul>
    </div>

  </div>

  <div class="main" id="main">
    <div class="content" id="content">

  </div>
</div>

  <div class="footer">
    <div class="footer_text">

    </div>
  </div>


</body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://rawgit.com/RickStrahl/jquery-resizable/master/src/jquery-resizable.js"></script>
  <script src="js/load_page.js"></script>
  <script src="js/library/jstree.js"></script>
  <script id="scrapey" src="js/scrapey.js"></script>
  <script src="js/library/prism.js"></script>
  <script src="js/element-selector.js"></script>
</html>
