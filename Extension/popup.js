document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function(){
    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);

  //extract button code. extracts url and puts in text field
  var extractButton = document.getElementById('extractButton');
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
  }, false);
}, false);
