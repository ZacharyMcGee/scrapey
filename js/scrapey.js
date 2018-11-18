// SIDEBAR BUTTONS
var localDataIndex = 0;
var sidebar = document.getElementById("sidebar");
var buttons = sidebar.getElementsByClassName("sidebar-button");

function Element(eName, eType){
     this.Name = eName;
     this.Type = eType;
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

window.addEventListener("message", receiveMessage, false);
 function receiveMessage(event){
    var source = event.source.frameElement; //this is the iframe that sent the message
    var message = event.data; //this is the message
    alert(message);
    //do something with message
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
        loadTree(site);
      } else {

      };
    }
}
  }

function loadTree(site){
            var jsondata = [
                           { "id": "root", "parent": "#", "text": site , "icon": "fas fa-link" },
            ];

            createJSTree(jsondata);
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

function saveElement() {
console.log("SAVED");
  var selectedNode = $('#action-tree').jstree('get_selected', true)[0];
  var id = selectedNode.id;
  var elementId = $("#element-id").val();
  var elementType = $("#element-type").val();

  $('#action-tree').jstree(true).get_node(id).data.data_array[0] = elementId;
  $('#action-tree').jstree(true).get_node(id).data.data_array[1] = elementType;

  switch(elementType) {
    case "text":
        $("#action-tree").jstree(true).set_icon(id, 'fas fa-font');
        break;
    case "link":
        $("#action-tree").jstree(true).set_icon(id, 'fas fa-link');
        break;
    case "image":
        $("#action-tree").jstree(true).set_icon(id, 'far fa-image');
        break;
    default:
        $("#action-tree").jstree(true).set_icon(id, 'fas fa-font');
        break;
  }

  $('#action-tree').jstree("rename_node", selectedNode, elementId);
}

function createElement() {

}

function loadElement(id, type) {
    console.log(id);
    $.ajax({url: "edit-element.html", success: function(result){
        $("#panel-right").html(result);
        $("#element-id").val(id);
        $("#element-type").val(type);
    }});
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

// Create a new element

$("#new-element").click(function(){
var position = 'inside';
var parent = $('#action-tree').jstree('get_selected');
var tree = $("#action-tree").jstree(true);
var newNode = { text: 'Link', type: 'file', icon: 'fas fa-font', 'data': { "data_array" : ["The Name", "text", "Unsaved"]  } };

var node = $('#action-tree').jstree(
    "create_node", parent, newNode, position, false, false);
$('#action-tree').jstree(
    "deselect_all");
$('#action-tree').jstree(
    "select_node", node, false, false);
});

// Selecting an element

$("#action-tree").bind(
        "select_node.jstree", function(evt, data){
            var id = $('#action-tree').jstree('get_selected', true)[0].id;
            if(id == "root"){
               console.log("AT ROOT");
            }
            else
            {
               var elementId = $('#action-tree').jstree(true).get_node(id).data.data_array[0];
               var elementType = $('#action-tree').jstree(true).get_node(id).data.data_array[1];

               loadElement(elementId, elementType);
               console.log($('#action-tree').jstree(true).get_node(id).data.data_array);
            }
        }
);
