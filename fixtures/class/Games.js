const { faker } = require('@faker-js/faker');
const Game = require('../../class/Game');
const Comment = require('../../class/Comment');

const Users = require('../../sources/Users');
const Editors = require('../../sources/Editors');

async function createGames(LIMIT = 100) {
  let users = await Users.findAll();
  let editors = await Editors.findAll();

  for (let i = 0; i < LIMIT; i += 1) {
    let game = new Game();
    game.title = faker.commerce.product();
    game.description = faker.commerce.productDescription();
    game.stock = Math.floor(Math.random() * 10);
    game.cabinet = faker.datatype.string(5);
    game.shelf = faker.datatype.string(2);
    game.images = [faker.image.transport()];
    game.comments = [];
    game.editor = editors.editors[Math.floor(Math.random() * editors.editors.length)];

    for (let j = 0; j < LIMIT / 10; j += 1) {
      let comment = new Comment();
      comment.type = 'NULL';
      comment.comment = faker.lorem.lines(5);
      comment.date = faker.date.recent(10);
      comment.author = users.users[Math.floor(Math.random() * users.users.length)];

      game.comments.push(comment);
    }

    await game.create();
  }
}

module.exports = {
  createGames,
};
