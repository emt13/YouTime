//used to traverse the tree used in storage

function YTFileTree(inputRoot){
  this.root = inputRoot;
}

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

YTFileTree.prototype.renameFolder = function(oldName, newName, root){

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
          queue.push(node['children'][i]);
        }
      }
    }
  }

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

YTFileTree.prototype.removeFolderAtPoint = function(folderName, root){

  var queue = new Queue();

  queue.push(root);

  var found = false;
  while(queue.size() > 0 && !found){
    var node = queue.pop();
    for(var i = 0; i < node['children'].length; i++){
      if(node['children'][i]['type'] == "folder"){
        if(node['children'][i]['name'] == folderName){
          node['children'].splice(i,1);
          return;
        }else{
          queue.push(node['children'][i]);
        }
      }
    }
  }

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

YTFileTree.prototype.createFolderAtPoint = function(folderName, targetName, root){
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

  var folderObj = {
    "type" : "folder",
    "name" : folderName,
    "children" : []
  };
  insertObjAtFolderHelper(folderObj, targetName, root);
}

YTFileTree.prototype.removeVideo = function(targetID, root){

  function removeVideoHelper(node){
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        for(var i = 0; i < node[property].length; i++){
          if(node[property][i]['type'] == 'video'){
          	if(node[property][i]['id'] == targetID){
          		node[property].splice(i, 1);
              return;
          	}
         	}else{
          	removeVideoHelper(node[property][i]);
         	}
        }
      }
    }
  }

  removeVideoHelper(root);
}




YTFileTree.prototype.removeTimemark = function(timemark, root){

  console.log("trying to delete: ");
  console.log(timemark);

  function removeTMHelper(node){
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        for(var i = 0; i < node[property].length; i++){
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
            removeTMHelper(timemark, node[property][i]);
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
  console.log(timemark);

  function insertHelper(node){
    console.log("node: " + node['children'].length);
    console.log(node);
    var ret = false;
    //go through the node, check if the children are videos, if they are check them
    for(property in node){
      if(property == 'children'){
        for(var i = 0; i < node[property].length; i++){
          console.log(" -- ");
          console.log(node[property][i]);
          //if this is the video, we want to insert
          if(node[property][i]['type'] == 'video'){
            if(node[property][i]['id'] == timemark['id']){
              var inserted = false;
              for(var j = 0; j < node[property][i]['timemarks'].length; j++){
                if(convertHMStoS(node[property][i]['timemarks'][j]['time']) > convertHMStoS(timemark['time'])){
                  node[property][i]['timemarks'].splice(j, 0, timemark);
                  inserted = true;
                  j = node[property][i]['timemarks'].length;
                }else if(convertHMStoS(node[property][i]['timemarks'][j]['time']) == convertHMStoS(timemark['time'])){
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
            ret |= insertHelper(timemark, name, node[property][i]);
          }
        }
      }
    }

    //Post insertion checks, insert at root
    if(node == null){
    	return false;
    }
    if(node['name'] == "root" && ret == false){
      console.log(" rebuilding the same time mark!");
    	var videoObj = {
      	"type" : "video",
        "name" : name,
        "timemarks" : [timemark],
        "id" : timemark['id']
      };

      node['children'].push(videoObj);
    }
  }

  insertHelper(root);

}
