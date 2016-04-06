/**
 * This is the content script, which receives and
 * sends messages from the injected popup.js script.
 * It has partial access to some of the chrome.* APIs.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

/**
 * This function pauses the video.
 * @return true if video is found, false otherwise
 */
function pauseVideo() {
  var video = document.getElementsByTagName( "video" )[0];
  if( video != null ) {
    video.pause();
    return true;
  }
  return false;
}

/**
 * This function converts seconds to an h:m:s format.
 * @param s - number of seconds
 * @return the h:m:s equivalent
 */
function secondsTimeSpanToHMS(s) {
  s = Math.floor( s );
  var h = Math.floor( s/3600 ); // Hours
  s -= h*3600;
  var m = Math.floor( s/60 ); // Minutes
  s -= m*60;

  // Add zero padding
  return ( h == 0 ? "" : h + ":" ) +
         ( h != 0 && m < 10 ? "0" + m : m ) + ":" +
         ( s < 10 ? "0" + s : s );
}

/**
 * This function returns the video title.
 * @return the title
 */
function getTitle() {
  return document.getElementById( "eow-title" ).title;
}

/**
 * This function returns the video player time.
 * @return the h:m:s video time
 */
function getTime() {
  var video = document.getElementsByTagName( "video" )[0];
  if( video != null ) {
    var s = video.currentTime;
    return secondsTimeSpanToHMS( s );
  }
  return -1;
}

// Add a listener for messages from popup.js
chrome.runtime.onMessage.addListener (
  function( request, sender, sendResponse ) {
    switch( request.action ) {
      case "YTpauseVideo":
        var response = pauseVideo();
        sendResponse( response );
        break;
      case "YTgetTitle":
        var response = getTitle();
        sendResponse( response );
        break;
      case "YTgetTime":
        var response = getTime();
        sendResponse( response );
        break;
      default:
        console.error( "(YouTime) Unrecognized message: ", request );
    }
  }
);
