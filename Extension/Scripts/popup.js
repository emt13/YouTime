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

//********

//sets the nameField to the value
function setTitle(val){
  document.getElementById('nameField').value = val;
}

//sets the description field to a value
function setTime(val){
  document.getElementById('descriptionField').value = val;
}

function useVideoID(val){
  console.log(" video id: " + val);
}

//************************

//creation of teh EventFacade class
var EF = new EventFacade();

//pauses a video
EF.pauseVideo();
//gets the title and handles it according to the callback function provided
EF.getTitle( setTitle );
//gets the time and handles it according to the callback function provided
EF.getTime( setTime );

EF.getVideoID( useVideoID );

document.addEventListener('DOMContentLoaded', function () {
  var managerButton = document.getElementById('managerButton');
  managerButton.addEventListener('click', function(){
    chrome.tabs.create({active: false, url: "https://www.youtube.com"});
  });
});
