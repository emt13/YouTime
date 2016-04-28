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
//returns id
YTTimemark.prototype.getId = function(){
  return this.id;
}
//returns title
YTTimemark.prototype.getTitle = function(){
  return this.title;
}
//returns time
YTTimemark.prototype.getTime = function(){
  return this.time;
}
//returns description
YTTimemark.prototype.getDescription = function(){
  return this.description;
}
//saves a new description
YTTimemark.prototype.setDescription = function(val){
  this.description = val;
}
//returns a url
YTTimemark.prototype.getUrl = function(){
  return this.url;
}
