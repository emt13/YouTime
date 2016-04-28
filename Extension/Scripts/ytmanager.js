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
  vid.appendChild( document.createTextNode(indent + video['name']));

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
    var hyperlink = indent + mark['time'] + " - ";
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

    var appStorage = new YTStorage();
    appStorage.createFolder(newName, this.getAttribute("name"));

    window.location.reload();

  });

  folder.appendChild(newInnerFolderButton);

  document.body.appendChild(folder);

}

function recurseFileSystemHTML(node, indent){
  if(node == null){
    return;
  }

  //build all of the elements spanning from node recursively
  for(var i = 0; i < node['children'].length; i++){
    if(node['children'][i]['type'] == "video"){
      //display the video
      buildVideoElement(node['children'][i], "");
    }else{
      buildFolderElement(node['children'][i], indent);
      recurseFileSystemHTML(node['children'][i], indent + " - ");
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
  recurseFileSystemHTML(root, "");

}
