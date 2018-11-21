// SIDEBAR BUTTONS
var localDataIndex = 0;
var sidebar = document.getElementById("sidebar");
var buttons = sidebar.getElementsByClassName("sidebar-button");
var pageData;

function Element(eName, eType){
     this.Name = eName;
     this.Type = eType;
}

function runScrapey(){
var jsonNodes = $('#action-tree').jstree(true).get_json('#', { flat: true });
var site;
$.each(jsonNodes, function (i, val) {
    if(i != 0) {
       var tag = val.data.data_array[0];
       var type = val.data.data_array[1];
       var name = val.data.data_array[2];
       var index = val.data.Index[0];
       var indexFrom = val.data.Index[1];
       var indexTo = val.data.Index[2];
       console.log(site);
       getData(site, tag, type, name, index, indexFrom, indexTo);
    }
    else
    {
       site = val.text;
    }
  })
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

function getData(site, tag, selector, name, index, indexFrom, indexTo){
    console.log("getData");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/get_data.php?site=" + site + "&tag=" + tag + "&selector=" + selector + "&name=" + name + "&index=" + index + "&indexfrom=" + indexFrom + "&indexto=" + indexTo, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    console.log("send");
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var response = this.responseText;
        console.log("done");
        console.log(response);
      } else {
          console.log(this.status);
      };
   }
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
        pageData = response;
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
  var selectedNode = $('#action-tree').jstree('get_selected', true)[0];
  var id = selectedNode.id;
  var elementTag = $("#element-tag").val();
  var elementType = $("#element-type").val();
  var elementName = $("#element-name").val().replace(/ /g, '&nbsp');
  var elementIndex = $("#radio-form input[type='radio']:checked").val();
  var elementIndexFrom = $("#edit-element-from").val();
  var elementIndexTo = $("#edit-element-to").val();

  $('#action-tree').jstree(true).get_node(id).data.data_array[0] = elementTag;
  $('#action-tree').jstree(true).get_node(id).data.data_array[1] = elementType;
  $('#action-tree').jstree(true).get_node(id).data.data_array[2] = elementName;

  $('#action-tree').jstree(true).get_node(id).data.Index[0] = elementIndex;
  $('#action-tree').jstree(true).get_node(id).data.Index[1] = elementIndexFrom;
  $('#action-tree').jstree(true).get_node(id).data.Index[2] = elementIndexTo;

  $('#action-tree').jstree("rename_node", selectedNode, elementTag);
}

function createElement() {

}

function loadElement(tag, type, name, index, indexFrom, indexTo) {
    $.ajax({url: "edit-element.html", success: function(result){
        $("#panel-right").html(result);
        $("#element-tag").val(tag);
        $("#element-type").val(type);
        $("#element-name").val(name);

        console.log("LOAD, index=" + index);
        switch(index) {
           case "first":
               $("#radioFirst").prop("checked", true);
               break;
           case "all":
               $("#radioAll").prop("checked", true);
               break;
           case "custom":
               $("#radioCustom").prop("checked", true);
               showRadioCustomDiv();
               break;
           default:
               $("#radioFirst").prop("checked", true);
        }

        $("#edit-element-from").val(indexFrom);
        $("#edit-element-to").val(indexTo);
    }});
}

function hideRadioCustomDiv() {
    var x = document.getElementById("radio-custom-div");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function showRadioCustomDiv() {
    var x = document.getElementById("radio-custom-div");
    if (x.style.display === "none") {
        x.style.display = "block";
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

$("#action-tree").on('loaded.jstree', function() {
    $('#action-tree').jstree('select_node', 'root');
});

// Create a new element

$("#new-element").click(function(){
var position = 'inside';
var parent = $('#action-tree').jstree('get_selected');
var tree = $("#action-tree").jstree(true);
var newNode = { text: 'Link', type: 'file', icon: 'fas fa-font', 'data': { "data_array" : ["Tag", "Class/Id", "Name" ], "Index": ["first", 0, 0 ] } };

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
               var elementTag = $('#action-tree').jstree(true).get_node(id).data.data_array[0];
               var elementType = $('#action-tree').jstree(true).get_node(id).data.data_array[1];
               var elementName = $('#action-tree').jstree(true).get_node(id).data.data_array[2];
               var elementIndex = $('#action-tree').jstree(true).get_node(id).data.Index[0];
               var elementIndexFrom = $('#action-tree').jstree(true).get_node(id).data.Index[1];
               var elementIndexTo = $('#action-tree').jstree(true).get_node(id).data.Index[2];

               loadElement(elementTag, elementType, elementName, elementIndex, elementIndexFrom, elementIndexTo);
               console.log($('#action-tree').jstree(true).get_node(id).data.data_array);
               console.log($('#action-tree').jstree(true).get_node(id).data.Index);
            }
        }
);
