/**
 * This is the script injected into popup.html
 * via a dynamic <script> tag. It serves as
 * the main entry point to the extension logic.
 * It does not have access to any of the
 * chrome.* APIs.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

var title = "swag";
var time = "swag";
var desc = "swag";
var id = "swag";

/**
 * Sets the name field to the value.
 * @param title
 */
function setTitle(val) {
  document.getElementById( "nameField" ).value = val;
  title = val;
  //console.log( "timemark = " + timemark.getTitle() );
}

/**
 * Sets the description field to the value.
 * @param description
 */
function setTime(val) {
  document.getElementById( "descriptionField" ).value = val;
  desc = val;
  time = val;
  //console.log( "timemark = " + timemark.getTime() );
}

/**
 * Output video id to the console
 * @param video id
 */
function useVideoID(val) {
  id = val;
  console.log( "videoID = " + val );
}

/**
 * Creates timemark based on the information provided by the EventFacade.
 * Checks to see if timemark has been created before.
 * @param EF EventFacade
 * @param Storage object holding all links and videos
 */
function createTimemark(EF, Storage) {
  var url = EventFacade.createUrl();
  var Timemark = new Timemark();
  Timemark.url = url;
  Timemark.id = EF.getVideoId(useVideoID);
  Timemark.title = EF.getTitle(setTitle);
  Timemark.time = EF.getTime(setTime);
  //Timemark.description
  if(findTimemark(Timemark,Storage) == "false") {
     saveTimemark(Storage,Timemark);
  }
}

/*
 * finds if a timemark has been created before
 * @param Storage
 * @param Timemark
 */
function findTimemark(Storage, Timemark) {
  var found = "false";
  for( video in Storage.videos ) {
     if( video.id == Timemark.id ) {
     	for( links in video.timemarks ) {
	       if( link.url == Timemark.url ) {
	          found = "true";
	       }
	    }
    }
  }
  return found;
}

/*
 * Saves a timestamp by checking if it has a video object already
 * if not then it creates one and stores everything properly.
 * @param Timemark
 * @param Storage
 */
function createVideo(Storage, Timestamp) {
  var save = "false";
  var id = Timestamp.getID();
  for( vid in Storage.videos) {
    var id2 = vid.id;
    if( id2 == id ) {
      vid.timemarks.push(Timestamp);
      save = "true";
      break;
    }
  }
  if( saved == "false" ) {
    var video = Video(Timemark.id,Timemark.title);
    Storage.videos.push(video);
  }
}
//************************

/*
 * Main code
 */
// Creation of the EventFacade class
var EF = new EventFacade();

// Pauses a video
EF.pauseVideo();

// Gets the title and handles it according to the callback function provided
EF.getTitle( setTitle );

// Gets the time and handles it according to the callback function provided
EF.getTime( setTime );

// Get the video id
EF.getVideoID( useVideoID );

/*while(title == "swag" || time == "cool"){
  console.log("title: " + title + " | time: " + time);
}*/

var tm;

function saveInfo(){
  if(title == "swag" || time == "swag" || id == "swag" || desc == "swag"){
    console.log(" -!- timing out for 1ms...");
    setTimeout(saveInfo, 1);
    return;
  }
  tm = new Timemark(id, title, time, id);
  console.log("SAVEINFO: title: " + title + " | time: " + time);

  //var idStr = '' + id;

  var obj = {};
  obj[id] = [title, time, id];

  chrome.storage.sync.set(obj, function(){
    console.log("saved shit");
    chrome.storage.sync.get(id, function(data){
      console.log("data", data);
    });
  });

  chrome.storage.sync.get({ })
  //console.log(" manager.html: " + chrome.extension.getURL('manager.html'));
}

saveInfo(); //thread created

/*setTimeout(function(){
  console.log("title: " + title + " | time: " + time);
}, 5);*/

document.addEventListener('DOMContentLoaded', function () {
  var managerButton = document.getElementById('managerButton');
  managerButton.addEventListener('click', function(){
    chrome.tabs.create({active: true, url: chrome.extension.getURL('manager.html')});
  });

  var doneButton = document.getElementById('doneButton');
  doneButton.addEventListener('click', function(){
    console.log("timark info: " + timemark.getTitle() + " | " + timemark.getTime());
  });
});
