<?php
$site = $_GET["site"];
$output = shell_exec('PYTHONIOENCODING=utf8 /home/zmcgee/.local/bin/python3 Test.py ' . $site . ' 2>&1');
echo $output;
?>
