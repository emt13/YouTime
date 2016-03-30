var TIME_DESC_WIDTH = 29;

function setURL(document, field){
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function(arr) {
    var tab = arr[0];
    field.value = tab.url;
  });
}

function descriptionSizing(document){
  var timeField = document.getElementById('timeField');
  var descField = document.getElementById('descField');
  var elem = timeField.value;
  timeField.size = timeField.value.length;
  descField.size = TIME_DESC_WIDTH - timeField.size;
  descField.value = descField.size + ' - ' + timeField.size;
}

document.addEventListener('DOMContentLoaded', function() {
  descriptionSizing(document);
  var extractField = document.getElementById('extractField');
  setURL(document, extractField);


  //var extractField = document.getElementById('extractField');
  //extractField.value = getURL();

  //extract button code. extracts url and puts in text field
  /*var extractButton = document.getElementById('extractButton');
  extractButton.addEventListener('click', function(){
    var extractField = document.getElementById('extractField');
    //gets the active tab
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function(arr) {
      //using this to set the text field to the url
      var tab = arr[0];
      var url = tab.url;
      extractField.value=tab.url;
    });
  }, false);

  //save button code
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', function(){
    if(saveButton.value == 'Save'){
      saveButton.value='Saved :)';
      return;
    }
    saveButton.value = 'Save';
  }, false);

  //edit button code
  var editButton = document.getElementById('editButton');
  editButton.addEventListener('click', function(){
    if(editButton.value == 'Edit'){
      editButton.value='Edited! :)';
    }else{
      editButton.value = 'Edit';
    }
  }, false);*/
}, false);
