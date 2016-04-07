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

/**
 * Sets the name field to the value.
 * @param title
 */
function setTitle(val) {
  document.getElementById( "nameField" ).value = val;
  timemark.setTitle( val );
  console.log( "timemark = " + timemark.getTitle() );
}
/**
 * Sets the description field to the value.
 * @param description
 */
function setTime(val) {
  document.getElementById( "descriptionField" ).value = val;
  timemark.setTime( val );
  console.log( "timemark = " + timemark.getTime() );
}

/**
 * Output video id to the console
 * @param video id
 */
function useVideoID(val){
  console.log(" video id: " + val);
}

//************************


/*
 * Main code
 */
// Creation of the EventFacade class
var EF = new EventFacade();

// Create a new timemark
var timemark = new Timemark();

// Pauses a video
EF.pauseVideo();

// Gets the title and handles it according to the callback function provided
EF.getTitle( setTitle );

// Gets the time and handles it according to the callback function provided
EF.getTime( setTime );

EF.getVideoID( useVideoID );

document.addEventListener('DOMContentLoaded', function () {
  var managerButton = document.getElementById('managerButton');
  managerButton.addEventListener('click', function(){
    chrome.tabs.create({active: false, url: "https://www.youtube.com"});
  });
});
