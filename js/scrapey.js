function loadSite(site){
  document.getElementById('iframe').src = "www." + site;
}

$("#tasks").click(function(){
    $.ajax({url: "tasks.html", success: function(result){
        $("#content").html(result);
    }});
});
