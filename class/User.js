const Mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const { UserSchema } = require('../schema/UserSchema');
const Comment = require('./Comment');
const Loans = require('../sources/Loans');
const { LoanSchema } = require('../schema/LoanSchema');
// const Users = require('../sources/Users');
const Subscriptions = require('../sources/Subscriptions');
const { SubscriptionSchema } = require('../schema/SubscriptionSchema');

const BCRYPT_CONFIG = {
  SALT_ROUNDS: 10,
};

module.exports = class User {
  id = null;
  firstname = null;
  lastname = null;
  password = null;
  address = null;
  cityCode = null;
  city = null;
  phone = null;
  mail = null;
  created = null;
  subscriptionDate = null;
  subscriptionType = null;
  birthday = null;
  image = null;
  roles = null;
  comments = [];
  status = 'PAS EMPRUNT';
  linkTo = null;

  loans = [];

  constructor(
    id = null,
    firstname = null,
    lastname = null,
    password = null,
    address = null,
    cityCode = null,
    city = null,
    phone = null,
    mail = null,
    created = null,
    subscriptionDate = null,
    subscriptionType = null,
    birthday = null,
    image = null,
    roles = null,
    comments = [],
    status = 'PAS EMPRUNT',
    linkTo = null,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.address = address;
    this.cityCode = cityCode;
    this.city = city;
    this.phone = phone;
    this.mail = mail;
    this.created = created;
    this.subscriptionDate = subscriptionDate;
    this.subscriptionType = subscriptionType;
    this.birthday = birthday;
    this.image = image;
    this.roles = roles;
    this.comments = comments;
    this.status = status;
    this.linkTo = linkTo;
  }

  async fromJSON(JSON = {}, anonymous = false, callfrom = null) {
    if (JSON === null) return;
    this.id = JSON._id || JSON.id;
    this.firstname = JSON.firstname || null;
    this.lastname = JSON.lastname || null;
    this.password = anonymous ? '<#HASHED#>' : JSON.password || null;
    this.address = JSON.address || null;
    this.cityCode = JSON.cityCode || null;
    this.city = JSON.city || null;
    this.phone = JSON.phone || null;
    this.mail = JSON.mail || null;
    this.created = JSON.created || new Date();
    this.subscriptionDate = JSON.subscriptionDate || new Date();
    this.subscriptionType = JSON.subscriptionType || { id: null, name: 'NOT SUBSCRIBED', price: 0 };
    this.birthday = JSON.birthday || new Date();
    this.image = JSON.image || null; // A REMPLACER PAR L'ICONE
    this.roles = JSON.roles || ['ROLE_USER'];

    this.status = JSON.status || 'PAS EMPRUNT';
    this.linkTo = JSON.linkTo || null;

    this.comments = [];

    if (typeof JSON.comments === 'object') {
      for (const comment of JSON.comments) {
        if (typeof comment !== 'object') break;
        const commentObj = new Comment();
        await commentObj.fromJSON(comment);

        this.comments.push(commentObj);
      }
    }

    let subObj = null;
    if (typeof this.subscriptionType === 'object' && Object.keys(this.subscriptionType) > 1) {
      if (this.subscriptionType.id) {
        subObj = await Subscriptions.find(this.subscriptionType.id || this.subscriptionType._id);
      }
    } else if (this.subscriptionType.id !== null) subObj = await Subscriptions.find(this.subscriptionType);

    if (subObj !== null && subObj.subscription !== undefined && subObj.subscription !== null && subObj.subscription.length > 0) this.subscriptionType = subObj.subscription;

    if (typeof JSON.linkTo === 'object') {
      // const linkedEl = new User();
      // await linkedEl.fromJSON(JSON.linkTo, true);
    }

    if (callfrom !== 'LOAN') {
      const loansFromDB = await Loans.findByUser(this.id);
      let { loans } = loansFromDB;
      this.loans = loans;
    } else {
      this.loans = undefined;
    }

    let status = await LoanSchema.find({
      user: Mongoose.Types.ObjectId(this.id),
    });

    if (status.length === 0) {
      this.status = 'PAS EMPRUNT';
    } else {
      for (let s of status) {
        if (new Date(s.limitReturnDate) < new Date() && s.returnDate === null) {
          this.status = 'RETARD';
          break;
        } else if (new Date(s.limitReturnDate) >= new Date()) {
          this.status = 'EMPRUNT';
        } else {
          this.status = 'PAS EMPRUNT';
        }
      }
    }
  }

  async fromJSONCircular(JSON = {}, callfrom = null) {
    this.id = JSON._id || JSON.id;
    this.firstname = JSON.firstname || null;
    this.lastname = JSON.lastname || null;
    this.password = JSON.password || null;
    this.address = JSON.address || null;
    this.cityCode = JSON.cityCode || null;
    this.city = JSON.city || null;
    this.phone = JSON.phone || null;
    this.mail = JSON.mail || null;
    this.created = JSON.created || new Date();
    this.subscriptionDate = JSON.subscriptionDate || new Date();
    this.subscriptionType = JSON.subscriptionType || { id: null, name: 'NOT SUBSCRIBED', price: 0 };
    this.birthday = JSON.birthday || new Date();
    this.image = JSON.image || null; // A REMPLACER PAR L'ICONE
    this.roles = JSON.roles || ['ROLE_USER'];
    this.status = JSON.status || 'PAS EMPRUNT';
    this.linkTo = JSON.linkTo || null;

    this.comments = null;

    if (callfrom !== 'LOAN') {
      const loansFromDB = await Loans.findByUser(this.id);
      let { loans } = loansFromDB;
      this.loans = loans;

      let status = await LoanSchema.find({
        user: Mongoose.Types.ObjectId(this.id),
      });

      if (status.length === 0) {
        this.status = 'PAS EMPRUNT';
      } else {
        for (let s of status) {
          if (new Date(s.limitReturnDate) < new Date()) {
            this.status = 'RETARD';
            break;
          } else this.status = 'EMPRUNT';
        }
      }
    } else {
      this.loans = undefined;
    }
  }

  async toJSON(associative = false, fromComment = false, nolinkto = false, adduser = false) {
    if (associative) {
      let linkTo = null;
      // if (this.linkTo !== null) {
      //   linkTo = await UserSchema.find({
      //     _id: Mongoose.Types.ObjectId(this.linkTo),
      //   });
      // }

      return {
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        password: adduser ? this.password : null,
        address: this.address,
        cityCode: this.cityCode,
        city: this.city,
        phone: this.phone,
        mail: this.mail,
        created: this.created,
        subscriptionDate: this.subscriptionDate,
        subscriptionType: this.subscriptionType,
        birthday: this.birthday,
        image: this.image,
        roles: this.roles,
        comments: this.comments,
        loans: this.loans,
        status: this.status,
        linkTo: this.linkTo,
      };
    }

    let comments = [];
    if (typeof this.comments === 'object' && !fromComment) {
      this.comments.forEach((comment) => {
        comments.push(comment.toJSON(false, true));
      });
    }

    let loans = [];
    const loansFromDB = Loans.findByUser(this.id);
    loans = loansFromDB.loans;

    let linkTo = null;
    if (this.linkTo !== null) {
      linkTo = await UserSchema.find({
        _id: Mongoose.Types.ObjectId(this.linkTo),
      });
    }

    if (nolinkto) linkTo = this.linkTo;

    if (typeof this.subscriptionType === 'object' && this.subscriptionType.id !== null) this.subscriptionType = this.subscriptionType.id;

    // let subscriptionType = null;
    // console.log(this.subscriptionType);
    // if (this.subscriptionType !== null) {
    //   subscriptionType = await SubscriptionSchema.find({
    //     _id: Mongoose.Types.ObjectId(this.subscriptionType),
    //   }).catch((e) => {
    //     console.log(e);
    //   });
    // }

    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      password: adduser ? this.password : null,
      address: this.address,
      cityCode: this.cityCode,
      city: this.city,
      phone: this.phone,
      mail: this.mail,
      created: this.created,
      subscriptionDate: this.subscriptionDate,
      subscriptionType: this.subscriptionType,
      birthday: this.birthday,
      image: this.image,
      roles: this.roles,
      comments,
      loans,
      status: this.status,
      linkTo,
    };
  }

  async checkExistingObject() {
    return new Promise((resolve) => {
      UserSchema.find({ mail: this.mail }).then((response) => {
        resolve(response.length > 0);
      });
    });
  }

  async create() {
    return new Promise((resolve) => {
      Bcrypt.hash(this.password, BCRYPT_CONFIG.SALT_ROUNDS, async (error, hash) => {
        this.password = hash;

        if (await this.checkExistingObject()) {
          resolve({
            error: 'NOT_UNIQUE_OBJECT',
          });
        } else {
          UserSchema.create(await this.toJSON(false, false, true, true)).then((response) => {
            this.id = response._id;
            resolve({
              error: false,
              result: response,
            });
          }).catch((errorMongo) => {
            console.log("ERROR : Impossible de créer l'utilisateur", errorMongo);
          });
        }
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

      UserSchema.findOneAndUpdate(
        {
          _id: Mongoose.Types.ObjectId(this.id),
        },
        {
          firstname: this.firstname,
          lastname: this.lastname,
          address: this.address,
          cityCode: this.cityCode,
          city: this.city,
          phone: this.phone,
          subscriptionDate: this.subscriptionDate,
          subscriptionType: this.subscriptionType,
          birthday: this.birthday,
          image: this.image,
          roles: this.roles,
          comments,
          linkTo: this.linkTo,
        },
      ).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log("ERROR : Impossible de mettre à jour l'utilisateur", error);
      });
    });
  }

  async remove() {
    return new Promise((resolve) => {
      UserSchema.findOneAndDelete({
        _id: Mongoose.Types.ObjectId(this.id),
      }).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log("ERROR : Impossible de supprimer l'utilisateur", error);
      });
    });
  }
};
