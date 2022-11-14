const { GameSchema } = require('../schema/GameSchema');
const Editors = require('../sources/Editors');
const Mongoose = require('mongoose');
const Comment = require('./Comment');
const Category = require('./Category');
const Categories = require('../sources/Categories');

module.exports = class Game {
  identifier = 'INCONNU';
  id = null;
  title = null;
  description = null;
  stock = null;
  cabinet = null;
  shelf = null;
  editor = null;
  images = [];
  categories = [];
  comments = [];

  constructor(
    id = null,
    identifier = 'INCONNU',
    title = null,
    description = null,
    stock = null,
    cabinet = null,
    shelf = null,
    editor = null,
    images = [],
    categories = [],
    comments = [],
  ) {
    this.id = id;
    this.identifier = identifier;
    this.title = title;
    this.description = description;
    this.stock = stock;
    this.cabinet = cabinet;
    this.shelf = shelf;
    this.editor = editor;
    this.images = images;
    this.categories = categories;
    this.comments = comments;
  }

  async fromJSON(JSON = {}) {
    this.id = JSON._id || JSON.id;
    this.identifier = JSON.identifier || null;
    this.title = JSON.title || null;
    this.description = JSON.description || null;
    this.stock = JSON.stock || null;
    this.cabinet = JSON.cabinet || null;
    this.shelf = JSON.shelf || null;
    this.images = JSON.images || [];
    this.categories = [];
    this.comments = [];

    if (typeof JSON.comments === 'object') {
      for (const comment of JSON.comments) {
        if (typeof comment !== 'object') break;
        const commentObj = new Comment();
        await commentObj.fromJSON(comment, true);

        this.comments.push(commentObj);
      }
    }

    if (typeof JSON.categories === 'object') {
      for (const cat of JSON.categories) {
        if (typeof cat !== 'object' || cat.length === undefined) {
          const catObj = await Categories.find(cat);
          if (!catObj.error) this.categories.push(catObj.category);
        } else {
          const catObj = new Category();
          await catObj.fromJSON(cat);

          this.categories.push(catObj);
        }
      }
    }

    let editor = await Editors.find(Mongoose.Types.ObjectId(JSON.editor) || null);

    this.editor = editor.editor;
  }

  toJSON(associative = false) {
    if (associative) {
      return {
        id: this.id,
        identifier: this.identifier,
        title: this.title,
        description: this.description,
        stock: this.stock,
        cabinet: this.cabinet,
        shelf: this.shelf,
        images: this.images,
        categories: this.categories,
        comments: this.comments,

        editor: this.editor,
      };
    }

    let comments = [];
    if (typeof this.comments === 'object') {
      this.comments.forEach((comment) => {
        comments.push(comment.toJSON());
      });
    }

    let editor = null;
    switch (typeof this.editor) {
      case 'object':
        editor = this.editor !== null ? this.editor.id : null;
        break;
      case 'string':
        editor = this.editor !== null ? this.editor : null;
        break;
      default:
        break;
    }

    let categories = [];
    this.categories.forEach((cat) => {
      categories.push(cat.id);
    });

    return {
      id: this.id,
      identifier: this.identifier,
      title: this.title,
      description: this.description,
      stock: this.stock,
      cabinet: this.cabinet,
      shelf: this.shelf,
      images: this.images,
      categories,
      comments,

      editor,
    };
  }

  async create() {
    return new Promise((resolve) => {
      GameSchema.create(this.toJSON()).then((response) => {
        this.id = response._id;
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de créer le jeu', error);
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

      let editor = null;
      switch (typeof this.editor) {
        case 'object':
          editor = this.editor !== null ? this.editor.id : null;
          break;
        case 'string':
          editor = this.editor !== null ? this.editor : null;
          break;
        default:
          break;
      }

      let categories = [];
      this.categories.forEach((cat) => {
        categories.push(cat.id);
      });

      GameSchema.findOneAndUpdate(
        {
          _id: Mongoose.Types.ObjectId(this.id),
        },
        {
          identifier: this.identifier,
          title: this.title,
          description: this.description,
          stock: this.stock,
          cabinet: this.cabinet,
          shelf: this.shelf,
          images: this.images,
          categories,
          comments,
          editor,
        },
      ).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de mettre à jour le jeu', error);
      });
    });
  }

  async remove() {
    return new Promise((resolve) => {
      GameSchema.findOneAndDelete({
        _id: Mongoose.Types.ObjectId(this.id),
      }).then((response) => {
        resolve({
          error: false,
          result: response,
        });
      }).catch((error) => {
        console.log('ERROR : Impossible de supprimer le jeu', error);
      });
    });
  }
};
