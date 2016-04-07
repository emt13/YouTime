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
var url = "swag";

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
 * Gets the URL of the video
 * @param the video url
 */
function videoURL(val) {
  url = val;
}

/*
 * Saves a timemark by checking if it has a video object already
 * if not then it creates one and stores everything properly.
 * @param st stamp
 * @param tm
 */
function saveTimemark(st,tm) {
  var found = findTimemark(st,tm);
  if(found == "false") {
    var save = "false";
    for(vid in st.getVideos()) {
      var id2 = vid.getID();
      if(id == id2) {
        vid.add(tm);
	save = "true";
	break;
      }
    }
    if(saved == "false") {
      var video = new Video(tm);
      st.add(video);
    }
  }
}

/*
 * checks if timemark already exists
 * @param st Stroage
 * @param tm timemark
function findTimemark(st,tm) {
  var found = "false";
  for(vid in st.getVideos()) {
    if(vid.getID() == id) {
      for(links in vid.timemarks) {
         if(link.getURL() == url) {
	   found == "true";
	 }
      }
    }
  }
  return found;
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

// Get video URL
EF.getURL( videoURL );

//Builds current time URL by convert HH:MM:SS format to seconds and
//concat it to the video url.
function buildURL(time,url) {
  var t = time.split(':');
  var seconds;
  if(t.length == 3) {
     seconds = t[0]*3600+t[1]*60+t[2]*1;
  }
  else if(t.length == 2) {
    seconds = t[0]*60+t[1]*1;
  }
  var newURL = url;
  newURL = newURL.concat('&');
  newURL = newURL.concat(seconds);
  console.log(" newURL = " + newURL);
  return newURL;
}

var tm;

function saveInfo(){
  if(title == "swag" || time == "swag" || id == "swag" || desc == "swag" || url == "swag"){
    console.log(" -!- timing out for 1ms...");
    setTimeout(saveInfo, 1);
    return;
  }
  var currentURL = buildURL(time,url);
  tm = new Timemark(id, title, time, currentURL);
  //addTimemark(tm);
  console.log("SAVEINFO: title: " + title + " | time: " + time);

  //var idStr = '' + id;

  var obj = {};
  obj[id] = [title, time, currentURL];

  chrome.storage.sync.set(obj, function(){
    console.log("saved shit");
    chrome.storage.sync.get(id, function(data){
      console.log("data", data);
    });
  });

  //console.log(" manager.html: " + chrome.extension.getURL('manager.html'));
}

saveInfo(); //thread created

//var st = new Storage();

//saveTimemark(st, tm);

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
