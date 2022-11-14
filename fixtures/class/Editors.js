const { faker } = require('@faker-js/faker');
const Editor = require('../../class/Editor');

async function createEditors(LIMIT = 100) {
  for (let i = 0; i < LIMIT; i += 1) {
    let editor = new Editor();
    editor.name = faker.company.companyName();

    await editor.create();
  }
}

module.exports = {
  createEditors,
};
