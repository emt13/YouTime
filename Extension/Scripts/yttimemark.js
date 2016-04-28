/**
 * This script contains the YTTimemark class, which
 * stores all of the timemark video information,
 * such as the url, the description, and the time.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

function YTTimemark(id, title, time, url, desc) {
  this.id = id;
  this.title = title;
  this.time = time;
  this.description = desc;
  this.url = url;
}

YTTimemark.prototype.getId = function(){
  return this.id;
}

YTTimemark.prototype.getTitle = function(){
  return this.title;
}

YTTimemark.prototype.getTime = function(){
  return this.time;
}

YTTimemark.prototype.getDescription = function(){
  return this.description;
}

YTTimemark.prototype.setDescription = function(val){
  this.description = val;
}

YTTimemark.prototype.getUrl = function(){
  return this.url;
}


//class YTTimemark {

  /*
   * Constructor.
   */
/*  constructor(id, title, time, url, desc) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.description = desc;
    this.url = url;
  }

  getId() { return this.id; }

  getTitle() { return this.title; }

  getTime() { return this.time; }

  getDescription() { return this.description; }

  setDescription(val) { this.description = val; }

  getUrl() { return this.url; }
}*/
