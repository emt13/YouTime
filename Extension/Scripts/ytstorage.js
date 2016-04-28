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

/*function checkRoot(obj){
  if(obj == null){
    setTimeout(function(){}, 1);
    checkRoot(obj);
  }
}*/

/**
 * Function to save a timemark to storage
 * @param tm the timemark to save
 */
YTStorage.prototype.save = function(tm)
{

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

YTStorage.prototype.removeTimemark = function(tm){
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    console.log("driver function:");
    console.log(tm);
    fileTree.removeTimemark(tm, root);
    ret['fstoreRoot'] = root;
    chrome.storage.sync.set(ret, function(){
    });
  });
}

YTStorage.prototype.removeVideo = function(videoID){
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.removeVideo(videoID, root);
    ret['fstoreRoot'] = root;
    chrome.storage.sync.set(ret, function(){
    });
  });
}

YTStorage.prototype.removeFolder = function(folderName){
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }
    console.log("trying to remove: " + folderName);
    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.removeFolderAtPoint(folderName, root);
    ret['fstoreRoot'] = root;
    chrome.storage.sync.set(ret, function(){
    });
  });
}


YTStorage.prototype.renameFolder = function(oldName, newName){
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.renameFolder(oldName, newName, root);
    ret['fstoreRoot'] = root;
    chrome.storage.sync.set(ret, function(){
      console.log("Removed Video from Root!");
      console.log(ret['fstoreRoot']);
    });
  });
}


YTStorage.prototype.createFolder = function(folderName, targetName){
  chrome.storage.sync.get('fstoreRoot', function(ret){
    if(ret['fstoreRoot'] == null){
      console.log("ERROR: fstoreRoot could not be found!" );
      return;
    }

    var fileTree = new YTFileTree(ret['fstoreRoot']);
    var root = ret['fstoreRoot'];
    fileTree.createFolderAtPoint(folderName, targetName, root);
    ret['fstoreRoot'] = root;
    chrome.storage.sync.set(ret, function(){
      console.log("Removed Video from Root!");
      console.log(ret['fstoreRoot']);
    });
  });
}
