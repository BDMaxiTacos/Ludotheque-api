const { EditorSchema } = require('../schema/EditorSchema');
const Mongoose = require('mongoose');

module.exports = class Editor {
  id = null;
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
      EditorSchema.create(this.toJSON()).then((response) => {
        this.id = response._id;
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log("ERROR : Impossible de créer l'éditeur", error);
      });
    });
  }

  async update() {
    return new Promise((resolve) => {
      EditorSchema.findOneAndUpdate(
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
        console.log("ERROR : Impossible de mettre à jour l'éditeur", error);
      });
    });
  }

  async remove() {
    return new Promise((resolve) => {
      EditorSchema.findOneAndDelete({
        _id: Mongoose.Types.ObjectId(this.id),
      }).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log("ERROR : Impossible de supprimer l'éditeur", error);
      });
    });
  }
};
