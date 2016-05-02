/**
 * Class that handles interactions with the file system.
 * Makes it simpler to save, remove, rename, and move timemarks/videos/folders
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */


//Constructor
function YTStorage() {
  this.latestTM = "";
}

/**
 * Function to convert the time of the video to seconds
 * @param str the time of the video in HMS format
 * @return the seconds elapsed of the video
 */
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

/**
 * Function to save a timemark to storage
 * @param tm the timemark to save
 */
YTStorage.prototype.save = function(tm)
{
  //basic logic behind saving a timemark
  function SaveLogic(fstoreObj){
    var fileTree = new YTFileTree(fstoreObj['fstoreRoot']);
    var root = fstoreObj['fstoreRoot'];
    fileTree.insertTimemark(tm, root);
    fstoreObj['fstoreRoot'] = root;
    chrome.storage.sync.set(fstoreObj, function(){
      console.log("Saved timemark to root!");
      console.log(fstoreObj['fstoreRoot']);
    });
  }

  //get the root from the sync storage
  chrome.storage.sync.get('fstoreRoot', function(ret){
    //if the root hasn't been created yet, add it
    if(ret['fstoreRoot'] == null){
      var rootObj = {};
      rootObj['fstoreRoot'] = {
        "type" : "folder",
        "name" : "root",
        "children" : []
      };
      chrome.storage.sync.set(rootObj, function(){
        console.log(" created root!");
        console.log(rootObj['fstoreRoot']);
        SaveLogic(rootObj);
      });
    }else{
      console.log(" successfully fetched root!");
      console.log(ret);
      SaveLogic(ret);
    }
  });
}

//removes the given timemark from the filesystem
YTStorage.prototype.removeTimemark = function(tm){

  //gets the root and then starts the removal
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.removeTimemark(tm, root);
    ret['fstoreRoot'] = root;
    chrome.storage.sync.set(ret, function(){
    });
  });
}

//removes a video by id from the filesystem
YTStorage.prototype.removeVideo = function(videoID){
  //get the root of the filesystem then proceed to remove the video
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.removeVideo(videoID, root);
    ret['fstoreRoot'] = root;
    //store the updated root
    chrome.storage.sync.set(ret, function(){
    });
  });
}

//removes a folder from the filesystem by name
YTStorage.prototype.removeFolder = function(folderName){
  //get the root of the filesystem and then proceed to remove the folder
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.removeFolder(folderName, root);
    ret['fstoreRoot'] = root;
    //store the updated root
    chrome.storage.sync.set(ret, function(){
    });
  });
}

//remames a folder in the file system
YTStorage.prototype.renameFolder = function(oldName, newName){
  //get the root of the file system
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.renameFolder(oldName, newName, root);
    ret['fstoreRoot'] = root;
    //store the updated root
    chrome.storage.sync.set(ret, function(){
    });
  });
}

//creates a folder at a target
YTStorage.prototype.createFolder = function(folderName, targetName){

  //get the root of the filesystem
  chrome.storage.sync.get('fstoreRoot', function(ret){
    //need to check if the root already exists, if not, create it
    if(ret['fstoreRoot'] == null){
      //the root of the actual object to be used
      var rootObj = {};
      rootObj['fstoreRoot'] = {
        "type" : "folder",
        "name" : "root",
        "children" : []
      };
      ret = rootObj;
    }

    //once the root has been created, insert the folder
    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.createFolderAtPoint(folderName, targetName, root);
    ret['fstoreRoot'] = root;
    //store the updated root
    chrome.storage.sync.set(ret, function(){
      console.log("Removed Video from Root!");
      console.log(ret['fstoreRoot']);
    });

  });
}

YTStorage.prototype.moveElement = function(sourceName, destinationName){
  //get the root of the filesystem then proceed to remove the video
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.moveObjectToFolder(sourceName, destinationName, root);
    ret['fstoreRoot'] = root;
    //store the updated root
    chrome.storage.sync.set(ret, function(){
    });
  });
}
