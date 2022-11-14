const express = require('express');
const router = express.Router();

const Loans = require('../sources/Loans');
const Games = require('../sources/Games');
const Categories = require('../sources/Categories');
const Category = require('../class/Category');

router.get('/nbrEmpruntParJeux', async (request, response) => {
  let data = [];

  let loans = await Loans.findAll();
  let games = await Games.findAll();

  loans = loans.loans;
  games = games.games;

  loans.map((el) => {
    el.comments = [];
    return el;
  });

  games.map((el) => {
    el.comments = [];
    return el;
  });

  for (let game of games) {
    game.count = loans.filter((loan) => String(loan.game.id) === String(game.id)).length;
    data.push({
      game,
      count: loans.filter((loan) => String(loan.game.id) === String(game.id)).length,
    });
  }

  response.json(data);
});

router.get('/nbrEmpruntParCategory', async (request, response) => {
  let data = [];

  let categories = await Categories.findAll();
  let games = await Games.findAll();

  categories = categories.categories;
  games = games.games;

  games.map((el) => {
    el.comments = [];
    return el;
  });

  for (let category of categories) {
    let catObj = new Category();
    catObj.fromJSON(category);

    data.push({
      category: catObj,
      count: games.filter((game) => JSON.stringify(game.categories).includes(String(catObj.id))).length,
    });
  }

  response.json(data);
});

router.get('/dureeMoyenneEmprunt', async (request, response) => {
  let data = [];

  let games = await Games.findAll();
  games = games.games;

  let loans = await Loans.findAll();
  loans = loans.loans;

  games.map((el) => {
    el.comments = [];
    return el;
  });

  loans.map((el) => {
    el.comments = [];
    el.game.comments = [];
    return el;
  });

  for (let game of games) {
    let loansForGame = loans.filter((el) => String(el.game.id) === String(game.id) && el.returnDate !== null);
    let moy = 0;

    loansForGame.forEach((loan) => {
      moy += parseFloat(new Date(loan.returnDate).getTime() - new Date(loan.loanDate).getTime());
    });

    moy = Number.parseInt(Math.abs(parseFloat(moy) / loansForGame.length), 10);

    data.push({
      game,
      duration: Number.isNaN(moy) ? 0 : moy,
    });
  }

  response.json(data);
});

module.exports = router;
