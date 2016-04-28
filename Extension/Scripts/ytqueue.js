/**
 * Class representing a FIFO queue
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-27
 */

function Queue(){
  this.elems = [];
  this.startIndex = 0;
}

//returns the number of elements in the queue
Queue.prototype.size = function(){
  return this.elems.length - this.startIndex;
}

//adds an element to the queue
Queue.prototype.push = function(obj){
  this.elems.push(obj);
}

//removes the first item in the queue and returns it
Queue.prototype.pop = function(obj){
  //if the size is 0, just return an empty object
  if(this.size() == 0){
    return {};
  }
  //otherwise return the object requested
  var ret = this.elems[this.startIndex];
  this.elems[this.startIndex] = {};
  this.startIndex++;
  return ret;
}
