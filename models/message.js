const uuid = require("uuid/v4");
const db = require("../utils/db");

class Message {
  constructor({ message, user }) {
    this.user = user;
    this.message = message;
    this.date = Date.now();
    this._id = uuid();
  }

  static get(query) {
    const result = db
      .get("messages")
      .find(query)
      .value();

    if (result) {
      return new Message(result);
    } else {
      return null;
    }
  }

  static remove(query) {
    return db
      .get("messages")
      .remove(query)
      .write();
  }

  save() {
    const searchRef = db.get("messages");

    return searchRef
      .push({
        ...this
      })
      .write();
  }
}

module.exports = Message;
