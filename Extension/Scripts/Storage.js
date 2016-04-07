function Storage() {
  this.videos = [];
}

Storage.prototype = {
  constructor: Storage,
  getVideos:function() { return this.videos; }
  add(video):function() {
    this.videos.push(video);
  }
}
	 
