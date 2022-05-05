const { v4 } = require("uuid");

/* A Task is a thing that has an id, a description, and a completedIn date. */
class Task {
  id = "";
  desc = "";
  completedIn = null;

  constructor(desc) {
    this.id = v4();
    this.desc = desc;
    this.completedIn = null;
  }
}

module.exports = Task;
