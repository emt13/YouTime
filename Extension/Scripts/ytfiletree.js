/**
 * Class used to manipulate the filesystem of YouTime
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-27
 */

//used to traverse the tree used in storage

function YTFileTree(inputRoot){
  this.root = inputRoot;
}

//converts time format of hh:mm:ss to seconds
function convertHMStoS(str){
  var t = str.split(':');
  var seconds;
  if(t.length == 3) {
     seconds = t[0]*3600+t[1]*60+t[2]*1;
  }
  else{ //t.length == 2
    seconds = t[0]*60+t[1]*1;
  }
  return seconds;
}

//renames a folder in the filesystem
YTFileTree.prototype.renameFolder = function(oldName, newName, root){

  //uses a queue to hold all of the folders that need traversing
  var queue = new Queue();

  queue.push(root);

  var found = false;
  while(queue.size() > 0 && !found){
    var node = queue.pop();
    for(var i = 0; i < node['children'].length; i++){
      if(node['children'][i]['type'] == "folder"){
        if(node['children'][i]['name'] == oldName){
          node['children'][i]['name'] = newName;
          return;
        }else{
          //we need to check this folder for sub folders that need renaming
          queue.push(node['children'][i]);
        }
      }
    }
  }
}

//removes a folder
YTFileTree.prototype.removeFolder = function(folderName, root){

  //uses a queue to hold all of the folders that need traversing
  var queue = new Queue();

  queue.push(root);

  var found = false;
  while(queue.size() > 0 && !found){

    var node = queue.pop();

    for(var i = 0; i < node['children'].length; i++){
      if(node['children'][i]['type'] == "folder"){
        if(node['children'][i]['name'] == folderName){
          //removes the folder from its parent folder
          node['children'].splice(i,1);
          return;
        }else{
          queue.push(node['children'][i]);
        }
      }
    }
  }

}

//creates a fodler at a given target point
YTFileTree.prototype.createFolderAtPoint = function(folderName, targetName, root){

  console.log("IN createFolderAtPoint!!!!!!");

  var folderObj = {
    "type" : "folder",
    "name" : folderName,
    "children" : []
  };

  //every object inside the queue should have type 'folder'
  var queue = new Queue();

  queue.push(root);

  while(queue.size() != 0){

    var currentNode = queue.pop();

    console.log(" looking for: " + targetName + "   in node: " + currentNode['name']);
    //check this node
    if(currentNode['name'] == targetName){
      currentNode['children'].push(folderObj);
      return;
    }
    //find all of the subfolders and add them to the queue
    for(var i = 0; i < currentNode['children'].length; i++){
      if(currentNode['children'][i]['type'] == "folder"){
        queue.push(currentNode['children'][i]);
      }
    }
  }

}

//removes a video by id from the filesystem
YTFileTree.prototype.removeVideo = function(targetID, root){

  var queue = new Queue();

  queue.push(root);

  while(queue.size() != 0){

    var currentNode = queue.pop();

    for(var i = 0; i < currentNode['children'].length; i++){
      //if this is a video, check the name and if it should be removed
      if(currentNode['children'][i]['type'] == "video"){
        if(currentNode['children'][i]['id'] == targetID){
          currentNode['children'].splice(i, 1);
        }
      }else{
        queue.push(currentNode['children'][i]);
      }
    }
  }

}

//remvoes a timemark from a video. If that video then has 0 timemarks, remove the video
YTFileTree.prototype.removeTimemark = function(timemark, root){

  console.log("IN removeTimemark!!!!");

  var queue = new Queue();

  queue.push(root);

  while(queue.size() != 0){

    var currentNode = queue.pop();

    console.log(" checking in: " + currentNode['name']);
    console.log(currentNode);

    for(var i = 0; i < currentNode['children'].length; i++){
      if(currentNode['children'][i]['type'] == "video"){
        if(currentNode['children'][i]['id'] == timemark['id']){
          var tm = currentNode['children'][i]['timemarks'];
          for(var j = 0; j < tm.length; j++){
            if(tm[j]['time'] == timemark['time']){
              tm.splice(j, 1);

              //if the video has no timemarks, remove it
              if(tm.length == 0){
                currentNode['children'].splice(i, 1);
              }

              return;
            }
          }
          return;
        }
      }else{
        queue.push(currentNode['children'][i]);
      }
    }

  }

}



//inserts the timemark
//finds the video
//if there is no video for this timemark already in the structure, create it
YTFileTree.prototype.insertTimemark = function(timemark, root){

  var name = timemark.getTitle();

  timemark = {
    "id" : timemark.getId(),
    "time" : timemark.getTime(),
    "URL" : timemark.getUrl(),
    "desc" : timemark.getDescription()
  };

  var queue = new Queue();

  queue.push(root);

  while(queue.size() != 0){

    var currentNode = queue.pop();

    for(var i = 0; i < currentNode['children'].length; i++){

      if(currentNode['children'][i]['type'] == "video"){
        if(currentNode['children'][i]['id'] == timemark['id']){

          var tm = currentNode['children'][i]['timemarks'];
          for(var j = 0; j < tm.length; j++){
            var currentTime = convertHMStoS(tm[j]['time']);
            var newTime = convertHMStoS(timemark['time']);

            //update with the new description
            if(currentTime == newTime){
              tm[j]['desc'] = timemark['desc'];
              return;
            }else if(currentTime > newTime){
              tm.splice(j, 0, timemark);
              return;
            }
          }
          currentNode['children'][i]['timemarks'].push(timemark);
          return;
        }
      }else{
        queue.push(currentNode['children'][i]);
      }
    }
  }

  //if it reaches this point, that means that the video has not already been inserted
  var videoObj = {
    "type" : "video",
    "name" : name,
    "timemarks" : [timemark],
    "id" : timemark['id']
  };

  root['children'].push(videoObj);

}

YTFileTree.prototype.moveObjectToFolder = function(nameToMove, targetName, root){

  //used to store the objects in question during the first pass of the filesystem
  var objToMove, destination, parentOfMove;

  var queue = new Queue();

  queue.push(root);

  //get the objects in question
  while(queue.size() != 0 && (objToMove == null || destination == null)){

    var currentNode = queue.pop();

    console.log("checking in: " + currentNode['name']);

    //enforces that destination is a "folder" type
    if(currentNode['name'] == targetName){
      destination = currentNode;
    }

    for(var i = currentNode['children'].length - 1; i >= 0; i--){
      var cElem = currentNode['children'][i];
      console.log("child: " + cElem['name']);
      console.log(cElem);
      if(cElem['name'] == nameToMove){
        parentOfMove = currentNode;
      }
      //if a folder, it needs to be checked
      if(cElem['type'] == "folder"){
        queue.push(cElem);
      }
    }
  }

  if(destination != null && parentOfMove != null){
    for(var i = 0; i < parentOfMove['children'].length; i++){
      if(parentOfMove['children'][i]['name'] == nameToMove){
        destination['children'].push(parentOfMove['children'][i]);
        parentOfMove['children'].splice(i, 1);
      }
    }
  }

  /*//appends the objectToMove to the destination
  if(parentOfMove != null && destination != null){
    destination['children'].push(objToMove);
  }*/



}
