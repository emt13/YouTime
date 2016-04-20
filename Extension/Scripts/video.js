/**
 * This script contains the Video class, which
 * stores all of the timemarks for a particular
 * YouTube video.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

class YTVideo {
  /*
   * Constructor.
   */
  /*constructor(id, title) {
    this.id = id;
    this.title = title;
    this.timemarks = [];
  }*/
  constructor(tm){
    this.title = tm['title'];
    this.marks = tm['timemarks'];
  }

  getTimemarks() { return this.marks; }

  getTitle() { return this.title; }

}
