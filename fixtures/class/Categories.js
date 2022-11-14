const { faker } = require('@faker-js/faker');
const Category = require('../../class/Category');

async function createCategories(LIMIT = 100) {
  for (let i = 0; i < LIMIT; i += 1) {
    let category = new Category();
    category.name = faker.commerce.department();

    await category.create();
  }
}

module.exports = {
  createCategories,
};
