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
  // OLD VERSION ---- KEEP FOR TESTING PURPOSES
  /*
  function renameFolderHelper(node){
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        for(var i = 0; i < node[property].length; i++){
          //if this is the video, we want to insert
          if(node[property][i]['type'] == 'folder'){
          	if(node[property][i]['name'] == oldName){
          		node[property][i]['name'] = newName
              return;
          	}
            renameFolderHelper(oldName, newName, node[property][i]);
         	}
        }
      }
    }
  }
  renameFolderHelper(root);*/
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
  // OLD VERSION ---- KEEP FOR TESTING PURPOSES
  /*function removeFolderHelper(node){
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        for(var i = 0; i < node[property].length; i++){
          if(node[property][i]['type'] == "folder" && node[property][i]['name'] == folderName){
            node[property].splice(i,1);
            return;
         	}else if(node[property][i]['type'] == "folder" && node[property][i]['children'].length > 0){
            console.debug(node[property][i]);
          	removeFolderHelper(node[property][i]);
         	}
        }
      }
    }
  }

  removeFolderHelper(root);*/
}

//creates a fodler at a given target point
YTFileTree.prototype.createFolderAtPoint = function(folderName, targetName, root){
  //recursive target function
  function insertObjAtFolderHelper(obj, targetFolder, node){

    //corner case of inserting at root
  	if(node['name'] == "root" && node['name'] == targetFolder){
      node['children'].push(obj);
      return;
    }

  	//go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        for(var i = 0; i < node[property].length; i++){
          //if this is the video, we want to insert
          if(node[property][i]['type'] == 'folder'){
          	if(node[property][i]['name'] == targetFolder){
              node[property][i]['children'].push(obj);
              return;
          	}
            insertObjAtFolderHelper(obj, targetFolder, node[property][i]);
         	}
        }
      }
    }
  }
  //object used to represent folder
  var folderObj = {
    "type" : "folder",
    "name" : folderName,
    "children" : []
  };
  insertObjAtFolderHelper(folderObj, targetName, root);
}

//removes a video by id from the filesystem
YTFileTree.prototype.removeVideo = function(targetID, root){

  //function to navigate the structure of the filesystem
  function removeVideoHelper(node){
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        for(var i = 0; i < node[property].length; i++){
          if(node[property][i]['type'] == 'video'){
          	if(node[property][i]['id'] == targetID){
              //removes the video from its parent folder
          		node[property].splice(i, 1);
              return;
          	}
         	}else{
          	//removeVideoHelper(node[property][i]);
         	}
        }
      }
    }
  }

  removeVideoHelper(root);
}



//remvoes a timemark from a video. If that video then has 0 timemarks, remove the video
YTFileTree.prototype.removeTimemark = function(timemark, root){

  //function to navigate the structure of the filesystem
  function removeTMHelper(node){
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        var size = node[property].length;
        for(var i = 0; i < size; i++){
          //if this is the video, we want to insert
          if(node[property][i]['type'] == 'video'){
            console.log("video: " + node[property][i]['id'] + " - " + node[property][i]['timemarks'].length);
            if(node[property][i]['id'] == timemark['id']){
            	for(var j = 0; j < node[property][i]['timemarks'].length; j++){
             		//delete the relevant timemark
              	if(node[property][i]['timemarks'][j]['time'] == timemark['time']){
                	node[property][i]['timemarks'].splice(j, 1);
                  break;
                }
              }
              //deletes the video if there are no timemarks in it
              if(node[property][i]['timemarks'].length == 0){
              	node[property].splice(i, 1);
              }
              return true;
            }
          }else{ //only option here is it is a folder
            //removeTMHelper(timemark, node[property][i]);
          }
        }
      }
    }
  }

  removeTMHelper(root);

}



