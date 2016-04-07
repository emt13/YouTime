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

/*$(".share").on("click", function(e) {
    e.preventDefault();
    $(this).parent().remove();
});*/

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
}

chrome.storage.sync.get(null, function(items){
  var allKeys = Object.keys(items);
  console.log(allKeys);

  populatePage(allKeys);

});
