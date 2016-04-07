function Storage() {
  this.videos = [];
}

Storage.prototype = {
  constructor: Storage,
  getVideos:function() { return this.videos; }
}
	 
