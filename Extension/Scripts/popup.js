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


var appStorage = new YTStorage();

// Creation of the EventFacade class
var EF = new YTEventFacade();

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
  document.getElementById( "timeField" ).value = val;
  time = val;
  console.log( time );
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
 * updates the popup title
 * @param url
 */
 function updateVideoTitle(val){
   var elem = document.getElementById("actionHeader");
   if(val.indexOf("watch?v=") != -1){
     elem.innerHTML = "Timestamp Added!";
   }else{
     elem.innerHTML = "No YouTube Video!";
   }
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

function getData(){
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

  getDescription();
}

function injectScript(){
  chrome.tabs.executeScript(null, {file: "Scripts/content.js"});
}

function updateHeader(url){
  var elem = document.getElementById("actionHeader");
  if(url == "ERROR"){
    elem.innerHTML = "No YouTube Video!";
    return false;
  }else{
    elem.innerHTML = "Timemark Saved!";
    return true;
  }
}

function getDescription(){
  desc = document.getElementById("descriptionField");
}

//saveInfo blocks a thread until the information has been accumulated
//this is usually about 25 ms. This is the safest way to do this though
function saveInfo(){
  if(title == "swag" || time == "swag" || id == "swag" || desc == "swag" || url == "swag"){
    console.log(" -!- timing out for 1ms...");
    setTimeout(saveInfo, 1);
    return;
  }
  var currentURL = buildURL();

  if(!updateHeader(currentURL)){
    return;
  }

  /*console.log({'id': id});
  console.log({'title': title});
  console.log({'time': time});
  console.log({'currentURL': currentURL});
  console.log({'desc': desc});
*/

  tm = new YTTimemark(id, title, time, currentURL, desc);

  console.log("SAVEINFO: title: " + title + " | time: " + time);

  //saves the timemark to the sync storage
  appStorage.save(tm);
}

//************************

/*
 * Main code
 */

injectScript();
getData();

console.log("title: " + title);
console.log("desc: " + desc);
console.log("time: " + time);
console.log("id: " + id);
console.log("url: " + url);
if(title == "swag" || desc == "swag" || time == "swag" || id == "swag" || url == "swag"){
  setTimeout(function(){}, 1);
  injectScript();
  getData();

  console.log(" - title: " + title);
  console.log(" - desc: " + desc);
  console.log(" - time: " + time);
  console.log(" - id: " + id);
  console.log(" - url: " + url);
}

//Builds current time URL by convert HH:MM:SS format to seconds and
//concat it to the video url.
function buildURL() {
  if(time == -1){
    return "ERROR";
  }
  console.log("time: ");
  console.log(time);
  var t = time.split(':');
  var seconds;
  if(t.length == 3) {
     seconds = t[0]*3600+t[1]*60+t[2]*1;
  }
  else if(t.length == 2) {
    seconds = t[0]*60+t[1]*1;
  }
  var newURL = "https://www.youtube.com/watch?v=";
  newURL = newURL.concat(id);
  newURL = newURL.concat('&t=');
  newURL = newURL.concat(seconds);
  return newURL;
}

//the timemark variable
var tm;

saveInfo(); //thread created

document.addEventListener('DOMContentLoaded', function () {

  //handles the clicking of the manager button in the popup
  var managerButton = document.getElementById('managerButton');
  managerButton.addEventListener('click', function(){
    chrome.tabs.create({active: true, url: chrome.extension.getURL('manager.html')});
  });

  //if the done button is clicked, that means we need to update the description
  var doneButton = document.getElementById('doneButton');
  doneButton.addEventListener('click', function(){
    //console.log("timark info: " + timemark.getTitle() + " | " + timemark.getTime());
    desc = document.getElementById("descriptionField").value;
    tm.setDescription(desc);
    appStorage.save(tm);

    //close the window
    console.log("trying to close window!");
    window.close();
    console.log("wtf close you bastard");
  });
});
