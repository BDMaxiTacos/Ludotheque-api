const { faker } = require('@faker-js/faker');
const Loan = require('../../class/Loan');
const Comment = require('../../class/Comment');

const Users = require('../../sources/Users');
const Games = require('../../sources/Games');

async function createLoans(LIMIT = 100) {
  let users = await Users.findAll();
  let games = await Games.findAll();

  for (let i = 0; i < LIMIT; i += 1) {
    let loan = new Loan();
    loan.loanDate = faker.date.recent(365);
    loan.returnDate = faker.date.recent(365);
    loan.limitReturnDate = faker.date.recent(365);
    loan.comments = [];

    for (let j = 0; j < LIMIT / 10; j += 1) {
      let comment = new Comment();
      comment.type = 'NULL';
      comment.comment = faker.lorem.lines(5);
      comment.date = faker.date.recent(10);
      comment.author = users.users[Math.floor(Math.random() * users.users.length)];

      loan.comments.push(comment);
    }

    loan.game = games.games[Math.floor(Math.random() * games.games.length)];
    loan.user = users.users[Math.floor(Math.random() * users.users.length)];

    await loan.create();
  }
}

module.exports = {
  createLoans,
};
