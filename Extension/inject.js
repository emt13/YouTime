//gets the player div
function getYTPlayer(){
  return document.getElementById('movie_player');
}
//gets the last displayed time on the progress bar. Need to figure out a way to get the actual value
function getTime(){
  var ytplayer = getYTPlayer();
  if(ytplayer != null){
    //navigate to the data in the html
    console.log(document.getElementsByClassName('ytp-progress-bar')[0].attributes[6].value);
    return ytplayer.getElementsByClassName('ytp-progress-bar')[0].attributes[6].value;
  }
  return -1;
}

function pauseVideo(){
  console.log("...pausing video!");
}

//working on this function to get the percent done
/*function getPercentDone(){
  var ytplayer = getYTPlayer();
  if(ytplayer != null){
    player = new YT.player(document.getElementById('movie_player'));
    return player.getCurrentTime();
  }
  return -1;
}*/

//listeners that are installed in the YouTube video page
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse){
    console.log(" - " + message.action);
    switch(message.action){
      case "YTpauseVideo":
        pauseVideo();
        break;
      case "YTgetPercentDone":
        //sends a message back to the sender
        sendResponse(getPercentDone());
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
