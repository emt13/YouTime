/**
 * This script contains the YTManager class, which
 * handles all events that occur within the mamager page
 * As well as display the Videos and their timelinks to the user
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-05
 */

//Constructor for this class
function YTManager(doc) {
  console.log("Created the manager!");
  this.document = doc;
}

// Populate Page function that grabs video objects from storage and
// then populates the manager page with them and their timelinks.
// share and remove buttons are also added.
YTManager.prototype.populatePage = function(videos){
  console.log(videos);
  
  // Grab the sorted keys (video IDs) from storage
  var sortedKeys = Object.keys(videos).sort();
  for(var i = 0; i < sortedKeys.length; i++){
    console.log(sortedKeys[i]);
	// Grab each video as an object
    var video = new YTVideo(videos[sortedKeys[i]]);
    console.log(" -- video:");
    console.log(video);
	
	// Add each video to the manager
    var vid = document.createElement("div");
    vid.setAttribute("class", "accordian");
	
	// Add the video name
    vid.appendChild( document.createTextNode(video.getTitle()) );
	
	// create remove button for video that will 
	// remove all timemarks associated with that video
	var removeButton =  document.createElement("BUTTON");
    removeButton.appendChild(document.createTextNode("Remove"));
    removeButton.setAttribute("video", videos[sortedKeys[i]]);
    removeButton.setAttribute("id", sortedKeys[i]);
    removeButton.addEventListener("click", function() {
      chrome.storage.sync.remove(this.getAttribute("id"));
      window.location.reload();
      console.log("removed");
    });

    vid.appendChild(removeButton);

    // create list element for timelink display
    var tmlist = document.createElement("ul");
	// get the timemarks for each video
    var marks = video.getTimemarks();
	
	// Add each timemark to the list
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
	  
	  // Add remove button to the timemarks
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
            for(var j = 0; j < videos[sortedKeys[i]]['timemarks'].length; j++) {
              if(videos[sortedKeys[i]]['timemarks'][j]['time'] == removedTime) {
                videos[sortedKeys[i]]['timemarks'].splice(j,1);
                if(videos[sortedKeys[i]]['timemarks'].length == 0) {
                  chrome.storage.sync.remove(sortedKeys[i]);
                }else{
                  chrome.storage.sync.set(videos);
                }
                window.location.reload();
              }
            }
          }
        }
      });

      li.appendChild(removeTime);
	  
	  // edit button for editing the escription
	  var editButton = document.createElement("BUTTON");
	  editButton.appendChild(document.createTextNode("Edit"));
	  // store information in button for use on click
	  editButton.setAttribute("timemark", mark);
	  editButton.setAttribute("time", mark['time']);
      editButton.setAttribute("id", mark['id']);
	  editButton.setAttribute("description", mark['desc']);
	  editButton.addEventListener("click", function() {
		  // prompt user for new description
		  var newDesc = window.prompt("Please Enter Your New Description");
		  // go through all of the keys and check if the id is correct
		  for(var i = 0; i < sortedKeys.length; i++) {
			if(sortedKeys[i] == this.getAttribute("id")) {
			  var editTime = this.getAttribute("time");
			  
			  //find the correct timemark and then change its description
			  for(var j = 0; j < videos[sortedKeys[i]]['timemarks'].length; j++) {
				if(videos[sortedKeys[i]]['timemarks'][j]['time'] == editTime) {
				  videos[sortedKeys[i]]['timemarks'][j]['desc'] = newDesc;
				  chrome.storage.sync.set(videos);
				  window.location.reload();
				}
			  }
			}
		  }
	  });
	  
	  li.appendChild(editButton);

      tmlist.appendChild(li);
    }

    vid.appendChild( tmlist )

    document.body.appendChild( vid );

  }

}
