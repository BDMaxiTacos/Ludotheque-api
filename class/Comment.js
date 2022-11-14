// const Mongoose = require('mongoose');
// const Users = require('../sources/Users');

module.exports = class Comment {
  id = null;
  type = null;
  comment = null;
  date = new Date();
  author = null;

  constructor(
    id = null,
    type = null,
    comment = null,
    date = new Date(),
    author = null,
  ) {
    this.id = id;
    this.type = type;
    this.comment = comment;
    this.date = date;
    this.author = author;
  }

  async fromJSON(JSON = {}) {
    this.id = JSON._id || JSON.id;
    this.type = JSON.type;
    this.comment = JSON.comment;
    this.date = JSON.date;

    this.author = JSON.author;
  }

  toJSON(associative = false) {
    if (associative) {
      return {
        id: this.id,
        type: this.type,
        comment: this.comment,
        date: this.date,
        author: this.author,
      };
    }

    let author = null;
    switch (typeof this.author) {
      case 'object':
        author = this.author !== null ? this.author.id : null;
        break;
      case 'string':
        author = this.author !== null ? this.author : null;
        break;
      default:
        break;
    }

    return {
      id: this.id,
      type: this.type,
      comment: this.comment,
      date: this.date,
      author,
    };
  }
};
