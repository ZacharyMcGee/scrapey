// SIDEBAR BUTTONS

var sidebar = document.getElementById("sidebar");
var buttons = sidebar.getElementsByClassName("sidebar-button");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// RELOAD THIS JS FILE AFTER AJAX REQ

function reloadScrapey() {
  $('#scrapey').remove();
  $.getScript("js/scrapey.js", function() {
    $('script:last').attr('id', 'scrapey');
  });
}

function loadSite(site){
  document.getElementById('iframe').src = "www." + site;
}

function refreshData(){
    var site = document.getElementById("input-site").value;
    console.log(site);
    var iframe = document.getElementById('iframe');
    if(validateURL(site)){
    iframe.src = "loading.html";
    var display = document.getElementById("site-view");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/load_page.php?site=" + site, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        iframe.src = "about:blank";
        var response = this.responseText;
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(response);
        iframe.contentWindow.document.close();
      } else {

      };
    }
}
  }

function validateURL(url){
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
var site = url;

if (site.match(regex)) {
  return true;
} else {
  return false;
}
}

$("#tasks").click(function(){
    $.ajax({url: "tasks.html", success: function(result){
        $("#content").html(result);
        reloadScrapey();
    }});
});

$("#dashboard").click(function(){
    $.ajax({url: "dashboard.html", success: function(result){
        $("#content").html(result);
    }});
});

$("#newtask").click(function(){
    $.ajax({url: "new-task.html", success: function(result){
        $("#content").html(result);
        reloadScrapey();
    }});
});

$("#cancelnewtask").click(function(){
    $.ajax({url: "tasks.html", success: function(result){
        $("#content").html(result);
        reloadScrapey();
    }});
});

$("#loadsite").click(function(){
    refreshData();
});
