/**
 * This script contains the EventFacade class, which
 * handles all events between the injected
 * popup.js and the content.js files.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

// Constructor to this class
function EventFacade()
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
EventFacade.prototype.getTime = function( callback )
{
  this.sendEvent( "YTgetTime", callback );
}

EventFacade.prototype.pauseVideo = function()
{
  // Passes a dummy callback. Client doesn't need to know this
  this.sendEvent( "YTpauseVideo", function(val){} );
}

EventFacade.prototype.getTitle = function( callback )
{
  this.sendEvent( "YTgetTitle", callback );
}

EventFacade.prototype.getVideoID = function( callback )
{
  chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
    var videoURL = tabs[0].url;
    callback( videoURL );
  });
}