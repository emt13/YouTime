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

/**
 * Function that displays an alert message
 * to prompt a user to copy and paste an URL
 * @param url the URL of the timelink
 */
function shareFunction(url) {
  var shareAlert = "Copy/Paste this link: " + url;
  window.alert(shareAlert);
}


// Variable Representing Our Manager class
var manager = new YTManager(document);

// Listener for the loading of the Manager page
// When page is loaded, this listener populates the HTML
// so that the timlinks appear in the mamanger
document.addEventListener('DOMContentLoaded', function () {
  //send the root of our file tree to the manager
  chrome.storage.sync.get('fstoreRoot', manager.populatePage);

  //button used to create a new folder at root
  var newFolderButton = document.getElementById('newFolderROOT');

  newFolderButton.addEventListener('click', function(){
    var folderName = window.prompt("Please enter new folder name");

    if(folderName == null){
      return;
    }

    if(folderName == "root"){
      window.alert("ERROR: Cannot use \"root\" as a file name!");
      return;
    }

    //store the requested folder
    var appStorage = new YTStorage();
    appStorage.createFolder(folderName, "root");

    window.location.reload();
  });

  var clearButton = document.getElementById('clearButton');
    // Povides the clear button with its functionality
    // to remove all Timemarks
	clearButton.addEventListener('click', function() {
    chrome.storage.sync.clear();
    var newFolder = document.getElementById("newFolderROOT");
    newFolder.setAttribute("class", newFolder.getAttribute("class").replace(" disabled", ""));
    window.location.reload();
    console.log("timemarks cleared");
  });
});
