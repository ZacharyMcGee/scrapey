function refreshData(){
  var site = document.getElementById("input-site").value;
  console.log(site);
  var display = document.getElementById("site-view");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "php/load_page.php?site=" + site, true);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var response = this.responseText;
      document.getElementById('iframe').contentWindow.document.write(response);
    } else {

    };
  }
}
