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
 
var timemarks = []
 
function addTimemark(tm) {
  timemarks.push(tm);
  console.log("added timemark");
}

function populateList() {
  var tmlist = document.getElementById("timestampList");
  for (i = 0; i < timemarks.length; i++) {
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

addTimemark(new Timemark("1", "test", "1:52", "https://www.youtube.com"));

document.addEventListener('DOMContentLoaded', function () {
  populateList();
});