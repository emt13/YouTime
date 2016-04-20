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

function shareFunction(url) {
  var shareAlert = "Copy/Paste this link: " + url;
  window.alert(shareAlert);
}

//Populates the page with the timemark information
/*function populateList(timemarks) {
  console.log(timemarks);
  var sortedKeys = Object.keys(timemarks).sort();
  console.log(" obj: " + sortedKeys.length);
  var tmlist = document.getElementById("timestampList");
  for(i = 0; i < sortedKeys.length; i++){
    var sortedKeys = Object.keys(timemarks).sort();
    console.log(" obj length: " + timemarks[sortedKeys[i]].length);

    //creating a list element
    var li = document.createElement("li");
    var a = document.createElement("a");
    var tm = timemarks[sortedKeys];

    //sets the href to the youtube link
    a.setAttribute("href", timemarks[sortedKeys[i]][2]);
    var hyperlink = timemarks[sortedKeys[i]][0] + " - " + timemarks[sortedKeys[i]][1];
    a.appendChild(document.createTextNode(hyperlink));
    li.appendChild(a);

    //creates the share button. Adds a listener that allows you to copy the link
    var shareButton = document.createElement("BUTTON");
    shareButton.appendChild(document.createTextNode("Share"));
    shareButton.setAttribute("url", timemarks[sortedKeys[i]][2]);
    shareButton.addEventListener("click", function() {
      window.prompt("Ctrl + C to copy this link:", this.getAttribute("url"));
    }, false);

    li.appendChild(shareButton);

    var removeButton = document.createElement("BUTTON");
    removeButton.appendChild(document.createTextNode("Remove"));
    removeButton.setAttribute("timemark", timemarks[sortedKeys[i]]);
    removeButton.setAttribute("id", sortedKeys[i]);
    removeButton.addEventListener("click", function() {
      chrome.storage.sync.remove(this.getAttribute("id"));
      window.location.reload();
      console.log("removed");
    });

    li.appendChild(removeButton);
    tmlist.appendChild(li);
    console.log("populated list");
  }

}*/

var manager = new YTManager(document);


document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(null, manager.populatePage);

  var clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', function() {
    chrome.storage.sync.clear();
    window.location.reload();
    console.log("timemarks cleared");
  });
});
