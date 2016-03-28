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

  //save button code
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', function(){
    var elem = document.getElementById('saveButton');
    if(elem.value == 'Save'){
      elem.value='Saved :)';
      return;
    }
    elem.value = 'Save';
  }, false);

  //edit button code
  var editButton = document.getElementById('editButton');
  editButton.addEventListener('click', function(){
    var elem = document.getElementById('editButton');
    if(elem.value == 'Edit'){
      elem.value='Edited! :)';
    }else{
      elem.value = 'Edit';
    }
  }, false);
}, false);
