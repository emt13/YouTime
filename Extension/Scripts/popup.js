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
var time = "cool";

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
  time = val;
  //console.log( "timemark = " + timemark.getTime() );
}

/**
 * Output video id to the console
 * @param video id
 */
function useVideoID(val) {
  console.log( "videoID = " + val );
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

function saveInfo(){
  if(title == "swag" || time == "cool"){
    console.log(" -!- timing out for 1ms...");
    setTimeout(saveInfo, 1);
    return;
  }
  console.log("SAVEINFO: title: " + title + " | time: " + time);
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
