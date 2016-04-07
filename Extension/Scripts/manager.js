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
    a.setAttribute("href", tm.url);
    li.appendChild(a);
    var hyperlink = tm.title & " - " & tm.time;
    li.appendChild(document.createTextNode());
    tmlist.appendChild(li);
    console.log("populated list");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  populateList();
});