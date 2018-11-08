var child_frame;
function refreshData(){
    var site = document.getElementById("input-site").value;
    if(validateURL(site)){

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
child_frame = window.frames['iframe'].document;

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

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event){
    var source = event.source.frameElement; //this is the iframe that sent the message
    var message = event.data; //this is the message
alert(message);
    //do something with message
}
