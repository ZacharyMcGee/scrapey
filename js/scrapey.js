// SIDEBAR BUTTONS
var sidebar = document.getElementById("sidebar");
var buttons = sidebar.getElementsByClassName("sidebar-button");
var pageData;
var results = [];
var counter = 0;
var site;

function startScrapey(){
  results = [];
  var element = {
    index: ['0'],
    value: ['0']
  };
  results.push(element);
  counter = 0;
  var jsonNodes = $('#action-tree').jstree(true).get_json('#', { flat: true });
  var treeSize = $('#action-tree').jstree(true).get_json('#', { flat: true }).length;
  site = $('#action-tree').jstree(true).get_node('root').text;
  runScrapey(jsonNodes, treeSize);
}

function runScrapey(jsonNodes, treeSize){
console.log("RUNNING SCRAPEY");
$.each(jsonNodes, function (i, val) {
    if(i != 0) {
       var elementType = val.data.type;
       switch(elementType) {
         case "text":
            var tag = val.data.data_array[0];
            var type = val.data.data_array[1];
            var name = val.data.data_array[2];
            var index = val.data.Index[0];
            var indexFrom = val.data.Index[1];
            var indexTo = val.data.Index[2];
            console.log("TEXT -- Counter == " + counter);
            getTextData(site, tag, type, name, index, indexFrom, indexTo, counter, treeSize);
            break;
         case "link":
            var tag = val.data.data_array[0];
            var type = val.data.data_array[1];
            var name = val.data.data_array[2];
            var index = val.data.Index[0];
            var indexFrom = val.data.Index[1];
            var indexTo = val.data.Index[2];
            console.log("Link -- Counter == " + counter);

            getLinkData(site, tag, type, name, index, indexFrom, indexTo, counter, treeSize);
            break;
         case "image":
            var tag = val.data.data_array[0];
            var type = val.data.data_array[1];
            var name = val.data.data_array[2];
            var index = val.data.Index[0];
            var indexFrom = val.data.Index[1];
            var indexTo = val.data.Index[2];
            getImageData(site, tag, type, name, index, indexFrom, indexTo, counter, treeSize);
            break;
         case "page":
            for(i = 0; i < 3; i++){
              console.log("PAGE COUNTER: " + counter);
              var jsonSubNodes = $('#action-tree').jstree(true).get_json(val, { flat: true });
              runScrapey(jsonSubNodes, treeSize);
            }
            return false;
            break;
         default:
            break;
       }
       counter++;
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

function getTextData(site, tag, selector, name, index, indexFrom, indexTo, counter, treeSize){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/get_text.php?site=" + site + "&tag=" + tag + "&selector=" + selector + "&name=" + name + "&index=" + index + "&indexfrom=" + indexFrom + "&indexto=" + indexTo, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var response = this.responseText;   // All requests must be async, so we have to rig a way to order our results
                var element = {
          index: [counter],
          value: [response]
        };
        results.push(element);  // We offset by one since results[0] will count the requests we are going to send
        results[0].value++;                       // We increment results[0] by one to track how many requests are completed
        if(results[0].value == treeSize - 1){     // This is the last response, we can now return the data
           returnData();
        }
      } else {

      };
   }
}

function getLinkData(site, tag, selector, name, index, indexFrom, indexTo, counter, treeSize){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/get_link.php?site=" + site + "&tag=" + tag + "&selector=" + selector + "&name=" + name + "&index=" + index + "&indexfrom=" + indexFrom + "&indexto=" + indexTo, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var response = this.responseText;
        var element = {
          index: [counter],
          value: [response]
        };
        results.push(element);
        results[0].value++;
        if(results[0].value == treeSize - 1){
           returnData();
        }
      } else {

      };
   }
}

function getImageData(site, tag, selector, name, index, indexFrom, indexTo, counter, treeSize){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/get_image.php?site=" + site + "&tag=" + tag + "&selector=" + selector + "&name=" + name + "&index=" + index + "&indexfrom=" + indexFrom + "&indexto=" + indexTo, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var response = this.responseText;
        var element = {
          index: [counter],
          value: [response]
        };
        results.push(element);
        results[0]++;
        if(results[0] == treeSize - 1){
           returnData();
        }
      } else {

      };
   }
}


