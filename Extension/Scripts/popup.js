/**
 * This is the script injected into popup.html
 * via a dynamic <script> tag. It serves as
 * the main entry point to the extension logic.
 * It does not have access to any of the
 * chrome.* APIs.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

// Ping YouTube with a pause message, YTpauseVideo
chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
  console.log("sending pause");
  // Send the active tab a message trying to pause the video
  chrome.tabs.sendMessage( tabs[0].id, {action: "YTpauseVideo"}, function(response) {
    console.log(response);
  });
});

// Ping YouTube with the title message, YTgetTitle
chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
  // Send the active tab a message asking for the title of the video
  chrome.tabs.sendMessage( tabs[0].id, {action: "YTgetTitle"}, function(response) {
    console.log(response);
    // Set the value in the popup.html
    document.getElementById( "nameField" ).value = response;
  });
});

// Ping YouTube with the time message, YTgetTime
chrome.tabs.query( {active: true, currentWindow: true}, function(tabs) {
  // Send the active tab a message asking for the title of the video
  chrome.tabs.sendMessage( tabs[0].id, {action: "YTgetTime"}, function(response) {
    console.log(response);
    // Set the value in the popup.html
    document.getElementById( "descriptionField" ).value = response;
  });
});