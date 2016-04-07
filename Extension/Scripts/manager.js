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

function shareFunction(url) {
  var shareAlert = "Copy/Paste this link: " + url;
  window.alert(shareAlert);
}

function populateList(timemarks) {
  console.log(timemarks);
  var sortedKeys = Object.keys(timemarks).sort();
  console.log(" obj: " + sortedKeys.length);
  var tmlist = document.getElementById("timestampList");
  for(i = 0; i < sortedKeys.length; i++){
    var sortedKeys = Object.keys(timemarks).sort();
    console.log(" obj length: " + timemarks[sortedKeys[i]].length);
    var li = document.createElement("li");
    var a = document.createElement("a");
    var tm = timemarks[sortedKeys];
    a.setAttribute("href", timemarks[sortedKeys[i]][2]);
    var hyperlink = timemarks[sortedKeys[i]][0] + " - " + timemarks[sortedKeys[i]][1];
    a.appendChild(document.createTextNode(hyperlink));
    li.appendChild(a);
    var shareButton = document.createElement("BUTTON");
    shareButton.appendChild(document.createTextNode("Share"));
    shareButton.setAttribute("url", timemarks[sortedKeys[i]][2]);
    shareButton.addEventListener("click", function() {
      //var shareAlert = "Copy/Paste this link: " + this.getAttribute("url");
      window.prompt("Ctrl + C to copy this link:", this.getAttribute("url"));
      //window.alert(shareAlert);
    }, false);
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
