<?php
session_start();
require_once 'config.php';

$con = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ( mysqli_connect_errno() ) {
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}

if ( !isset($_POST['username'], $_POST['password']) ) {
	die ('Username and/or password does not exist!');
}
if ($stmt = $con->prepare('SELECT id, password FROM accounts WHERE username = ?')) {
	$stmt->bind_param('s', $_POST['username']);
	$stmt->execute();
	$stmt->store_result();
	if ($stmt->num_rows > 0) {
		$stmt->bind_result($id, $password);
		$stmt->fetch();      
		if (password_verify($_POST['password'], $password)) {
			$_SESSION['loggedin'] = TRUE;
			$_SESSION['name'] = $_POST['username'];
			$_SESSION['id'] = $id;
			echo 'Welcome ' . $_SESSION['name'] . '!';
		} else {
			echo 'Incorrect username and/or password!';
		}
	} else {
		echo 'Incorrect username and/or password!';
	}
	$stmt->close();
} else {
	echo 'Could not prepare statement!';
}
?>
