function YTStorage() {
  this.latestTM = "";

  /*this.checkDuplicateTimemark = function(arr, tm){
    for (var i = 0; i < arr.length; i++) {
      var other = arr[i];
      if(other.getTime() == tm.getTime()){
        return true;
      }
    }
    return false;
  }*/

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

YTStorage.prototype.save = function(tm)
{
  var id = tm.getId();
  var title = tm.getTitle();
  var url = tm.getUrl();
  var time = tm.getTime();
  var desc = tm.getDescription();
  var tmObj = {id, url, time, desc};
  chrome.storage.sync.get(id, function(ret){
    console.log(ret);
    if(ret[id] == null){
      console.log("Adding new video! " + id);

      //need to create new video obj
      var obj = {};

      var arr = {'title' : title, 'timemarks' : [ tmObj ] } ;
      obj[id] = arr;

      chrome.storage.sync.set(obj, function(){
        console.log("saved!");
        console.log(obj);
      });

    }else{
      //ret is the object that is returned by the call
      var arr = ret[id]['timemarks'];
      var inserted = false;
      //check if the array already contains the same timemark
      //Assume the arr is in order of ascending time.
      //if it passes the time, insert it at the previous index
      for (var i = 0; i < arr.length; i++) {
        var other = arr[i];
        console.log(other);
        //console.log(" -- Check time: " + convertHMStoS(other['time']) + " > " + convertHMStoS(tm.getTime()));
        if(other['time'] == tm.getTime()){
          console.log("timemark already exists at " + other['time'] + " for this video!");
          return;
        }
        if(convertHMStoS(other['time']) > convertHMStoS(tm.getTime())){
          console.log("saving timemark!");
          inserted = true;
          arr.splice(i, 0, tmObj);
          i = arr.length;
          break;
        }
      }

      if(!inserted){
        arr.push(tmObj);
      }

      //rebuild the json
      var obj = {};
      var data = {'title' : title, 'timemarks' :  arr };
      obj[id] = data;

      //store it in the chrome storage. Replaces the existing object with the
      //old timemark array in it
      chrome.storage.sync.set(obj, function(){
        console.log("Saved object: ");
        console.log(obj);
      });
    }
  });
}

/*Storage.prototype = {
  constructor: Storage,
  getVideos:function() { return this.videos; }
  add(video):function() {
    this.videos.push(video);
  }
}*/
