function YTManager(doc) {
  console.log("Created the manager!");
  this.document = doc;
}

YTManager.prototype.populatePage = function(timemarks){
  console.log(timemarks);

  var sortedKeys = Object.keys(timemarks).sort();
  for(var i = 0; i < sortedKeys.length; i++){
    console.log(sortedKeys[i]);
    var video = new YTVideo(timemarks[sortedKeys[i]]);
    console.log(" -- video:");
    console.log(video);

    var vid = document.createElement("div");
    vid.setAttribute("class", "accordian");

    vid.appendChild( document.createTextNode(video.getTitle()) );

    document.body.appendChild( vid );

  }


  /*console.log(timemarks);
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
  }*/

}
