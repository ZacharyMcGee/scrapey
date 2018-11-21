<?php
$site = $_GET["site"];
$tag = $_GET["tag"];
$selector = $_GET["selector"];
$name = $_GET["name"];
$index = $_GET["index"];
$indexFrom = $_GET["indexfrom"];
$indexTo = $_GET["indexto"];

$output = shell_exec('PYTHONIOENCODING=utf8 /home/zmcgee/.local/bin/python3 getText.py ' . $site . ' ' . $tag . ' ' . $selector . ' ' . $name . ' ' . $index . ' ' . $indexFrom . ' ' . $indexTo . ' ' . ' 2>&1');
echo $output;
?>
