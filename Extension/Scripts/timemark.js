/**
 * This script contains the Timemark class, which
 * stores all of the timemark video information,
 * such as the url, the description, and the time.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-01
 */

class Timemark {

  /*
   * Constructor.
   */
  constructor(id, title, time, url, desc) {
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
 }
