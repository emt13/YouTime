console.log("popup.js seen");

//sets the nameField to the value
function setTitle(val){
  document.getElementById('nameField').value = val;
}

//sets the description field to a value
function setTime(val){
  document.getElementById('descriptionField').value = val;
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

var ret = EF.getVideoID();
console.log(" video id: " + ret);
