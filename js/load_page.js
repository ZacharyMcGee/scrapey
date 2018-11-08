  function refreshData(){
    var display = document.getElementById("site-view");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/hello.php");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        display.innerHTML = this.responseText;
      } else {
        display.innerHTML = "Loading...";
      };
    }
  }
