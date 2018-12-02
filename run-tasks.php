<div class="full-card">
  <div class="card-title">
    <div class="card-title-text">
      <i class="fas fa-plus-circle" id="tasks"></i><span class="parent-link" id="card-task-text">Task Name</span>
    </div>
    <div class="card-title-button">
      <button class="small-button-red" id="cancelnewtask"><i class="fas fa-minus-circle fa-sm" style="padding-top:4px; padding-right:4px;"></i>Cancel</button>
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

$sql = "SELECT result, taskid, result_date FROM taskresults WHERE taskid=" . $_SESSION['currentTask'];
$result = $con->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td></td><td>" . $row["taskid"]. "</td><td>" . $row["result"]. "</td><td>" . $row["result_date"]. "</td><td></td></tr>";
    }
} else {
    echo "0 results";
}

$con->close();
?>
</table>
    </div>

      <button class="run-button" id="runscrapey" onclick="saveTree()"><i class="fas fa-arrow-down fa-sm" style="padding-top:4px; padding-right:4px;"></i>Save</button>
      <button class="run-button" id="runscrapey" onclick="startScrapey()"><i class="fas fa-arrow-down fa-sm" style="padding-top:4px; padding-right:4px;"></i>Run</button>
  </div>
</div>
