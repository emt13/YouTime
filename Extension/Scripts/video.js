/**
 * This script contains the Video class, which
 * stores all of the timemarks for a particular
 * YouTube video.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

class Video {
  /*
   * Constructor.
   */
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.timemarks = [];
  }

  getId() { return this.id; }

  getTitle() { return this.title; }

  /*
   * Add a timemark to the Video class.
   * @param timemark
   */
  add(timemark) {
    this.timemarks.push( timemark );
  }
}