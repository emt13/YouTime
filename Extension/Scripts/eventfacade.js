//basically the constructor to this class
function EventFacade()
{
  //find some way to make this private!
  //because this is asynchronous, need a callback to manipulate the data that is recieved
  this.sendEvent = function(message, callback){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("sending pause");
      //send the active tab a message trying to pause the video
      chrome.tabs.sendMessage(tabs[0].id, {action: message}, function(response) {
        console.log("response = " + response);
        //call the callback function
        callback(response);
      });
    });
  }
}

//gets the time and uses the call back to manipulate it
EventFacade.prototype.getTime = function( callback )
{
  this.sendEvent("YTgetTime", callback);
}

EventFacade.prototype.pauseVideo = function()
{
  //passes a dummy callback. Client doesn't need to know this
  this.sendEvent("YTpauseVideo", function(val){});
}

EventFacade.prototype.getTitle = function( callback )
{
  this.sendEvent("YTgetTitle", callback);
}

EventFacade.prototype.getVideoID = function( callback )
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var videoURL = tabs[0].url;
    callback(videoURL);
  });
}
