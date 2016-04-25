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

	var removeButton =  document.createElement("BUTTON");
    removeButton.appendChild(document.createTextNode("Remove"));
    removeButton.setAttribute("video", timemarks[sortedKeys[i]]);
    removeButton.setAttribute("id", sortedKeys[i]);
    removeButton.addEventListener("click", function() {
      chrome.storage.sync.remove(this.getAttribute("id"));
      window.location.reload();
      console.log("removed");
    });

    vid.appendChild(removeButton);


    var tmlist = document.createElement("ul");

    var marks = video.getTimemarks();

    for(var j = 0; j < marks.length; j++) {
      var mark = marks[j];
      var li = document.createElement("li");
      var a = document.createElement("a");

      //sets the href to the youtube link
      a.setAttribute("href", mark['url']);
      var hyperlink = mark['time'] + " - ";
      if(mark['desc'] != null){
        hyperlink = hyperlink + mark['desc'];
      }else{
        hyperlink = hyperlink + " < No Description >";
      }
      a.appendChild(document.createTextNode(hyperlink));
      li.appendChild(a);

      //creates the share button. Adds a listener that allows you to copy the link
      var shareButton = document.createElement("BUTTON");
      shareButton.appendChild(document.createTextNode("Share"));
      shareButton.setAttribute("url", mark['url']);
      shareButton.addEventListener("click", function() {
        window.prompt("Ctrl + C to copy this link:", this.getAttribute("url"));
      }, false);

      li.appendChild(shareButton);

	    var removeTime = document.createElement("BUTTON");
      removeTime.appendChild(document.createTextNode("Remove"));
      //store information in the remove button (holds information to be used in the click callback)
      removeTime.setAttribute("timemark", mark);
      removeTime.setAttribute("time", mark['time']);
      removeTime.setAttribute("id", mark['id']);
      removeTime.addEventListener("click", function() {
        //go through all of the keys and check if the id is correct
        for(var i = 0; i < sortedKeys.length; i++) {
          if(sortedKeys[i] == this.getAttribute("id")) {
            var removedTime = this.getAttribute("time");

            //find the correct timemark and then remove it
            for(var j = 0; j < timemarks[sortedKeys[i]]['timemarks'].length; j++) {
              if(timemarks[sortedKeys[i]]['timemarks'][j]['time'] == removedTime) {
                timemarks[sortedKeys[i]]['timemarks'].splice(j,1);
                if(timemarks[sortedKeys[i]]['timemarks'].length == 0) {
                  chrome.storage.sync.remove(sortedKeys[i]);
                }else{
                  chrome.storage.sync.set(timemarks);
                }
                window.location.reload();
              }
            }
          }
        }
      });

      li.appendChild(removeTime);

      tmlist.appendChild(li);
    }

    vid.appendChild( tmlist )

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
