const Category = require('../class/Category');
const { CategorySchema } = require('../schema/CategorySchema');

async function findAll() {
  return new Promise((resolve) => {
    CategorySchema.find({}).then(async (response) => {
      const categories = [];
      for (const category of response) {
        const catObj = new Category();
        await catObj.fromJSON(category);

        categories.push(catObj);
      }

      resolve({
        error: false,
        categories,
      });
    });
  });
}

async function find(ObjectId = null) {
  return new Promise((resolve) => {
    CategorySchema.findById(ObjectId).then(async (response) => {
      if (response) {
        const category = new Category();
        await category.fromJSON(response);
        resolve({
          error: false,
          category,
        });
      } else {
        resolve({
          error: true,
          category: null,
        });
      }
    });
  });
}

async function flush() {
  return new Promise((resolve) => {
    CategorySchema.deleteMany({}).then((response) => {
      resolve({
        error: false,
        result: response,
      });
    });
  });
}

module.exports = {
  findAll,
  find,
  flush,
};
