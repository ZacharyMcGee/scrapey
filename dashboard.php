<?php
session_start();
if ($_SESSION['loggedin']) {

} else {
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
      <img src="images/logo.png" alt="logo" />
    </div>
    <div class="sidebar-menu">
      <a href="#" class="sidebar-button active" id="dashboard"><i class="fas fa-tachometer-alt"></i><span class="parent-link">Dashboard</span></a>
      <a href="#" class="sidebar-button" id="tasks"><i class="fas fa-tasks"></i><span class="parent-link">Tasks</span></a>
    </div>
</div>

  <div class="header">
    <div class="header-img">
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
