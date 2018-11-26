<div class="full-card">
  <div class="card-title">
    <div class="card-title-text">
      <i class="fas fa-tasks"></i><span class="parent-link">Tasks</span>
    </div>
    <div class="card-title-button">
      <button id="newtask" class="small-button"><i class="fas fa-plus-circle fa-sm" style="padding-top:4px; padding-right:4px;"></i></i>New Task</button>
    </div>
  </div>

  <div class="card-body">
    <table class="task-table">
      <tr>
        <th><i class="far fa-file-alt sm"></i><span class="parent-link">Name</span></th>
        <th><i class="fas fa-link sm"></i><span class="parent-link">URL</span></th>
        <th><i class="far fa-clock sm"></i><span class="parent-link">Latest Run</span></th>
      </tr>
<?php
session_start();
require_once 'config.php';


$con = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ( mysqli_connect_errno() ) {
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}

$sql = "SELECT id, name, url, lastrun FROM tasks WHERE userid=" . $_SESSION['id'];
$result = $con->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["name"]. "</td><td>" . $row["url"]. "</td><td>" . $row["lastrun"]. "</td><td><button onClick=loadTreeFromDB('" . $row["id"] . "') type='button'>Load Tree</button></td></tr>";
    }
} else {
    echo "0 results";
}

$con->close();
?>
    </table>
  </div>
</div>