function returnData(){
  const list = results.sort((v1, v2) => v1.index - v2.index).map((v) => v.value);
  console.log(list);
  for(var i = 0; i < results.length; i++){
    console.log(list[i]);
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

function loadTextElement(id) {
  var tag = $('#action-tree').jstree(true).get_node(id).data.data_array[0];
  var type = $('#action-tree').jstree(true).get_node(id).data.data_array[1];
  var name = $('#action-tree').jstree(true).get_node(id).data.data_array[2];
  var index = $('#action-tree').jstree(true).get_node(id).data.Index[0];
  var indexFrom = $('#action-tree').jstree(true).get_node(id).data.Index[1];
  var indexTo = $('#action-tree').jstree(true).get_node(id).data.Index[2];

    $.ajax({url: "edit-text-element.html", success: function(result){

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

function loadLinkElement(id) {
  var tag = $('#action-tree').jstree(true).get_node(id).data.data_array[0];
  var type = $('#action-tree').jstree(true).get_node(id).data.data_array[1];
  var name = $('#action-tree').jstree(true).get_node(id).data.data_array[2];
  var index = $('#action-tree').jstree(true).get_node(id).data.Index[0];
  var indexFrom = $('#action-tree').jstree(true).get_node(id).data.Index[1];
  var indexTo = $('#action-tree').jstree(true).get_node(id).data.Index[2];

    $.ajax({url: "edit-text-element.html", success: function(result){

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

function loadImageElement(id) {
  var tag = $('#action-tree').jstree(true).get_node(id).data.data_array[0];
  var type = $('#action-tree').jstree(true).get_node(id).data.data_array[1];
  var name = $('#action-tree').jstree(true).get_node(id).data.data_array[2];
  var index = $('#action-tree').jstree(true).get_node(id).data.Index[0];
  var indexFrom = $('#action-tree').jstree(true).get_node(id).data.Index[1];
  var indexTo = $('#action-tree').jstree(true).get_node(id).data.Index[2];
    console.log("load image element");
    $.ajax({url: "edit-image-element.html", success: function(result){

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

function loadClickElement(id) {
  var tag = $('#action-tree').jstree(true).get_node(id).data.data_array[0];
  var type = $('#action-tree').jstree(true).get_node(id).data.data_array[1];
  var name = $('#action-tree').jstree(true).get_node(id).data.data_array[2];
  var index = $('#action-tree').jstree(true).get_node(id).data.Index[0];
  var indexFrom = $('#action-tree').jstree(true).get_node(id).data.Index[1];
  var indexTo = $('#action-tree').jstree(true).get_node(id).data.Index[2];
    $.ajax({url: "edit-page-element.html", success: function(result){

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

function loadErrorElement() {

}

function loadRootElement() {
    $.ajax({url: "root-element.html", success: function(result){
        $("#panel-right").html(result);
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

// Create a text element

$("#new-text-element").click(function(){
var position = 'inside';
var parent = $('#action-tree').jstree('get_selected');
var tree = $("#action-tree").jstree(true);
var newNode = { text: 'Text', type: 'file', icon: 'fas fa-font', 'data': { "type" : "text", "data_array" : ["Tag", "Class/Id", "Name" ], "Index": ["first", 0, 0 ] } };

var node = $('#action-tree').jstree(
    "create_node", parent, newNode, position, false, false);
$('#action-tree').jstree(
    "deselect_all");
$('#action-tree').jstree(
    "select_node", node, false, false);
});

// Create a link element

$("#new-link-element").click(function(){
var position = 'inside';
var parent = $('#action-tree').jstree('get_selected');
var tree = $("#action-tree").jstree(true);
var newNode = { text: 'Link', type: 'file', icon: 'fas fa-link', 'data': { "type" : "link", "data_array" : ["Tag", "Class/Id", "Name" ], "Index": ["first", 0, 0 ] } };

var node = $('#action-tree').jstree(
    "create_node", parent, newNode, position, false, false);
$('#action-tree').jstree(
    "deselect_all");
$('#action-tree').jstree(
    "select_node", node, false, false);
});


// Create an image element

$("#new-image-element").click(function(){
var position = 'inside';
var parent = $('#action-tree').jstree('get_selected');
var tree = $("#action-tree").jstree(true);
var newNode = { text: 'Link', type: 'file', icon: 'fas fa-image', 'data': { "type" : "image", "data_array" : ["Tag", "Class/Id", "Name" ], "Index": ["first", 0, 0 ] } };

var node = $('#action-tree').jstree(
    "create_node", parent, newNode, position, false, false);
$('#action-tree').jstree(
    "deselect_all");
$('#action-tree').jstree(
    "select_node", node, false, false);
});

// Create an image element

$("#new-page-element").click(function(){
var position = 'inside';
var parent = $('#action-tree').jstree('get_selected');
var tree = $("#action-tree").jstree(true);
var newNode = { text: 'Link', type: 'file', icon: 'fas fa-mouse-pointer', 'data': { "type" : "page", "data_array" : ["Tag", "Class/Id", "Name" ], "Index": ["first", 0, 0 ] } };

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
               loadRootElement();
            }
            else
            {
               var type = $('#action-tree').jstree(true).get_node(id).data.type;

               switch(type) {
                    case "text":
                       loadTextElement(id);
                       break;
                    case "link":
                       loadLinkElement(id);
                       break;
                    case "image":
                       loadImageElement(id);
                    default:
                       loadErrorElement();
               }
            }
        }
);
