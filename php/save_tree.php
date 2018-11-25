<?php
session_start();
require_once '../config.php';

$con = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ( mysqli_connect_errno() ) {
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}

if(isset($_POST['jsondata']))
{
    $jsondata = $_POST['jsondata'];
    $jsondata = substr($jsondata, 1);
    $jsondata = rtrim($jsondata, "]");

    $name = $_POST['name'];
    $url = $_POST['url'];

    $userId = $_SESSION['id'];
    $currentTask = $_SESSION['currentTask'];

    if (isset($_SESSION['currentTask']))
    {
       $currentTask = $_SESSION['currentTask'];

       $sql = "UPDATE tasks SET jsontree='" . $jsondata . "' WHERE id=" . $currentTask;

       if ($con->query($sql) === TRUE) {
          echo "Record updated successfully";
       } else {
          echo "Error updating record: " . $con->error;
       }
     }
    else
    {
       $sql = "INSERT INTO tasks VALUES (DEFAULT, $userId, $name, $url, 'Never', jsondata)";
       $sql = "UPDATE tasks SET jsontree='" . $jsondata . "' WHERE id=" . $currentTask;

       if ($con->query($sql) === TRUE) {
           echo "Record updated successfully";
       } else {
           echo "Error updating record: " . $con->error;
       }
    }
}
$con->close();
?>
