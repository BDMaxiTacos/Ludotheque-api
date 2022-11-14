const { LoanSchema } = require('../schema/LoanSchema');
// const Users = require('../sources/Users');
const Games = require('../sources/Games');

const Comment = require('./Comment');
const Mongoose = require('mongoose');
const { UserSchema } = require('../schema/UserSchema');

module.exports = class Loan {
  id = null;
  status = 'EN COURS';
  loanDate = null;
  limitReturnDate = null;
  returnDate = null;
  user = null;
  game = null;
  comments = null;

  constructor(
    id = null,
    status = 'EN COURS',
    loanDate = null,
    returnDate = null,
    user = null,
    game = null,
    limitReturnDate = null,
    comments = [],
  ) {
    this.id = id;
    this.loanDate = loanDate;
    this.limitReturnDate = limitReturnDate;
    this.returnDate = returnDate;
    this.user = user;
    this.game = game;
    this.comments = comments;
    this.status = status;
  }

  async fromJSON(JSON = {}, associativeUser = true) {
    this.id = JSON._id || JSON.id;
    this.loanDate = JSON.loanDate || null;
    this.limitReturnDate = JSON.limitReturnDate || null;
    this.returnDate = JSON.returnDate || null;
    this.comments = [];

    if (typeof JSON.comments === 'object') {
      for (const comment of JSON.comments) {
        if (typeof comment !== 'object') break;
        const commentObj = new Comment();
        await commentObj.fromJSON(comment);

        this.comments.push(commentObj);
      }

      // for (let comment of this.comments) {
      //   let author = {};
      //   if (associativeUser) author = await Users.findCircular(Mongoose.Types.ObjectId(comment.author));
      //   comment.author = author.user;
      // }
    }

    let user = null;
    if (associativeUser) {
      if (JSON.user === undefined) return;
      switch (typeof JSON.user) {
        case 'string':
          user = await UserSchema.findById(Mongoose.Types.ObjectId(JSON.user));
          break;
        case 'object':
          user = JSON.user === null ? null : await UserSchema.findById(Mongoose.Types.ObjectId(JSON.user.id || JSON.user._id));
          break;
        default:
          user = await UserSchema.findById(Mongoose.Types.ObjectId(JSON.user));
      }

      if (user !== null) user.password = '<#HASHED#>';
    } else {
      user = JSON.user || null;
    }

    let game = await Games.find(Mongoose.Types.ObjectId(JSON.game) || null);

    this.user = user;
    this.game = game.game;

    if (this.returnDate === null || this.returnDate === undefined) {
      if (new Date(this.limitReturnDate) < new Date()) this.status = 'RETARD';
      else this.status = 'EN COURS';
    } else {
      this.status = 'RENDU';
    }
  }

  toJSON(associative = false) {
    if (associative) {
      return {
        id: this.id,
        status: this.status,
        loanDate: this.loanDate,
        limitReturnDate: this.limitReturnDate,
        returnDate: this.returnDate,
        comments: this.comments,

        user: this.user,
        game: this.game,
      };
    }

    let comments = [];
    if (typeof this.comments === 'object') {
      this.comments.forEach((comment) => {
        comments.push(comment.toJSON());
      });
    }

    let user = null;
    switch (typeof this.user) {
      case 'object':
        user = this.user !== null ? this.user.id : null;
        break;
      case 'string':
        user = this.user !== null ? this.user : null;
        break;
      default:
        break;
    }

    let game = null;
    switch (typeof this.game) {
      case 'object':
        game = this.game !== null ? this.game.id : null;
        break;
      case 'string':
        game = this.game !== null ? this.game : null;
        break;
      default:
        break;
    }

    return {
      id: this.id,
      loanDate: this.loanDate,
      limitReturnDate: this.limitReturnDate,
      returnDate: this.returnDate,
      comments,

      user,
      game,
    };
  }

  async create() {
    return new Promise((resolve) => {
      LoanSchema.create(this.toJSON()).then((response) => {
        this.id = response._id;
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de créer le prêt', error);
      });
    });
  }

  async update() {
    return new Promise((resolve) => {
      let comments = [];
      if (typeof this.comments === 'object') {
        this.comments.forEach((comment) => {
          comments.push(comment.toJSON());
        });
      }

      let user = null;
      switch (typeof this.user) {
        case 'object':
          user = this.user !== null ? this.user.id : null;
          break;
        case 'string':
          user = this.user !== null ? this.user : null;
          break;
        default:
          break;
      }

      let game = null;
      switch (typeof this.game) {
        case 'object':
          game = this.game !== null ? this.game.id : null;
          break;
        case 'string':
          game = this.game !== null ? this.game : null;
          break;
        default:
          break;
      }

      LoanSchema.findOneAndUpdate(
        {
          _id: Mongoose.Types.ObjectId(this.id),
        },
        {
          loanDate: this.loanDate,
          limitReturnDate: this.limitReturnDate,
          returnDate: this.returnDate,
          comments,
          user,
          game,
        },
      ).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de mettre à jour le prêt', error);
      });
    });
  }

  async remove() {
    return new Promise((resolve) => {
      LoanSchema.findOneAndDelete({
        _id: Mongoose.Types.ObjectId(this.id),
      }).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de supprimer le prêt', error);
      });
    });
  }
};
