const uuid = require("uuid/v4");
const db = require("../utils/db");

class User {
  constructor({ username, _id = 0 }) {
    this.username = username;
    this.creationDate = Date.now();
    this._id = _id;
  }

  /**
   * @static
   * @method
   * method for searching an user
   * @param {object} user
   * @param {object} user - object with the user data
   * @param {string} user.display_name - the user name
   * @param {string} user.email - the user email
   * @param {string} user.href - the user profile
   * @param {string} user.email - defines the user account type
   * @param {object} user.images - an array with the user profile images
   * @param {string} user._id - unique id
   *
   * @returns User
   */

  static getUser(query) {
    const result = db
      .get("users")
      .find(query)
      .value();

    if (result) {
      return new User(result);
    } else {
      return null;
    }
  }

  static remove(query) {
    return db
      .get("users")
      .remove(query)
      .write();
  }

  /**
   * @method
   * Method for saving an user
   */
  save() {
    const searchRef = db.get("users");
    if (this._id) {
      return searchRef
        .find({
          username: this.username
        })
        .assign({ ...this })
        .write();
    } else {
      this._id = uuid();
      return searchRef
        .push({
          ...this
        })
        .write();
    }
  }
}

module.exports = User;
