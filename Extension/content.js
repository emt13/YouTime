function getYTPlayer(){
  console.log(document.getElementById('movie_player'));
  return document.getElementById('movie_player');
}

function getTime(){
  var ytplayer = getYTPlayer();
  if(ytplayer != null){
    console.log(document.getElementsByClassName('ytp-progress-bar')[0].attributes[6].value);
    return ytplayer.getElementsByClassName('ytp-progress-bar')[0].attributes[6].value;
  }
  return -1;
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse){
    switch(message.action){
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
