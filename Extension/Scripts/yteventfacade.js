/**
 * This script contains the YTEventFacade class, which
 * handles all events between the injected
 * popup.js and the content.js files.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

// Constructor to this class
function YTEventFacade()
{
  // TODO: Find some way to make this private!
  // Because this is asynchronous, need a callback to manipulate the data that is received
  this.sendEvent = function(message, callback) {
    chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
      console.log( "sending pause" );
      // Send the active tab a message trying to pause the video
      chrome.tabs.sendMessage( tabs[0].id, {action: message}, function(response) {
        console.log( "response = " + response );
        // Call the callback function
        callback(response);
      });
    });
  }
}

// Gets the time and uses the call back to manipulate it
YTEventFacade.prototype.getTime = function( callback )
{
  this.sendEvent( "YTgetTime", callback );
}
// sends a pause video message to the YouTube player
YTEventFacade.prototype.pauseVideo = function()
{
  // Passes a dummy callback. Client doesn't need to know this
  this.sendEvent( "YTpauseVideo", function(val){} );
}
// sends a message that gets the title of the video
YTEventFacade.prototype.getTitle = function( callback )
{
  this.sendEvent( "YTgetTitle", callback );
}
// gets the video ID from the URL
YTEventFacade.prototype.getVideoID = function( callback )
{
  //queries the tabs for the active, current one
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var videoURL = tabs[0].url;
    var indOfEq = videoURL.indexOf("=");
    var indEnd = videoURL.indexOf("&");
    if(indEnd == -1){
      indEnd = videoURL.length;
    }
    //sends the video id to the callback
    callback(videoURL.substring(indOfEq + 1, indEnd));
  });
}
// gets the whole URL
YTEventFacade.prototype.getURL = function( callback )
{
  //queries the tabs for the active, current one
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var videoURL = tabs[0].url;
    callback(videoURL);
  });
}
