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
    <table class="task-table-header">
      <tr>
        <th width="10%" style='text-align:center; padding-left:0px;'><span class="parent-link"><input type="checkbox"></span></th>
        <th width="20%"><i class="far fa-file-alt sm"></i><span class="parent-link"> Name</span></th>
        <th width="30%"><i class="fas fa-link sm"></i><span class="parent-link"> URL</span></th>
        <th width="20%"><i class="far fa-clock sm"></i><span class="parent-link"> Latest Run</span></th>
        <th width="20%" style='text-align:center;'><i class="fas fa-wrench sm"></i><span class="parent-link"> Options</span></th>
      </tr>
    </table>
    <table class="task-table">
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
        echo "<tr><td width='10%' style='text-align:center;'><input type='checkbox'></td><td width='20%' onClick=openTask('" . $row["id"] . "')>" . $row["name"]. "</td><td width='30%' onClick=openTask('" . $row["id"] . "')>" . $row["url"]. "</td><td width='20%' onClick=openTask('" . $row["id"] . "')>" . $row["lastrun"]. "</td><td width='20%' style='text-align:center;'><div class='tooltip'><span class='tooltiptext'>Delete Task</span><button onClick=deleteTreeFromDB('" . $row["id"] . "') type='button' class='small-button-icon'><i class='fas fa-trash fa-lg' style='color:#7d7d7d;'></i></button></div><div class='tooltip'><span class='tooltiptext'>Edit Task</span><button onClick=loadTreeFromDB('" . $row["id"] . "') type='button' class='small-button-icon'><i class='fas fa-edit fa-lg' style='color:#7d7d7d;'></i></button></div><div class='tooltip'><span class='tooltiptext'>Run Task</span><button onClick=openTask('" . $row["id"] . "') type='button' class='small-button-icon'><i class='fas fa-play fa-lg' style='color:#7d7d7d;'></i></button></div></td></tr>";
    }
} else {
    echo "0 results";
}

$con->close();
?>
    </table>
  </div>
</div>
