console.log("popup.js seen");

//ping YouTube with a pause message
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  console.log("sending pause");
  //send the active tab a message trying to pause the video
  chrome.tabs.sendMessage(tabs[0].id, {action: "YTpauseVideo"}, function(response) {
    console.log(response);
  });
});

//ping YouTube with the YTgetTitle message
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //send the active tab a message asking for the title of the video
  chrome.tabs.sendMessage(tabs[0].id, {action: "YTgetTitle"}, function(response) {
    console.log(response);
    //set the value in the popup.html
    document.getElementById('nameField').value = response;
  });
});

//ping YouTube with the YTgetTime message
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //send the active tab a message asking for the title of the video
  chrome.tabs.sendMessage(tabs[0].id, {action: "YTgetTime"}, function(response) {
    console.log(response);
    //set the value in the popup.html
    document.getElementById('descriptionField').value = response;
  });
});
