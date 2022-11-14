const { CategorySchema } = require('../schema/CategorySchema');
const Mongoose = require('mongoose');

module.exports = class Category {
  name = null;

  constructor(
    id = null,
    name = null,
  ) {
    this.id = id;
    this.name = name;
  }

  fromJSON(JSON = {}) {
    this.id = JSON._id || JSON.id;
    this.name = JSON.name || null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  async create() {
    return new Promise((resolve) => {
      CategorySchema.create(this.toJSON())
        .then((response) => {
          this.id = response._id;
          resolve({
            error: false,
            result: response,
          });
        })
        .catch((error) => {
          console.log('ERROR : Impossible de créer la catégorie', error);
        });
    });
  }

  async update() {
    return new Promise((resolve) => {
      CategorySchema.findOneAndUpdate(
        {
          _id: Mongoose.Types.ObjectId(this.id),
        },
        {
          name: this.name,
        },
      ).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de mettre à jour la catégorie', error);
      });
    });
  }

  async remove() {
    return new Promise((resolve) => {
      CategorySchema.findOneAndDelete({
        _id: Mongoose.Types.ObjectId(this.id),
      }).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de supprimer la catégorie', error);
      });
    });
  }
};
