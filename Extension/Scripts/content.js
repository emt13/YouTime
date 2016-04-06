

function getYTPlayer(){
  //console.log(document.getElementById('movie_player'));
  return document.getElementById('movie_player');
  //return document.getElementsByTagName("video")[0];
}

function getTime(){
  var ytplayer = getYTPlayer();
  if(ytplayer != null){
    return document.getElementsByTagName("video")[0].currentTime;
  }
  return -1;
}

function pauseVideo(){
  var video = document.getElementsByTagName("video")[0];
  if(video){
    video.pause();
    return true;
  }
  return false;
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse){
    switch(message.action){
      case "YTpauseVideo":
        pauseVideo();
        sendResponse(pauseVideo());
        break;
      case "YTgetTitle":
        sendResponse(document.getElementById('eow-title').title);
        break;
      case "YTgetTime":
        sendResponse(getTime());
        break;
      default:
        console.error("(YouTime) Unrecognized messaged: ", message);
    }
  }
);
