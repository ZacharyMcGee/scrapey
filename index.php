<?php
session_start();
// check to see if the user is logged in
if ($_SESSION['loggedin']) {
	header('Location: dashboard.php');
}
?>

<!DOCTYPE html>
<html>
       <head>
       <meta charset="utf-8">
          <title>Scrapey.io - Online Web Scraping Application</title>
          <meta name="description" content="Scrapey">
          <meta name="author" content="Scrapey">
          <link rel="stylesheet" href="css/homepage.css">
        </head>
	<body>

<div class="header">
    <div class="header-img">
      <img src="images/logo_home.png" alt="logo" />
    </div>
    <div class="header-menu">
      <ul>
        <li><a href="#" id="button1">Home</a></li>
        <li><a href="#" onClick="scrollToSection('#description')">Link</a></li>
        <li><a href="#" onClick="scrollToSection('#definition')">Link</a></li>
        <li><a href="#" onClick="scrollToSection('#design')">Link</a></li>
        <li class="li-button"><button class="login-button" id="signup-button">Log In</li>
        <li class="li-button"><button class="signup-button" id="signup-button">Sign Up</li>
      </ul>
    </div>
</div>

<div class="welcome">
	<div class="container">
                <div class="home-banner">
                         <img src="images/home-banner.png" alt="logo" />
                </div>
                <div class="description-section">
		<h1>A free web-based web scraping application</h1>
		<h2>Scrapie.io extracts data from websites and converts to easily manageable formats</h2>
                <button class="signup-button" id="signup-button"><i class="fas fa-arrow-down fa-sm">Try it</i>
                </div>
	</div>

	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>
             <div class="signup-section">
		<form action="auth.php" method="post">
		  <input type="text" name="username" placeholder="Username">
		  <input type="password" name="password" placeholder="Password">
                  <button type="submit" id="login-button">Login</button>
	        </form>
            </div>
	</body>
</html>
