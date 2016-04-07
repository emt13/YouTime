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

  constructor() {
    this.id = -1;
    this.title = "";
    this.time = -1;
    this.description = "";
    this.url = "";
  }

  getId() { return this.id; }

  setId(val) { this.id = val; }

  getTitle() { return this.title; }

  setTitle(val) { this.title = val; }

  getTime() { return this.time; }

  setTime(val) { this.time = val; }

  getDescription() { return this.description; }

  setDescription(val) { this.description = val; }

  getUrl() { return this.url; }

  setUrl(val) { this.url = val; }
 }