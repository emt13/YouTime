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

//builds div for a video
function buildVideoElement(video, indent){
  //create the element that holds all of the data
  var vid = document.createElement("div");

  //console.log(vid.style);
  vid.appendChild( document.createTextNode(indent + video['name']));

  var moveButton = document.createElement("BUTTON");
  moveButton.appendChild(document.createTextNode("Move"));
  moveButton.setAttribute("name", video['name']);
  moveButton.addEventListener("click", function(){
    var dest = window.prompt("Where do you want to move this folder?");

    if(dest == null){
      return;
    }

    var source = this.getAttribute("name");

    var appStorage = new YTStorage();
    appStorage.moveElement(source, dest);

    window.location.reload();
  });

  vid.appendChild(moveButton);

  //create the remove button for the video
  var removeButton =  document.createElement("BUTTON");
    removeButton.appendChild(document.createTextNode("Remove"));
    removeButton.setAttribute("video", video['name']);
    removeButton.setAttribute("id", video['id']);
    removeButton.addEventListener("click", function() {
      var appStorage = new YTStorage();
      appStorage.removeVideo(this.getAttribute("id"));
      window.location.reload();
      console.log("removed");
    });

  vid.appendChild(removeButton);

  // create list element for timelink display
  var tmlist = document.createElement("ul");

  // get the timemarks for each video
  var marks = video['timemarks'];

  for(var j = 0; j < marks.length; j++) {
    var mark = marks[j];
    var li = document.createElement("li");
    var a = document.createElement("a");

    //sets the href to the youtube link
    a.setAttribute("href", mark['URL']);
    var hyperlink = mark['time'] + " - ";
    if(mark['desc'] != null){
      hyperlink = hyperlink + mark['desc'];
    }else{
      hyperlink = hyperlink + " < No Description >";
    }
    a.appendChild(document.createTextNode(hyperlink));
    li.appendChild(a);

    //creates the share button. Adds a listener that allows you to copy the link
    var shareButton = document.createElement("BUTTON");
    shareButton.appendChild(document.createTextNode("Share"));
    shareButton.setAttribute("url", mark['URL']);
    shareButton.addEventListener("click", function() {
      window.prompt("Ctrl + C to copy this link:", this.getAttribute("url"));
    }, false);

    li.appendChild(shareButton);

    // edit button for editing the escription
    var editButton = document.createElement("BUTTON");
    editButton.appendChild(document.createTextNode("Edit"));
    // store information in button for use on click
    editButton.setAttribute("time", mark['time']);
    editButton.setAttribute("title", video['name']);
    editButton.setAttribute("id", mark['id']);
    editButton.setAttribute("URL", mark['URL']);
    editButton.setAttribute("desc", mark['desc']);
    editButton.addEventListener("click", function() {
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

    li.appendChild(editButton);

    // Add remove button to the timemarks
    var removeTime = document.createElement("BUTTON");
    removeTime.appendChild(document.createTextNode("Remove"));
    //store information in the remove button (holds information to be used in the click callback)
    removeTime.setAttribute("time", mark['time']);
    removeTime.setAttribute("id", mark['id']);
    removeTime.addEventListener("click", function() {
      //gets relevant information and sends it to the YTStorage to delete the timemark
      var appStorage = new YTStorage();
      appStorage.removeTimemark({
        "id": this.getAttribute("id"),
        "time": this.getAttribute("time")
      });
      window.location.reload();
    });

    li.appendChild(removeTime);

    tmlist.appendChild(li);
  }

  vid.appendChild(tmlist);

  document.body.appendChild(vid);

}

//builds a div for a folder
function buildFolderElement(folderObj, offset){

  //create the element that holds all of the data
  var folder = document.createElement("div");

  folder.appendChild( document.createTextNode(offset + folderObj['name']));

  // edit button for editing the escription
  var editButton = document.createElement("BUTTON");
  editButton.appendChild(document.createTextNode("Edit"));
  // store information in button for use on click
  editButton.setAttribute("name", folderObj['name']);
  editButton.addEventListener("click", function() {
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

  folder.appendChild(editButton);

  // button that allows for a folder to be created inside this folder
  var newInnerFolderButton = document.createElement("BUTTON");
  newInnerFolderButton.appendChild(document.createTextNode("New Folder"));
  // store information in button for use on click
  newInnerFolderButton.setAttribute("name", folderObj['name']);
  newInnerFolderButton.addEventListener("click", function() {
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

  folder.appendChild(newInnerFolderButton);

  var moveButton = document.createElement("BUTTON");
  moveButton.appendChild(document.createTextNode("Move"));
  moveButton.setAttribute("name", folderObj['name']);
  moveButton.addEventListener("click", function(){
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

  folder.appendChild(moveButton);

  //create the remove button for the video
  var removeButton =  document.createElement("BUTTON");
    removeButton.appendChild(document.createTextNode("Remove"));
    removeButton.setAttribute("name", folderObj['name']);
    removeButton.addEventListener("click", function() {
      var appStorage = new YTStorage();
      appStorage.removeFolder(this.getAttribute("name"));
      window.location.reload();
      console.log("removed");
    });

  folder.appendChild(removeButton);


  document.body.appendChild(folder);

}

function recurseFileSystemHTML(node, folderIndent, videoIndent){
  if(node == null){
    return;
  }
  //build all of the elements spanning from node recursively
  for(var i = 0; i < node['children'].length; i++){
    if(node['children'][i]['type'] == "video"){
      //display the video
      buildVideoElement(node['children'][i], videoIndent);
    }else{
      buildFolderElement(node['children'][i], folderIndent);
      recurseFileSystemHTML(node['children'][i], folderIndent + " - ", videoIndent + " ++ ");
    }
  }
}

// Populate Page function that grabs video objects from storage and
// then populates the manager page with them and their timelinks.
// share and remove buttons are also added.
YTManager.prototype.populatePage = function(rootObj){

  var root = rootObj['fstoreRoot'];
  console.log("root");
  console.log(root);

  //build an html page around the filesystem
  recurseFileSystemHTML(root, "", "");

}
