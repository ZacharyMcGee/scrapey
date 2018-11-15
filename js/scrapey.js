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

function changeTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
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

 $(".panel-left").resizable({
   handleSelector: ".splitter",
   resizeHeight: false
 });

 $(".panel-top").resizable({
   handleSelector: ".splitter-horizontal",
   resizeWidth: false
 });


$("#loadsite").click(function(){
    refreshData();
});

        $(function () {

            var jsondata = [
                           { "id": "ajson1", "parent": "#", "text": "Simple root node" },
                           { "id": "ajson2", "parent": "#", "text": "Root node 2" },
                           { "id": "ajson3", "parent": "ajson2", "text": "Child 1" },
                           { "id": "ajson4", "parent": "ajson2", "text": "Child 2" },
            ];

            createJSTree(jsondata);
        });

        function createJSTree(jsondata) {
            $('#action-tree').jstree({
                "core": {
                    "check_callback": true,
                    'data': jsondata

                },
                "plugins": ["contextmenu"],
                "contextmenu": {
                    "items": function ($node) {
                        var tree = $("#action-tree").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": true,
                                "label": "Create",
                                "action": false,
                                "submenu": {
                                    "File": {
                                        "seperator_before": false,
                                        "seperator_after": false,
                                        "label": "File",
                                        action: function (obj) {
                                            $node = tree.create_node($node, { text: 'New File', type: 'file', icon: 'images/logo.png' });
                                            tree.deselect_all();
                                            tree.select_node($node);
                                        }
                                    },
                                    "Folder": {
                                        "seperator_before": false,
                                        "seperator_after": false,
                                        "label": "Folder",
                                        action: function (obj) {
                                            $node = tree.create_node($node, { text: 'New Folder', type: 'default' });
                                            tree.deselect_all();
                                            tree.select_node($node);
                                        }
                                    }
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Rename",
                                "action": function (obj) {
                                    tree.edit($node);
                                }
                            },
                            "Remove": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Remove",
                                "action": function (obj) {
                                    tree.delete_node($node);
                                }
                            }
                        };
                    }
                }
            });
        }

$("#newlink").click(function(){
var position = 'inside';
var parent = $('#action-tree').jstree('get_selected');
var tree = $("#action-tree").jstree(true);
var newNode = { text: 'Link', type: 'file', icon: 'fas fa-link' };
var node = $('#action-tree').jstree(
    "create_node", parent, newNode, position, false, false);
$('#action-tree').jstree(
    "deselect_all");
$('#action-tree').jstree(
    "select_node", node, false, false);
});
