/**
 * This script contains the YTManager class, which
 * handles all events that occur within the mamager page
 * As well as display the Videos and their timelinks to the user
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-05
 */

//Constructor for this class
function YTManager(doc) {
  console.log("Created the manager!");
  //this.appStorage = new YTStorage();
  this.document = doc;
}

//creates the buttons for a timemark
function makeButtonsForTimemark(mark, title){
  //create button group
  var btnGroup = document.createElement("div");
  btnGroup.setAttribute("class", "btn-group pull-right");

  //create share, add it
  var share = document.createElement("button");
  share.setAttribute("type", "button");
  share.setAttribute("class", "btn btn-danger btn-xs");
  share.appendChild(document.createTextNode("Share"));
  share.setAttribute("url", mark['URL']);
  share.addEventListener("click", function() {
    window.prompt("Ctrl + C to copy this link:", this.getAttribute("url"));
  }, false);

  btnGroup.appendChild(share);

  //create edit, add it
  var edit = document.createElement("button");
  edit.setAttribute("type", "button");
  edit.setAttribute("class", "btn btn-danger btn-xs");
  edit.appendChild(document.createTextNode("Edit"));
  edit.setAttribute("time", mark['time']);
  edit.setAttribute("title", title);
  edit.setAttribute("id", mark['id']);
  edit.setAttribute("URL", mark['URL']);
  edit.setAttribute("desc", mark['desc']);
  edit.addEventListener("click", function() {
    // prompt user for new description
    var newDesc = window.prompt("Please Enter Your New Description");

    if(newDesc == null){
      return;
    }

    //overwrite the timemark with the old description
    var appStorage = new YTStorage();
    var newTimemark = new YTTimemark(this.getAttribute("id"), this.getAttribute("title"), this.getAttribute("time"), this.getAttribute("URL"), newDesc);
    appStorage.save(newTimemark);

    window.location.reload();

  });

  btnGroup.appendChild(edit);

  //create remove, add it
  var remove = document.createElement("button");
  remove.setAttribute("type", "button");
  remove.setAttribute("class", "btn btn-danger btn-xs");
  remove.appendChild(document.createTextNode("Remove"));
  remove.setAttribute("time", mark['time']);
  remove.setAttribute("id", mark['id']);
  remove.addEventListener("click", function() {
    //gets relevant information and sends it to the YTStorage to delete the timemark
    var appStorage = new YTStorage();
    appStorage.removeTimemark({
      "id": this.getAttribute("id"),
      "time": this.getAttribute("time")
    });
    window.location.reload();
  });

  btnGroup.appendChild(remove);

  //return button group
  return btnGroup;
}
//creates the buttons for a video
function makeButtonsForVideo(video){
  //create button group
  var btnGroup = document.createElement("div");
  btnGroup.setAttribute("class", "btn-group pull-right");

  //create move, add it
  var move = document.createElement("button");
  move.setAttribute("type", "button");
  move.setAttribute("class", "btn btn-danger btn-xs");
  move.appendChild(document.createTextNode("Move"));
  move.setAttribute("name", video['name']);
  move.addEventListener("click", function(){
    var dest = window.prompt("Where do you want to move this folder?");

    if(dest == null){
      return;
    }

    var source = this.getAttribute("name");

    console.log("moving source: " + source + " to destination: " + dest);

    var appStorage = new YTStorage();
    appStorage.moveElement(source, dest);
    window.location.reload();
  });

  btnGroup.appendChild(move);

  //create remove, add it
  var remove = document.createElement("button");
  remove.setAttribute("type", "button");
  remove.setAttribute("class", "btn btn-danger btn-xs");
  remove.appendChild(document.createTextNode("Remove"));
  remove.setAttribute("name", video['name']);
  remove.addEventListener("click", function() {
    var appStorage = new YTStorage();
    appStorage.removeFolder(this.getAttribute("name"));
    window.location.reload();
    console.log("removed");
  });

  btnGroup.appendChild(remove);

  //return button group
  return btnGroup;
}
//creates the buttons for a folder
function makeButtonsForFolder(folder){
  //create button group
  var btnGroup = document.createElement("div");
  btnGroup.setAttribute("class", "btn-group pull-right");

  //create new folder, add it
  var newFolder = document.createElement("button");
  newFolder.setAttribute("type", "button");
  newFolder.setAttribute("class", "btn btn-danger btn-xs");
  newFolder.appendChild(document.createTextNode("New Folder"));
  newFolder.setAttribute("name", folder['name']);
  newFolder.addEventListener("click", function() {
    // prompt user for new description
    var newName = window.prompt("Please enter the name of your new folder");

    if(newName == null){
      return;
    }

    if(newName == "root"){
      window.alert("ERROR: Cannot use \"root\" as a file name!");
      return;
    }

    var appStorage = new YTStorage();
    appStorage.createFolder(newName, this.getAttribute("name"));

    window.location.reload();

  });

  btnGroup.appendChild(newFolder);

  //create move, add it
  var move = document.createElement("button");
  move.setAttribute("type", "button");
  move.setAttribute("class", "btn btn-danger btn-xs");
  move.appendChild(document.createTextNode("Move"));
  move.setAttribute("name", folder['name']);
  move.addEventListener("click", function(){
    var dest = window.prompt("Where do you want to move this folder?");

    if(dest == null){
      return;
    }

    var source = this.getAttribute("name");

    console.log("moving source: " + source + " to destination: " + dest);

    var appStorage = new YTStorage();
    appStorage.moveElement(source, dest);
    window.location.reload();

  });
  if("root" != folder['name']){
    btnGroup.appendChild(move);
  }

  //create edit, add it
  var edit = document.createElement("button");
  edit.setAttribute("type", "button");
  edit.setAttribute("class", "btn btn-danger btn-xs");
  edit.appendChild(document.createTextNode("Edit"));
  edit.setAttribute("name", folder['name']);
  edit.addEventListener("click", function() {
    // prompt user for new description
    var newName = window.prompt("Please enter your new folder name");

    if(newName == null){
      return;
    }

    if(newName == "root"){
      window.alert("ERROR: Cannot use \"root\" as a file name!");
      return;
    }

    var appStorage = new YTStorage();
    appStorage.renameFolder(this.getAttribute("name"), newName);

    window.location.reload();

  });
  if("root" != folder['name']){
    btnGroup.appendChild(edit);
  }

  //create remove, add it
  var remove = document.createElement("button");
  remove.setAttribute("type", "button");
  remove.setAttribute("class", "btn btn-danger btn-xs");
  remove.appendChild(document.createTextNode("Remove"));
  remove.setAttribute("name", folder['name']);
  remove.addEventListener("click", function() {
    var appStorage = new YTStorage();
    appStorage.removeFolder(this.getAttribute("name"));
    window.location.reload();
    console.log("removed");
  });
  if("root" != folder['name']){
    btnGroup.appendChild(remove);
  }

  //return button group
  return btnGroup;
}
//makes sure that a string has no blank spaces since it is being used as an id
function sanitizeString(input){
  return input.replace(" ", "-");
}

