const { SubscriptionSchema } = require('../schema/SubscriptionSchema');
const Mongoose = require('mongoose');

module.exports = class Subscription {
  name = null;
  price = null;

  constructor(
    id = null,
    name = null,
    price = null,
    duration = null,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
  }

  fromJSON(JSON = {}) {
    this.id = JSON._id || JSON.id;
    this.name = JSON.name || null;
    this.price = JSON.price || null;
    this.duration = JSON.duration || null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      duration: this.duration,
    };
  }

  async create() {
    return new Promise((resolve) => {
      SubscriptionSchema.create(this.toJSON())
        .then((response) => {
          this.id = response._id;
          resolve({
            error: false,
            result: response,
          });
        })
        .catch((error) => {
          console.log('ERROR : Impossible de créer le type de subscription', error);
        });
    });
  }

  async update() {
    return new Promise((resolve) => {
      SubscriptionSchema.findOneAndUpdate(
        {
          _id: Mongoose.Types.ObjectId(this.id),
        },
        {
          name: this.name,
          price: this.price,
          duration: this.duration,
        },
      ).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de mettre à jour le type de subscription', error);
      });
    });
  }

  async remove() {
    return new Promise((resolve) => {
      SubscriptionSchema.findOneAndDelete({
        _id: Mongoose.Types.ObjectId(this.id),
      }).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de supprimer le type de subscription', error);
      });
    });
  }
};
