/**
 * This script contains the
 * This is the script injected into manager.html
 * via a dynamic <script> tag. It serves as
 * the main logic for the timemark manager and organizer.
 * It does not have access to any of the
 * chrome.* APIs.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-06
 */

/*
function populatePage(allKeys){
  for(i = 0; i < allKeys.length; i++){
    chrome.storage.sync.get(allKeys[i], function(items){
      //var btn = document.createElement("Button");

      console.log(items.allKeys[i]);
      var btn = document.createElement('a');
      document.body.appendChild(btn);

      //btn.appendChild(document.createTextNode(items[0]));
      //document.body.appendChild(btn);
    });
  }
>>>>>>> timemarkSave
}
*/
//chrome.storage.sync.get(null, function(items){
//  var allKeys = Object.keys(items);
//  console.log(allKeys);

  //populatePage(allKeys);

//});

 //var timemarks = []

//function addTimemark(tm) {
//  timemarks.push(tm);
//}

function populateList(timemarks) {
  console.log(timemarks);
  var tmlist = document.getElementById("timestampList");
  for(i = 0; i < timemarks.length; i++){
    var sortedKeys = Object.keys(timemarks).sort();
    console.log(" obj: " + timemarks[sortedKeys]);
    var li = document.createElement("li");
    var a = document.createElement("a");
    var tm = timemarks[i];
    a.setAttribute("href", tm.getUrl());
    var hyperlink = tm.getTitle() + " - " + tm.getTime();
    a.appendChild(document.createTextNode(hyperlink));
    li.appendChild(a);
    var shareButton = document.createElement("BUTTON");
    shareButton.appendChild(document.createTextNode("Share"));

    li.appendChild(shareButton);
    tmlist.appendChild(li);
    console.log("populated list");
  }

}

document.addEventListener('DOMContentLoaded', function () {
  /*chrome.storage.sync.get(null, function(items){
    var allKeys = Object.keys(items);
    console.log(allKeys);

    populatePage(allKeys);

  });*/
  chrome.storage.sync.get(null, populateList);
});