//recursive function to build the
function buildDivTree(node){

  console.log("building: " + node['name']);

  var masterDiv = document.createElement("div");
  masterDiv.setAttribute("class", "panel panel-danger");

  var panelHeading = document.createElement("div");
  panelHeading.setAttribute("class", "panel-heading");

  var header = document.createElement("a");
  header.setAttribute("data-toggle", "collapse");
  header.setAttribute("data-parent", "#accordion");
  header.setAttribute("href", "#" + sanitizeString(node['name']) + "ToCollapse");
  header.appendChild(document.createTextNode(node['name']));

  var bodyList = document.createElement("ul");
  bodyList.setAttribute("id", sanitizeString(node['name']) + "ToCollapse");

  panelHeading.appendChild(header);
  masterDiv.appendChild(panelHeading);

  //if this node is a video, we need to create hyperlinks and add those to the div
  if(node['type'] == "video"){

    header.appendChild(makeButtonsForVideo(node));

    bodyList.setAttribute("class", "list-group panel-collapse collapse in");
    //add appropriate ids
    for(var i = 0; i < node['timemarks'].length; i++){
      //create the list item element
      var tmpLI = document.createElement("li");
      tmpLI.setAttribute("class", "list-group-item");
      var mark = node['timemarks'][i];
      console.log(mark);
      var a = document.createElement("a");

      //sets the href to the youtube link
      a.setAttribute("href", mark['URL']);
      var hyperlink = mark['time'] + " - ";
      if(mark['desc'] != null){
        hyperlink = hyperlink + mark['desc'];
      }else{
        hyperlink = hyperlink + " < No Description >";
      }
      var buttonDiv = makeButtonsForTimemark(mark, node['name']);
      a.appendChild(document.createTextNode(hyperlink));
      a.appendChild(buttonDiv);
      tmpLI.appendChild(a);
      bodyList.appendChild(tmpLI);
    }
  }else{ //if this node is a folder, we need to get all of the sub elements and append those to this one
    //The root should already be extended to convey that there is information in the root
    if(node['name'] == "root"){
      bodyList.setAttribute("class", "list-group panel-collapse collapse in");
    }else{
      bodyList.setAttribute("class", "list-group panel-collapse collapse");
    }
    header.appendChild(makeButtonsForFolder(node));

    //recurse on the children and append their divs
    for(var i = 0; i < node['children'].length; i++){
      var tmpLI = document.createElement("li");
      tmpLI.setAttribute("class","list-group-item");
      tmpLI.appendChild(buildDivTree(node['children'][i]));
      bodyList.appendChild(tmpLI);
    }
  }

  masterDiv.appendChild(bodyList);

  return masterDiv;
}

// Populate Page function that grabs video objects from storage and
// then populates the manager page with them and their timelinks.
// share and remove buttons are also added.
YTManager.prototype.populatePage = function(rootObj){

  var root = rootObj['fstoreRoot'];
  console.log("root");
  console.log(root);

  if(root == null){
    console.log("Root is null!");
    return;
  }else{
    var newFolder = document.getElementById("newFolderROOT");
    newFolder.setAttribute("class", newFolder.getAttribute("class") + " disabled");
  }

  //build div tree to display the file system
  var divTree = buildDivTree(root);
  document.body.appendChild(divTree);

}