//inserts the timemark
//finds the video
//if there is no video for this timemark already in the structure, create it
YTFileTree.prototype.insertTimemark = function(timemark, root){

  var name = timemark.getTitle();

  console.log("insert timemark");
  console.log(timemark);

  //console.log(" ROOT " + this.root['children'].length);
  //console.log(this.root);
  timemark = {
    "id" : timemark.getId(),
    "time" : timemark.getTime(),
    "URL" : timemark.getUrl(),
    "desc" : timemark.getDescription()
  };
  //console.log(timemark);

  function insertHelper(node){

    console.log("NOW CHECKING IN NODE: "+ node['name'])
    var ret = false;
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        console.log("--");
        var size = node[property].length;
        console.log(node[property].length + " = " + size);
        for(var i = 0; i < size; i++){
          console.log(" ** ");
          console.log(node[property][i]);
          //if this is the video, we want to insert
          if(node[property][i]['type'] == "video"){
            if(node[property][i]['id'] == timemark['id']){
              var inserted = false;
              //go through all of the timemarks in the video
              for(var j = 0; j < node[property][i]['timemarks'].length; j++){

                //used for sorting in order of time. Meaning order of time 0:00 -> endOfVideo is represented as 0 -> n
                if(convertHMStoS(node[property][i]['timemarks'][j]['time']) > convertHMStoS(timemark['time'])){
                  node[property][i]['timemarks'].splice(j, 0, timemark);
                  inserted = true;
                  j = node[property][i]['timemarks'].length;
                }//check if a timemark needs to be overwritten (description was changed)
                else if(convertHMStoS(node[property][i]['timemarks'][j]['time']) == convertHMStoS(timemark['time'])){
                  if(node[property][i]['timemarks'][j]['desc'] != timemark['desc']){
                    node[property][i]['timemarks'][j]['desc'] = timemark['desc'];
                    inserted = true;
                    j = node[property][i]['timemarks'].length;
                  }else{
                    return true;
                  }
                }
              }
              if(!inserted){
            	  node[property][i]['timemarks'].push(timemark);
              }

              return true;
            }
            //return true;
          }else{ //only option here is it is a folder
            //ret |= insertHelper(timemark, name, node[property][i]);
          }
        }
      }
    }

    //Post insertion checks, insert at root
    if(node == null){
    	return false;
    }
    //if the timemark was not inserted at all, add a new video to root and store the timemark
    if(node['name'] == "root" && ret == false){
      console.log("  creating new video at root!");
    	var videoObj = {
      	"type" : "video",
        "name" : name,
        "timemarks" : [],
        "id" : timemark['id']
      };
      videoObj['timemarks'].push(timemark);

      node['children'].push(videoObj);
    }
  }

  insertHelper(root);



  // OLD VERSION ---- KEEP FOR TESTING PURPOSES
  /*
    var queue = new Queue();
    queue.push(root);

    var inserted = false;
    while(queue.size() > 0 && !inserted){
      var node = queue.pop();
      for(var i = 0; i < node['children'].length; i++){
        if(node['children'][i]['type'] == "video"){
          if(node['children'][i]['id'] == mark['id']){
            console.log(node['children'][i]['type']);
            var elem = node['children'][i];
            console.log(elem.length);
            console.log(elem['name']);
            for(var j = 0; j < node['children'][i]['timemarks'].length; j++){
              if(convertHMStoS(node['children'][i]['timemarks'][j]['time']) > convertHMStoS(mark['time'])){
                node['children'][i]['timemarks'].splice(j, 0, mark);
                inserted = true;
                j = node['children'][i]['timemarks'].length;
                i = node['children'].length;
              }else if(convertHMStoS(node['children'][i]['timemarks'][j]['time']) == convertHMStoS(mark['time'])){
                if(node['children'][i]['timemarks'][j]['desc'] != mark['desc']){
                  node['children'][i]['timemarks'][j]['desc'] = mark['desc'];
                  inserted = true;
                  j = node['children'][i]['timemarks'].length;
                  i = node['children'].length;
                }else{
                  return true;
                }
              }
            }
            if(!inserted){
              node['children'][i]['timemarks'].push(mark);
            }

            return true;
          }
        }else{
          queue.push(node['children'][i]);
        }
      }
    }

    if(!inserted){
      console.log(" building a new video!");
      var videoObj = {
        "type" : "video",
        "name" : name,
        "timemarks" : [mark],
        "id" : mark['id']
      };

      node['children'].push(videoObj);
    }*/

}
